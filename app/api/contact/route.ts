import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_LIMITS } from "@/lib/data/contact";

const ContactSchema = z.object({
  name:    z.string().trim().min(1).max(CONTACT_LIMITS.name.max),
  email:   z.string().trim().email(),
  message: z.string().trim().min(1).max(CONTACT_LIMITS.message.max),
});

const requestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Prune stale entries on each call to prevent unbounded Map growth
  for (const [key, entry] of requestLog) {
    if (now > entry.resetAt) requestLog.delete(key);
  }

  const entry = requestLog.get(ip);
  if (!entry) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  // Check API key first: no key → fallback mailto, no rate limit consumed
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }

  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { name, email, message } = result.data;

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@julienlange.dev>",
    to: "julienlange.dev@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Message de ${name}`,
    text: `De : ${name} <${email}>\n\n${message}`,
    html: `<p><strong>De :</strong> ${escapeHtml(name)} &lt;${email}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
