"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Sparkles } from "lucide-react";

export type Timing = {
  name: string;
  time: string;
};

export type MassScheduleGroup = {
  day: string;
  subtitle?: string;
  featured?: boolean;
  timings: Timing[];
};

type Props = {
  massTimings: MassScheduleGroup[];
};

export default function TodayMassTimings({ massTimings }: Props) {
  // Initialize with current day to support SSR, re-sync on client mount
  const [dayIndex, setDayIndex] = useState(() => new Date().getDay());

  useEffect(() => {
    setDayIndex(new Date().getDay());
  }, []);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[dayIndex];

  let targetGroup: MassScheduleGroup | undefined;
  if (dayIndex === 0) {
    targetGroup = massTimings.find((g) => g.day === "Sunday");
  } else if (dayIndex === 5 || dayIndex === 6) {
    targetGroup = massTimings.find((g) => g.day === "Friday & Saturday");
  } else {
    targetGroup = massTimings.find((g) => g.day === "Monday to Thursday" || g.day === "Weekdays");
  }

  const timings = targetGroup?.timings || [];

  return (
    <div
      className="relative mx-auto mb-14 max-w-3xl overflow-hidden rounded-3xl border border-[#d4af37]/45 bg-gradient-to-b from-[#3a0815]/55 via-white/[0.05] to-[#20040d]/45 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(20,2,6,0.6),0_0_35px_rgba(212,175,55,0.2)]"
      aria-label="Today's Mass Timings"
    >
      {/* Top glowing gold accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5d77f] to-transparent" />

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#781226]/40 text-[#f5d77f] shadow-inner">
            <CalendarDays className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f1cf7a]">
                TODAY
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f1cf7a] animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">{currentDayName}</h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#781226]/35 px-3.5 py-1 text-xs font-semibold text-[#f5d77f]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Today&apos;s Schedule</span>
        </div>
      </div>

      {/* Timings list */}
      <div className="space-y-3">
        {timings.map((t, idx) => (
          <div
            key={`${t.name}-${t.time}-${idx}`}
            className="group/item flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 transition-all duration-300 hover:border-[#d4af37]/45 hover:bg-[#781226]/25"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37] transition-transform duration-300 group-hover/item:scale-125" />
              <span className="text-base font-medium text-white transition-colors">
                {t.name}
              </span>
            </div>
            <span className="shrink-0 rounded-xl border border-[#d4af37]/35 bg-[#781226]/40 px-4 py-1.5 text-xs sm:text-sm font-bold tracking-wider text-[#f5d77f] shadow-inner transition-all group-hover/item:border-[#f1cf7a]/60 group-hover/item:bg-[#781226]/60">
              {t.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
