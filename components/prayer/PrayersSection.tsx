"use client";

import React, { useState } from "react";
import {
  Sun,
  Moon,
  Users,
  Cross,
  Shield,
  BookOpen,
  Sparkles,
  Heart,
  ChevronRight,
  FileText,
  Volume2
} from "lucide-react";
import { prayerCategoriesList } from "@/lib/data/prayers";
import { PrayerResource } from "@/types";

interface PrayersSectionProps {
  resources: PrayerResource[];
  onOpenPrayer?: (categoryName: string) => void;
}

export default function PrayersSection({
  resources,
  onOpenPrayer
}: PrayersSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "Sun":
        return <Sun className="h-5 w-5 text-[#80142b]" />;
      case "Moon":
        return <Moon className="h-5 w-5 text-[#80142b]" />;
      case "Users":
        return <Users className="h-5 w-5 text-[#80142b]" />;
      case "Cross":
        return <Cross className="h-5 w-5 text-[#80142b]" />;
      case "Shield":
        return <Shield className="h-5 w-5 text-[#80142b]" />;
      case "Book":
        return <BookOpen className="h-5 w-5 text-[#80142b]" />;
      case "Sparkles":
        return <Sparkles className="h-5 w-5 text-[#80142b]" />;
      default:
        return <Heart className="h-5 w-5 text-[#80142b]" />;
    }
  };

  return (
    <section id="prayers-section" className="section-pad bg-[#fbf8f1]">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
            PRAYERS
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1f040b] md:text-4xl">
            Parish Devotions &amp; Catholic Prayers
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-base font-medium text-slate-600">
            &ldquo;Rejoice always, pray continually, give thanks in all circumstances.&rdquo;
          </p>
        </div>

        {/* 8 Prayer Category Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {prayerCategoriesList.map((cat) => (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectedCat(cat.name);
                if (onOpenPrayer) onOpenPrayer(cat.name);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCat(cat.name);
                  if (onOpenPrayer) onOpenPrayer(cat.name);
                }
              }}
              aria-label={`Open ${cat.name} prayers`}
              className="group flex flex-col justify-between rounded-3xl border border-[#e7dec8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c59b27] hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2eee5] border border-[#c59b27]/30 transition-colors group-hover:bg-[#80142b] group-hover:text-[#f5d77f]">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="rounded-full bg-[#fbf8f1] px-2.5 py-0.5 text-[11px] font-bold text-slate-500 border border-[#e7dec8]">
                    Catholic
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#1f040b] group-hover:text-[#80142b] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#80142b]">
                  {cat.tamilName}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Devotional prayers and traditional petitions for parish families.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-[#1f040b] group-hover:text-[#80142b] transition-colors">
                <span>View Prayers</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Informational Parish Note */}
        <div className="mt-10 rounded-2xl bg-white p-6 border border-[#e7dec8] text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-[#80142b]">Note:</strong> The parish prayer repository is continuously updated with Catholic prayer texts, audio chants, and printable PDFs in English &amp; Tamil.
          </p>
        </div>
      </div>
    </section>
  );
}
