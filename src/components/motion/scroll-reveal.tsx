"use client";

import type { FC, ReactNode } from "react";

import { motion } from "motion/react";
import type { Variants } from "motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

const revealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  className,
}) => (
  <motion.div
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);
