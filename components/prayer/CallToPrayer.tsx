"use client";

import React from "react";
import { ArrowUp, HeartHandshake } from "lucide-react";

export default function CallToPrayer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#10233f] via-[#142c4f] to-[#10233f] py-20 text-white">
      {/* Decorative gold circular accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[#d8bb73]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-[#d8bb73]/10 blur-3xl"
      />

      <div className="container-site relative z-10 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8bb73]/30 bg-[#18365f]/90 px-4 py-1 text-xs font-bold tracking-[.25em] text-[#d8bb73] uppercase">
            <HeartHandshake className="h-4 w-4" />
            LET US PRAY
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
            United in Faith, Hope &amp; Love
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#d8bb73]" />

          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-200">
            &ldquo;May our prayers draw us closer to God and strengthen our parish community in faith, hope and love.&rdquo;
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#b18a3d] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#10233f] shadow-lg transition hover:bg-[#d8bb73] hover:scale-105"
            >
              <span>EXPLORE PRAYERS</span>
              <ArrowUp className="h-4 w-4" />
            </button>

            <a
              href="/prayer-request"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xs transition hover:bg-white/20 hover:border-[#d8bb73]"
            >
              Submit Prayer Request
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
