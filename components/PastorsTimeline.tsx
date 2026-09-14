"use client";

import React, { useState } from "react";
import { Pastor } from "@/types";
import PastorTimelineCard from "./PastorTimelineCard";
import PastorYearNavigation from "./PastorYearNavigation";
import HistoricalPhoto from "./HistoricalPhoto";

interface PastorsTimelineProps {
  pastors: Pastor[];
}

export default function PastorsTimeline({ pastors }: PastorsTimelineProps) {
  const [activeId, setActiveId] = useState<string>(pastors[0]?.id || "arockiasamy");

  const handleSelectPastor = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(`pastor-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      id="pastors-timeline-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f1] via-[#f7f2e7] to-[#fbf8f1] py-20 md:py-28"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            OUR PASTORS THROUGH THE YEARS
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
            Shepherds of Our Faith
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-base md:text-lg font-medium text-[#10233f]/90 italic">
            &ldquo;Honouring the priests who have faithfully served our parish community.&rdquo;
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Through the years, St. Paul&apos;s Church has been blessed by priests who
            have dedicated their lives to serving God and the parish community.
            This timeline honours those who have served our parish across the
            years.
          </p>
        </div>

        {/* Compact Year Navigation Ribbon */}
        <PastorYearNavigation
          pastors={pastors}
          activeId={activeId}
          onSelectPastor={handleSelectPastor}
        />

        {/* ========================================================================= */}
        {/* DESKTOP TIMELINE (Hidden on mobile/tablet < 768px, visible md and up)     */}
        {/* ========================================================================= */}
        <div className="relative mt-16 hidden md:block">
          {/* Central Vertical Gold Line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-4 bottom-8 w-1 -translate-x-1/2 bg-gradient-to-b from-[#d8bb73] via-[#b18a3d] to-[#d8bb73] rounded-full shadow-sm"
          />

          <div className="space-y-12">
            {pastors.map((pastor, index) => {
              const isEven = index % 2 === 0;
              const isActive = pastor.id === activeId;

              return (
                <div
                  key={pastor.id}
                  className="relative grid grid-cols-2 items-center gap-8"
                >
                  {/* Left Column */}
                  <div className={`flex ${isEven ? "justify-end pr-8" : "invisible pointer-events-none"}`}>
                    {isEven && (
                      <div className="w-full max-w-md">
                        <PastorTimelineCard
                          pastor={pastor}
                          isActive={isActive}
                          onClick={() => setActiveId(pastor.id)}
                          index={index}
                        />
                      </div>
                    )}
                  </div>

                  {/* Central Timeline Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    {/* Node Year Badge */}
                    <button
                      type="button"
                      onClick={() => handleSelectPastor(pastor.id)}
                      aria-label={`Select ${pastor.name} (${pastor.displayPeriod})`}
                      className={`group relative flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#b18a3d]/40 ${
                        isActive
                          ? "scale-125 border-[#b18a3d] bg-[#10233f] text-[#d8bb73] shadow-lg ring-4 ring-[#b18a3d]/20"
                          : "border-[#d8bb73] bg-white text-[#10233f] hover:scale-110 hover:border-[#b18a3d] hover:bg-[#f2eee5] shadow-md"
                      }`}
                    >
                      {/* Catholic Cross Icon / Center Point */}
                      <span className="text-xs font-extrabold font-mono">
                        {String(pastor.startYear).slice(2)}
                      </span>
                    </button>

                    {/* Timeline Year text pill */}
                    <div
                      className={`mt-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wider transition-colors ${
                        isActive
                          ? "bg-[#10233f] text-[#d8bb73]"
                          : "bg-white text-slate-600 border border-[#e7dec8]"
                      }`}
                    >
                      {pastor.startYear}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className={`flex ${!isEven ? "justify-start pl-8" : "invisible pointer-events-none"}`}>
                    {!isEven && (
                      <div className="w-full max-w-md">
                        <PastorTimelineCard
                          pastor={pastor}
                          isActive={isActive}
                          onClick={() => setActiveId(pastor.id)}
                          index={index}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE TIMELINE (Visible on mobile/tablet < 768px, hidden md and up)      */}
        {/* ========================================================================= */}
        <div className="relative mt-12 block md:hidden">
          {/* Vertical Gold Line positioned on left */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-3 bottom-6 w-1 bg-gradient-to-b from-[#d8bb73] via-[#b18a3d] to-[#d8bb73] rounded-full"
          />

          <div className="space-y-8 pl-14 pr-2">
            {pastors.map((pastor, index) => {
              const isActive = pastor.id === activeId;

              return (
                <div key={pastor.id} className="relative">
                  {/* Left Node Indicator */}
                  <button
                    type="button"
                    onClick={() => handleSelectPastor(pastor.id)}
                    aria-label={`Select ${pastor.name}`}
                    className={`absolute -left-14 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "scale-110 border-[#b18a3d] bg-[#10233f] text-[#d8bb73] shadow-md ring-2 ring-[#b18a3d]/30"
                        : "border-[#d8bb73] bg-white text-[#10233f] shadow"
                    }`}
                  >
                    <span className="text-[10px] font-bold font-mono">
                      {String(pastor.startYear).slice(2)}
                    </span>
                  </button>

                  {/* Year Tag */}
                  <div className="mb-2 inline-block rounded-md bg-[#10233f] px-2.5 py-0.5 text-[11px] font-bold text-[#d8bb73]">
                    {pastor.startYear}
                  </div>

                  {/* Mobile Card */}
                  <PastorTimelineCard
                    pastor={pastor}
                    isActive={isActive}
                    onClick={() => setActiveId(pastor.id)}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OUR JOURNEY - Historical Photo Wall & Lightbox                            */}
        {/* ========================================================================= */}
        <HistoricalPhoto
          imageSrc="/images/church-banner.jpg"
          caption="Parish Priests of St. Paul's Church through the years"
        />
      </div>
    </section>
  );
}
