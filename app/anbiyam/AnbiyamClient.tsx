"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Users,
  Church,
  X,
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  Phone,
  UserCheck,
  HeartHandshake,
  Cross
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AnbiyamItem } from "@/lib/data/anbiyam-data";

interface AnbiyamClientProps {
  anbiyams: AnbiyamItem[];
}

export default function AnbiyamClient({ anbiyams }: AnbiyamClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnbiyam, setSelectedAnbiyam] = useState<AnbiyamItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAnbiyam(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAnbiyam) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedAnbiyam]);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Filter anbiyams by Tamil name or ID
  const filteredAnbiyams = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return anbiyams;

    return anbiyams.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(query);
      const idMatch = String(item.id).includes(query);
      const addressMatch = item.address ? item.address.toLowerCase().includes(query) : false;
      return nameMatch || idMatch || addressMatch;
    });
  }, [anbiyams, searchQuery]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Anbiyam" }]} />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-16 text-center text-white md:py-20"
        aria-label="Anbiyam hero banner"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(197,155,39,0.22) 0%, transparent 70%)"
          }}
        />

        <div className="container-site relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 backdrop-blur-xs">
            <Church className="h-3.5 w-3.5 text-[#f5d77f]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[.25em] text-[#f5d77f]">
              OUR PARISH COMMUNITIES
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Anbiyam
          </h1>

          <p className="mt-2 text-sm font-semibold tracking-wider text-[#f5d77f] uppercase md:text-base">
            Our Parish Anbiyams • பங்கு அன்பியங்கள்
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            &ldquo;Growing together in faith, prayer, fellowship and service.&rdquo;
          </p>

          <div className="mx-auto mt-6 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />
        </div>
      </section>

      {/* Directory Main Section */}
      <section className="section-pad pt-10 pb-20">
        <div className="container-site">
          {/* Search & Stats Bar */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Box */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Anbiyam..."
                aria-label="Search Anbiyam by Tamil name or number"
                className="w-full rounded-2xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition focus:border-[#c59b27] focus:outline-none focus:ring-2 focus:ring-[#c59b27]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Counter Badge */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-2xs">
                <Users className="h-3.5 w-3.5 text-[#80142b]" />
                <span>
                  Showing <strong className="text-[#80142b]">{filteredAnbiyams.length}</strong> of{" "}
                  <strong>{anbiyams.length}</strong> Anbiyams
                </span>
              </span>
            </div>
          </div>

          {/* If No Results */}
          {filteredAnbiyams.length === 0 && (
            <div className="my-12 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
              <Church className="mx-auto h-12 w-12 text-[#80142b]/60" />
              <h3 className="mt-4 text-lg font-bold text-[#1f040b]">
                No Anbiyams Found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                No matching Anbiyam found for &quot;{searchQuery}&quot;. Try searching with a different Tamil name or number.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#80142b] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#9e1c36]"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* 40 Anbiyams Responsive Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnbiyams.map((anbiyam) => {
              const hasImgError = imageErrors[anbiyam.id];

              return (
                <article
                  key={anbiyam.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#c59b27]/50 hover:shadow-md"
                >
                  {/* Photo Area */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#25050c]">
                    {!hasImgError ? (
                      <img
                        src={anbiyam.photo}
                        alt={`${anbiyam.name} - St. Paul's Church`}
                        onError={() => handleImageError(anbiyam.id)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      /* Elegant Branded Placeholder */
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-xs transition-transform duration-300 group-hover:scale-110">
                          <Church className="h-7 w-7 text-[#f5d77f]" />
                        </div>
                        <span className="mt-3 text-xs font-semibold tracking-wider text-slate-300">
                          St. Paul&apos;s Church
                        </span>
                      </div>
                    )}

                    {/* Subtle Overlay Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    {/* Top Anbiyam Number Badge */}
                    <div className="absolute left-3.5 top-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-[#781226]/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#f5d77f] backdrop-blur-sm shadow-xs">
                        <Cross className="h-2.5 w-2.5" />
                        #{String(anbiyam.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Anbiyam Badge */}
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-widest text-[#80142b] uppercase">
                        ANBIYAM {anbiyam.id}
                      </span>
                    </div>

                    {/* Anbiyam Name (Tamil) */}
                    <h2 className="text-lg font-bold leading-snug text-[#1f040b] transition-colors group-hover:text-[#80142b] font-sans">
                      {anbiyam.name}
                    </h2>

                    {/* Location / Address Line */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#80142b]" aria-hidden="true" />
                      {anbiyam.address ? (
                        <span className="font-medium text-slate-700 truncate">{anbiyam.address}</span>
                      ) : (
                        <span className="italic text-slate-400">Address to be added</span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Parish Community</span>
                      <button
                        type="button"
                        onClick={() => setSelectedAnbiyam(anbiyam)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#80142b] transition-colors hover:text-[#c59b27] focus:outline-none"
                        aria-label={`View details for ${anbiyam.name}`}
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Details Modal / Dialog */}
      {selectedAnbiyam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-anbiyam-title"
        >
          {/* Backdrop Click */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedAnbiyam(null)}
            aria-hidden="true"
          />

          {/* Modal Content Box */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-[#e7dec8] bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header Banner */}
            <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206]">
              {!imageErrors[selectedAnbiyam.id] ? (
                <img
                  src={selectedAnbiyam.photo}
                  alt={selectedAnbiyam.name}
                  onError={() => handleImageError(selectedAnbiyam.id)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-xs">
                    <Church className="h-6 w-6 text-[#f5d77f]" />
                  </div>
                  <span className="mt-2 text-xs font-semibold tracking-wider text-slate-300">
                    St. Paul&apos;s Church Rathinapuri
                  </span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedAnbiyam(null)}
                aria-label="Close details"
                className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Badge on Banner */}
              <div className="absolute bottom-3 left-4">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/40 bg-[#781226]/90 px-3 py-1 text-xs font-bold text-[#f5d77f] backdrop-blur-sm">
                  <Cross className="h-3 w-3" />
                  ANBIYAM #{selectedAnbiyam.id}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h2
                id="modal-anbiyam-title"
                className="text-2xl font-bold text-[#1f040b] font-sans"
              >
                {selectedAnbiyam.name}
              </h2>

              <p className="mt-1 text-xs font-semibold text-[#80142b] uppercase tracking-wider">
                Basic Ecclesial Community (Anbiyam {selectedAnbiyam.id})
              </p>

              {/* Details List */}
              <div className="mt-6 space-y-3.5 rounded-2xl border border-slate-100 bg-[#fbf8f1] p-4 text-xs">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs">
                    <MapPin className="h-3.5 w-3.5 text-[#80142b]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1f040b] block">Location / Address</span>
                    <span className="text-slate-600">
                      {selectedAnbiyam.address || "Address to be added"}
                    </span>
                  </div>
                </div>

                {/* Coordinator */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs">
                    <UserCheck className="h-3.5 w-3.5 text-[#80142b]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1f040b] block">Anbiyam Coordinator</span>
                    <span className="text-slate-500 italic">
                      {selectedAnbiyam.coordinator || "Details coming soon"}
                    </span>
                  </div>
                </div>

                {/* Meeting Schedule */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs">
                    <Calendar className="h-3.5 w-3.5 text-[#80142b]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1f040b] block">Meeting Schedule</span>
                    <span className="text-slate-500 italic">
                      {selectedAnbiyam.meetingDay || selectedAnbiyam.meetingTime
                        ? `${selectedAnbiyam.meetingDay || ""} ${selectedAnbiyam.meetingTime || ""}`.trim()
                        : "Details coming soon"}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-2xs">
                    <Phone className="h-3.5 w-3.5 text-[#80142b]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1f040b] block">Contact</span>
                    <span className="text-slate-500 italic">
                      {selectedAnbiyam.contact || "Details coming soon"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <p className="mt-4 text-[11px] leading-relaxed text-slate-500 text-center">
                For more details regarding your local Anbiyam meetings and prayers, please contact the Parish Office.
              </p>

              {/* Footer action */}
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedAnbiyam(null)}
                  className="w-full rounded-xl bg-[#80142b] py-2.5 text-xs font-semibold text-white transition hover:bg-[#9e1c36]"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
