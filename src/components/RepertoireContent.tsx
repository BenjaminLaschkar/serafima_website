"use client";

import { Reveal } from "@/components/Reveal";
import { RepertoireTable } from "@/components/RepertoireTable";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function RepertoireContent() {
  const { lang } = useLang();
  const t = pageText.repertoire[lang];

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
          <RepertoireTable />
        </div>
      </section>
    </>
  );
}
