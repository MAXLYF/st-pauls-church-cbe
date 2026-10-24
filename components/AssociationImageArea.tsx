"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface AssociationImageAreaProps {
  src?: string;
  alt: string;
  imageType?: "photo" | "logo";
  size?: "main" | "sub";
}

export function AssociationImageArea({
  src,
  alt,
  imageType = "photo",
  size = "main"
}: AssociationImageAreaProps) {
  const [hasError, setHasError] = useState(false);

  const isMain = size === "main";
  const showImage = Boolean(src && !hasError);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border transition-all ${
        showImage
          ? isMain
            ? "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-[#d4af37]/60 shadow-xs bg-slate-100"
            : "h-14 w-14 sm:h-16 sm:w-16 border-[#d4af37]/60 shadow-xs bg-slate-100"
          : isMain
          ? "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 bg-[#faf7f0] border-dashed border-[#d4af37]/55 shadow-xs"
          : "h-14 w-14 sm:h-16 sm:w-16 bg-[#faf7f0] border-dashed border-[#d4af37]/45 shadow-xs"
      }`}
      aria-label={showImage ? alt : "Image placeholder: Image will be added soon"}
    >
      {showImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isMain ? "(max-width: 640px) 80px, 112px" : "64px"}
          className={`transition-transform duration-300 group-hover:scale-105 ${
            imageType === "logo" ? "object-contain p-2" : "object-cover object-center"
          }`}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-1 sm:p-2 text-center select-none bg-gradient-to-b from-[#fdfbf7] to-[#f5eedf]/60">
          <div
            className={`flex items-center justify-center rounded-lg bg-[#80142b]/8 text-[#80142b] ${
              isMain ? "h-6 w-6 sm:h-8 sm:w-8 mb-1" : "h-5 w-5 sm:h-5 sm:w-5 mb-0.5"
            }`}
          >
            <ImageIcon
              className={
                isMain
                  ? "h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-[#80142b]"
                  : "h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#80142b]"
              }
            />
          </div>
          <span
            className={`font-semibold text-slate-500 leading-tight text-center ${
              isMain
                ? "text-[8.5px] sm:text-[9.5px] md:text-[10px] max-w-[76px] sm:max-w-[95px]"
                : "text-[7px] sm:text-[8px] max-w-[52px] sm:max-w-[58px]"
            }`}
          >
            Image will be added soon
          </span>
        </div>
      )}
    </div>
  );
}
