import { z } from "zod";
import { createOrder, getCustomerProfile, getOrdersForUser, upsertCustomerProfile } from "../db";
import { catalog, createCheckoutSession, listSavedPaymentMethods, type CatalogId } from "../stripe";
import { protectedProcedure, router } from "../_core/trpc";

const profileInput = z.object({
  displayName: z.string().max(160).optional(),
  contactEmail: z.union([z.string().email().max(320), z.literal("")]).optional(),
  phone: z.string().max(32).optional(),
  shippingName: z.string().max(160).optional(),
  addressLine1: z.string().max(255).optional(),
  addressLine2: z.string().max(255).optional(),
  city: z.string().max(128).optional(),
  region: z.string().max(128).optional(),
  postalCode: z.string().max(32).optional(),
  country: z.string().length(2).optional(),
});

const checkoutInput = z.object({
  items: z.array(z.object({
    productId: z.enum(["thermo", "shirt", "hoodie"]),
    quantity: z.number().int().min(1).max(20),
    customizationFeeCents: z.number().int().min(0).max(100000).optional(),
  })).min(1).max(20),
});

export const customerRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => ({
    user: ctx.user,
    profile: await getCustomerProfile(ctx.user.id),
  })),

  saveProfile: protectedProcedure.input(profileInput).mutation(async ({ ctx, input }) => {
    return upsertCustomerProfile(ctx.user.id, input);
  }),

  orders: protectedProcedure.query(({ ctx }) => getOrdersForUser(ctx.user.id)),

  paymentMethods: protectedProcedure.query(({ ctx }) => listSavedPaymentMethods(ctx.user)),

  createCheckout: protectedProcedure.input(checkoutInput).mutation(async ({ ctx, input }) => {
    const originHeader = ctx.req.headers.origin;
    const host = ctx.req.headers.host ?? "localhost:3000";
    const origin = typeof originHeader === "string" ? originHeader : `https://${host}`;
    const profile = await getCustomerProfile(ctx.user.id);
    const session = await createCheckoutSession({
      user: ctx.user,
      items: input.items as Array<{ productId: CatalogId; quantity: number; customizationFeeCents?: number }>,
      shippingSnapshot: profile ? JSON.stringify(profile) : undefined,
      origin,
      profile: profile ?? undefined,
    });
    const totalCents = input.items.reduce((total, item) => {
      const product = catalog[item.productId];
      return total + (product.unitAmount + (item.customizationFeeCents ?? 0)) * item.quantity;
    }, 0);
    const orderId = await createOrder({
      userId: ctx.user.id,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : ctx.user.stripeCustomerId ?? null,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
      status: "pending",
      totalCents,
      currency: "eur",
      items: JSON.stringify(input.items),
      shippingSnapshot: profile ? JSON.stringify(profile) : null,
    });
    return { orderId, checkoutUrl: session.url };
  }),
});
