"use client";

import React from "react";
import { ArrowUpRight, Images } from "lucide-react";

interface MediaCardProps {
  src: string;
  title: string;
  label?: string;
  subtitle?: string;
  description?: string;
  photoCount?: number;
  onExplore?: () => void;
  showExplore?: boolean;
}

export default function MediaCard({
  src,
  title,
  label = "Parish",
  subtitle,
  description,
  photoCount,
  onExplore,
  showExplore = false
}: MediaCardProps) {
  const isInteractive = Boolean(onExplore || showExplore);

  return (
    <article
      onClick={onExplore}
      role={onExplore ? "button" : undefined}
      tabIndex={onExplore ? 0 : undefined}
      onKeyDown={
        onExplore
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onExplore();
              }
            }
          : undefined
      }
      className={`group relative flex flex-col overflow-hidden rounded-[22px] border border-[#e7dec8]/90 bg-white shadow-[0_10px_30px_rgba(31,4,11,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c59b27]/65 hover:shadow-[0_24px_48px_rgba(31,4,11,0.14)] ${
        isInteractive ? "cursor-pointer" : ""
      }`}
    >
      {/* Subtle top gold hairline on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Photography Cover Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#190308]">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Editorial dark gradient vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140207]/75 via-[#140207]/15 to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-85" />

        {/* Category Eyebrow Pill (Top Left) */}
        <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#180308]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5d77f] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
          <span>{label}</span>
        </div>

        {/* Photo Count Badge (Top Right) */}
        {typeof photoCount === "number" && (
          <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#180308]/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md">
            <Images className="h-3.5 w-3.5 text-[#f5d77f]" />
            <span>
              {String(photoCount).padStart(2, "0")}{" "}
              {photoCount === 1 ? "Photo" : "Photos"}
            </span>
          </div>
        )}

        {/* Hover Editorial Prompt */}
        {isInteractive && (
          <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between text-white opacity-0 translate-y-1.5 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-xs font-medium tracking-wide text-[#f5d77f]">
              View Photography Portfolio
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#1b0308]/85 text-[#f5d77f] backdrop-blur-md">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#80142b]">
            <span>{subtitle || label}</span>
          </div>

          <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-[#1f040b] transition-colors duration-300 group-hover:text-[#80142b] sm:text-2xl">
            {title}
          </h3>

          {description && (
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#6b5c5f] line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {isInteractive && (
          <div className="mt-5 flex items-center justify-between border-t border-[#ece3d0] pt-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#80142b] transition-colors group-hover:text-[#1f040b]">
              Explore Collection
            </span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#faf7f2] text-[#80142b] transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-[#80142b] group-hover:bg-[#80142b] group-hover:text-[#f5d77f]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
