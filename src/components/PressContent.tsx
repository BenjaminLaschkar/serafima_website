"use client";

import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { press } from "@/data/press";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function PressContent() {
  const { lang } = useLang();
  const t = pageText.press[lang];

  return (
    <>
      <section className="pt-32 md:pt-44 pb-16 bg-ink">
        <div className="container-edge">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-4 mb-8">
              <span className="rule" /> {t.eyebrow}
            </p>
            <h1 className="font-display font-light text-display-lg text-balance max-w-4xl">
              {t.heading} <em className="italic text-champagne">{t.heading_em}</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <ul className="space-y-16 md:space-y-24">
            {press.map((p, i) => (
              <Reveal key={i} className="border-t border-ivory/10 pt-10">
                <li>
                  <span className="text-champagne font-display text-6xl leading-none align-top">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-ivory text-balance">
                    {p.quote}
                  </blockquote>
                  <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-ultra">
                    <div className="flex flex-col gap-1">
                      <span className="text-ivory/80">{p.author}</span>
                      <span className="text-ivory/50">
                        {p.source}
                        {p.date ? ` · ${p.date}` : ""}
                      </span>
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-champagne link-underline"
                      >
                        {t.read_article}
                      </a>
                    )}
                  </footer>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-24 border-t border-ivory/10">
        <div className="container-edge grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <SectionTitle eyebrow={t.kit_eyebrow} title={<>{t.kit_title}</>} />
            <p className="mt-8 max-w-2xl text-ivory/70 leading-relaxed">{t.kit_desc}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/media/press-kit.zip" download className="inline-flex btn-gold">
                {t.download}
                <span aria-hidden>↓</span>
              </a>
              <a href="/contact" className="inline-flex btn-ghost">
                {t.custom}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
