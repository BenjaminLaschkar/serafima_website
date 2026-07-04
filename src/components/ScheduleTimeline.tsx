"use client";

import { useState } from "react";
import { events as staticEvents, type Event } from "@/data/schedule";
import { ui } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";
import type { Locale } from "@/lib/i18n";

type UiStrings = (typeof ui)[Locale];

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

const PAST_INITIAL = 3;

function EventRow({ e, locale, t, dimmed }: { e: Event; locale: string; t: UiStrings; dimmed?: boolean }) {
  const isPast = new Date(e.date) < new Date();
  return (
    <li
      key={`${e.date}-${e.title}`}
      className={`group border-b border-ivory/10 py-10 md:py-14 grid grid-cols-12 gap-6 items-start transition-colors duration-500 ${
        dimmed
          ? "opacity-40 hover:opacity-60"
          : "hover:bg-ivory/[0.02]"
      }`}
    >
      <div className="col-span-12 md:col-span-3">
        <div className="flex md:flex-col items-baseline md:items-start gap-3">
          <span className={`font-display text-5xl md:text-6xl leading-none ${dimmed ? "text-ivory/70" : "text-ivory"}`}>
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
        <h3 className={`font-display text-3xl md:text-4xl text-balance ${dimmed ? "text-ivory/70" : "text-ivory"}`}>
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
        {isPast ? (
          <span className="text-[11px] uppercase tracking-ultra text-ivory/40">
            {fmt(e.date, locale)}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export function ScheduleTimeline({ limit, events: propEvents }: { limit?: number; events?: Event[] }) {
  const { lang } = useLang();
  const t = ui[lang];
  const locale = localeMap[lang];
  const events = propEvents ?? staticEvents;
  const [showAllPast, setShowAllPast] = useState(false);

  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // plus récent en premier

  // Mode homepage (limit) : seulement les à venir
  if (limit) {
    const list = upcoming.slice(0, limit);
    return (
      <ol className="border-t border-ivory/10">
        {list.map((e) => <EventRow key={`${e.date}-${e.title}`} e={e} locale={locale} t={t} />)}
        {list.length === 0 && (
          <li className="py-20 text-center italic text-ivory/50">{t.noEvents}</li>
        )}
      </ol>
    );
  }

  const visiblePast = showAllPast ? past : past.slice(0, PAST_INITIAL);
  const hiddenPastCount = past.length - PAST_INITIAL;

  return (
    <div>
      {/* Événements à venir */}
      <ol className="border-t border-ivory/10">
        {upcoming.map((e) => (
          <EventRow key={`${e.date}-${e.title}`} e={e} locale={locale} t={t} />
        ))}
        {upcoming.length === 0 && (
          <li className="py-20 text-center italic text-ivory/50">{t.noEvents}</li>
        )}
      </ol>

      {/* Séparateur */}
      {past.length > 0 && (
        <div className="flex items-center gap-6 mt-16 mb-12">
          <div className="flex-1 h-px bg-ivory/10" />
          <p className="eyebrow opacity-50">Dates passées</p>
          <div className="flex-1 h-px bg-ivory/10" />
        </div>
      )}

      {/* Événements passés */}
      {past.length > 0 && (
        <div>
          <ol className="border-t border-ivory/10">
            {visiblePast.map((e) => (
              <EventRow key={`${e.date}-${e.title}`} e={e} locale={locale} t={t} dimmed />
            ))}
          </ol>
          {!showAllPast && hiddenPastCount > 0 && (
            <button
              onClick={() => setShowAllPast(true)}
              className="mt-6 text-[11px] uppercase tracking-ultra text-ivory/40 hover:text-ivory/60 transition-colors duration-500 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-ivory/20" />
              Voir {hiddenPastCount} date{hiddenPastCount > 1 ? "s" : ""} supplémentaire{hiddenPastCount > 1 ? "s" : ""}
              <span>↓</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
