import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(10).max(5000),
  company: z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "serafimaliberman@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL ?? "contact@serafima-liberman.com";

    if (!apiKey) {
      // Dev fallback — log only
      console.warn("[contact] RESEND_API_KEY missing — message NOT sent:", data);
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);
    const { data: sent, error: sendError } = await resend.emails.send({
      from: `Serafima Liberman — Site <${from}>`,
      to: [to],
      replyTo: data.email,
      subject: data.subject ? `[Site] ${data.subject}` : `[Site] Nouveau message de ${data.name}`,
      text: `De : ${data.name} <${data.email}>\n\n${data.message}`,
    });

    if (sendError) {
      console.error("[contact] Resend error:", sendError);
      return NextResponse.json({ ok: false, error: sendError.message }, { status: 400 });
    }

    console.log("[contact] Email sent:", sent?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
