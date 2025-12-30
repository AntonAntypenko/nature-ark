"use client";

import { useState } from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui";

export const SmartImage = ({
  src,
  alt,
  className,
  fill,
  ...props
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Skeleton className={cn(className, fill && "h-full w-full")} />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        className={cn(className)}
        fill={true}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  );
};
