"use client";

import type { FC, ReactNode } from "react";

import { motion } from "motion/react";
import type { Variants } from "motion";

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const StaggerItem: FC<StaggerItemProps> = ({ children, className }) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
