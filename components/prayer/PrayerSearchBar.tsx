"use client";

import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { PrayerResourceLanguage, PrayerResourceType } from "@/types";

interface PrayerSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: PrayerResourceType | "all";
  onCategoryChange: (category: PrayerResourceType | "all") => void;
  selectedLanguage: PrayerResourceLanguage;
  onLanguageChange: (language: PrayerResourceLanguage) => void;
  totalResultsCount?: number;
}

export default function PrayerSearchBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLanguage,
  onLanguageChange,
  totalResultsCount
}: PrayerSearchBarProps) {
  const categories: { id: PrayerResourceType | "all"; label: string }[] = [
    { id: "all", label: "All Resources" },
    { id: "novena", label: "Novena" },
    { id: "bible", label: "Bible" },
    { id: "prayer", label: "Prayers" },
    { id: "hymn", label: "Hymns" },
    { id: "rosary", label: "Rosary" },
    { id: "devotional", label: "Devotionals" }
  ];

  const languages: PrayerResourceLanguage[] = ["All", "English", "Tamil"];

  return (
    <div className="rounded-3xl border border-[#e7dec8] bg-white p-5 shadow-sm md:p-6">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#b18a3d]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prayers, novenas, Bible resources, hymns..."
          aria-label="Search spiritual resources"
          className="w-full rounded-2xl border border-slate-200 bg-[#fbf8f1]/60 py-3.5 pl-12 pr-10 text-sm text-[#10233f] placeholder-slate-400 outline-none transition-all focus:border-[#b18a3d] focus:bg-white focus:ring-2 focus:ring-[#b18a3d]/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3.5 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters Row: Categories & Languages */}
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills (horizontally scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none lg:pb-0">
          <span className="hidden items-center gap-1 text-xs font-bold text-slate-400 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#b18a3d]" />
            Type:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#10233f] text-[#d8bb73] shadow-sm scale-102"
                  : "bg-[#f2eee5] text-slate-700 hover:bg-[#e7dec8] hover:text-[#10233f]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Language Filter */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 sm:justify-end lg:border-t-0 lg:pt-0">
          <span className="text-xs font-semibold text-slate-500">Language:</span>
          <div className="flex rounded-full bg-[#f2eee5] p-1 border border-[#e7dec8]">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  selectedLanguage === lang
                    ? "bg-white text-[#10233f] shadow-xs"
                    : "text-slate-600 hover:text-[#10233f]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Search/Filter Status */}
      {(searchQuery || selectedCategory !== "all" || selectedLanguage !== "All") && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div>
            Showing filters:{" "}
            {selectedCategory !== "all" && (
              <span className="font-semibold text-[#10233f] capitalize mr-2">
                • {selectedCategory}
              </span>
            )}
            {selectedLanguage !== "All" && (
              <span className="font-semibold text-[#10233f] mr-2">
                • {selectedLanguage}
              </span>
            )}
            {searchQuery && (
              <span className="font-semibold text-[#10233f]">
                • &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onCategoryChange("all");
              onLanguageChange("All");
            }}
            className="font-semibold text-[#b18a3d] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
