import React from "react";
import { ParishEvent } from "@/types";
import { Clock, MapPin, ArrowRight, Cross } from "lucide-react";
import EventDateBadge from "./EventDateBadge";

interface EventTimelineViewProps {
  events: ParishEvent[];
  onSelect: (event: ParishEvent) => void;
}

export default function EventTimelineView({ events, onSelect }: EventTimelineViewProps) {
  return (
    <div className="relative border-l-2 border-[#d4af37]/40 pl-6 sm:pl-10 space-y-10 my-8 ml-3 sm:ml-6">
      {events.map((event) => (
        <div key={event.id} className="relative group">
          {/* Gold cross timeline node marker */}
          <div className="absolute -left-[37px] sm:-left-[53px] top-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#faf7f2] border-2 border-[#c59b27] text-[#80142b] shadow-xs group-hover:bg-[#80142b] group-hover:text-[#f5d77f] group-hover:border-[#f5d77f] transition-colors duration-300">
            <Cross className="h-4 w-4" />
          </div>

          <article
            onClick={() => onSelect(event)}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl border border-[#e7dec8] bg-white p-6 shadow-sm hover:border-[#c59b27] hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-5">
              {/* Date Badge */}
              <EventDateBadge date={event.date} size="md" className="shrink-0 hidden sm:flex" />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-[#80142b]/10 text-[#80142b] border border-[#80142b]/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase">
                    {event.category || "EVENT"}
                  </span>
                  <span className="sm:hidden text-xs font-bold text-[#c59b27]">
                    {event.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1f040b] group-hover:text-[#80142b] transition-colors leading-snug">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                  {event.time && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#80142b]" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#c59b27]" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(event);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#80142b]/30 bg-[#faf7f2] px-4 py-2 text-xs font-bold text-[#80142b] group-hover:bg-[#80142b] group-hover:text-white transition-all duration-300"
              >
                <span>Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
