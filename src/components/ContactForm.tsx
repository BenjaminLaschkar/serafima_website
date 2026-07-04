"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";
import { ui, pageText } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export function ContactForm() {
  const { lang } = useLang();
  const t = ui[lang];
  const c = pageText.contact[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setCaptchaError(false);
  }, []);

  useEffect(() => { refreshCaptcha(); }, [refreshCaptcha]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setCaptchaError(true);
      refreshCaptcha();
      return;
    }
    setStatus("loading");
    setCaptchaError(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }
      setStatus("success");
      setMessage(t.successMsg);
      form.reset();
      refreshCaptcha();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur inconnue.");
      refreshCaptcha();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <Field label={c.field_name} name="name" required />
        <Field label={c.field_email} name="email" type="email" required />
      </div>
      <Field label={c.field_subject} name="subject" />
      <Field label={c.field_message} name="message" as="textarea" rows={6} required />

      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Captcha antispam */}
      <div className="pt-4 border-t border-ivory/10 space-y-4">
        <p className="text-[11px] uppercase tracking-ultra text-ivory/50">{t.captchaLabel}</p>
        <div className="flex items-center gap-6">
          <span className="font-display text-2xl text-ivory select-none">
            {captcha.a} + {captcha.b} = ?
          </span>
          <input
            type="number"
            value={captchaInput}
            onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
            required
            min={0}
            max={20}
            aria-label={t.captchaLabel}
            className="w-20 bg-transparent border-b border-ivory/20 focus:border-champagne pb-2 text-ivory text-center text-xl focus:outline-none transition-colors duration-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={refreshCaptcha}
            aria-label="Nouvelle question"
            className="text-ivory/40 hover:text-champagne transition-colors duration-500 text-xl leading-none"
          >
            ↺
          </button>
        </div>
        {captchaError && <p className="text-red-300 text-sm">{t.captchaError}</p>}
      </div>

      <div className="flex items-center justify-end gap-6 pt-2">
        {(status === "loading" || status === "success" || status === "error") && (
          <p aria-live="polite" className={[
            "text-sm",
            status === "success" && "text-champagne",
            status === "error" && "text-red-300",
            status === "loading" && "text-ivory/60",
          ].filter(Boolean).join(" ")}>
            {status === "loading" && t.sending}
            {(status === "success" || status === "error") && message}
          </p>
        )}
        <button type="submit" disabled={status === "loading"} className="btn-gold disabled:opacity-50">
          {t.send}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
};

function Field({ label, name, type = "text", required, as = "input", rows }: FieldProps) {
  const common =
    "peer w-full bg-transparent border-b border-ivory/20 focus:border-champagne pt-7 pb-3 text-ivory placeholder:text-transparent focus:outline-none transition-colors duration-500";
  return (
    <label className="block relative">
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={rows} placeholder={label} className={common + " resize-none"} />
      ) : (
        <input type={type} name={name} required={required} placeholder={label} className={common} />
      )}
      <span className="pointer-events-none absolute left-0 top-3 text-[11px] uppercase tracking-ultra text-ivory/50 transition-all duration-500 peer-placeholder-shown:top-7 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ivory/40 peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-ultra peer-focus:text-champagne">
        {label}
      </span>
    </label>
  );
}
