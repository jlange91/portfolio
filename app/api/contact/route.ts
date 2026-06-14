import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ fallback: true }, { status: 200 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await req.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message trop long (max 5000 caractères)" }, { status: 400 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@julien-lange.dev>",
    to: "langejulien.pro@gmail.com",
    replyTo: email.trim(),
    subject: `[Portfolio] Message de ${name.trim()}`,
    text: `De : ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
    html: `<p><strong>De :</strong> ${name.trim()} &lt;${email.trim()}&gt;</p><p>${message.trim().replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou contactez par email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
