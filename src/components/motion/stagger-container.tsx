"use client";

import type { FC, ReactNode } from "react";

import { motion } from "motion/react";
import type { Variants } from "motion";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const StaggerContainer: FC<StaggerContainerProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
