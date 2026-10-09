import { afterEach, describe, expect, it, vi } from "vitest";

const { connectMock } = vi.hoisted(() => ({
  connectMock: vi.fn(),
}));

vi.mock("mongoose", () => ({
  default: {
    connect: connectMock,
  },
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  connectMock.mockReset();
  Reflect.deleteProperty(globalThis, "mongooseCache");
});

describe("Mongo connection configuration", () => {
  it("can be imported without MONGO_URI", async () => {
    vi.stubEnv("MONGO_URI", "");

    await expect(import("@/lib/mongo")).resolves.toBeDefined();
    expect(connectMock).not.toHaveBeenCalled();
  });

  it("fails explicitly before connecting when MONGO_URI is missing", async () => {
    vi.stubEnv("MONGO_URI", "");
    const { default: dbConnect } = await import("@/lib/mongo");

    await expect(dbConnect()).rejects.toThrow(
      "Please define the MONGO_URI environment variable",
    );
    expect(connectMock).not.toHaveBeenCalled();
  });
});
