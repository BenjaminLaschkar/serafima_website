"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { pageText, navTranslations } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";

export function Footer() {
  const { lang } = useLang();
  const t = pageText.footer[lang];
  return (
    <footer className="relative border-t border-ivory/10 bg-ink text-ivory">
      <div className="container-edge py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6">— Soprano</p>
          <p className="font-display text-4xl md:text-5xl leading-[1.05]">
            «&#160;{t.quote} <em className="italic text-champagne">{t.quote_em}</em>&#160;»
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow mb-6">{t.nav_label}</p>
          <ul className="space-y-3 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline text-ivory/80 hover:text-ivory">
                  {navTranslations[n.href]?.[lang] ?? n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow mb-6">{t.contact_label}</p>
          <a
            href={`mailto:${site.email}`}
            className="block font-display text-2xl text-ivory hover:text-champagne transition-colors duration-500"
          >
            {site.email}
          </a>
          <ul className="mt-8 space-y-2 text-sm text-ivory/70">
            <li>
              <a className="link-underline" href={site.social.instagram} target="_blank" rel="noreferrer noopener">
                Instagram
              </a>
            </li>
            <li>
              <a className="link-underline" href={site.social.youtube} target="_blank" rel="noreferrer noopener">
                YouTube
              </a>
            </li>
            <li>
              <a className="link-underline" href={site.social.facebook} target="_blank" rel="noreferrer noopener">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-edge py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-ultra text-ivory/40">
          <span>© {new Date().getFullYear()} Serafima Liberman — {t.rights}</span>
        </div>
      </div>
    </footer>
  );
}
