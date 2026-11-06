import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  parishVocations,
  religiousBrothersAndSisters
} from "@/lib/data/sons-of-parish";
import ParishVocationCard from "@/components/ParishVocationCard";
import ReligiousServantCard from "@/components/ReligiousServantCard";
import { HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sons of the Soil | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Discover the priests and religious brothers and sisters connected with St. Paul's Catholic Church, Rathinapuri and celebrate their vocation and service to the Church.",
  keywords: [
    "Sons of the Soil St. Paul's Catholic Church",
    "Priestly Vocations Rathinapuri",
    "Religious Brothers and Sisters Coimbatore",
    "Catholic Vocations St. Paul's Catholic Church"
  ]
};

export default function SonsOfTheSoilPage() {
  const vocations = parishVocations.filter(
    (person) => person.published !== false
  );
  const religiousServants = religiousBrothersAndSisters.filter(
    (person) => person.published !== false
  );

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Sons of the Soil" }
        ]}
      />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-16 md:py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-[#c59b27]/10 blur-3xl"
        />

        <div className="container-site relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            {/* Small Gold Uppercase Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] uppercase shadow-sm">
              SONS OF THE SOIL
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              &ldquo;Sons of the Soil&rdquo;
            </h1>

            {/* Gold Divider */}
            <div className="mx-auto mt-3 h-1 w-20 bg-[#c59b27] rounded-full" />

            {/* Subtitle */}
            <p className="mt-5 text-base md:text-lg font-medium text-slate-200 leading-relaxed italic">
              &ldquo;Celebrating those from our parish who have answered God&apos;s call to serve the Church and God&apos;s people.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Short Introduction Section */}
      <section className="py-10 md:py-14 border-b border-[#e7dec8]/80 bg-white">
        <div className="container-site max-w-3xl text-center">
          <div className="rounded-3xl bg-[#fbf8f1] p-6 sm:p-8 md:p-10 border border-[#e7dec8] shadow-xs">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#781226]/10 text-[#80142b]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <p className="text-sm md:text-base leading-relaxed text-slate-700 font-medium">
              &ldquo;Our parish is grateful for the men and women who have heard God&apos;s call and dedicated their lives to the service of the Church.&rdquo;
            </p>
            <div className="mt-4 text-xs font-bold uppercase tracking-wider text-[#80142b]">
              Parish Vocations &amp; Consecrated Life
            </div>
          </div>
        </div>
      </section>

      {/* Profile Cards List Section */}
      <section className="py-14 md:py-20">
        <div className="container-site max-w-5xl">
          {/* 1. Fathers Profile Cards List */}
          <div className="space-y-8 md:space-y-12">
            {vocations.map((person, index) => (
              <ParishVocationCard
                key={person.id || `vocation-${index}`}
                person={person}
                index={index}
              />
            ))}
          </div>

          {/* Ornamental Gold Section Divider */}
          <div
            className="my-16 md:my-20 flex items-center justify-center gap-4"
            aria-hidden="true"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59b27]/70 to-[#c59b27]" />
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c59b27]/50 bg-white text-[#80142b] shadow-sm">
              <span className="text-base font-bold text-[#c59b27]">✝</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c59b27]/70 to-[#c59b27]" />
          </div>

          {/* 2. Religious Brothers & Sisters Section */}
          <div aria-labelledby="religious-servants-heading">
            <div className="mx-auto mb-10 md:mb-12 max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#80142b]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#80142b]">
                <span>✝ CONSECRATED VOCATIONS</span>
              </div>

              <h2
                id="religious-servants-heading"
                className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1f040b] uppercase"
              >
                RELIGIOUS BROTHERS &amp; SISTERS
              </h2>

              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />

              <p className="mt-4 text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                Honouring the dedicated religious servants of our parish.
              </p>
            </div>

            {/* Responsive 3-Card Showcase (1 col mobile, 2 col tablet, 3 col desktop) */}
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {religiousServants.map((profile, index) => (
                <ReligiousServantCard
                  key={profile.id}
                  profile={profile}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Footer Vocation Prayer Message */}
          <div className="mt-16 text-center max-w-2xl mx-auto rounded-3xl bg-white border border-[#e7dec8] p-8 md:p-10 shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#781226]/10 text-[#80142b] border border-[#c59b27]/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-base md:text-lg font-serif italic text-[#1f040b] leading-relaxed">
              &ldquo;We continue to pray for more vocations from our parish. May God bless and strengthen them in their journey.&rdquo;
            </p>
            <div className="mt-4 text-xs font-bold uppercase tracking-widest text-[#80142b]">
              St. Paul&apos;s Catholic Church Vocation Prayer
            </div>
          </div>

          {/* Bottom Parish Heritage Links */}
          <div className="mt-14 text-center border-t border-[#e7dec8] pt-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              Explore More About Our Parish Community
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-[#80142b] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#80142b] transition hover:bg-[#f5eddf]"
              >
                ← About the Parish
              </Link>
              <Link
                href="/about/pastors"
                className="inline-flex items-center gap-2 rounded-xl bg-[#80142b] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f5d77f] transition hover:bg-[#9e1c36]"
              >
                Our Priests Through the Years →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
