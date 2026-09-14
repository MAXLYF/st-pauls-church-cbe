"use client";

import React, { useRef, useEffect } from "react";
import { Pastor } from "@/types";

interface PastorYearSelectorProps {
  pastors: Pastor[];
  activeId: string;
  onSelectPastor: (id: string) => void;
}

export default function PastorYearSelector({
  pastors,
  activeId,
  onSelectPastor
}: PastorYearSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active year into view within container on selection
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [activeId]);

  return (
    <nav
      aria-label="Pastoral timeline by year"
      className="w-full relative my-6 md:my-8"
    >
      {/* Scrollable Container (horizontally constrained to avoid page overflow) */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto pb-4 pt-2 px-2 no-scrollbar scroll-smooth"
      >
        <div className="flex items-center justify-start md:justify-center min-w-max mx-auto px-4 py-2">
          {pastors.map((pastor, idx) => {
            const isActive = pastor.id === activeId;
            const isLast = idx === pastors.length - 1;

            return (
              <React.Fragment key={pastor.id}>
                {/* Timeline Year Node */}
                <div className="flex flex-col items-center relative">
                  <button
                    ref={isActive ? activeButtonRef : null}
                    type="button"
                    onClick={() => onSelectPastor(pastor.id)}
                    aria-label={`View pastor history for ${pastor.startYear}`}
                    aria-pressed={isActive}
                    className={`group relative flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b18a3d] focus:ring-offset-2 ${
                      isActive
                        ? "bg-[#10233f] text-[#d8bb73] border-2 border-[#b18a3d] shadow-lg scale-105"
                        : "bg-white text-slate-700 hover:text-[#10233f] hover:bg-[#f2eee5] border border-[#e7dec8] shadow-xs"
                    }`}
                  >
                    <span>{pastor.startYear}</span>

                    {/* Active Accent Dot */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#d8bb73] animate-pulse"
                      />
                    )}
                  </button>
                </div>

                {/* Connecting Timeline Line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="flex-1 min-w-[28px] sm:min-w-[36px] md:min-w-[48px] h-[2px] bg-gradient-to-r from-[#d8bb73]/60 via-[#b18a3d]/80 to-[#d8bb73]/60 mx-1.5 md:mx-2 self-center rounded-full"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile scroll hint text */}
      <div className="text-center md:hidden mt-1">
        <span className="text-[11px] font-medium text-slate-400">
          ← Scroll years horizontally →
        </span>
      </div>
    </nav>
  );
}
