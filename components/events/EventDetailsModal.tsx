import React, { useEffect } from "react";
import { ParishEvent } from "@/types";
import { X, Clock, MapPin, Calendar, ExternalLink, Download, Phone, User, Cross } from "lucide-react";
import { getGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar-utils";
import EventDateBadge from "./EventDateBadge";

interface EventDetailsModalProps {
  event: ParishEvent | null;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (event) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [event, onClose]);

  if (!event) return null;

  const googleCalUrl = getGoogleCalendarUrl(event);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#faf7f2] shadow-2xl border border-[#c59b27]/40 text-[#1f040b] flex flex-col scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Poster Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 bg-[#160207]">
          <img
            src={event.image || event.imageUrl || "/images/events/feast-celebration.jpg"}
            alt={event.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-[#160207]/40 to-black/50" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/80 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category & Featured Badge overlay */}
          <div className="absolute bottom-4 left-6 z-10 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#80142b] border border-[#f5d77f]/40 px-3.5 py-1 text-xs font-bold text-white shadow-md uppercase tracking-wider">
              {event.category || "PARISH EVENT"}
            </span>
            {event.featured && (
              <span className="rounded-full bg-[#c59b27] px-3.5 py-1 text-xs font-extrabold text-[#1f040b] shadow-md uppercase tracking-wider">
                FEATURED
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-[#80142b] uppercase mb-1">
                St. Paul&apos;s Church Rathinapuri
              </div>
              <h2 id="event-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#1f040b] leading-snug">
                {event.title}
              </h2>
            </div>
            <EventDateBadge date={event.date} size="lg" className="shrink-0" />
          </div>

          {/* Metadata Block (Date, Time, Location) */}
          <div className="rounded-2xl border border-[#e7dec8] bg-white p-4 space-y-3 text-sm text-slate-700 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80142b]/10 text-[#80142b] shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Date</span>
                <span className="font-semibold text-[#1f040b]">{event.date}</span>
              </div>
            </div>

            {event.time && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#80142b]/10 text-[#80142b] shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Time</span>
                  <span className="font-semibold text-[#1f040b]">{event.time}</span>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c59b27]/15 text-[#80142b] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Location</span>
                  <span className="font-semibold text-[#1f040b]">{event.location}</span>
                </div>
              </div>
            )}

            {event.contactPerson && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Contact Person</span>
                  <span className="font-semibold text-[#1f040b]">
                    {event.contactPerson} {event.contactPhone ? `(${event.contactPhone})` : ""}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Event Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-[#80142b] uppercase">About this Event</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              {event.longDescription || event.description}
            </p>
          </div>

          {/* Action Buttons: Add to Calendar & Registration */}
          <div className="space-y-3 border-t border-[#e7dec8] pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e7dec8] bg-white px-4 py-3 text-xs font-bold text-[#1f040b] shadow-2xs hover:border-[#c59b27] hover:bg-[#faf7f2] transition-all"
              >
                <Calendar className="h-4 w-4 text-[#80142b]" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                onClick={() => downloadIcsFile(event)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e7dec8] bg-white px-4 py-3 text-xs font-bold text-[#1f040b] shadow-2xs hover:border-[#c59b27] hover:bg-[#faf7f2] transition-all cursor-pointer"
              >
                <Download className="h-4 w-4 text-[#c59b27]" />
                <span>Download .ics Calendar</span>
              </button>
            </div>

            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#80142b] via-[#9e1c36] to-[#80142b] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition-all"
              >
                <span>Register / Additional Information</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Church footer note */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-2 border-t border-[#e7dec8]/60">
            <Cross className="h-3.5 w-3.5 text-[#80142b]" />
            <span>St. Paul&apos;s Church, Rathinapuri, Coimbatore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
