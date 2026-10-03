import Link from "next/link";
import { ArrowRight, MapPin, Play, Church, Cross, Sparkles } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Map from "@/components/Map";
import MediaCard from "@/components/MediaCard";
import TodayMassTimings from "@/components/TodayMassTimings";

const events = [
  { date: "UPCOMING", title: "Parish Feast & Celebrations", text: "Details and schedule will be updated by the parish office." },
  { date: "PARISH", title: "Novenas & Special Masses", text: "Join the parish community in prayer and celebration." },
  { date: "COMMUNITY", title: "Parish Activities", text: "Faith formation, youth and community activities." }
];

const massTimings = [
  {
    day: "Sunday",
    subtitle: "The Lord's Day",
    featured: true,
    timings: [
      { name: "Morning Mass", time: "6:00 AM" },
      { name: "Catechism Mass", time: "7:30 AM" },
      { name: "Morning Mass", time: "8:00 AM" },
      { name: "Evening Mass", time: "5:30 PM" },
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
    subtitle: "Novena and Eucharistic Adoration",
    featured: false,
    timings: [
      { name: "Morning Mass", time: "6:00 AM" },
      { name: "Rosary, Mass and Adoration", time: "5:45 PM" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[700px] overflow-hidden bg-[#160207]">
        <img
          src="/images/church-front.png"
          alt="St. Paul's Church exterior"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80 scale-[1.02] transition-transform duration-1000"
        />
        {/* Cinematic rich wine-to-dark gradient overlay harmonized with the sunrise and red church towers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#160207]/85 via-[#2b0510]/55 via-55% to-[#120206]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140207]/90 via-transparent to-black/25" />
        <div className="container-site relative flex min-h-[700px] items-center py-24">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/45 bg-[#781226]/40 px-4 py-2 text-xs font-bold tracking-[.22em] text-[#f5d77f] backdrop-blur-md shadow-lg">
              <Cross className="h-4 w-4 text-[#f5d77f]" /> WELCOME TO OUR PARISH
            </div>
            <h1 className="text-5xl font-extrabold leading-tight text-white drop-shadow-md md:text-7xl">St. Paul&apos;s Church</h1>
            <p className="mt-3 text-xl font-bold tracking-[.28em] text-[#f1cf7a] drop-shadow-sm">RATHINAPURI · COIMBATORE</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100">
              A welcoming Catholic community rooted in faith, fellowship, service and prayer.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#mass-timings" className="rounded-full bg-gradient-to-r from-[#c59b27] via-[#e5c158] to-[#b8860b] px-7 py-3.5 font-bold text-[#1f040b] shadow-[0_10px_25px_rgba(197,155,39,0.4)] hover:shadow-[0_15px_35px_rgba(197,155,39,0.6)] hover:scale-105 transition-all">
                Mass Timings
              </Link>
              <Link href="/events" className="rounded-full border border-[#f1cf7a]/40 bg-[#781226]/35 px-7 py-3.5 font-semibold text-white backdrop-blur hover:bg-[#781226]/60 hover:border-[#f1cf7a]/70 hover:scale-105 transition-all">
                Parish Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="OUR PARISH" title="Welcome to St. Paul&apos;s Church" description="St. Paul's Church is a Roman Catholic parish serving the faithful of the Rathinapuri / Tatabad area of Coimbatore under the Coimbatore Diocese." />
          <div className="grid gap-8 md:grid-cols-2">
            <img src="/images/church-interior.jpg" alt="Inside St. Paul's Church" className="h-full min-h-[360px] w-full rounded-3xl object-cover shadow-lg border border-[#d4af37]/20" />
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#781226] to-[#4e0917] text-[#f5d77f] border border-[#d4af37]/35 shadow-md"><Church /></div>
              <h3 className="text-3xl font-bold text-[#1f040b]">A place of prayer and fellowship</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Discover parish life, celebrate the Eucharist with us, take part in ministries and events, and stay connected with announcements from the parish.
              </p>
              <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-bold text-[#80142b] hover:text-[#9e1c36] transition-colors">Learn more <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section id="mass-timings" className="relative overflow-hidden bg-gradient-to-b from-[#140207] via-[#24050f] to-[#120206] py-24 text-white scroll-mt-20">
        {/* Cinematic ambient glow & lighting with wine and warm gold aura */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[radial-gradient(circle,rgba(229,193,88,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(168,28,58,0.22)_0%,transparent_70%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="container-site relative">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[0.25em] text-[#f5d77f] backdrop-blur-md">
              <Cross className="h-3.5 w-3.5 text-[#f5d77f]" /> WORSHIP
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">Mass Timings</h2>
            <div className="mx-auto mt-4 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <p className="mt-5 text-base leading-7 text-slate-300">
              Join us in prayer and celebration of the Holy Eucharist throughout the week.
            </p>
          </div>

          {/* Today's Highlighted Mass Timings */}
          <TodayMassTimings massTimings={massTimings} />

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {massTimings.map((item) => (
              <div
                key={item.day}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${item.featured
                  ? "border-[#d4af37]/50 bg-gradient-to-b from-[#3d0917]/60 via-white/[0.06] to-white/[0.02] shadow-[0_15px_40px_rgba(20,2,6,0.5),0_0_30px_rgba(212,175,55,0.18)] hover:border-[#f1cf7a]/70 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]"
                  : "border-white/10 bg-white/[0.04] shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-[#d4af37]/45 hover:bg-[#360814]/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
                  }`}
              >
                {/* Top glow line */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${item.featured
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
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{item.day}</h3>

                  <div className="mt-7 space-y-4">
                    {item.timings.map((t, idx) => (
                      <div
                        key={`${t.name}-${t.time}-${idx}`}
                        className="group/row flex items-center justify-between border-b border-white/[0.07] pb-3.5 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] opacity-70 transition-all duration-300 group-hover/row:scale-125 group-hover/row:opacity-100" />
                          <span className="text-sm font-medium text-slate-200 transition-colors duration-200 group-hover/row:text-white">
                            {t.name}
                          </span>
                        </div>
                        <span className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#f5d77f] shadow-inner transition-all duration-300 group-hover/row:border-[#d4af37]/50 group-hover/row:bg-[#781226]/40">
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

      <section className="section-pad bg-[#fbf9f5]">
        <div className="container-site">
          <SectionTitle eyebrow="PARISH LIFE" title="Upcoming & Featured" />
          <div className="grid gap-5 md:grid-cols-3">
            {events.map((e) => (
              <div key={e.title} className="rounded-2xl border border-amber-900/10 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#d4af37]/40">
                <div className="inline-block rounded-full bg-[#80142b]/10 border border-[#80142b]/20 px-3 py-1 text-xs font-bold tracking-[.15em] text-[#80142b]">{e.date}</div>
                <h3 className="mt-3 text-xl font-bold text-[#1f040b]">{e.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{e.text}</p>
                <Link href="/events" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#80142b] hover:text-[#9e1c36] transition-colors">View events <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1c030b] via-[#330715] to-[#180309] py-24 text-white border-y border-[#d4af37]/25 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-site relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-[.25em] text-[#f1cf7a]">LIVE & MEDIA</div>
            <h2 className="mt-3 text-4xl font-bold">Stay connected with parish celebrations</h2>
            <p className="mt-5 leading-8 text-slate-300">Watch livestreams, browse parish videos and revisit moments from our community.</p>
            <Link href="/live" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c59b27] via-[#e5c158] to-[#b8860b] px-7 py-3.5 font-bold text-[#1f040b] shadow-[0_10px_25px_rgba(197,155,39,0.35)] hover:scale-105 transition-all"><Play className="h-4 w-4" /> Watch Live</Link>
          </div>
          <img src="/images/church-banner.jpg" alt="St. Paul's Church banner" className="rounded-3xl shadow-2xl border-2 border-[#d4af37]/30" />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="FROM OUR PARISH" title="Gallery" />
          <div className="grid gap-5 md:grid-cols-3">
            <MediaCard src="/images/church-front.png" title="Church Exterior" />
            <MediaCard src="/images/church-interior.jpg" title="Inside the Church" />
            <MediaCard src="/images/church-banner.jpg" title="Parish Welcome" />
          </div>
          <div className="mt-8 text-center"><Link href="/gallery" className="font-bold text-[#80142b] hover:text-[#9e1c36] transition-colors">Explore full gallery →</Link></div>
        </div>
      </section>

      <section className="bg-[#f5efe6] section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-amber-900/10">
            <SectionTitle eyebrow="PRAYER" title="Share a Prayer Request" description="If you would like the parish to pray for an intention, you can send it privately to the parish team." />
            <Link href="/prayer-request" className="mx-auto flex w-fit rounded-full bg-gradient-to-r from-[#781226] via-[#8c1830] to-[#6a0f21] px-7 py-3.5 font-bold text-white shadow-[0_6px_20px_rgba(120,18,38,0.35)] border border-[#d4af37]/30 hover:scale-105 transition-all">Send Prayer Request</Link>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-amber-900/10">
            <div className="h-[380px]"><Map /></div>
            <div className="p-6">
              <div className="flex items-start gap-3"><MapPin className="mt-1 text-[#c59b27]" /><div><h3 className="font-bold text-[#1f040b]">Find Us</h3><p className="mt-1 text-sm leading-6 text-slate-600">Nehru Street, Tatabad / Rathinapuri, Coimbatore, Tamil Nadu, India</p></div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
