"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ReligiousServantProfile } from "@/types";

interface ReligiousServantCardProps {
  profile: ReligiousServantProfile;
  index: number;
}

export default function ReligiousServantCard({
  profile
}: ReligiousServantCardProps) {
  const [imgError, setImgError] = useState(false);

  const isBrother = profile.role === "brother";
  const photoSrc = profile.photo || profile.photoUrl;

  const infoRows = [
    {
      label: "Name",
      value: profile.name || "Details coming soon"
    },
    {
      label: "Date of Birth",
      value: profile.dateOfBirth || "Details coming soon"
    },
    {
      label: "Date of Profession",
      value: profile.dateOfProfession || "Details coming soon"
    },
    {
      label: "Feast Day",
      value: profile.feastDay || "Details coming soon"
    },
    {
      label: "Current Service",
      value: profile.currentService || "Details coming soon"
    }
  ];

  return (
    <article
      aria-label={`${profile.designation} - ${profile.name}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border transition-all duration-400 hover:-translate-y-1.5 ${
        isBrother
          ? "border-[#c59b27]/55 bg-gradient-to-b from-white via-[#fcf9f2] to-[#f7f0e2] shadow-[0_12px_32px_rgba(128,20,43,0.09)] hover:border-[#80142b] hover:shadow-[0_22px_48px_rgba(128,20,43,0.16)]"
          : "border-[#e5d9c3] bg-gradient-to-b from-white via-[#fdfbf7] to-[#faf5eb] shadow-[0_12px_32px_rgba(31,4,11,0.06)] hover:border-[#c59b27] hover:shadow-[0_22px_48px_rgba(197,155,39,0.16)]"
      }`}
    >
      {/* Top Decorative Accent Header */}
      <div
        className={`relative h-28 w-full overflow-hidden ${
          isBrother
            ? "bg-gradient-to-r from-[#26040c] via-[#6d1024] to-[#26040c]"
            : "bg-gradient-to-r from-[#4a0b19] via-[#80142b] to-[#590d1e]"
        }`}
      >
        {/* Top Gold Hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5d77f] to-transparent" />

        {/* Subtle radial gold aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: isBrother
              ? "radial-gradient(circle at 50% 0%, rgba(245,215,127,0.28) 0%, transparent 70%)"
              : "radial-gradient(circle at 50% 0%, rgba(245,215,127,0.22) 0%, transparent 70%)"
          }}
        />

        {/* Small Religious Designation Pill (Top Center) */}
        <div className="relative z-10 flex justify-center pt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] shadow-xs backdrop-blur-md ${
              isBrother
                ? "border border-[#f5d77f]/55 bg-[#1b0308]/75 text-[#f5d77f]"
                : "border border-[#f5d77f]/45 bg-white/15 text-[#f5d77f]"
            }`}
          >
            <span>✝</span>
            <span>{profile.badgeLabel || profile.designation}</span>
          </span>
        </div>
      </div>

      {/* Portrait Frame Overlapping the Header Banner */}
      <div className="relative z-10 -mt-14 flex flex-col items-center px-6">
        <div
          className={`relative h-48 w-40 sm:h-52 sm:w-44 overflow-hidden rounded-[22px] p-1 shadow-lg transition-transform duration-400 group-hover:scale-[1.02] ${
            isBrother
              ? "bg-gradient-to-br from-[#f5d77f] via-[#c59b27] to-[#80142b]"
              : "bg-gradient-to-br from-[#f5d77f] via-[#d4af37] to-[#9e1c36]"
          }`}
        >
          <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] ${
              isBrother ? "bg-[#1b0308]" : "bg-[#26050d]"
            }`}
          >
            {!imgError && photoSrc ? (
              <Image
                src={photoSrc}
                alt={`${profile.designation} ${profile.name} portrait`}
                fill
                sizes="(max-width: 640px) 160px, 176px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Elegant Religious Portrait Placeholder */
              <div className="flex flex-col items-center justify-center p-4 text-center text-white select-none">
                <div
                  className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-full border ${
                    isBrother
                      ? "border-[#f5d77f]/45 bg-[#80142b]/45 text-[#f5d77f]"
                      : "border-[#f5d77f]/40 bg-[#c59b27]/20 text-[#f5d77f]"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M11 2v6H5v2h6v12h2V10h6V8h-6V2h-2z" />
                  </svg>
                </div>

                <span className="font-serif text-lg font-bold tracking-wider text-[#f5d77f]">
                  {profile.designation}
                </span>

                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {isBrother ? "Religious Brother" : "Religious Sister"}
                </span>

                <span className="mt-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300/80 italic">
                  Photo to be added
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Designation & Name Header */}
        <div className="mt-4 text-center">
          <div
            className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em] ${
              isBrother
                ? "bg-[#80142b]/12 text-[#80142b] border border-[#80142b]/25"
                : "bg-[#c59b27]/15 text-[#781226] border border-[#c59b27]/35"
            }`}
          >
            {profile.designation}
          </div>

          <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1f040b] transition-colors group-hover:text-[#80142b]">
            {profile.name}
          </h3>

          <div
            className={`mx-auto mt-2 h-0.5 w-12 rounded-full ${
              isBrother ? "bg-[#80142b]" : "bg-[#c59b27]"
            }`}
          />
        </div>
      </div>

      {/* Card Body: Structured Information List + Short Note */}
      <div className="flex flex-1 flex-col justify-between p-6 pt-5">
        <div
          className={`space-y-2.5 rounded-2xl border p-4 text-xs sm:text-sm ${
            isBrother
              ? "border-[#e2d4b7] bg-white/90"
              : "border-[#e8decb] bg-white/85"
          }`}
        >
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 border-b border-[#f1eadc] pb-2 last:border-b-0 last:pb-0"
            >
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#80142b]">
                <span className="text-[#c59b27]">✝</span>
                <span>{row.label}</span>
              </span>
              <span className="pl-3.5 font-medium text-slate-700 break-words">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {profile.about && (
          <p className="mt-4 border-t border-[#e7dec8]/80 pt-3.5 text-center text-xs leading-relaxed text-slate-600 italic">
            {profile.about}
          </p>
        )}
      </div>
    </article>
  );
}

