"use client";

import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function ContactContent() {
  const { lang } = useLang();
  const t = pageText.contact[lang];

  return (
    <section className="pt-32 md:pt-44 pb-24 md:pb-40 bg-ink">
      <div className="container-edge grid grid-cols-12 gap-8 md:gap-16">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-4 mb-8">
              <span className="rule" /> {t.eyebrow}
            </p>
            <h1 className="font-display font-light text-display-md text-balance">
              {t.heading_1}{" "}
              <em className="italic text-champagne">{t.heading_em}</em>{" "}
              {t.heading_2}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 space-y-8">
              <div>
                <p className="eyebrow mb-2">{t.email_label}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-2xl text-ivory hover:text-champagne transition-colors duration-500 link-underline"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">{t.social_label}</p>
                <ul className="space-y-2 text-ivory/80">
                  <li>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.social.youtube}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-2">{t.location_label}</p>
                <p className="text-ivory/80">{t.location_value}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-7">
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
