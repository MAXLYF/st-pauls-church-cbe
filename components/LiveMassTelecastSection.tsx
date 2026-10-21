"use client";

import { useState } from "react";
import {
  Tv,
  ExternalLink,
  Play,
  Eye,
  Radio,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronDown
} from "lucide-react";

export default function LiveMassTelecastSection() {
  const [showPreview, setShowPreview] = useState(true);
  const channelUrl = "https://www.youtube.com/@StPaulsChurchRathinapuri";

  return (
    <section
      id="live-telecast"
      aria-labelledby="live-telecast-heading"
      className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-16 md:py-20 text-white scroll-mt-32"
    >
      {/* Background ambient lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.18)_0%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div className="container-site relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading, Info, Description & Action Buttons */}
          <div className="lg:col-span-6 xl:col-span-7">
            {/* Small live telecast badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/60 px-4 py-1.5 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[.22em] text-red-200">
                Official Parish Broadcast
              </span>
            </div>

            {/* Section Heading */}
            <h2
              id="live-telecast-heading"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              📺 Mass Will Be Live Telecasted
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-transparent" />

            {/* Required Description */}
            <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-200">
              Join us in prayer from wherever you are. Watch the Holy Mass live through our official
              YouTube channel and stay connected with our parish community.
            </p>

            {/* Scheduled telecast highlight cards */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-[#f5d77f]">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Sunday Masses</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  Morning <strong className="text-white">6:00 AM &amp; 8:00 AM</strong>, Evening <strong className="text-white">5:30 PM</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-[#f5d77f]">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Feast Days &amp; Novenas</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  Solemnities, Annual Parish Feast, and special evening novenas.
                </p>
              </div>
            </div>

            {/* Action Buttons: Watch Live Mass (Primary) + Preview (Secondary) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] px-7 py-3.5 text-sm md:text-base font-bold text-white shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02] hover:shadow-red-900/60 active:scale-98 focus:outline-hidden focus:ring-2 focus:ring-red-400"
                aria-label="Watch Live Mass on YouTube (opens in new tab)"
              >
                {/* YouTube Red Icon */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600 transition-transform group-hover:scale-110">
                  <Play className="h-3 w-3 fill-current translate-x-0.5" />
                </span>
                <span>Watch Live Mass</span>
                <ExternalLink className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-white/10 hover:bg-white/15 px-5 py-3.5 text-sm font-semibold text-[#f5d77f] transition-all hover:text-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#f5d77f]"
                aria-expanded={showPreview}
                aria-controls="youtube-channel-preview-panel"
              >
                <Eye className="h-4 w-4" />
                <span>{showPreview ? "Hide Preview" : "Preview Channel"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showPreview ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400 flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-red-400 shrink-0" />
              <span>Streams start automatically at the scheduled Mass times. All recordings remain available to rewatch anytime.</span>
            </p>
          </div>

          {/* Right Column: Responsive YouTube Channel Preview Panel */}
          {showPreview && (
            <div
              id="youtube-channel-preview-panel"
              className="lg:col-span-6 xl:col-span-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-gradient-to-b from-[#2a0610] to-[#120206] p-6 shadow-2xl">
                {/* Top decorative glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-[#d4af37] to-red-600"
                />

                {/* Channel Header Banner Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#160207]">
                  {/* Church exterior banner image */}
                  <div className="relative h-28 w-full overflow-hidden">
                    <img
                      src="/images/church-front.png"
                      alt="St. Paul's Church Rathinapuri banner"
                      className="h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160207] via-[#160207]/40 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-400 uppercase backdrop-blur-xs border border-red-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      YouTube
                    </span>
                  </div>

                  {/* Channel Details */}
                  <div className="relative px-5 pb-5 -mt-7 flex items-start gap-3.5">
                    <img
                      src="/images/logo.jpg"
                      alt="St. Paul's Catholic Church logo"
                      className="h-14 w-14 rounded-full border-2 border-[#d4af37] bg-white object-cover shadow-lg shrink-0"
                    />
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-base leading-tight">
                          St. Paul&apos;s Church, Rathinapuri
                        </h3>
                        <span title="Verified Parish Channel" className="inline-flex">
                          <CheckCircle2 className="h-4 w-4 text-[#d4af37] shrink-0" />
                        </span>
                      </div>
                      <p className="text-xs text-[#f5d77f] font-mono mt-0.5">
                        @StPaulsChurchRathinapuri
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        Official Parish YouTube Channel • Coimbatore Diocese
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview Video / Broadcast Card */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <div className="relative aspect-video w-full flex flex-col items-center justify-center p-6 text-center bg-radial from-[#3d0813] to-black">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-500 border border-red-500/40 mb-3 shadow-inner">
                      <Tv className="h-8 w-8 text-red-400" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-[8px] font-bold text-white">
                          ●
                        </span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white max-w-xs">
                      Live Telecast &amp; Service Archives
                    </h4>
                    <p className="mt-1 text-xs text-slate-300 max-w-xs leading-relaxed">
                      Holy Masses are broadcast live during scheduled service hours.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[11px] text-amber-200/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <Clock className="h-3 w-3 text-[#d4af37]" />
                      <span>Next live stream available during service hours</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link inside preview card */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-300">
                    <span>Watch live stream or browse previous masses:</span>
                  </div>
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-[#f5d77f] hover:text-white transition-colors shrink-0 border border-[#d4af37]/30"
                  >
                    <span>Open YouTube Channel</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
