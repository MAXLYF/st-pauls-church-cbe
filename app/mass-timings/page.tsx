import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Play,
  Cross,
  Sparkles,
  Info
} from "lucide-react";
import TodayMassTimings, { MassScheduleGroup } from "@/components/TodayMassTimings";
import LiveMassTelecastSection from "@/components/LiveMassTelecastSection";

export const metadata: Metadata = {
  title: "Mass Timings | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Official Mass, Confession and service schedule for St. Paul's Catholic Church, Rathinapuri, Coimbatore.",
};

export const massTimings: MassScheduleGroup[] = [
  {
    day: "Sunday",
    subtitle: "The Lord's Day",
    featured: true,
    timings: [
      { name: "First Holy Mass", time: "6:00 AM" },
      { name: "Catechism", time: "7:45 AM" },
      { name: "Second Holy Mass", time: "8:00 AM" },
      { name: "Children's Mass", time: "9:00 AM" },
      { name: "Evening Holy Mass", time: "5:30 PM" },
    ],
  },
  {
    day: "Monday to Thursday",
    subtitle: "Daily Liturgy",
    featured: false,
    timings: [
      { name: "Morning Mass", time: "6:15 AM" },
      { name: "Evening Mass", time: "6:00 PM" },
    ],
  },
  {
    day: "Friday & Saturday",
    subtitle: "Novena & Adoration",
    featured: false,
    timings: [
      { name: "Morning Mass", time: "6:15 AM" },
      { name: "Rosary (Saturday)", time: "5:30 PM" },
      { name: "Evening Mass", time: "6:00 PM" },
      { name: "Eucharistic Adoration (Sat)", time: "7:00 PM" },
    ],
  },
  {
    day: "First Friday",
    subtitle: "Monthly Confession",
    featured: false,
    badge: "First Friday",
    note: "Every First Friday of the month will be Confession from morning 10:00 AM to evening 8:00 PM",
    timings: [
      { name: "Holy Confession", time: "10:00 AM – 8:00 PM" },
      { name: "Morning Holy Mass", time: "6:15 AM" },
      { name: "Evening Mass & Adoration", time: "6:00 PM" },
    ],
  },
];

export default function MassTimingsPage() {
  return (
    <>
      {/* Page Header Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-20 text-center text-white"
        aria-label="Mass Timings page header"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(197,155,39,0.18) 0%, transparent 65%)",
          }}
        />
        <div className="container-site relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 backdrop-blur-md">
            <Cross className="h-3.5 w-3.5 text-[#f5d77f]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[.25em] text-[#f5d77f]">
              Worship &amp; Sacraments
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl text-white">
            Mass Timings
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            Join us in prayer, worship, the celebration of the Holy Eucharist, and the Sacrament of Reconciliation.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />
        </div>
      </section>

      {/* Main Mass Schedule Section (Dark Glowing Cards Layout matching Homepage) */}
      <section
        id="mass-timings"
        className="relative overflow-hidden bg-gradient-to-b from-[#140207] via-[#24050f] to-[#120206] py-20 text-white scroll-mt-24"
        aria-label="Weekly Mass schedule"
      >
        {/* Cinematic ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[radial-gradient(circle,rgba(229,193,88,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(168,28,58,0.22)_0%,transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="container-site relative z-10">
          {/* Today's Schedule Highlight */}
          <TodayMassTimings massTimings={massTimings} />

          {/* 4 Cards Grid: Sunday, Monday-Thursday, Friday & Saturday, First Friday Confession */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {massTimings.map((item) => (
              <div
                key={item.day}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${
                  item.featured
                    ? "border-[#d4af37]/50 bg-gradient-to-b from-[#3d0917]/60 via-white/[0.06] to-white/[0.02] shadow-[0_15px_40px_rgba(20,2,6,0.5),0_0_30px_rgba(212,175,55,0.18)] hover:border-[#f1cf7a]/55"
                    : item.badge
                    ? "border-[#d4af37]/45 bg-gradient-to-b from-[#300813]/70 via-white/[0.05] to-white/[0.02] shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#f1cf7a]/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
                    : "border-white/10 bg-white/[0.04] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-[#d4af37]/45 hover:bg-[#360814]/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
                }`}
              >
                {/* Top glow line */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${
                    item.featured
                      ? "from-transparent via-[#f5d77f] to-transparent"
                      : item.badge
                      ? "from-transparent via-[#f5d77f] to-transparent"
                      : "from-transparent via-[#d4af37]/45 to-transparent group-hover:via-[#f5d77f]"
                  } transition-all duration-500`}
                />

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1cf7a]">
                      {item.subtitle}
                    </span>
                    {item.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#f5d77f]">
                        <Sparkles className="h-3 w-3" /> Lord&apos;s Day
                      </span>
                    )}
                    {item.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/40 bg-[#781226]/60 px-2.5 py-0.5 text-[11px] font-semibold text-[#f5d77f]">
                        <Sparkles className="h-3 w-3" /> {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{item.day}</h3>

                  {item.note && (
                    <div className="mt-3.5 rounded-xl border border-[#d4af37]/30 bg-[#781226]/40 p-3 text-xs text-[#f5d77f] leading-relaxed">
                      <span className="font-semibold text-white">✨ Confession: </span>
                      {item.note}
                    </div>
                  )}

                  <div className="mt-6 space-y-3.5">
                    {item.timings.map((t, idx) => (
                      <div
                        key={`${t.name}-${t.time}-${idx}`}
                        className="group/row flex items-center justify-between border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] opacity-70 transition-all duration-300 group-hover/row:scale-125 group-hover/row:opacity-100 shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-slate-200 transition-colors duration-200 group-hover/row:text-white">
                            {t.name}
                          </span>
                        </div>
                        <span className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wider text-[#f5d77f] shadow-inner transition-all duration-300 group-hover/row:border-[#d4af37]/40 group-hover/row:bg-white/[0.12]">
                          {t.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="bg-white py-6 border-b border-amber-900/10" aria-label="Schedule notice">
        <div className="container-site">
          <div className="mx-auto flex max-w-4xl items-start gap-4 rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#80142b]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-700">
              <strong className="text-[#1f040b]">Please note:</strong> Please arrive 10 minutes early for holy Mass and prayer services. Special Mass schedules for liturgical feasts, Lent, Holy Week, and Christmas will be announced by the parish team.
            </p>
          </div>
        </div>
      </section>

      {/* Live Mass Telecast Section */}
      <LiveMassTelecastSection />

      {/* Plan Your Visit Quick Actions */}
      <section className="section-pad bg-[#fbf8f1]" aria-label="Quick actions">
        <div className="container-site text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#1f040b]">Plan Your Visit</h2>
          <p className="mb-8 text-slate-600">We would love to welcome you and your family to St. Paul&apos;s Church.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#80142b] bg-white px-6 py-3 text-sm font-semibold text-[#80142b] shadow-sm transition-all hover:bg-[#80142b] hover:text-white"
              aria-label="View church location"
            >
              <MapPin className="h-4 w-4" />
              View Location
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#c59b27] bg-white px-6 py-3 text-sm font-semibold text-[#c59b27] shadow-sm transition-all hover:bg-[#c59b27] hover:text-[#1f040b]"
              aria-label="Contact the parish office"
            >
              <Phone className="h-4 w-4" />
              Contact Parish
            </Link>
            <a
              href="#live-telecast"
              className="inline-flex items-center gap-2 rounded-full bg-[#80142b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#9e1c36]"
              aria-label="Watch live Mass telecast"
            >
              <Play className="h-4 w-4" />
              Live Mass
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
