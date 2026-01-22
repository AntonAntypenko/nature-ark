"use client";

import type { FC, ReactNode } from "react";

import { StaggerItem, ScrollReveal } from "./";

type MotionAdaptiveProps = {
  isMobile: boolean;
  children: ReactNode;
  className?: string;
};

export const MotionAdaptive: FC<MotionAdaptiveProps> = ({
  isMobile,
  children,
  className,
}) => {
  if (isMobile) {
    return <ScrollReveal className={className}>{children}</ScrollReveal>;
  }

  return <StaggerItem className={className}>{children}</StaggerItem>;
};
