"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Marquee } from "@/components/Marquee";
import { ParallaxImage } from "@/components/ParallaxImage";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { bioShort } from "@/data/bio";
import { featuredVideo, institutions } from "@/data/media";
import { pageText, ui } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";
import type { Event } from "@/data/schedule";

export function HomeContent({ events }: { events: Event[] }) {
  const { lang } = useLang();
  const t = pageText.home[lang];
  const u = ui[lang];
  const bio = bioShort[lang];

  return (
    <>
      {/* INTRO ÉMOTIONNELLE */}
      <section className="relative bg-ink py-32 md:py-48">
        <div className="container-edge grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-4">
                <span className="rule" /> {t.eyebrow_intro}
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal delay={0.1}>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-ivory text-balance">
                {t.tagline} <em className="italic text-champagne">{t.tagline_em}</em>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-2xl text-ivory/70 leading-relaxed text-pretty">
                {bio}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/bio"
                className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-ultra text-champagne link-underline"
              >
                {t.read_bio} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PORTRAIT DIPTYQUE */}
      <section className="relative bg-ink">
        <div className="container-edge grid grid-cols-12 gap-4 md:gap-8">
          <Reveal className="col-span-12 md:col-span-7">
            <ParallaxImage
              src="/media/serafima-liberman-25.jpeg"
              alt="Serafima Liberman — portrait éditorial"
              className="aspect-[4/5] md:aspect-[3/4]"
              sizes="(min-width: 768px) 58vw, 100vw"
              objectPosition="left center"
            />
          </Reveal>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-end pb-12 md:pb-24">
            <Reveal delay={0.15}>
              <p className="eyebrow mb-6">{t.portrait_eyebrow}</p>
              <p className="font-display text-3xl md:text-4xl leading-[1.2] text-balance">
                «&#160;{t.portrait_quote_start}{" "}
                <em className="italic text-champagne">{t.portrait_quote_em}</em>&#160;»
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE — RÉPERTOIRE */}
      <section className="relative bg-ink py-32 md:py-40 overflow-hidden">
        <div className="container-edge mb-16">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-4">
              <span className="rule" /> {t.eyebrow_repertoire}
            </p>
          </Reveal>
        </div>
        <Marquee
          items={[
            { label: "Haendel" },
            { label: "Mozart" },
            { label: "Bellini" },
            { label: "Puccini" },
            { label: "Donizetti" },
            { label: "Massenet" },
            { label: "Tchaïkovski" },
            { label: "Rimski-Korsakov" },
            { label: "Rachmaninov" },
          ]}
        />
        <div className="container-edge mt-16 flex justify-end">
          <Link href="/repertoire" className="btn-ghost">
            {t.all_repertoire}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* MEDIA — VIDÉO FEATURED */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="container-edge">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 md:col-span-5">
              <SectionTitle
                eyebrow={t.eyebrow_media}
                title={
                  <>
                    Adieu, notre <em className="italic text-champagne">petite table</em>
                  </>
                }
              />
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
              <p className="text-ivory/70 leading-relaxed">
                {t.media_desc} <span className="text-champagne">{t.media_role}</span>
              </p>
            </div>
          </div>
          <Reveal>
            <VideoPlayer
              poster={featuredVideo.poster ?? "/media/serafima-liberman-7.jpg"}
              src={featuredVideo.local ?? ""}
              title={`${featuredVideo.composer} — ${featuredVideo.work}${featuredVideo.role ? ` · ${featuredVideo.role}` : ""}`}
            />
          </Reveal>
          <div className="mt-10 flex justify-end">
            <Link href="/media" className="btn-ghost">
              {t.full_gallery}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SCHEDULE — PROCHAINES DATES */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="container-edge">
          <div className="grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-12 md:col-span-6">
              <SectionTitle eyebrow={t.eyebrow_schedule} title={<>{t.schedule_title}</>} />
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10 self-end text-right">
              <Link
                href="/schedule"
                className="text-[11px] uppercase tracking-ultra link-underline text-champagne"
              >
                {u.fullCalendar}
              </Link>
            </div>
          </div>
          <ScheduleTimeline limit={3} events={events} />
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section className="relative bg-ink py-24 md:py-32 border-t border-ivory/10">
        <div className="container-edge">
          <Reveal>
            <p className="eyebrow mb-12">{t.eyebrow_institutions}</p>
          </Reveal>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 items-center justify-items-center">
            {institutions.map((inst, i) => (
              <Reveal key={inst.name} delay={i * 0.05} className="flex items-center justify-center">
                <a
                  href={inst.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                >
                  <Image
                    src={inst.logo}
                    alt={inst.name}
                    width={140}
                    height={70}
                    className="object-contain max-h-16 w-auto"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section className="relative bg-ink py-32 md:py-48 border-t border-ivory/10">
        <div className="container-edge text-center">
          <Reveal>
            <p className="eyebrow mb-8">{t.cta_eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-light text-display-lg text-ivory text-balance">
              {t.cta_title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className="mt-12 inline-flex btn-gold">
              {t.cta_button}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
