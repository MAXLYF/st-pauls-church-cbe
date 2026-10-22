"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pastPriests, historicalJourneyInfo } from "@/lib/data/pastors";
import HistoricalPhoto from "@/components/HistoricalPhoto";
import { Calendar, ArrowRight, Sparkles, User, Cross } from "lucide-react";
import { Pastor } from "@/types";

function PriestTimelineCard({
  pastor,
  index,
  total
}: {
  pastor: Pastor;
  index: number;
  total: number;
}) {
  const [imgError, setImgError] = useState(false);

  // Extract initials (e.g. Fr. Arockiasamy -> AS)
  const getInitials = (name: string) => {
    const parts = name.replace(/^Fr\.\s*/i, "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "SP";
  };

  const initials = getInitials(pastor.name);
  const photoSrc = pastor.photo || pastor.photoUrl || pastor.image;

  // Ordinal suffix (1st, 2nd, 3rd...)
  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="relative md:pl-28 transition-all">
      {/* Desktop Vertical Milestone Badge */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute left-6 top-8 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#80142b] to-[#4e0917] text-[#f5d77f] font-black text-sm border-2 border-[#d4af37] shadow-lg z-10"
      >
        {index + 1}
      </div>

      <article className="group rounded-3xl border border-[#e5dcce] bg-white p-6 sm:p-8 md:p-9 shadow-md transition-all duration-300 hover:border-[#c59b27] hover:shadow-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8db] pb-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#781226] to-[#4e0917] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#f5d77f] shadow-xs">
              <Calendar className="h-3.5 w-3.5 text-[#f5d77f]" />
              <span>{pastor.displayPeriod}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf6ea] border border-[#e8dfcb] px-3 py-1 text-xs font-bold text-[#80142b]">
              <Sparkles className="h-3 w-3 text-[#c59b27]" />
              <span>{getOrdinal(index + 1)} Parish Priest</span>
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md">
            Order {index + 1} of {total}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
          {/* Priest Portrait / Monogram Frame */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#781226] to-[#3a0812] border-2 border-[#d4af37]/60 shadow-md flex items-center justify-center text-white">
            {!imgError && photoSrc ? (
              <Image
                src={photoSrc}
                alt={`${pastor.name} portrait`}
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Clerical Monogram */
              <div className="flex flex-col items-center justify-center p-3 text-center select-none">
                <span className="text-[#f5d77f] font-serif text-2xl sm:text-3xl font-extrabold tracking-wider">
                  {initials}
                </span>
                <span className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">
                  Parish Priest
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1f040b] group-hover:text-[#80142b] transition-colors">
              <Link href={`/about/pastors/${pastor.id}`}>
                {pastor.name}
              </Link>
            </h3>

            <p className="mt-1 text-xs sm:text-sm font-bold text-[#80142b] uppercase tracking-wider">
              {pastor.role || "Parish Priest"} • St. Paul&apos;s Catholic Church, Rathinapuri
            </p>

            <p className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              {pastor.description ||
                pastor.biography ||
                "Dedicated shepherd who faithfully guided the sacramental, liturgical, and pastoral life of the St. Paul's Church community."}
            </p>

            {/* Profile Link Button */}
            <div className="mt-5 pt-4 border-t border-[#f2ece1] flex items-center justify-between">
              <Link
                href={`/about/pastors/${pastor.id}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#80142b] hover:text-[#9e1c36] transition-colors group/link"
              >
                <span>Read Full Biography &amp; Ministry</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function PastorsPageClient() {
  const pastors = pastPriests;

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* Breadcrumbs - Placed above page title */}
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Our Priests Through the Years" }
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
            {/* Eyebrow / Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] uppercase shadow-sm backdrop-blur">
              OUR PRIESTS THROUGH THE YEARS
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Shepherds of Our Faith
            </h1>

            {/* Gold Divider */}
            <div className="mx-auto mt-3 h-1 w-20 bg-[#c59b27] rounded-full" />

            {/* Subtitle */}
            <p className="mt-5 text-base md:text-lg font-medium text-slate-200 leading-relaxed italic">
              &ldquo;Honouring the priests who have faithfully served our parish community.&rdquo;
            </p>

            {/* Introduction */}
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
              From our canonical erection in 1983 to the present day, St. Paul&apos;s Catholic Church, Rathinapuri has been blessed by devoted shepherds who dedicated their lives to God and the community. This vertical chronological timeline honours each parish priest in order of their service.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/10 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
              CHRONOLOGICAL SUCCESSION
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#1f040b]">
              Parish Priests Timeline (1983 &ndash; Present)
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-[#c59b27] rounded-full" />
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Follow the unbroken line of shepherds who guided our congregation through each decade of growth, construction, and spiritual renewal.
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative">
            {/* Desktop Golden Timeline Track Line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#c59b27] via-[#80142b]/40 to-[#c59b27]"
            />

            {/* Priest Cards in Vertical Chronological Order */}
            <div className="space-y-10 md:space-y-12">
              {pastors.map((pastor, index) => (
                <PriestTimelineCard
                  key={pastor.id}
                  pastor={pastor}
                  index={index}
                  total={pastors.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Journey / Church Archive Photo Wall */}
      <section className="py-14 md:py-20 bg-[#fbf8f1] border-t border-[#e7dec8]">
        <div className="container-site max-w-5xl">
          <HistoricalPhoto
            imageSrc={historicalJourneyInfo.image || "/images/church-banner.jpg"}
            caption={
              historicalJourneyInfo.caption ||
              "Parish Priests of St. Paul's Catholic Church, Rathinapuri through the years"
            }
          />
        </div>
      </section>

      {/* Related Parish Links */}
      <section className="border-t border-[#e7dec8] bg-white py-12">
        <div className="container-site max-w-4xl text-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            Explore Parish Heritage &amp; Vocations
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-[#80142b] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#80142b] transition hover:bg-[#80142b] hover:text-white"
            >
              ← About the Parish
            </Link>
            <Link
              href="/about/sons-of-the-soil"
              className="inline-flex items-center gap-2 rounded-xl bg-[#80142b] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#f5d77f] transition hover:bg-[#9e1c36]"
            >
              Sons of the Soil →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
