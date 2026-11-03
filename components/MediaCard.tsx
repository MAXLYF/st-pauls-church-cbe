"use client";

import React from "react";
import { ArrowRight, Images, Sparkles } from "lucide-react";

interface MediaCardProps {
  src: string;
  title: string;
  label?: string;
  subtitle?: string;
  photoCount?: number;
  onExplore?: () => void;
  showExplore?: boolean;
}

export default function MediaCard({
  src,
  title,
  label = "Parish",
  subtitle,
  photoCount,
  onExplore,
  showExplore = false
}: MediaCardProps) {
  const isInteractive = Boolean(onExplore || showExplore);

  return (
    <div
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/60 hover:shadow-[0_18px_40px_rgba(31,4,11,0.12)] ${
        isInteractive ? "cursor-pointer" : ""
      }`}
    >
      {/* Top golden accent line on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1b0308]">
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140207]/65 via-[#140207]/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Photo count badge */}
        {typeof photoCount === "number" && (
          <div className="absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/45 bg-[#1b0308]/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f5d77f] backdrop-blur-md shadow-sm">
            <Images className="h-3.5 w-3.5 text-[#f5d77f]" />
            <span>
              {photoCount} {photoCount === 1 ? "Photo" : "Photos"}
            </span>
          </div>
        )}

        {/* Subtle corner sparkle badge on hover */}
        {isInteractive && (
          <div className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
            <Sparkles className="h-3 w-3 text-[#f5d77f]" />
            <span>Click to view album</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-[.18em] text-[#80142b]">
            {label}
          </div>
          <h3 className="mt-2 text-lg font-bold text-[#1f040b] transition-colors duration-300 group-hover:text-[#80142b]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>

        {isInteractive && (
          <div className="mt-4 pt-3.5 border-t border-[#e8dfcb]/70">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExplore?.();
              }}
              aria-label={`Explore ${title} gallery`}
              className="inline-flex w-full items-center justify-between rounded-xl border border-[#d4af37]/40 bg-gradient-to-r from-[#80142b] via-[#941933] to-[#6a0f21] px-4 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-[0_6px_18px_rgba(128,20,43,0.22)] transition-all duration-300 hover:border-[#f5d77f] hover:from-[#9e1c36] hover:via-[#80142b] hover:to-[#560b1a] hover:shadow-[0_10px_24px_rgba(128,20,43,0.32)] focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50"
            >
              <span className="flex items-center gap-2">
                <span>Explore</span>
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-[#f5d77f] transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[#f5d77f] group-hover:text-[#1f040b]">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
