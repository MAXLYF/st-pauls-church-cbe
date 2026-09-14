"use client";

import React from "react";
import { BookOpen, Sparkles, Heart } from "lucide-react";

export default function PrayerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10233f] via-[#142c4f] to-[#10233f] py-10 md:py-14 text-white">
      {/* Subtle gold radial background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-[#d8bb73]/10 blur-3xl"
      />

      <div className="container-site relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Small gold label */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d8bb73]/30 bg-[#18365f]/80 px-3.5 py-0.5 text-[11px] font-bold tracking-[.25em] text-[#d8bb73] shadow-sm">
            <Sparkles className="h-3 w-3" />
            SPIRITUAL RESOURCES
          </div>

          {/* Main Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Prayer &amp; Reflection
          </h1>

          {/* Gold Divider */}
          <div className="mx-auto mt-3 h-0.5 w-16 bg-[#d8bb73] rounded-full" />

          {/* Subtitle */}
          <p className="mt-3 text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Grow in faith, deepen your prayer life, and discover spiritual resources for your journey with Christ.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
