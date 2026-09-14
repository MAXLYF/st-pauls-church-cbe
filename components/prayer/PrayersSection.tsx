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
        return <Sun className="h-5 w-5 text-[#b18a3d]" />;
      case "Moon":
        return <Moon className="h-5 w-5 text-[#b18a3d]" />;
      case "Users":
        return <Users className="h-5 w-5 text-[#b18a3d]" />;
      case "Cross":
        return <Cross className="h-5 w-5 text-[#b18a3d]" />;
      case "Shield":
        return <Shield className="h-5 w-5 text-[#b18a3d]" />;
      case "Book":
        return <BookOpen className="h-5 w-5 text-[#b18a3d]" />;
      case "Sparkles":
        return <Sparkles className="h-5 w-5 text-[#b18a3d]" />;
      default:
        return <Heart className="h-5 w-5 text-[#b18a3d]" />;
    }
  };

  return (
    <section id="prayers-section" className="section-pad bg-[#fbf8f1]">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            PRAYERS
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
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
              className="group flex flex-col justify-between rounded-3xl border border-[#e7dec8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b18a3d] hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2eee5] border border-[#d8bb73]/30 transition-colors group-hover:bg-[#10233f] group-hover:text-[#d8bb73]">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="rounded-full bg-[#fbf8f1] px-2.5 py-0.5 text-[11px] font-bold text-slate-500 border border-[#e7dec8]">
                    Catholic
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#10233f] group-hover:text-[#18365f] transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#b18a3d]">
                  {cat.tamilName}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  Devotional prayers and traditional petitions for parish families.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-[#10233f] group-hover:text-[#b18a3d] transition-colors">
                <span>View Prayers</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Informational Parish Note */}
        <div className="mt-10 rounded-2xl bg-white p-6 border border-[#e7dec8] text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-[#10233f]">Note:</strong> The parish prayer repository is continuously updated with Catholic prayer texts, audio chants, and printable PDFs in English &amp; Tamil.
          </p>
        </div>
      </div>
    </section>
  );
}
