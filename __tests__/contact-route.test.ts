import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock resend to avoid real network calls — must be registered before the route is imported
vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: vi.fn().mockResolvedValue({ error: null }),
    };
  },
}));

process.env.RESEND_API_KEY = "test-key";

function makeReq(body: unknown, ip = "127.0.0.1") {
  const { NextRequest } = require("next/server");
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns 400 when name is missing", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeReq({ email: "a@b.com", message: "Hello" }));
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error).toMatch(/requis|invalide/i);
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeReq({ name: "Jules", email: "not-an-email", message: "Hello" }));
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error).toMatch(/email/i);
  });

  it("returns 400 when message exceeds 5000 characters", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeReq({ name: "Jules", email: "a@b.com", message: "x".repeat(5001) }));
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error).toMatch(/trop long|5000/i);
  });

  it("returns 200 with valid payload", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(makeReq({ name: "Jules", email: "a@b.com", message: "Bonjour !" }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
  });

  it("trims whitespace from fields", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      makeReq({ name: "  Jules  ", email: " julien@example.com ", message: " Hello " })
    );
    expect(res.status).toBe(200);
  });

  it("returns 429 after exceeding the rate limit", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const uniqueIp = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1`;
    for (let i = 0; i < 5; i++) {
      await POST(makeReq({ name: "Jules", email: "a@b.com", message: "Hello" }, uniqueIp));
    }
    const res = await POST(
      makeReq({ name: "Jules", email: "a@b.com", message: "Hello" }, uniqueIp)
    );
    expect(res.status).toBe(429);
  });
});
