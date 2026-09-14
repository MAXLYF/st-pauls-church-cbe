"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pastPriests, historicalJourneyInfo } from "@/lib/data/pastors";
import PastorYearSelector from "@/components/PastorYearSelector";
import PastorProfile from "@/components/PastorProfile";
import PastorTimelineCard from "@/components/PastorTimelineCard";
import HistoricalPhoto from "@/components/HistoricalPhoto";

export default function PastorsPageClient() {
  const pastors = pastPriests;
  const [activeId, setActiveId] = useState<string>(pastors[0]?.id || "arockiasamy");

  const currentIndex = pastors.findIndex((p) => p.id === activeId);
  const activePastor = pastors[currentIndex] || pastors[0];

  const handleSelectPastor = (id: string) => {
    setActiveId(id);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveId(pastors[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < pastors.length - 1) {
      setActiveId(pastors[currentIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* Breadcrumbs - Placed above page title */}
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Our Pastors Through the Years" }
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
            {/* Eyebrow / Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb73]/30 bg-[#18365f]/90 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#d8bb73] uppercase shadow-sm">
              OUR PASTORS THROUGH THE YEARS
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Shepherds of Our Faith
            </h1>

            {/* Gold Divider */}
            <div className="mx-auto mt-3 h-1 w-20 bg-[#d8bb73] rounded-full" />

            {/* Subtitle */}
            <p className="mt-5 text-base md:text-lg font-medium text-slate-200 leading-relaxed italic">
              &ldquo;Honouring the priests who have faithfully served our parish community.&rdquo;
            </p>

            {/* Introduction */}
            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
              Through the years, St. Paul&apos;s Church has been blessed by priests who
              have dedicated their lives to serving God and the parish community.
              This timeline honours those who have served our parish across the years.
            </p>
          </div>
        </div>
      </section>

      {/* Core Interactive Timeline & Pastor Profile Section */}
      <section className="py-12 md:py-16">
        <div className="container-site max-w-5xl">
          {/* Horizontal Year Navigation Timeline */}
          <div className="mb-10 text-center">
            <h2 className="sr-only">Select Pastor by Year</h2>
            <PastorYearSelector
              pastors={pastors}
              activeId={activeId}
              onSelectPastor={handleSelectPastor}
            />
          </div>

          {/* Active Pastor Profile Section */}
          {activePastor && (
            <div className="mt-6">
              <PastorProfile
                pastor={activePastor}
                totalPastors={pastors.length}
                currentIndex={currentIndex >= 0 ? currentIndex : 0}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          )}
        </div>
      </section>

      {/* Complete Historical Roster / Archive View */}
      <section className="border-t border-[#e7dec8] bg-white py-14 md:py-20">
        <div className="container-site max-w-6xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
              CHRONOLOGICAL LINEAGE
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#10233f]">
              Pastoral Lineage Archive (1983 &ndash; Present)
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-[#d8bb73] rounded-full" />
            <p className="mt-3 text-sm text-slate-600">
              Click on any parish priest below to focus and explore their pastoral years.
            </p>
          </div>

          {/* Grid of All Historical Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {pastors.map((pastor, index) => {
              const isActive = pastor.id === activeId;
              return (
                <div key={pastor.id} className="flex">
                  <PastorTimelineCard
                    pastor={pastor}
                    isActive={isActive}
                    onClick={() => {
                      setActiveId(pastor.id);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    index={index}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Journey / Church Archive Photo Wall */}
      <section className="py-14 md:py-20 bg-[#fbf8f1] border-t border-[#e7dec8]">
        <div className="container-site max-w-5xl">
          <HistoricalPhoto
            imageSrc={historicalJourneyInfo.image || "/images/church-banner.jpg"}
            caption={historicalJourneyInfo.caption || "Parish Priests of St. Paul's Church through the years"}
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
              className="inline-flex items-center gap-2 rounded-xl border border-[#10233f] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#10233f] transition hover:bg-[#10233f] hover:text-white"
            >
              ← About the Parish
            </Link>
            <Link
              href="/about/sons-of-parish"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10233f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#d8bb73] transition hover:bg-[#18365f]"
            >
              Sons of the Parish →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
