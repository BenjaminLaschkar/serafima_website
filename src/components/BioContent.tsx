"use client";

import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { bioLong, timeline } from "@/data/bio";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function BioContent() {
  const { lang } = useLang();
  const t = pageText.bio[lang];
  const paragraphs = bioLong[lang];

  return (
    <>
      <section className="pt-32 md:pt-44 pb-16 bg-ink">
        <div className="container-edge grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-4 mb-8">
                <span className="rule" /> {t.eyebrow}
              </p>
              <h1 className="font-display font-light text-display-lg text-balance">
                {t.heading} <em className="italic text-champagne">{t.heading_em}</em>
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink pb-24">
        <div className="container-edge grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <ParallaxImage
              src="/media/serafima-liberman-22.jpeg"
              alt="Serafima Liberman — portrait"
              className="aspect-[3/4]"
              sizes="(min-width: 768px) 42vw, 100vw"
            />
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="space-y-8 text-ivory/80 font-serif text-lg md:text-xl leading-relaxed text-pretty">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 md:py-32 border-t border-ivory/10">
        <div className="container-edge">
          <SectionTitle eyebrow={t.path_eyebrow} title={t.path_title} />
          <ol className="mt-16 border-t border-ivory/10">
            {timeline.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-6 py-8 border-b border-ivory/10 items-baseline"
              >
                <span className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-ultra text-champagne/80">
                  {item.year}
                </span>
                <span className="col-span-12 md:col-span-5 font-display text-2xl md:text-3xl">
                  {item.title}
                </span>
                <span className="col-span-12 md:col-span-4 italic text-ivory/70">
                  {item.subtitle[lang]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
