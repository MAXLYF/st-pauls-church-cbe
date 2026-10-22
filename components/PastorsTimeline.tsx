"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pastor } from "@/types";
import HistoricalPhoto from "./HistoricalPhoto";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";

interface PastorsTimelineProps {
  pastors: Pastor[];
}

function PriestTimelineEntry({
  pastor,
  index,
  total
}: {
  pastor: Pastor;
  index: number;
  total: number;
}) {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.replace(/^Fr\.\s*/i, "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "SP";
  };

  const initials = getInitials(pastor.name);
  const photoSrc = pastor.photo || pastor.photoUrl || pastor.image;

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="relative pl-11 sm:pl-16 md:pl-24 transition-all">
      {/* Connected Milestone Marker on the continuous Vertical Timeline Line */}
      <div
        aria-hidden="true"
        className="absolute left-4 sm:left-6 md:left-8 top-6 -translate-x-1/2 flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#80142b] to-[#4e0917] text-[#f5d77f] font-black text-xs sm:text-xs md:text-sm border-2 border-[#d4af37] shadow-md z-10"
      >
        {index + 1}
      </div>

      <article className="group rounded-2xl sm:rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:border-[#c59b27] hover:shadow-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0e8db] pb-3 mb-4 sm:mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#781226] to-[#4e0917] px-3 sm:px-4 py-1 text-xs font-black uppercase tracking-wider text-[#f5d77f] shadow-xs">
              <Calendar className="h-3.5 w-3.5 text-[#f5d77f]" />
              <span>{pastor.displayPeriod}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf6ea] border border-[#e8dfcb] px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-[#80142b]">
              <Sparkles className="h-3 w-3 text-[#c59b27]" />
              <span>{getOrdinal(index + 1)} Parish Priest</span>
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-md">
            #{index + 1} of {total}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-7 items-start">
          {/* Priest Portrait / Monogram Frame */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#781226] to-[#3a0812] border-2 border-[#d4af37]/60 shadow-md flex items-center justify-center text-white">
            {!imgError && photoSrc ? (
              <Image
                src={photoSrc}
                alt={`${pastor.name} portrait`}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-2 text-center select-none">
                <span className="text-[#f5d77f] font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider">
                  {initials}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-widest mt-1">
                  Parish Priest
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#1f040b] group-hover:text-[#80142b] transition-colors break-words">
              <Link href={`/about/pastors/${pastor.id}`}>
                {pastor.name}
              </Link>
            </h3>

            <p className="mt-1 text-xs sm:text-sm font-bold text-[#80142b] uppercase tracking-wider">
              {pastor.role || "Parish Priest"} • St. Paul&apos;s Catholic Church, Rathinapuri
            </p>

            <p className="mt-3 text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base">
              {pastor.description ||
                pastor.biography ||
                "Dedicated shepherd who faithfully guided the sacramental, liturgical, and pastoral life of the St. Paul's Church community."}
            </p>

            {/* Profile Link Button */}
            <div className="mt-4 pt-3 border-t border-[#f2ece1] flex items-center justify-between">
              <Link
                href={`/about/pastors/${pastor.id}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#80142b] hover:text-[#9e1c36] transition-colors group/link"
              >
                <span>Read Full Biography &amp; Ministry</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function PastorsTimeline({ pastors }: PastorsTimelineProps) {
  return (
    <section
      id="pastors-timeline-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f1] via-[#f7f2e7] to-[#fbf8f1] py-16 md:py-24"
    >
      <div className="container-site max-w-4xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/10 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
            CHRONOLOGICAL SUCCESSION
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1f040b]">
            Parish Priests Timeline (1983 &ndash; Present)
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 bg-[#c59b27] rounded-full" />
          <p className="mt-4 text-base md:text-lg font-medium text-[#80142b] italic">
            &ldquo;Honouring the priests who have faithfully served our parish community.&rdquo;
          </p>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            From our canonical erection in 1983 to the present day, St. Paul&apos;s Catholic Church, Rathinapuri has been blessed by devoted shepherds who dedicated their lives to God and the community.
          </p>
        </div>

        {/* Unified Single Vertical Timeline Container */}
        <div className="relative">
          {/* Continuous Vertical Golden Line across all viewports */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-6 md:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#c59b27] via-[#80142b]/40 to-[#c59b27]"
          />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {pastors.map((pastor, index) => (
              <PriestTimelineEntry
                key={pastor.id}
                pastor={pastor}
                index={index}
                total={pastors.length}
              />
            ))}
          </div>
        </div>

        {/* Historical Journey Photo Wall */}
        <div className="mt-16">
          <HistoricalPhoto
            imageSrc="/images/church-banner.jpg"
            caption="Parish Priests of St. Paul's Catholic Church, Rathinapuri through the years"
          />
        </div>
      </div>
    </section>
  );
}
