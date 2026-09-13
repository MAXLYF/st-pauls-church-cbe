import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, HeartHandshake, MapPin, Play, Church, Cross } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import Map from "@/components/Map";
import MediaCard from "@/components/MediaCard";

const events = [
  { date: "UPCOMING", title: "Parish Feast & Celebrations", text: "Details and schedule will be updated by the parish office." },
  { date: "PARISH", title: "Novenas & Special Masses", text: "Join the parish community in prayer and celebration." },
  { date: "COMMUNITY", title: "Parish Activities", text: "Faith formation, youth and community activities." }
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden">
        <img src="/images/church-front.png" alt="St. Paul's Church exterior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081525]/85 via-[#10233f]/45 to-transparent" />
        <div className="container-site relative flex min-h-[680px] items-center py-20">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[.2em] backdrop-blur">
              <Cross className="h-4 w-4" /> WELCOME TO OUR PARISH
            </div>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">St. Paul&apos;s Church</h1>
            <p className="mt-3 text-xl tracking-[.25em] text-[#e8cc8a]">RATHINAPURI · COIMBATORE</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100">
              A welcoming Catholic community rooted in faith, fellowship, service and prayer.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/mass-timings" className="rounded-full bg-[#b18a3d] px-6 py-3 font-semibold text-white hover:bg-[#9a762f]">
                Mass Timings
              </Link>
              <Link href="/events" className="rounded-full border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20">
                Parish Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-5">
        <div className="container-site grid gap-4 text-center sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3"><Clock3 className="text-[#b18a3d]" /><span className="font-semibold">Mass Schedule</span></div>
          <div className="flex items-center justify-center gap-3"><CalendarDays className="text-[#b18a3d]" /><span className="font-semibold">Upcoming Events</span></div>
          <div className="flex items-center justify-center gap-3"><HeartHandshake className="text-[#b18a3d]" /><span className="font-semibold">Prayer & Community</span></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="OUR PARISH" title="Welcome to St. Paul&apos;s Church" description="St. Paul's Church is a Roman Catholic parish serving the faithful of the Rathinapuri / Tatabad area of Coimbatore under the Coimbatore Diocese." />
          <div className="grid gap-8 md:grid-cols-2">
            <img src="/images/church-interior.jpg" alt="Inside St. Paul's Church" className="h-full min-h-[360px] w-full rounded-3xl object-cover shadow-lg" />
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10233f] text-white"><Church /></div>
              <h3 className="text-3xl font-bold text-[#10233f]">A place of prayer and fellowship</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Discover parish life, celebrate the Eucharist with us, take part in ministries and events, and stay connected with announcements from the parish.
              </p>
              <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#b18a3d]">Learn more <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2eee5] section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="WORSHIP" title="Mass Timings" description="The schedule below is a starter layout. Final timings can be managed from the admin dashboard." />
          <div className="grid gap-5 md:grid-cols-3">
            {["Sunday", "Weekdays", "Saturday"].map((day) => (
              <div key={day} className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-[#10233f]">{day}</h3>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between border-b pb-3"><span>Holy Mass</span><span className="font-semibold">Update time</span></div>
                  <div className="flex justify-between"><span>Special services</span><span className="font-semibold">As announced</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/mass-timings" className="inline-flex items-center gap-2 rounded-full bg-[#10233f] px-6 py-3 font-semibold text-white">View full schedule <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <SectionTitle eyebrow="PARISH LIFE" title="Upcoming & Featured" />
          <div className="grid gap-5 md:grid-cols-3">
            {events.map((e) => (
              <div key={e.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="text-xs font-bold tracking-[.2em] text-[#b18a3d]">{e.date}</div>
                <h3 className="mt-3 text-xl font-bold text-[#10233f]">{e.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{e.text}</p>
                <Link href="/events" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#10233f]">View events <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10233f] py-20 text-white">
        <div className="container-site grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-[.25em] text-[#d8bb73]">LIVE & MEDIA</div>
            <h2 className="mt-3 text-4xl font-bold">Stay connected with parish celebrations</h2>
            <p className="mt-5 leading-8 text-slate-300">Watch livestreams, browse parish videos and revisit moments from our community.</p>
            <Link href="/live" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#b18a3d] px-6 py-3 font-semibold text-white"><Play className="h-4 w-4" /> Watch Live</Link>
          </div>
          <img src="/images/church-banner.jpg" alt="St. Paul's Church banner" className="rounded-3xl shadow-2xl" />
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
          <div className="mt-8 text-center"><Link href="/gallery" className="font-semibold text-[#b18a3d]">Explore full gallery →</Link></div>
        </div>
      </section>

      <section className="bg-[#f2eee5] section-pad">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <SectionTitle eyebrow="PRAYER" title="Share a Prayer Request" description="If you would like the parish to pray for an intention, you can send it privately to the parish team." />
            <Link href="/prayer-request" className="mx-auto flex w-fit rounded-full bg-[#10233f] px-6 py-3 font-semibold text-white">Send Prayer Request</Link>
          </div>
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-[380px]"><Map /></div>
            <div className="p-6">
              <div className="flex items-start gap-3"><MapPin className="mt-1 text-[#b18a3d]" /><div><h3 className="font-bold text-[#10233f]">Find Us</h3><p className="mt-1 text-sm leading-6 text-slate-600">Nehru Street, Tatabad / Rathinapuri, Coimbatore, Tamil Nadu, India</p></div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
