import React from "react";
import { ParishEventCategory } from "@/types";
import { LayoutGrid, ListFilter } from "lucide-react";

const categories: { label: string; value: ParishEventCategory }[] = [
  { label: "ALL", value: "ALL" },
  { label: "HOLY MASS", value: "HOLY MASS" },
  { label: "FEAST", value: "FEAST" },
  { label: "NOVENA", value: "NOVENA" },
  { label: "CATECHISM", value: "CATECHISM" },
  { label: "YOUTH", value: "YOUTH" },
  { label: "MINISTRIES", value: "MINISTRIES" },
  { label: "COMMUNITY", value: "COMMUNITY" }
];

interface CategoryFilterRowProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  viewMode: "grid" | "timeline";
  onToggleViewMode: (mode: "grid" | "timeline") => void;
  totalCount: number;
}

export default function CategoryFilterRow({
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  totalCount
}: CategoryFilterRowProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-[#e7dec8]/80 pb-6">
      {/* Category Pills Bar (Horizontally scrollable on mobile) */}
      <div 
        className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-none max-w-full -mx-4 px-4 md:mx-0 md:px-0"
        role="tablist"
        aria-label="Filter events by category"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.value)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#80142b] text-white shadow-md border border-[#c59b27]/50 scale-[1.02]"
                  : "bg-white/90 text-slate-700 border border-[#e7dec8] hover:border-[#c59b27] hover:text-[#80142b] hover:bg-[#faf7f2]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* View Switcher & Result Count */}
      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
        <span className="text-xs font-semibold text-slate-500">
          Showing <strong className="text-[#80142b] font-bold">{totalCount}</strong> {totalCount === 1 ? "event" : "events"}
        </span>

        <div className="inline-flex rounded-full border border-[#e7dec8] bg-white p-1 shadow-2xs">
          <button
            onClick={() => onToggleViewMode("grid")}
            title="Grid View"
            aria-label="Switch to Grid View"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#80142b] text-white shadow-xs"
                : "text-slate-600 hover:text-[#80142b]"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => onToggleViewMode("timeline")}
            title="Timeline View"
            aria-label="Switch to Timeline View"
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              viewMode === "timeline"
                ? "bg-[#80142b] text-white shadow-xs"
                : "text-slate-600 hover:text-[#80142b]"
            }`}
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
