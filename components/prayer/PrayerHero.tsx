"use client";

import React from "react";
import { BookOpen, Sparkles, Heart } from "lucide-react";

export default function PrayerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1b0308] via-[#3d0813] to-[#140206] py-10 md:py-14 text-white">
      {/* Subtle gold radial background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#c59b27]/15 blur-3xl"
      />

      <div className="container-site relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Small gold label */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c59b27]/30 bg-[#80142b]/60 px-3.5 py-0.5 text-[11px] font-bold tracking-[.25em] text-[#f5d77f] shadow-sm">
            <Sparkles className="h-3 w-3" />
            SPIRITUAL RESOURCES
          </div>

          {/* Main Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Prayer &amp; Reflection
          </h1>

          {/* Gold Divider */}
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#c59b27] rounded-full" />

          {/* Subtitle */}
          <p className="mt-3 text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Grow in faith, deepen your prayer life, and discover spiritual resources for your journey with Christ.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
