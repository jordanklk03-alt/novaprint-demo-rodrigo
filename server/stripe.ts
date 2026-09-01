import Stripe from "stripe";
import { ENV } from "./_core/env";
import { updateStripeCustomerId } from "./db";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!ENV.stripeSecretKey) return null;
  stripeClient ??= new Stripe(ENV.stripeSecretKey);
  return stripeClient;
}

export const catalog = {
  thermo: { name: "Termo Nova 500ml", unitAmount: 1995 },
  shirt: { name: "Camiseta Nova Classic", unitAmount: 2495 },
  hoodie: { name: "Sudadera Nova Premium", unitAmount: 3995 },
} as const;

export type CatalogId = keyof typeof catalog;

type ShippingProfile = {
  displayName?: string | null;
  contactEmail?: string | null;
  shippingName?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

function stripeAddress(profile?: ShippingProfile): Stripe.AddressParam | undefined {
  if (!profile?.addressLine1 || !profile.city || !profile.postalCode) return undefined;
  return {
    line1: profile.addressLine1,
    line2: profile.addressLine2 ?? undefined,
    city: profile.city,
    state: profile.region ?? undefined,
    postal_code: profile.postalCode,
    country: (profile.country || "ES").toUpperCase(),
  };
}

export async function ensureStripeCustomer(user: { id: number; email?: string | null; name?: string | null; stripeCustomerId?: string | null }, profile?: ShippingProfile) {
  const stripe = getStripe();
  if (!stripe) return null;
  const address = stripeAddress(profile);
  const customerName = profile?.displayName || profile?.shippingName || user.name || user.email || "NOVAprint customer";
  const customerEmail = profile?.contactEmail || user.email || undefined;
  const shipping = address ? { name: profile?.shippingName || customerName, address } : undefined;
  if (user.stripeCustomerId) {
    if (address || profile?.shippingName || profile?.displayName || profile?.contactEmail) {
      await stripe.customers.update(user.stripeCustomerId, {
        email: customerEmail,
        name: customerName,
        address,
        shipping,
      });
    }
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: customerEmail,
    name: customerName,
    address,
    shipping,
    metadata: { novaprint_user_id: String(user.id) },
  });
  await updateStripeCustomerId(user.id, customer.id);
  return customer.id;
}

export async function listSavedPaymentMethods(user: { id: number; email?: string | null; name?: string | null; stripeCustomerId?: string | null }) {
  const stripe = getStripe();
  if (!stripe) return [];
  const customerId = await ensureStripeCustomer(user);
  if (!customerId) return [];
  const methods = await stripe.paymentMethods.list({ customer: customerId, type: "card" });
  return methods.data.map(method => ({
    id: method.id,
    brand: method.card?.brand ?? "card",
    last4: method.card?.last4 ?? "••••",
    expMonth: method.card?.exp_month ?? null,
    expYear: method.card?.exp_year ?? null,
  }));
}

export async function createCheckoutSession(params: {
  user: { id: number; email?: string | null; name?: string | null; stripeCustomerId?: string | null };
  items: Array<{ productId: CatalogId; quantity: number; customizationFeeCents?: number }>;
  shippingSnapshot?: string;
  origin: string;
  profile?: ShippingProfile;
}) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe is not configured");
  const customerId = await ensureStripeCustomer(params.user, params.profile);
  const lineItems = params.items.map(item => {
    const product = catalog[item.productId];
    const customizationFee = Math.max(0, Math.min(item.customizationFeeCents ?? 0, 100000));
    return {
      price_data: {
        currency: "eur",
        product_data: { name: product.name, metadata: { product_id: item.productId } },
        unit_amount: product.unitAmount + customizationFee,
      },
      quantity: item.quantity,
    } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
  });

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    customer: customerId ?? undefined,
    customer_email: customerId ? undefined : params.user.email ?? undefined,
    client_reference_id: String(params.user.id),
    allow_promotion_codes: true,
    payment_intent_data: { setup_future_usage: "off_session" },
    billing_address_collection: "auto",
    shipping_address_collection: { allowed_countries: ["ES", "PT", "FR", "IT", "DE"] },
    success_url: `${params.origin}/cuenta?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/carrito?checkout=cancelled`,
    metadata: {
      user_id: String(params.user.id),
      customer_email: params.user.email ?? "",
      customer_name: params.user.name ?? "",
      shipping_snapshot: params.shippingSnapshot ?? "",
    },
  });
}
