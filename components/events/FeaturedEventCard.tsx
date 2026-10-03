import React from "react";
import { ParishEvent } from "@/types";
import { Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";
import EventDateBadge from "./EventDateBadge";

interface FeaturedEventCardProps {
  event: ParishEvent;
  onSelect: (event: ParishEvent) => void;
}

export default function FeaturedEventCard({ event, onSelect }: FeaturedEventCardProps) {
  return (
    <section className="container-site -mt-8 relative z-20 mb-14">
      <article className="group overflow-hidden rounded-3xl border border-[#c59b27]/40 bg-white shadow-xl transition-all duration-300 hover:border-[#c59b27] hover:shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-12">
          {/* Left Column: Image / Poster */}
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:col-span-6 lg:min-h-[420px] overflow-hidden">
            <img
              src={event.image || event.imageUrl || "/images/events/feast-celebration.jpg"}
              alt={event.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft dark & maroon gradient overlay for text legibility & mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140207]/80 via-[#140207]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#140207]/20 lg:to-[#140207]/70" />

            {/* Top Badge: FEATURED EVENT */}
            <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#f5d77f]/50 bg-gradient-to-r from-[#80142b] via-[#9e1c36] to-[#80142b] px-4 py-1.5 text-xs font-extrabold tracking-wider text-white shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-[#f5d77f]" />
              <span>FEATURED EVENT</span>
            </div>

            {/* Category tag on image (mobile view support) */}
            <div className="absolute bottom-5 left-5 z-10 lg:hidden">
              <span className="rounded-full bg-[#faf7f2]/90 border border-[#c59b27]/40 px-3 py-1 text-xs font-bold tracking-wider text-[#80142b] backdrop-blur-xs">
                {event.category || "PARISH EVENT"}
              </span>
            </div>
          </div>

          {/* Right Column: Event Content */}
          <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-6 bg-gradient-to-br from-white via-[#faf7f2] to-[#f7f2e8]">
            <div>
              {/* Header row: Category & Large Calendar Date Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="hidden lg:inline-block rounded-full border border-[#80142b]/20 bg-[#80142b]/8 px-3.5 py-1 text-xs font-bold tracking-widest text-[#80142b] uppercase">
                    {event.category || "SPECIAL EVENT"}
                  </span>
                  <div className="mt-2 text-xs font-semibold tracking-wider text-[#c59b27] uppercase">
                    St. Paul&apos;s Church Rathinapuri
                  </div>
                </div>

                {/* Calendar-style Date Block */}
                <EventDateBadge date={event.date} size="lg" className="shrink-0" />
              </div>

              {/* Event Title */}
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1f040b] sm:text-3xl lg:text-3xl leading-snug group-hover:text-[#80142b] transition-colors">
                {event.title}
              </h2>

              {/* Short Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-3">
                {event.description}
              </p>

              {/* Details List (Time & Location) */}
              <div className="mt-6 space-y-2.5 border-t border-[#e7dec8]/80 pt-5 text-xs sm:text-sm text-slate-700">
                {event.time && (
                  <div className="flex items-center gap-2.5 font-medium">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#80142b]/10 text-[#80142b]">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span>{event.time}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2.5 font-medium">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c59b27]/15 text-[#80142b]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7dec8] pt-5">
              <span className="text-xs font-bold tracking-wider text-[#80142b] uppercase">
                Open to all parishioners &amp; guests
              </span>

              <button
                onClick={() => onSelect(event)}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#80142b] via-[#9e1c36] to-[#80142b] px-6 py-3 text-xs font-bold tracking-wider text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <span>VIEW DETAILS</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
