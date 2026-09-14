import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { parishVocations } from "@/lib/data/sons-of-parish";
import ParishVocationCard from "@/components/ParishVocationCard";
import { HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Sons of the Parish | St. Paul's Church Rathinapuri",
  description:
    "Discover the priests and religious sisters connected with St. Paul's Church Rathinapuri and celebrate their vocation and service to the Church.",
  keywords: [
    "Sons of the Parish St Paul's Church",
    "Priestly Vocations Rathinapuri",
    "Religious Sisters Coimbatore",
    "Catholic Vocations St Paul's Church"
  ]
};

export default function SonsOfParishPage() {
  const vocations = parishVocations.filter((person) => person.published !== false);

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Sons of the Parish" }
        ]}
      />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10233f] via-[#142c4f] to-[#10233f] py-16 md:py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-[#d8bb73]/10 blur-3xl"
        />

        <div className="container-site relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            {/* Small Gold Uppercase Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb73]/30 bg-[#18365f]/90 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#d8bb73] uppercase shadow-sm">
              SONS OF THE PARISH
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Sons of the Parish
            </h1>

            {/* Gold Divider */}
            <div className="mx-auto mt-3 h-1 w-20 bg-[#d8bb73] rounded-full" />

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
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2eee5] text-[#b18a3d]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <p className="text-sm md:text-base leading-relaxed text-slate-700 font-medium">
              &ldquo;Our parish is grateful for the men and women who have heard God&apos;s call and dedicated their lives to the service of the Church.&rdquo;
            </p>
            <div className="mt-4 text-xs font-bold uppercase tracking-wider text-[#b18a3d]">
              Parish Vocations &amp; Consecrated Life
            </div>
          </div>
        </div>
      </section>

      {/* Profile Cards List Section */}
      <section className="py-14 md:py-20">
        <div className="container-site max-w-5xl">
          {/* Vertical list of separate horizontal profile cards */}
          <div className="space-y-8 md:space-y-12">
            {vocations.map((person, index) => (
              <ParishVocationCard
                key={person.id || `vocation-${index}`}
                person={person}
                index={index}
              />
            ))}
          </div>

          {/* Footer Vocation Prayer Message */}
          <div className="mt-16 text-center max-w-2xl mx-auto rounded-3xl bg-white border border-[#e7dec8] p-8 md:p-10 shadow-sm">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2eee5] text-[#b18a3d] border border-[#d8bb73]/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-base md:text-lg font-serif italic text-[#10233f] leading-relaxed">
              &ldquo;We continue to pray for more vocations from our parish. May God bless and strengthen them in their journey.&rdquo;
            </p>
            <div className="mt-4 text-xs font-bold uppercase tracking-widest text-[#b18a3d]">
              St. Paul&apos;s Church Vocation Prayer
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#10233f] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10233f] transition hover:bg-[#10233f] hover:text-white"
              >
                ← About the Parish
              </Link>
              <Link
                href="/about/pastors"
                className="inline-flex items-center gap-2 rounded-xl bg-[#10233f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#d8bb73] transition hover:bg-[#18365f]"
              >
                Our Pastors Through the Years →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
