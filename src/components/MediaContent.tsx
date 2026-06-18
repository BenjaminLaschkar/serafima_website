"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { videos, gallery } from "@/data/media";
import { site } from "@/data/site";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function MediaContent() {
  const { lang } = useLang();
  const t = pageText.media[lang];
  const youtubeVideos = videos.filter((v) => v.youtubeId);

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

      {/* VIDÉOS YOUTUBE */}
      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <div className="flex items-end justify-between gap-8 mb-12">
            <SectionTitle eyebrow={t.videos_eyebrow} title={<>{t.videos_title}</>} />
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              {t.youtube_btn}
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {youtubeVideos.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06}>
                <article className="group flex flex-col gap-4">
                  <div className="relative aspect-[16/9] overflow-hidden bg-stage">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                      title={`${v.composer} — ${v.work}${v.role ? ` · ${v.role}` : ""}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl text-ivory leading-tight">{v.work}</p>
                    <p className="text-ivory/60 text-sm mt-1">
                      {v.composer}
                      {v.role ? ` · ${v.role}` : ""}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE PHOTOS */}
      <section className="bg-ink py-16 md:py-24 border-t border-ivory/10">
        <div className="container-edge">
          <SectionTitle eyebrow={t.gallery_eyebrow} title={<>{t.gallery_title}</>} />
          <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
            {gallery.map((img, i) => (
              <Reveal
                key={img.src}
                delay={(i % 6) * 0.04}
                className="mb-4 md:mb-6 break-inside-avoid"
              >
                <figure className="relative overflow-hidden bg-stage">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full object-cover transition-transform duration-1000 ease-velvet hover:scale-[1.03]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
