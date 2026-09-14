"use client";

import { useEffect, useState } from "react";
import { Cross, Heart, Sparkles, BookOpen, Users, Star, Church, CalendarDays } from "lucide-react";

type ServiceEntry = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  icon: "cross" | "heart" | "sparkles" | "bookOpen" | "users" | "star";
  period: "morning" | "evening";
};

function TodayIcon({ icon }: { icon: ServiceEntry["icon"] }) {
  const cls = "h-5 w-5";
  switch (icon) {
    case "cross":    return <Cross className={cls} aria-hidden="true" />;
    case "heart":    return <Heart className={cls} aria-hidden="true" />;
    case "sparkles": return <Sparkles className={cls} aria-hidden="true" />;
    case "bookOpen": return <BookOpen className={cls} aria-hidden="true" />;
    case "users":    return <Users className={cls} aria-hidden="true" />;
    case "star":     return <Star className={cls} aria-hidden="true" />;
    default:         return <Church className={cls} aria-hidden="true" />;
  }
}

const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
const DAY_DISPLAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

type Props = {
  scheduleMap: Record<string, ServiceEntry[]>;
};

export default function TodaySchedule({ scheduleMap }: Props) {
  const [dayKey, setDayKey] = useState<string | null>(null);

  useEffect(() => {
    const idx = new Date().getDay(); // 0 = Sunday
    setDayKey(DAY_NAMES[idx]);
  }, []);

  if (!dayKey) return null; // Render nothing on server / before hydration

  const services = scheduleMap[dayKey] ?? [];
  const displayName = DAY_DISPLAY[DAY_NAMES.indexOf(dayKey as typeof DAY_NAMES[number])];

  return (
    <section className="bg-white py-10" aria-label="Today's Mass schedule">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10233f]">
              <CalendarDays className="h-5 w-5 text-[#d8bb73]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b18a3d]">Today</p>
              <h2 className="text-xl font-bold text-[#10233f]">{displayName}</h2>
            </div>
          </div>

          {services.length === 0 ? (
            <p className="text-slate-500 text-sm">No scheduled services found for today.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const isMorning = service.period === "morning";
                return (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-[#fbf8f1] p-4 shadow-sm"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isMorning ? "bg-amber-100 text-[#b18a3d]" : "bg-slate-100 text-[#10233f]"}`}>
                      <TodayIcon icon={service.icon} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#10233f] truncate">{service.name}</p>
                      <p className="text-sm text-slate-500">{service.startTime} &ndash; {service.endTime}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${isMorning ? "bg-amber-100 text-[#b18a3d]" : "bg-slate-100 text-[#10233f]"}`}>
                      {isMorning ? "AM" : "PM"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
