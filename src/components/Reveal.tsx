"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}>;

export function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className,
  delay = 0,
  as: As = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <As className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: reduce ? 0 : "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.045,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </As>
  );
}
