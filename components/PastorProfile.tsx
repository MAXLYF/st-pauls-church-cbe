"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pastor } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PastorProfileProps {
  pastor: Pastor;
  totalPastors: number;
  currentIndex: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function PastorProfile({
  pastor,
  totalPastors,
  currentIndex,
  onPrevious,
  onNext
}: PastorProfileProps) {
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
  const photoSrc = pastor.photo || pastor.photoUrl || pastor.image;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-[#e7dec8] p-6 sm:p-8 md:p-12 shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* LEFT COLUMN: Large Pastor Portrait */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl p-1.5 bg-gradient-to-br from-[#d8bb73] via-[#b18a3d] to-[#10233f] shadow-md">
            <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#10233f] flex items-center justify-center">
              {!imgError && photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={`${pastor.name} portrait`}
                  fill
                  priority
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Respectful clerical badge with Cross & Initials */
                <div className="flex flex-col items-center justify-center p-6 text-center text-white select-none">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#18365f] border border-[#d8bb73]/40 text-[#d8bb73]">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M11 2v6H5v2h6v12h2V10h6V8h-6V2h-2z" />
                    </svg>
                  </div>
                  <span className="font-serif text-3xl font-bold tracking-wider text-[#d8bb73]">
                    {initials}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-300">
                    Parish Priest
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sequence Badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#fbf8f1] px-3.5 py-1 text-xs font-semibold text-[#10233f] border border-[#e7dec8]">
            <span>Priest {currentIndex + 1} of {totalPastors}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Pastoral Ministry Details */}
        <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
          {/* Small Label */}
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            PASTORAL MINISTRY
          </div>

          {/* Pastor Name */}
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#10233f]">
            {pastor.name}
          </h2>

          {/* Service Period */}
          <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10233f] px-3.5 py-1 text-xs sm:text-sm font-bold text-[#d8bb73] border border-[#b18a3d]/30 shadow-xs">
              <svg
                className="h-3.5 w-3.5 text-[#d8bb73]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{pastor.displayPeriod}</span>
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {pastor.role || "Parish Priest"}
            </span>
          </div>

          {/* Gold Divider */}
          <div className="my-5 h-0.5 w-16 bg-[#d8bb73] rounded-full mx-auto md:mx-0" />

          {/* Description */}
          {pastor.description ? (
            <p className="text-sm md:text-base leading-relaxed text-slate-600">
              {pastor.description}
            </p>
          ) : (
            <p className="text-sm md:text-base leading-relaxed text-slate-600 italic">
              Faithfully guided the parishioners of St. Paul&apos;s Church Rathinapuri with pastoral leadership, celebration of the Holy Sacraments, and spiritual care.
            </p>
          )}

          {/* Previous / Next Pastor Controls */}
          <div className="mt-8 pt-6 border-t border-[#e7dec8] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous Pastor"
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                currentIndex === 0
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-[#f2eee5] text-[#10233f] hover:bg-[#10233f] hover:text-[#d8bb73]"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs font-semibold text-slate-400">
              {pastor.startYear}
            </div>

            <button
              type="button"
              onClick={onNext}
              disabled={currentIndex === totalPastors - 1}
              aria-label="Next Pastor"
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                currentIndex === totalPastors - 1
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-[#f2eee5] text-[#10233f] hover:bg-[#10233f] hover:text-[#d8bb73]"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
