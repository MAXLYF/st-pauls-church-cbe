import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "About St. Paul's Church Rathinapuri | Our Parish",
  description:
    "Discover the history, faith, fellowship, clergy leadership, and parish community of St. Paul's Church, Rathinapuri, Coimbatore.",
  keywords: [
    "About St Paul's Church",
    "St Paul's Church Rathinapuri History",
    "Catholic Church Coimbatore",
    "Rathinapuri Parish"
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f1]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-20 md:py-28 text-white overflow-hidden">
        {/* Subtle decorative cross background accent */}
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-96 w-96 rounded-full bg-[#c59b27]/10 blur-3xl"
        />
        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block rounded-full bg-[#781226]/40 px-4 py-1 text-xs font-bold tracking-[.25em] text-[#f5d77f] border border-[#d4af37]/30 backdrop-blur">
              OUR PARISH &amp; HERITAGE
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
              About St. Paul&apos;s Church
            </h1>
            <div className="mt-3 h-1 w-20 bg-[#c59b27] rounded-full" />
            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-300">
              Faith, fellowship, service and prayer in the heart of Rathinapuri, Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are / Parish History */}
      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl">
            <div className="relative h-[360px] sm:h-[420px] w-full">
              <Image
                src="/images/church-front.png"
                alt="St. Paul's Church, Rathinapuri"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1b0308]/90 via-[#3d0813]/60 to-transparent p-6 text-white">
              <div className="text-xs font-bold tracking-widest text-[#f5d77f] uppercase">
                Established in Faith
              </div>
              <p className="text-sm text-slate-200 mt-1">
                Nehru Street, Tatabad - Rathinapuri, Coimbatore
              </p>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow="WHO WE ARE"
              title="A Vibrant Catholic Parish Community"
              description="St. Paul's Church in Coimbatore is a Roman Catholic parish located in the Rathinapuri area of the city. It falls under the jurisdiction of the Roman Catholic Diocese of Coimbatore and is situated on Nehru Street in the Tatabad locality."
            />

            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                From humble beginnings to a thriving spiritual center, our parish has nurtured
                generations in faith, family prayer, and charitable mission across the Coimbatore
                region.
              </p>
            </div>

            {/* Core Parish Pillars */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#e7dec8] bg-white p-5 text-center shadow-sm transition hover:border-[#c59b27] hover:shadow-md">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#781226]/10 text-[#80142b]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 2v6H5v2h6v12h2V10h6V8h-6V2h-2z" />
                  </svg>
                </div>
                <div className="font-bold text-[#1f040b]">Faith</div>
                <div className="mt-1 text-xs text-slate-500">Grounded in the Holy Gospel</div>
              </div>

              <div className="rounded-2xl border border-[#e7dec8] bg-white p-5 text-center shadow-sm transition hover:border-[#c59b27] hover:shadow-md">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#781226]/10 text-[#80142b]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="font-bold text-[#1f040b]">Fellowship</div>
                <div className="mt-1 text-xs text-slate-500">United as one body in Christ</div>
              </div>

              <div className="rounded-2xl border border-[#e7dec8] bg-white p-5 text-center shadow-sm transition hover:border-[#c59b27] hover:shadow-md">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#781226]/10 text-[#80142b]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="font-bold text-[#1f040b]">Service</div>
                <div className="mt-1 text-xs text-slate-500">Love in action for all</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parish Leadership / Clergy */}
      <section className="bg-[#f2eee5] section-pad">
        <div className="container-site">
          <SectionTitle
            eyebrow="LEADERSHIP"
            title="Current Parish Clergy"
            description="Our resident parish priests guiding our spiritual life, liturgies, and pastoral care."
          />
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white p-6 text-center shadow-md border border-[#e7dec8] transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-2xl bg-slate-50">
                <Image
                  src="/images/parish-priest.png"
                  alt="Parish priest of St. Paul's Church"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#1f040b]">Parish Priest</h3>
              <p className="mt-1 text-xs font-semibold text-[#80142b] uppercase tracking-wider">
                St. Paul&apos;s Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Guiding the pastoral flock and parish ministries in faith and grace.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 text-center shadow-md border border-[#e7dec8] transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-2xl bg-slate-50">
                <Image
                  src="/images/assistant-priest.png"
                  alt="Assistant priest of St. Paul's Church"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#1f040b]">Assistant Priest</h3>
              <p className="mt-1 text-xs font-semibold text-[#80142b] uppercase tracking-wider">
                St. Paul&apos;s Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Assisting in holy sacraments, youth animation, and catechism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-pad">
        <div className="container-site">
          <div className="rounded-3xl bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#c59b27]/10 blur-2xl"
            />
            <div className="relative z-10 grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">
                  OUR MISSION
                </div>
                <h3 className="mt-2 text-2xl font-bold">Proclaiming the Gospel</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To proclaim the Good News of Jesus Christ through sacred liturgy, devout prayer,
                  active catechesis, and compassionate outreach to those in need throughout our
                  neighborhood.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">
                  OUR VISION
                </div>
                <h3 className="mt-2 text-2xl font-bold">A United Christian Family</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To be an ever-welcoming spiritual haven where families grow together in holiness,
                  youth are inspired to serve, and the love of God is reflected in every act of
                  fellowship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
