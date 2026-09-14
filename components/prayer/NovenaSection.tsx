"use client";

import React from "react";
import Image from "next/image";
import { Calendar, FileText, Volume2, Video, ArrowRight, Sparkles } from "lucide-react";
import { PrayerResource } from "@/types";

interface NovenaSectionProps {
  resources: PrayerResource[];
  onOpenResource?: (resource: PrayerResource) => void;
}

export default function NovenaSection({
  resources,
  onOpenResource
}: NovenaSectionProps) {
  const novenas = resources.filter((r) => r.type === "novena");

  return (
    <section id="novena-section" className="section-pad bg-[#fbf8f1]">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            NOVENA
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
            Nine Days of Faith &amp; Petitions
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-base font-medium text-slate-600">
            &ldquo;Join us in prayer and devotion.&rdquo;
          </p>
        </div>

        {novenas.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {novenas.map((novena) => (
              <div
                key={novena.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e7dec8] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#b18a3d] hover:shadow-lg"
              >
                <div>
                  {/* Cover Image or Fallback Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#10233f]">
                    {novena.coverImage ? (
                      <Image
                        src={novena.coverImage}
                        alt={novena.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
                        <Calendar className="mb-2 h-8 w-8 text-[#d8bb73]" />
                        <span className="font-serif text-lg font-bold text-[#d8bb73]">
                          {novena.title}
                        </span>
                        <span className="mt-1 text-xs text-slate-300">
                          {novena.daysCount ? `${novena.daysCount} Days Novena` : "9 Days Novena"}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 rounded-full bg-[#10233f]/85 px-3 py-1 text-[11px] font-bold text-[#d8bb73] backdrop-blur-xs border border-[#d8bb73]/30">
                      {novena.language}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#b18a3d]">
                      {novena.feastDay || "Parish Devotion"}
                    </div>
                    <h3 className="mt-1 text-xl font-bold text-[#10233f]">
                      {novena.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {novena.description}
                    </p>

                    {/* Media tags */}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                      {novena.pdfUrl && (
                        <span className="flex items-center gap-1 rounded-md bg-[#f2eee5] px-2 py-0.5">
                          <FileText className="h-3 w-3 text-[#b18a3d]" /> PDF
                        </span>
                      )}
                      {novena.audioUrl && (
                        <span className="flex items-center gap-1 rounded-md bg-[#f2eee5] px-2 py-0.5">
                          <Volume2 className="h-3 w-3 text-[#b18a3d]" /> Audio
                        </span>
                      )}
                      {novena.videoUrl && (
                        <span className="flex items-center gap-1 rounded-md bg-[#f2eee5] px-2 py-0.5">
                          <Video className="h-3 w-3 text-[#b18a3d]" /> Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-slate-100 p-6 pt-3">
                  <button
                    type="button"
                    onClick={() => onOpenResource && onOpenResource(novena)}
                    className="flex w-full items-center justify-between rounded-xl bg-[#10233f] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#18365f]"
                  >
                    <span>Read Novena</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-[#d8bb73] bg-white p-10 text-center shadow-xs">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#f2eee5] text-[#b18a3d]">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-[#10233f]">
              No Novena resources have been added yet.
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Upcoming parish novenas, feast day prayers, and 9-day devotionals will be published here by the parish administration.
            </p>
            <div className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[#b18a3d]">
              <Sparkles className="h-3.5 w-3.5" />
              Check back soon for feast day schedules
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
