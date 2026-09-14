"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pastor } from "@/types";

interface PastorTimelineCardProps {
  pastor: Pastor;
  isActive?: boolean;
  onClick?: () => void;
  index: number;
}

export default function PastorTimelineCard({
  pastor,
  isActive,
  onClick,
  index
}: PastorTimelineCardProps) {
  const [imgError, setImgError] = useState(false);

  // Extract initials (e.g. Fr. Arockiasamy -> AS or A, Fr. B. Ephrem -> BE)
  const getInitials = (name: string) => {
    const parts = name.replace(/^Fr\.\s*/i, "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "SP";
  };

  const initials = getInitials(pastor.name);

  return (
    <div
      id={`pastor-${pastor.id}`}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (onClick) onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      aria-label={`${pastor.name}, ${pastor.displayPeriod}, ${pastor.role}`}
      className={`group relative w-full cursor-pointer rounded-2xl bg-white p-5 md:p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b18a3d] focus:ring-offset-2 ${
        isActive
          ? "border-2 border-[#b18a3d] shadow-xl ring-4 ring-[#b18a3d]/10 -translate-y-1 bg-[#fffdfa]"
          : "border border-[#e7dec8]/60 shadow-sm hover:border-[#b18a3d]/60 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Top Accent Ribbon for Active state */}
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#10233f] px-3 py-0.5 text-[11px] font-semibold tracking-wider text-[#d8bb73] shadow-sm uppercase border border-[#b18a3d]/30">
          Selected
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        {/* Photo or Initials Portrait Frame */}
        <div
          className={`relative mb-4 h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-2xl p-1 transition-transform duration-300 ${
            isActive
              ? "scale-105 bg-gradient-to-br from-[#d8bb73] via-[#b18a3d] to-[#10233f] shadow-md"
              : "bg-[#f2eee5] group-hover:scale-102 border border-[#d8bb73]/40"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#10233f] flex items-center justify-center">
            {!imgError && pastor.image ? (
              <Image
                src={pastor.image}
                alt={pastor.name}
                fill
                sizes="(max-width: 768px) 112px, 128px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Respectful Catholic clerical placeholder with initials and cross motif */
              <div className="flex flex-col items-center justify-center p-2 text-white select-none">
                <svg
                  className="mb-1 h-5 w-5 text-[#d8bb73]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M11 2v6H5v2h6v12h2V10h6V8h-6V2h-2z" />
                </svg>
                <span className="font-serif text-xl font-bold tracking-wider text-[#d8bb73]">
                  {initials}
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-widest text-slate-300">
                  Priest
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Priest Name */}
        <h3 className="text-lg md:text-xl font-bold text-[#10233f] group-hover:text-[#18365f] transition-colors">
          {pastor.name}
        </h3>

        {/* Years of Service badge */}
        <div
          className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors ${
            isActive
              ? "bg-[#10233f] text-[#d8bb73]"
              : "bg-[#f2eee5] text-[#10233f]/90 group-hover:bg-[#e8e2d4]"
          }`}
        >
          <svg
            className="h-3.5 w-3.5 text-[#b18a3d]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{pastor.displayPeriod}</span>
        </div>

        {/* Role */}
        <p className="mt-2 text-sm font-medium tracking-wide text-[#b18a3d]">
          {pastor.role}
        </p>

        {/* Sequence tag */}
        <div className="mt-3 text-[11px] font-semibold text-slate-400">
          Priest #{index + 1}
        </div>
      </div>
    </div>
  );
}
