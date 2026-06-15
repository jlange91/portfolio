import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const stringRequired = (label: string) => z.string({ error: () => `${label} est requis` }).trim();

const ContactSchema = z.object({
  name: stringRequired("Le nom").min(1, "Le nom est requis").max(100),
  email: stringRequired("L'email").email("Adresse email invalide"),
  message: stringRequired("Le message")
    .min(1, "Le message est requis")
    .max(5000, "Message trop long (max 5000 caractères)"),
});

// In-memory rate limiter — best-effort in serverless (resets on cold start)
const requestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(ip);

  if (!entry || now > entry.resetAt) {
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
  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Données invalides";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { name, email, message } = result.data;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@julienlange.dev>",
    to: "julienlange.dev@gmail.com",
    replyTo: email,
    subject: `[Portfolio] Message de ${name}`,
    text: `De : ${name} <${email}>\n\n${message}`,
    html: `<p><strong>De :</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou contactez par email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
