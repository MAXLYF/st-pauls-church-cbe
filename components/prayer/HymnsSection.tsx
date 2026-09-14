"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Music, Youtube, FileText, Sparkles, Disc } from "lucide-react";
import AudioPlayerCompact from "./AudioPlayerCompact";
import { PrayerResource } from "@/types";

interface HymnsSectionProps {
  resources: PrayerResource[];
  onOpenLyrics?: (song: PrayerResource) => void;
}

export default function HymnsSection({
  resources,
  onOpenLyrics
}: HymnsSectionProps) {
  const hymns = resources.filter((r) => r.type === "hymn");
  const [activeLyrics, setActiveLyrics] = useState<PrayerResource | null>(null);

  return (
    <section id="hymns-section" className="py-12 md:py-16 bg-[#fbf8f1] border-t border-[#e7dec8]/60">
      <div className="container-site">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            HYMNS &amp; SONGS
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
            Liturgical Music &amp; Devotional Chants
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-sm md:text-base font-medium text-slate-600">
            &ldquo;Sing to the Lord with thanksgiving; make music to our God on the harp.&rdquo;
          </p>
        </div>

        {hymns.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hymns.map((song) => (
              <div
                key={song.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#e7dec8] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#b18a3d] hover:shadow-lg"
              >
                <div>
                  {/* Media Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#10233f]">
                    {song.coverImage ? (
                      <Image
                        src={song.coverImage}
                        alt={song.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-white text-center">
                        <Disc className="h-10 w-10 text-[#d8bb73] animate-spin-slow mb-2 opacity-80" />
                        <span className="font-serif text-base font-bold text-[#d8bb73]">
                          {song.title}
                        </span>
                        <span className="text-xs text-slate-300">
                          {song.category || "Liturgical Hymn"}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 rounded-full bg-[#10233f]/85 px-3 py-1 text-[11px] font-bold text-[#d8bb73] border border-[#d8bb73]/30">
                      {song.language}
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="text-[#b18a3d] uppercase tracking-wider">
                        {song.category || "Parish Choir"}
                      </span>
                      {song.duration && <span>{song.duration}</span>}
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-[#10233f]">
                      {song.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                      {song.description}
                    </p>

                    {/* Audio Player */}
                    <div className="mt-4">
                      <AudioPlayerCompact src={song.audioUrl} title={song.title} />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-between border-t border-[#e7dec8]/80 bg-white p-4">
                  {song.lyrics && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLyrics(song);
                        if (onOpenLyrics) onOpenLyrics(song);
                      }}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-[#10233f] hover:bg-[#f2eee5] transition"
                    >
                      <FileText className="h-3.5 w-3.5 text-[#b18a3d]" />
                      <span>Lyrics</span>
                    </button>
                  )}

                  {song.youtubeUrl && (
                    <a
                      href={song.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-red-600/10 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-600/20 transition ml-auto"
                    >
                      <Youtube className="h-3.5 w-3.5 text-red-600" />
                      <span>Watch</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-[#d8bb73] bg-white p-8 text-center shadow-xs">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f2eee5] text-[#b18a3d] border border-[#d8bb73]/30">
              <Music className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#10233f]">
              No Hymn resources have been added yet.
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Parish choir recordings, sacred Tamil devotional songs, and liturgical audio tracks will be published here with lyrics.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#b18a3d]">
              <Sparkles className="h-3.5 w-3.5" />
              Parish choir releases will appear here
            </div>
          </div>
        )}

        {/* Lyrics Modal */}
        {activeLyrics && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
            onClick={() => setActiveLyrics(null)}
          >
            <div
              className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#b18a3d]">
                    Hymn Lyrics • {activeLyrics.language}
                  </div>
                  <h3 className="text-xl font-bold text-[#10233f]">
                    {activeLyrics.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLyrics(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>
              <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {activeLyrics.lyrics}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
