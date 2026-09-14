import type { Metadata } from "next";
import Link from "next/link";
import {
  Church,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  Star,
  MapPin,
  Phone,
  Play,
  Info,
  Cross,
} from "lucide-react";
import TodaySchedule from "./TodaySchedule";

export const metadata: Metadata = {
  title: "Mass Timings",
  description:
    "Official Mass and service schedule for St. Paul's Church, Rathinapuri, Coimbatore.",
};

export type ServiceEntry = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  icon: "cross" | "heart" | "sparkles" | "bookOpen" | "users" | "star";
  period: "morning" | "evening";
};

export type DaySchedule = {
  day: string;
  label: string;
  services: ServiceEntry[];
};

export const massSchedule: DaySchedule[] = [
  {
    day: "monday",
    label: "Monday \u2013 Thursday",
    services: [
      { id: "mon-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
      { id: "mon-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
    ],
  },
  {
    day: "friday",
    label: "Friday",
    services: [
      { id: "fri-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
      { id: "fri-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
    ],
  },
  {
    day: "saturday",
    label: "Saturday",
    services: [
      { id: "sat-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
      { id: "sat-ro", name: "Rosary", startTime: "5:30 PM", endTime: "6:00 PM", icon: "heart", period: "evening" },
      { id: "sat-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
      { id: "sat-ad", name: "Adoration", startTime: "7:00 PM", endTime: "8:00 PM", icon: "sparkles", period: "evening" },
    ],
  },
  {
    day: "sunday",
    label: "Sunday",
    services: [
      { id: "sun-1m", name: "First Holy Mass", startTime: "6:00 AM", endTime: "7:30 AM", icon: "cross", period: "morning" },
      { id: "sun-ca", name: "Catechism", startTime: "7:45 AM", endTime: "8:55 AM", icon: "bookOpen", period: "morning" },
      { id: "sun-2m", name: "Second Holy Mass", startTime: "8:00 AM", endTime: "9:45 AM", icon: "cross", period: "morning" },
      { id: "sun-ch", name: "Children's Mass", startTime: "9:00 AM", endTime: "9:45 AM", icon: "users", period: "morning" },
      { id: "sun-ev", name: "Evening Holy Mass", startTime: "5:30 PM", endTime: "7:00 PM", icon: "sparkles", period: "evening" },
    ],
  },
];

export const dailyScheduleMap: Record<string, ServiceEntry[]> = {
  monday: [
    { id: "mon-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "mon-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
  ],
  tuesday: [
    { id: "tue-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "tue-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
  ],
  wednesday: [
    { id: "wed-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "wed-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
  ],
  thursday: [
    { id: "thu-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "thu-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
  ],
  friday: [
    { id: "fri-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "fri-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
  ],
  saturday: [
    { id: "sat-am", name: "Holy Mass", startTime: "6:15 AM", endTime: "7:00 AM", icon: "cross", period: "morning" },
    { id: "sat-ro", name: "Rosary", startTime: "5:30 PM", endTime: "6:00 PM", icon: "heart", period: "evening" },
    { id: "sat-pm", name: "Holy Mass", startTime: "6:00 PM", endTime: "7:00 PM", icon: "cross", period: "evening" },
    { id: "sat-ad", name: "Adoration", startTime: "7:00 PM", endTime: "8:00 PM", icon: "sparkles", period: "evening" },
  ],
  sunday: [
    { id: "sun-1m", name: "First Holy Mass", startTime: "6:00 AM", endTime: "7:30 AM", icon: "cross", period: "morning" },
    { id: "sun-ca", name: "Catechism", startTime: "7:45 AM", endTime: "8:55 AM", icon: "bookOpen", period: "morning" },
    { id: "sun-2m", name: "Second Holy Mass", startTime: "8:00 AM", endTime: "9:45 AM", icon: "cross", period: "morning" },
    { id: "sun-ch", name: "Children's Mass", startTime: "9:00 AM", endTime: "9:45 AM", icon: "users", period: "morning" },
    { id: "sun-ev", name: "Evening Holy Mass", startTime: "5:30 PM", endTime: "7:00 PM", icon: "sparkles", period: "evening" },
  ],
};

export function ServiceIcon({ icon, className }: { icon: ServiceEntry["icon"]; className?: string }) {
  const cls = className ?? "h-5 w-5";
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

function ServiceCard({ service }: { service: ServiceEntry }) {
  const isMorning = service.period === "morning";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${isMorning ? "bg-[#b18a3d]" : "bg-[#10233f]"}`} />
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isMorning ? "bg-amber-50 text-[#b18a3d]" : "bg-slate-50 text-[#10233f]"}`}>
          <ServiceIcon icon={service.icon} className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-slate-400">{isMorning ? "Morning" : "Evening"}</p>
          <h4 className="font-bold text-[#10233f]">{service.name}</h4>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#10233f]">{service.startTime}</span>
        <div className="mx-1 h-px flex-1 bg-slate-200" />
        <span className="text-sm font-medium text-slate-500">{service.endTime}</span>
      </div>
    </div>
  );
}

function SundayCard({ service }: { service: ServiceEntry }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200">
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#b18a3d] to-[#d8bb73]" />
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-[#b18a3d]">
          <ServiceIcon icon={service.icon} className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#b18a3d]">{service.period === "morning" ? "Morning" : "Evening"}</p>
          <h4 className="font-bold text-[#10233f]">{service.name}</h4>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-[#10233f]">{service.startTime}</span>
        <div className="mx-1 h-px flex-1 bg-amber-200" />
        <span className="text-sm font-medium text-[#b18a3d]">{service.endTime}</span>
      </div>
    </div>
  );
}

function DaySection({ schedule }: { schedule: DaySchedule }) {
  const morning = schedule.services.filter((s) => s.period === "morning");
  const evening = schedule.services.filter((s) => s.period === "evening");
  return (
    <section aria-label={`${schedule.label} schedule`} className="rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#b18a3d]" />
        <h3 className="text-xl font-bold tracking-tight text-[#10233f]">{schedule.label}</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {morning.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-slate-400">Morning</p>
            <div className="grid gap-3">{morning.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          </div>
        )}
        {evening.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-slate-400">Evening</p>
            <div className="grid gap-3">{evening.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

function SundaySection({ schedule }: { schedule: DaySchedule }) {
  const morning = schedule.services.filter((s) => s.period === "morning");
  const evening = schedule.services.filter((s) => s.period === "evening");
  return (
    <section aria-label="Sunday schedule" className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-[#10233f] via-[#18365f] to-[#0d1e36] p-8 shadow-xl">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(216,187,115,0.15) 0%, transparent 55%)" }} />
      <div className="relative mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b18a3d]">
          <Cross className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d8bb73]">The Lord&apos;s Day</p>
          <h3 className="text-2xl font-bold text-white">Sunday</h3>
        </div>
      </div>
      <div className="relative mb-6 h-px w-24 bg-gradient-to-r from-[#b18a3d] to-transparent" />
      <div className="relative grid gap-6 sm:grid-cols-2">
        {morning.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-amber-300/80">Morning</p>
            <div className="grid gap-3">{morning.map((s) => <SundayCard key={s.id} service={s} />)}</div>
          </div>
        )}
        {evening.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-amber-300/80">Evening</p>
            <div className="grid gap-3">{evening.map((s) => <SundayCard key={s.id} service={s} />)}</div>
          </div>
        )}
      </div>
      <p className="relative mt-6 text-xs leading-5 text-amber-200/60">* Some Sunday services may overlap. Each entry represents a separate concurrent activity.</p>
    </section>
  );
}

export default function MassTimingsPage() {
  const weekdaySections = massSchedule.filter((s) => s.day !== "sunday");
  const sundaySection = massSchedule.find((s) => s.day === "sunday")!;
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#10233f] via-[#18365f] to-[#0d1e36] py-24 text-center text-white" aria-label="Mass Timings page header">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(177,138,61,0.18) 0%, transparent 65%)" }} />
        <div className="container-site relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b18a3d]/40 bg-[#b18a3d]/10 px-4 py-1.5">
            <Cross className="h-3.5 w-3.5 text-[#d8bb73]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[.25em] text-[#d8bb73]">Worship</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Mass Timings</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Join us in prayer, worship and the celebration of the Holy Eucharist.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#b18a3d] to-transparent" />
        </div>
      </section>

      <TodaySchedule scheduleMap={dailyScheduleMap} />

      <section className="section-pad bg-[#fbf8f1]" aria-label="Weekly Mass schedule">
        <div className="container-site">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-xs font-bold uppercase tracking-[.25em] text-[#b18a3d]">Schedule</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">Weekly Schedule</h2>
            <div className="gold-line" />
            <p className="mt-5 leading-7 text-slate-600">Services are held throughout the week. All are welcome to join us for any Mass or devotional service.</p>
          </div>
          <div className="grid gap-6">
            {weekdaySections.map((schedule) => (
              <DaySection key={schedule.day} schedule={schedule} />
            ))}
            <SundaySection schedule={sundaySection} />
          </div>
        </div>
      </section>

      <section className="bg-white py-8" aria-label="Schedule notice">
        <div className="container-site">
          <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#b18a3d]" aria-hidden="true" />
            <p className="text-sm leading-7 text-slate-600">
              <strong className="text-[#10233f]">Please note:</strong> Please arrive a few minutes early for Mass. Schedule changes for special liturgical celebrations will be announced by the parish.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fbf8f1]" aria-label="Quick actions">
        <div className="container-site text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#10233f]">Plan Your Visit</h2>
          <p className="mb-8 text-slate-500">We would love to see you at Mass.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-[#10233f] bg-white px-6 py-3 text-sm font-semibold text-[#10233f] shadow-sm transition-all hover:bg-[#10233f] hover:text-white" aria-label="View church location">
              <MapPin className="h-4 w-4" />
              View Location
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-[#b18a3d] bg-white px-6 py-3 text-sm font-semibold text-[#b18a3d] shadow-sm transition-all hover:bg-[#b18a3d] hover:text-white" aria-label="Contact the parish office">
              <Phone className="h-4 w-4" />
              Contact Parish
            </Link>
            <Link href="/live" className="inline-flex items-center gap-2 rounded-full bg-[#10233f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#18365f]" aria-label="Watch live Mass">
              <Play className="h-4 w-4" />
              Live Mass
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
