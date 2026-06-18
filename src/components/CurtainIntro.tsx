"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CurtainIntro() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[80] pointer-events-none origin-top bg-ink"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
    />
  );
}
