"use client";

import React from "react";
import { BookOpen, BookCheck, Languages } from "lucide-react";
import { PrayerResource } from "@/types";

interface BibleSectionProps {
  resources: PrayerResource[];
  onOpenResource?: (resource: PrayerResource) => void;
}

export default function BibleSection({
  resources,
  onOpenResource
}: BibleSectionProps) {
  const bibleItems = resources.filter((r) => r.type === "bible");

  const studyCategories = [
    { title: "Daily Scripture", subtitle: "Readings", tamil: "தினசரி வேத வாசிப்பு", desc: "Readings corresponding to Catholic daily Mass lectionary." },
    { title: "The Holy Gospels", subtitle: "Gospels", tamil: "நற்செய்தி நூல்கள்", desc: "Reflect upon the life, teachings, and miracles of Christ." },
    { title: "Book of Psalms", subtitle: "Psalms", tamil: "திருப்பாடல்கள்", desc: "Prayerful psalms for meditation, praise, and comfort in difficulty." },
    { title: "Parish Bible Study", subtitle: "Bible Study", tamil: "வேத ஆராய்ச்சி", desc: "Guided study plans and Catholic commentaries for youth & families." }
  ];

  return (
    <section id="bible-section" className="bg-white py-12 md:py-16 border-b border-[#e7dec8]/60">
      <div className="container-site">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
            THE HOLY BIBLE
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">
            Word of God &amp; Sacred Scripture
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-sm md:text-base font-medium text-slate-600">
            &ldquo;Explore Scripture and spend time reflecting on God&apos;s Word.&rdquo;
          </p>
        </div>

        {/* Bible Category Showcase Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studyCategories.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-3xl border border-[#e7dec8] bg-[#fbf8f1] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b18a3d] hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-[#d8bb73]/30 text-[#b18a3d] shadow-2xs group-hover:bg-[#10233f] group-hover:text-[#d8bb73] transition-colors">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#10233f]">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-[#b18a3d]">
                  {item.tamil}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#e7dec8]/60 pt-4 text-xs">
                <span className="flex items-center gap-1 font-semibold text-slate-500">
                  <Languages className="h-3.5 w-3.5 text-[#b18a3d]" /> English • தமிழ்
                </span>
                <span className="font-bold text-[#10233f] group-hover:text-[#b18a3d] transition-colors">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic / Published Bible Resources List if any */}
        {bibleItems.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bibleItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e7dec8] bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#f2eee5] px-2.5 py-0.5 text-xs font-bold text-[#10233f]">
                    {item.language}
                  </span>
                  <span className="text-xs font-semibold text-[#b18a3d]">
                    {item.reference || "Scripture"}
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-[#10233f]">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenResource && onOpenResource(item)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#10233f] py-2 text-xs font-bold uppercase text-white hover:bg-[#18365f]"
                >
                  <BookCheck className="h-3.5 w-3.5" /> Read Scripture
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
