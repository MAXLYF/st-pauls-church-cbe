import React from "react";
import { ParishEvent } from "@/types";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import EventDateBadge from "./EventDateBadge";

interface EventGridCardProps {
  event: ParishEvent;
  onSelect: (event: ParishEvent) => void;
}

export default function EventGridCard({ event, onSelect }: EventGridCardProps) {
  return (
    <article
      onClick={() => onSelect(event)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e7dec8] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c59b27]/80 hover:shadow-xl cursor-pointer"
    >
      {/* Gold Top Accent Line appearing on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#80142b] via-[#c59b27] to-[#80142b] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Poster / Image Container */}
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={event.image || event.imageUrl || "/images/events/feast-celebration.jpg"}
            alt={event.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Category Badge top-left */}
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full bg-white/90 border border-[#c59b27]/30 px-3 py-1 text-[10px] font-extrabold tracking-wider text-[#80142b] shadow-2xs backdrop-blur-xs uppercase">
              {event.category || "EVENT"}
            </span>
          </div>

          {/* Date Badge top-right */}
          <div className="absolute top-3 right-3 z-10">
            <EventDateBadge date={event.date} size="sm" className="shadow-md" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#1f040b] group-hover:text-[#80142b] transition-colors line-clamp-2 leading-snug">
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Footer Info & Arrow Button */}
      <div className="mt-5 border-t border-[#e7dec8]/60 pt-4">
        <div className="space-y-1.5 text-xs text-slate-600 font-medium mb-4">
          {event.time && (
            <div className="flex items-center gap-2 line-clamp-1">
              <Clock className="h-3.5 w-3.5 text-[#80142b] shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 line-clamp-1">
              <MapPin className="h-3.5 w-3.5 text-[#c59b27] shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-[#80142b] group-hover:text-[#c59b27] transition-colors">
          <span>View Details</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#faf7f2] group-hover:bg-[#80142b] group-hover:text-white transition-all duration-300 border border-[#e7dec8] group-hover:border-[#80142b]">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </article>
  );
}
