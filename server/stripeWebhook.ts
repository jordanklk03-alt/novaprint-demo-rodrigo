import type { Express } from "express";
import express from "express";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { getStripe } from "./stripe";
import { updateOrderPaymentState } from "./db";

export function registerStripeWebhook(app: Express) {
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const stripe = getStripe();
    const signature = req.headers["stripe-signature"];
    if (!stripe || !ENV.stripeWebhookSecret || typeof signature !== "string") {
      return res.status(503).json({ error: "Stripe webhook is not configured" });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, ENV.stripeWebhookSecret);
    } catch (error) {
      console.error("[Stripe] Webhook signature verification failed", error);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await updateOrderPaymentState(
        session.id,
        session.payment_status === "paid" ? "paid" : "canceled",
        typeof session.payment_intent === "string" ? session.payment_intent : undefined,
      );
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await updateOrderPaymentState(session.id, "canceled");
    }

    console.log(`[Stripe] Processed ${event.type} (${event.id})`);
    return res.json({ received: true });
  });
}
