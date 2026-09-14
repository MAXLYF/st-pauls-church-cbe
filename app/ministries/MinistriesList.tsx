"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Ministry, MinistryCategory } from "@/lib/data/ministries";

const CATEGORIES: ("All" | MinistryCategory)[] = [
  "All",
  "Liturgy",
  "Music",
  "Faith Formation",
  "Children",
  "Media",
  "Youth",
  "Service",
  "Prayer",
  "Fellowship"
];

export default function MinistriesList({ initialMinistries }: { initialMinistries: Ministry[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | MinistryCategory>("All");

  const filteredMinistries = initialMinistries.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section-pad bg-[#fbf8f1]" aria-label="Ministries List">
      <div className="container-site">
        
        {/* Search & Filter Bar */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ministries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-[#b18a3d] focus:outline-none focus:ring-1 focus:ring-[#b18a3d]"
            />
          </div>
          
          <div className="flex w-full overflow-x-auto pb-2 md:w-auto md:pb-0 hide-scrollbar">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-[#10233f] text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-[#b18a3d] hover:text-[#b18a3d]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredMinistries.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No ministries found matching your criteria.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredMinistries.map((ministry) => (
              <Link
                key={ministry.id}
                href={`/ministries/${ministry.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ministry.coverImage}
                    alt={ministry.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded bg-black/40 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                      {ministry.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-[#10233f]">{ministry.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 flex-1">
                    {ministry.shortDescription}
                  </p>
                  
                  {ministry.motto && (
                    <p className="mt-4 text-xs italic text-[#b18a3d]">"{ministry.motto}"</p>
                  )}
                  {ministry.establishedYear && (
                    <p className="mt-1 text-xs text-slate-400">Est. {ministry.establishedYear}</p>
                  )}
                  
                  <div className="mt-6 flex items-center font-semibold text-[#b18a3d]">
                    View Ministry <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
