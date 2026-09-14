"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import type { Ministry, MinistryCategory } from "@/lib/ministries-data";

// ── Category badge colour map ──────────────────────────────────────────────

const categoryColour: Record<string, string> = {
  Liturgy:          "bg-purple-100 text-purple-800",
  Music:            "bg-blue-100 text-blue-800",
  "Faith Formation":"bg-amber-100 text-amber-800",
  Children:         "bg-green-100 text-green-800",
  Media:            "bg-slate-100 text-slate-700",
  Youth:            "bg-orange-100 text-orange-800",
  Service:          "bg-red-100 text-red-800",
  Prayer:           "bg-indigo-100 text-indigo-800",
  Fellowship:       "bg-teal-100 text-teal-800",
};

// ── Ministry Card ─────────────────────────────────────────────────────────

function MinistryCard({ ministry }: { ministry: Ministry }) {
  const badgeCls =
    categoryColour[ministry.category] ?? "bg-slate-100 text-slate-700";

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white
                 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Cover image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {ministry.coverImage ? (
          <Image
            src={ministry.coverImage}
            alt={`${ministry.name} ministry`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#10233f]/10">
            <span className="text-3xl text-[#b18a3d]/40">✝</span>
          </div>
        )}
        {/* Category badge over image */}
        <div className="absolute left-4 top-4">
          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[.12em] ${badgeCls}`}>
            {ministry.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold text-[#10233f]">{ministry.name}</h2>
        <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
          {ministry.shortDescription}
        </p>

        {ministry.motto && (
          <blockquote className="mt-4 border-l-2 border-[#b18a3d] pl-3 text-xs italic leading-5 text-slate-500">
            &ldquo;{ministry.motto}&rdquo;
          </blockquote>
        )}

        {ministry.establishedYear && (
          <p className="mt-3 text-xs text-slate-400">
            Established: {ministry.establishedYear}
          </p>
        )}

        <Link
          href={`/ministries/${ministry.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#b18a3d]
                     transition-colors hover:text-[#9a762f]"
          aria-label={`View ${ministry.name} ministry details`}
        >
          View Ministry <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

// ── Main Grid Component ───────────────────────────────────────────────────

type Props = {
  ministries: Ministry[];
  categories: MinistryCategory[];
};

export default function MinistriesGrid({ ministries, categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return ministries.filter((m) => {
      const matchesCategory =
        activeCategory === "All" || m.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [ministries, query, activeCategory]);

  const allCategories = ["All", ...categories];

  return (
    <section className="section-pad bg-[#fbf8f1]" aria-label="Ministries listing">
      <div className="container-site">
        {/* ── Search + Filter ── */}
        <div className="mb-10 space-y-5">
          {/* Search */}
          <div className="relative mx-auto max-w-md">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search ministries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-5
                         text-sm shadow-sm outline-none transition focus:border-[#b18a3d] focus:ring-2 focus:ring-[#b18a3d]/20"
              aria-label="Search ministries"
            />
          </div>

          {/* Category pills — horizontally scrollable on mobile */}
          <div
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
            role="group"
            aria-label="Filter by category"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[.12em] transition-all
                  ${
                    activeCategory === cat
                      ? "border-[#10233f] bg-[#10233f] text-white shadow"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#b18a3d] hover:text-[#b18a3d]"
                  }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <MinistryCard key={m.id} ministry={m} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-slate-400">
              No ministries found
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="mt-5 rounded-full border border-[#b18a3d] px-5 py-2 text-sm font-semibold text-[#b18a3d] hover:bg-[#b18a3d] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-16 rounded-3xl bg-[#10233f] px-8 py-10 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d8bb73]">
            Get Involved
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Serve with your gifts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Every ministry at St. Paul''s Church is an opportunity to serve God
            and the parish community. Browse the ministries above and click
            &ldquo;View Ministry&rdquo; to learn more and express your interest.
          </p>
        </div>
      </div>
    </section>
  );
}
