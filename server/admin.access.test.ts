import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "email",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin.me", () => {
  it("allows users with the admin role", async () => {
    const caller = appRouter.createCaller(createContext("admin"));
    await expect(caller.admin.me()).resolves.toEqual({ id: 1, role: "admin" });
  });

  it("rejects authenticated users without the admin role", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.admin.me()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
