"use client";

import React from "react";
import { Quote, Sparkles, BookOpen, Clock, ArrowRight } from "lucide-react";
import { DailyReflection } from "@/types";

interface TodaysReflectionProps {
  reflection?: DailyReflection;
}

export default function TodaysReflection({ reflection }: TodaysReflectionProps) {
  const hasContent = Boolean(
    reflection && (reflection.title || reflection.content || reflection.verse)
  );

  return (
    <section className="py-10 md:py-14">
      <div className="container-site">
        <div className="overflow-hidden rounded-3xl border border-[#e7dec8] bg-white shadow-md">
          <div className="grid gap-0 lg:grid-cols-12">
            {/* Left Column: Quotation Card / Verse Display */}
            <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#10233f] via-[#142c4f] to-[#18365f] p-8 text-white md:p-12 lg:col-span-5">
              {/* Background Cross Motif */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 right-4 opacity-10"
              >
                <Quote className="h-32 w-32 text-[#d8bb73]" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb73]/30 bg-[#18365f]/80 px-3.5 py-1 text-xs font-bold tracking-[.2em] text-[#d8bb73]">
                  <Sparkles className="h-3.5 w-3.5" />
                  DAILY INSPIRATION
                </div>

                <div className="mt-8">
                  <Quote className="h-8 w-8 text-[#d8bb73]/80" />
                  <blockquote className="mt-4 font-serif text-xl italic leading-relaxed text-slate-100 md:text-2xl">
                    {hasContent && reflection?.verse
                      ? `“${reflection.verse}”`
                      : "“Be still, and know that I am God.”"}
                  </blockquote>
                  <cite className="mt-4 block text-xs font-bold uppercase tracking-widest text-[#d8bb73] not-italic">
                    {hasContent && reflection?.reference
                      ? reflection.reference
                      : "Psalm 46:10"}
                  </cite>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                <Clock className="h-4 w-4 text-[#d8bb73]" />
                <span>Updated daily for parish meditation</span>
              </div>
            </div>

            {/* Right Column: Reflection Information & Content */}
            <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-7">
              <div>
                <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
                  TODAY&apos;S REFLECTION
                </div>

                <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[#10233f]">
                  {hasContent && reflection?.title
                    ? reflection.title
                    : "Spiritual Food for the Soul"}
                </h2>

                <div className="mt-3 h-0.5 w-12 bg-[#b18a3d]" />

                <div className="mt-6 text-sm md:text-base leading-relaxed text-slate-600 space-y-4">
                  {hasContent && reflection?.content ? (
                    <p>{reflection.content}</p>
                  ) : (
                    <div className="rounded-2xl bg-[#fbf8f1] p-6 border border-[#e7dec8]/80 text-slate-600">
                      <p className="font-medium text-[#10233f]">
                        Today&apos;s reflection will be updated soon.
                      </p>
                      <p className="mt-2 text-xs text-slate-500 leading-normal">
                        Parish priests and spiritual animators update this section with daily Gospel thoughts, feast day meditations, and parish prayer intentions.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <BookOpen className="h-4 w-4 text-[#b18a3d]" />
                  <span>Roman Catholic Liturgical Calendar</span>
                </div>

                <a
                  href="#bible-section"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#10233f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#18365f]"
                >
                  <span>Explore Scripture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
