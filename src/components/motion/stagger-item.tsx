"use client";

import type { FC, ReactNode } from "react";

import { motion } from "motion/react";
import type { Variants } from "motion";

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const StaggerItem: FC<StaggerItemProps> = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div variants={itemVariants} className={className}>
    {children}
  </motion.div>
);
