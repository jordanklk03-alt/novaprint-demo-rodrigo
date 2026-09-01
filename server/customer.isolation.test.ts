import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const dbMocks = vi.hoisted(() => ({
  getCustomerProfile: vi.fn(),
  getOrdersForUser: vi.fn(),
  upsertCustomerProfile: vi.fn(),
}));

const stripeMocks = vi.hoisted(() => ({
  listSavedPaymentMethods: vi.fn(),
}));

vi.mock("./db", () => ({
  getCustomerProfile: dbMocks.getCustomerProfile,
  getOrdersForUser: dbMocks.getOrdersForUser,
  upsertCustomerProfile: dbMocks.upsertCustomerProfile,
  createOrder: vi.fn(),
}));

vi.mock("./stripe", () => ({
  catalog: { thermo: { name: "Termo Nova 500ml", unitAmount: 1995 }, shirt: { name: "Camiseta Nova Classic", unitAmount: 2495 }, hoodie: { name: "Sudadera Nova Premium", unitAmount: 3995 } },
  createCheckoutSession: vi.fn(),
  listSavedPaymentMethods: stripeMocks.listSavedPaymentMethods,
}));

function contextFor(id: number): TrpcContext {
  return {
    user: { id, openId: `user-${id}`, email: `user${id}@example.com`, name: `User ${id}`, loginMethod: "oauth", role: "user", stripeCustomerId: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("customer data isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dbMocks.getCustomerProfile.mockResolvedValue(undefined);
    dbMocks.getOrdersForUser.mockResolvedValue([]);
    dbMocks.upsertCustomerProfile.mockResolvedValue(undefined);
    stripeMocks.listSavedPaymentMethods.mockResolvedValue([]);
  });

  it("scopes profile and orders to the current user id", async () => {
    const callerA = appRouter.createCaller(contextFor(101));
    const callerB = appRouter.createCaller(contextFor(202));

    await callerA.customer.me();
    await callerB.customer.me();
    await callerA.customer.orders();
    await callerB.customer.orders();

    expect(dbMocks.getCustomerProfile).toHaveBeenNthCalledWith(1, 101);
    expect(dbMocks.getCustomerProfile).toHaveBeenNthCalledWith(2, 202);
    expect(dbMocks.getOrdersForUser).toHaveBeenNthCalledWith(1, 101);
    expect(dbMocks.getOrdersForUser).toHaveBeenNthCalledWith(2, 202);
  });

  it("scopes saved payment methods and profile writes to the current user", async () => {
    const caller = appRouter.createCaller(contextFor(303));
    await caller.customer.paymentMethods();
    await caller.customer.saveProfile({ displayName: "Cliente 303", contactEmail: "cliente303@example.com" });

    expect(stripeMocks.listSavedPaymentMethods).toHaveBeenCalledWith(expect.objectContaining({ id: 303 }));
    expect(dbMocks.upsertCustomerProfile).toHaveBeenCalledWith(303, expect.objectContaining({ displayName: "Cliente 303" }));
  });
});
