"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { RevealText } from "./Reveal";
import { useLang } from "@/contexts/LangContext";
import { ui } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const t = ui[lang];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/serafima-liberman-7.jpg"
        >
          <source src="/media/iolanta-arioso.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full container-edge flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-5xl">
          <motion.p
            className="text-[13px] md:text-[15px] uppercase tracking-ultra text-champagne/90 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
          >
            {t.heroEyebrow}
          </motion.p>

          <h1 className="font-display font-light text-display-xl text-ivory">
            <RevealText text="Serafima" delay={1.7} as="span" />
            <br />
            <span className="italic text-champagne">
              <RevealText text="Liberman" delay={1.9} as="span" />
            </span>
          </h1>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 2.3 }}
          >
            <Link href="/schedule" className="btn-gold">
              {t.heroCta1}
              <span aria-hidden>→</span>
            </Link>
            <Link href="/media" className="btn-ghost">
              {t.heroCta2}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom indicator */}
      <motion.div
        aria-hidden
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3 text-ivory/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-ultra">Scroll</span>
        <span className="block h-12 w-px bg-ivory/40 origin-top animate-[veil_2s_ease-in-out_infinite_alternate]" />
      </motion.div>
    </section>
  );
}
