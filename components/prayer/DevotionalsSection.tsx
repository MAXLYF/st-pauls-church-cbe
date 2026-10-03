"use client";

import React from "react";
import { Cross, Sun, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { devotionalTopics } from "@/lib/data/prayers";

export default function DevotionalsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cross":
        return <Cross className="h-6 w-6 text-[#80142b]" />;
      case "Sun":
        return <Sun className="h-6 w-6 text-[#80142b]" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-[#80142b]" />;
      case "BookOpen":
        return <BookOpen className="h-6 w-6 text-[#80142b]" />;
      default:
        return <Sparkles className="h-6 w-6 text-[#80142b]" />;
    }
  };

  return (
    <section id="devotionals-section" className="section-pad bg-white">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
            MORE SPIRITUAL RESOURCES
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1f040b] md:text-4xl">
            Devotionals, Saints &amp; Catechesis
          </h2>
          <div className="gold-line" />
          <p className="mt-4 text-base font-medium text-slate-600">
            &ldquo;Deepen your spiritual roots with sacred traditions and liturgical devotions.&rdquo;
          </p>
        </div>

        {/* Devotionals Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {devotionalTopics.map((topic) => (
            <div
              key={topic.id}
              className="group flex flex-col justify-between rounded-3xl border border-[#e7dec8] bg-[#fbf8f1] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c59b27] hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#c59b27]/30 transition-colors group-hover:bg-[#80142b] group-hover:text-[#f5d77f]">
                  {getIcon(topic.icon)}
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#1f040b] group-hover:text-[#80142b] transition-colors">
                  {topic.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#80142b]">
                  {topic.tamilTitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {topic.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#e7dec8]/80 pt-4 text-xs font-bold text-[#1f040b] group-hover:text-[#80142b] transition-colors">
                <span>Explore Guide</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
