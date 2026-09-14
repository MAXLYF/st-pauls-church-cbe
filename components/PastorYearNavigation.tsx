"use client";

import React from "react";
import { Pastor } from "@/types";

interface PastorYearNavigationProps {
  pastors: Pastor[];
  activeId: string;
  onSelectPastor: (id: string) => void;
}

export default function PastorYearNavigation({
  pastors,
  activeId,
  onSelectPastor
}: PastorYearNavigationProps) {
  return (
    <nav
      aria-label="Pastors timeline navigation by year"
      className="my-8 flex flex-wrap items-center justify-center gap-2 px-2"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-[#f2eee5]/80 p-1.5 backdrop-blur-sm border border-[#d8bb73]/30 shadow-inner">
        {pastors.map((pastor) => {
          const isActive = pastor.id === activeId;
          const yearLabel = pastor.startYear.toString();

          return (
            <button
              key={pastor.id}
              type="button"
              onClick={() => onSelectPastor(pastor.id)}
              aria-pressed={isActive}
              aria-label={`Jump to ${pastor.name} (${pastor.displayPeriod})`}
              className={`group relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b18a3d] focus:ring-offset-1 ${
                isActive
                  ? "bg-[#10233f] text-[#d8bb73] shadow-md scale-105"
                  : "bg-transparent text-[#10233f]/80 hover:bg-white hover:text-[#10233f] hover:shadow-sm"
              }`}
            >
              <span>{yearLabel}</span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#b18a3d]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
