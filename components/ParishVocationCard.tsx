"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ParishVocation } from "@/types";

interface ParishVocationCardProps {
  person: ParishVocation;
  index: number;
}

export default function ParishVocationCard({ person }: ParishVocationCardProps) {
  const [imgError, setImgError] = useState(false);

  const isSister =
    person.type?.toLowerCase().includes("sister") ||
    person.type?.toLowerCase().includes("religious") ||
    person.title?.toLowerCase().includes("sis") ||
    person.title?.toLowerCase().includes("sr") ||
    person.vocation?.toLowerCase().includes("sister");

  const badgeText = isSister ? "✝ RELIGIOUS VOCATION" : "✝ PRIESTLY VOCATION";
  const photoSrc = person.photo || person.photoUrl;

  // Initials for clerical fallback
  const getInitials = (name: string) => {
    const cleaned = name
      .replace(/^(Rev\.\s*Fr\.|Rev\.\s*Sis\.|Rev\.\s*Sr\.|Fr\.|Sr\.|Rev\.)\s*/i, "")
      .trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : (isSister ? "SR" : "FR");
  };

  const initials = getInitials(person.name);

  // Field values
  const ordainedYear = person.ordained || person.ordinationYear;
  const professionYear = person.profession || person.professionYear;
  const ministry = person.ministry;
  const currentService = person.currentService;
  const diocese = person.diocese;
  const congregation = person.congregation;
  const aboutText = person.about || person.description || person.biography;

  return (
    <article
      aria-label={`${person.name} - ${isSister ? "Religious Vocation" : "Priestly Vocation"}`}
      className="group relative w-full overflow-hidden rounded-[20px] border border-[#e7dec8] bg-white p-6 sm:p-8 md:p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#b18a3d] hover:shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
        {/* ========================================================================= */}
        {/* LEFT SIDE: Large Square Portrait + Name + Gold Divider                    */}
        {/* ========================================================================= */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center text-center">
          {/* Photo Frame (approx 260-300px on desktop) */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[20px] p-1 bg-gradient-to-br from-[#d8bb73] via-[#b18a3d] to-[#10233f] shadow-md transition-transform duration-300 group-hover:scale-[1.01]">
            <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#10233f] flex items-center justify-center">
              {!imgError && photoSrc ? (
                <Image
                  src={photoSrc}
                  alt={`${person.name} portrait`}
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Clean local placeholder indicating photo can be added later */
                <div className="flex flex-col items-center justify-center p-6 text-center text-white select-none">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#18365f] border border-[#d8bb73]/40 text-[#d8bb73] shadow-inner">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M11 2v6H5v2h6v12h2V10h6V8h-6V2h-2z" />
                    </svg>
                  </div>
                  <span className="font-serif text-3xl font-bold tracking-wider text-[#d8bb73]">
                    {initials}
                  </span>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
                    {isSister ? "Religious Sister" : "Parish Priest"}
                  </span>
                  <span className="mt-2 text-[10px] text-slate-400 italic">
                    Photo will be updated
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Full Name Under Photo */}
          <div className="mt-4 max-w-[280px]">
            <h3 className="font-bold text-base sm:text-lg text-[#10233f] tracking-tight group-hover:text-[#18365f] transition-colors">
              {person.name}
            </h3>
            {/* Small decorative gold divider underneath name */}
            <div className="mx-auto mt-2 h-0.5 w-12 bg-[#d8bb73] rounded-full" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THIN VERTICAL DIVIDER on Desktop / Horizontal on Mobile                   */}
        {/* ========================================================================= */}
        <div
          aria-hidden="true"
          className="hidden md:block md:col-span-1 self-stretch my-2"
        >
          <div className="h-full w-[1px] mx-auto bg-gradient-to-b from-transparent via-[#e7dec8] to-transparent" />
        </div>

        <div
          aria-hidden="true"
          className="block md:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-[#e7dec8] to-transparent my-1"
        />

        {/* ========================================================================= */}
        {/* RIGHT SIDE: Vocation Badge + Structured Details + ABOUT Section           */}
        {/* ========================================================================= */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center text-left">
          {/* Vocation Type Badge */}
          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#f2eee5] px-4 py-1.5 text-xs font-bold tracking-widest text-[#b18a3d] uppercase border border-[#d8bb73]/40 shadow-2xs">
            <span>{badgeText}</span>
          </div>

          {/* Structured Information Table / List */}
          <div className="mt-6 space-y-2.5 rounded-2xl bg-[#fbf8f1] p-4 sm:p-5 border border-[#e7dec8]/80 text-sm">
            {/* Ordained or Profession */}
            {isSister ? (
              professionYear && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                    <span className="text-[#b18a3d] text-xs">✝</span> Profession:
                  </span>
                  <span className="text-slate-700 font-medium">{professionYear}</span>
                </div>
              )
            ) : (
              ordainedYear && (
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                    <span className="text-[#b18a3d] text-xs">✝</span> Ordained:
                  </span>
                  <span className="text-slate-700 font-medium">{ordainedYear}</span>
                </div>
              )
            )}

            {/* Ministry */}
            {ministry && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                  <span className="text-[#b18a3d] text-xs">✝</span> Ministry:
                </span>
                <span className="text-slate-700 font-medium">{ministry}</span>
              </div>
            )}

            {/* Current Service */}
            {currentService && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                  <span className="text-[#b18a3d] text-xs">✝</span> Current Service:
                </span>
                <span className="text-slate-700 font-medium">{currentService}</span>
              </div>
            )}

            {/* Diocese or Congregation */}
            {congregation ? (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                  <span className="text-[#b18a3d] text-xs">✝</span> Congregation:
                </span>
                <span className="text-slate-700 font-medium">{congregation}</span>
              </div>
            ) : diocese ? (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-semibold text-[#10233f] sm:w-36 flex items-center gap-1.5">
                  <span className="text-[#b18a3d] text-xs">✝</span> Diocese:
                </span>
                <span className="text-slate-700 font-medium">{diocese}</span>
              </div>
            ) : null}
          </div>

          {/* ABOUT Section */}
          <div className="mt-6 pt-4 border-t border-[#e7dec8]">
            <div className="text-xs font-bold tracking-[.2em] text-[#b18a3d] uppercase mb-2">
              ABOUT
            </div>
            {aboutText ? (
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                {aboutText}
              </p>
            ) : (
              <p className="text-sm md:text-base leading-relaxed text-slate-600 italic">
                Dedicated to holy pastoral ministry, spiritual mission, and faithful service to the Church and God&apos;s people.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
