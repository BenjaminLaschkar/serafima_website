"use client";

import { events as staticEvents, type Event } from "@/data/schedule";
import { ui } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";
import type { Locale } from "@/lib/i18n";

const localeMap: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ru: "ru-RU",
};

const fmt = (iso: string, locale: string) =>
  new Date(iso).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const fmtTime = (iso: string, locale: string) =>
  new Date(iso).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

export function ScheduleTimeline({ limit, events: propEvents }: { limit?: number; events?: Event[] }) {
  const { lang } = useLang();
  const t = ui[lang];
  const locale = localeMap[lang];
  const events = propEvents ?? staticEvents;
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());
  const list = (limit ? [...upcoming].slice(0, limit) : [...upcoming, ...past]) as Event[];

  return (
    <ol className="border-t border-ivory/10">
      {list.map((e, i) => {
        const isPast = new Date(e.date) < new Date();
        return (
          <li
            key={`${e.date}-${e.title}`}
            className="group border-b border-ivory/10 py-10 md:py-14 grid grid-cols-12 gap-6 items-start hover:bg-ivory/[0.02] transition-colors duration-500"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="flex md:flex-col items-baseline md:items-start gap-3">
                <span className="font-display text-5xl md:text-6xl text-ivory leading-none">
                  {new Date(e.date).toLocaleDateString(locale, { day: "2-digit" })}
                </span>
                <span className="text-[11px] uppercase tracking-ultra text-champagne/80">
                  {new Date(e.date).toLocaleDateString(locale, { month: "long", year: "numeric" })}
                </span>
              </div>
              <span className="mt-3 inline-block text-xs text-ivory/50">{fmtTime(e.date, locale)}</span>
            </div>

            <div className="col-span-12 md:col-span-6">
              <p className="eyebrow mb-3">{isPast ? t.past : (e.status ?? t.upcoming)}</p>
              <h3 className="font-display text-3xl md:text-4xl text-ivory text-balance">
                {e.title}
              </h3>
              {e.programme && (
                <p className="mt-3 text-ivory/70 italic">{e.programme}</p>
              )}
              <p className="mt-4 text-sm text-ivory/60">
                {e.venue} — {e.city}, {e.country}
              </p>
            </div>

            <div className="col-span-12 md:col-span-3 md:text-right">
              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost"
                >
                  {t.ticketing}
                  <span aria-hidden>→</span>
                </a>
              ) : isPast ? (
                <span className="text-[11px] uppercase tracking-ultra text-ivory/40">
                  {fmt(e.date, locale)}
                </span>
              ) : null}
            </div>
          </li>
        );
      })}
      {list.length === 0 && (
        <li className="py-20 text-center italic text-ivory/50">{t.noEvents}</li>
      )}
    </ol>
  );
}
