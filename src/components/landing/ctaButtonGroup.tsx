import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui";

interface CtaButtonGroupProps {
  size?: "sm" | "lg";
  className?: string;
}

export const CtaButtonGroup: FC<CtaButtonGroupProps> = ({
  size = "lg",
  className,
}) => {
  return (
    <div className={`${className}`}>
      <Button size={size} className="cursor-pointer" asChild>
        <Link href="/dashboard">Розпочати</Link>
      </Button>
      <Button size={size} variant="outline" className="cursor-pointer" asChild>
        <a
          href="https://github.com/AntonAntypenko/nature-ark"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </Button>
    </div>
  );
};
