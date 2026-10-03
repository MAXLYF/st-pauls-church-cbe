import React from "react";
import { Sparkles, Church } from "lucide-react";

export default function EventHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] py-16 md:py-24 border-b border-[#e7dec8]/60">
      {/* Soft radial gold and wine ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(197,155,39,0.14)_0%,rgba(128,20,43,0.06)_40%,transparent_75%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(197,155,39,0.12)_0%,transparent_70%)] blur-2xl" />
      
      {/* Subtle gold line-art pattern background (dots & delicate curves) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#c59b27 1px, transparent 1px), radial-gradient(#80142b 1px, transparent 1px)`,
          backgroundSize: `32px 32px`,
          backgroundPosition: `0 0, 16px 16px`
        }}
      />

      {/* Decorative church gothic line-art SVG watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[#80142b]">
        <svg width="480" height="480" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2L4 7v13h16V7l-8-5z M12 6v10 M8 10h8 M12 22V16" />
        </svg>
      </div>

      <div className="container-site relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#c59b27]/30 bg-[#faf7f2]/80 px-4 py-1.5 backdrop-blur-xs shadow-2xs">
          <Church className="h-3.5 w-3.5 text-[#80142b]" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#80142b] uppercase">
            PARISH CALENDAR
          </span>
          <Sparkles className="h-3 w-3 text-[#c59b27]" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1f040b] sm:text-5xl md:text-6xl">
          Events &amp; Announcements
        </h1>

        {/* Gold Decorative Line */}
        <div className="gold-line my-5" />

        {/* Supporting Text */}
        <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed md:leading-8 font-normal">
          Stay connected with the life of our parish — upcoming celebrations, ministries, special Masses and community gatherings.
        </p>
      </div>
    </section>
  );
}
