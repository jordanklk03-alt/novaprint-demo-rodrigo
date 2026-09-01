import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(user: TrpcContext["user"]): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const customer = {
  id: 12,
  openId: "customer-user",
  email: "customer@example.com",
  name: "Cliente Demo",
  loginMethod: "email",
  role: "user" as const,
  stripeCustomerId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("customer account", () => {
  it("rejects anonymous profile access", async () => {
    const caller = appRouter.createCaller(createContext(null));
    await expect(caller.customer.me()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("keeps customer data scoped to the authenticated user", async () => {
    const caller = appRouter.createCaller(createContext(customer));
    const result = await caller.customer.me();
    expect(result.user.id).toBe(customer.id);
    expect(result.user.email).toBe(customer.email);
  });
});
