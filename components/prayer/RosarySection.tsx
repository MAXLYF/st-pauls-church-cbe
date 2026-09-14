"use client";

import React, { useState } from "react";
import { CircleDot, ChevronDown, ChevronUp, Sparkles, BookOpen, Clock } from "lucide-react";
import { rosaryMysteriesList } from "@/lib/data/prayers";
import { RosaryMystery } from "@/types";

export default function RosarySection() {
  const [expandedId, setExpandedId] = useState<string>("joyful");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="rosary-section" className="section-pad bg-[#fbf8f1]">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            THE HOLY ROSARY
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
            Marian Meditations &amp; Holy Mysteries
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-base font-medium text-slate-600">
            &ldquo;Contemplate the life of Christ through the loving eyes of Mary.&rdquo;
          </p>
        </div>

        {/* 4 Mysteries Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {rosaryMysteriesList.map((mystery) => {
            const isExpanded = expandedId === mystery.id;

            return (
              <div
                key={mystery.id}
                className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isExpanded
                    ? "border-[#b18a3d] bg-white shadow-xl ring-2 ring-[#b18a3d]/10"
                    : "border-[#e7dec8] bg-white/80 shadow-sm hover:border-[#b18a3d]/60 hover:bg-white"
                }`}
              >
                {/* Header / Clickable Card summary */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(mystery.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(mystery.id);
                    }
                  }}
                  className="flex cursor-pointer items-center justify-between p-6 focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                        isExpanded
                          ? "bg-[#10233f] text-[#d8bb73] border-[#10233f]"
                          : "bg-[#f2eee5] text-[#b18a3d] border-[#d8bb73]/30"
                      }`}
                    >
                      <CircleDot className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-[#10233f]">
                          {mystery.name}
                        </h3>
                        <span className="rounded-full bg-[#f2eee5] px-2.5 py-0.5 text-[10px] font-bold text-[#b18a3d]">
                          {mystery.tamilName}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-[#b18a3d]" />
                        <span>Prayed on: {mystery.day}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full bg-[#f2eee5] p-2 text-[#10233f]">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {/* Expanded Mysteries Details */}
                {isExpanded && (
                  <div className="border-t border-[#e7dec8] bg-[#fbf8f1]/50 p-6 pt-4 animate-in fade-in">
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {mystery.description}
                    </p>

                    <div className="space-y-3">
                      {mystery.mysteries.map((decade) => (
                        <div
                          key={decade.number}
                          className="flex items-start gap-3 rounded-2xl border border-[#e7dec8]/80 bg-white p-3.5 shadow-2xs"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10233f] text-xs font-bold text-[#d8bb73]">
                            {decade.number}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <span className="text-xs font-bold text-[#10233f]">
                                {decade.title}
                              </span>
                              {decade.scriptureRef && (
                                <span className="text-[11px] font-semibold text-slate-400">
                                  {decade.scriptureRef}
                                </span>
                              )}
                            </div>
                            {decade.fruitOfMystery && (
                              <div className="mt-1 flex items-center gap-1 text-[11px] text-[#b18a3d]">
                                <Sparkles className="h-3 w-3" />
                                <span>Spiritual Fruit: {decade.fruitOfMystery}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-[#e7dec8] pt-3">
                      <span>Complete Rosary meditation guide</span>
                      <span className="font-bold text-[#10233f]">5 Decades</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
