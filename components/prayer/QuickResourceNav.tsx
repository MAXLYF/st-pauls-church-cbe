"use client";

import React from "react";
import {
  Calendar,
  BookOpen,
  Heart,
  Music,
  CircleDot,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { resourceCategories } from "@/lib/data/prayers";
import { PrayerResourceType } from "@/types";

interface QuickResourceNavProps {
  onCategorySelect?: (category: PrayerResourceType) => void;
}

export default function QuickResourceNav({ onCategorySelect }: QuickResourceNavProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      case "BookOpen":
        return <BookOpen className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      case "Heart":
        return <Heart className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      case "Music":
        return <Music className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      case "CircleDot":
        return <CircleDot className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-[#b18a3d] transition-transform duration-300 group-hover:scale-110" />;
      default:
        return <Sparkles className="h-6 w-6 text-[#b18a3d]" />;
    }
  };

  const handleCardClick = (cat: typeof resourceCategories[0]) => {
    if (onCategorySelect) {
      onCategorySelect(cat.id);
    }
    const element = document.getElementById(cat.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative -mt-8 z-20">
      <div className="container-site">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourceCategories.map((cat) => (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(cat)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(cat);
                }
              }}
              aria-label={`Explore ${cat.name}: ${cat.description}`}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#e7dec8] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b18a3d] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#b18a3d] focus:ring-offset-2 cursor-pointer"
            >
              {/* Card Header & Icon */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbf8f1] border border-[#d8bb73]/30 transition-colors duration-300 group-hover:bg-[#10233f] group-hover:border-[#10233f]">
                    {React.cloneElement(getIcon(cat.iconName), {
                      className:
                        "h-6 w-6 text-[#b18a3d] group-hover:text-[#d8bb73] transition-colors duration-300 group-hover:scale-110"
                    })}
                  </div>
                  <span className="rounded-full bg-[#f2eee5] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#10233f]">
                    {cat.badgeText}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="mt-5 text-xl font-bold tracking-tight text-[#10233f] group-hover:text-[#18365f] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-0.5 text-xs font-semibold text-[#b18a3d]">
                  {cat.subtitle}
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {cat.description}
                </p>
              </div>

              {/* Action Link Button */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10233f] group-hover:text-[#b18a3d] transition-colors">
                <span>Explore {cat.name}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
