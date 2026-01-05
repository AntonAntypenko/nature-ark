"use client";

import { useState } from "react";

import type { ImageProps } from "next/image";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui";

export const SmartImage = ({
  src,
  alt,
  fill,
  className,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", fill && "h-full w-full")}>
      {isLoading && (
        <Skeleton className={cn("absolute inset-0 z-10", className)} />
      )}

      <Image
        {...props}
        src={src}
        alt={alt}
        fill={fill}
        className={cn(
          className,
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
