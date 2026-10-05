import React, { Suspense } from "react";
import type { Metadata } from "next";
import TamilBibleClient from "./TamilBibleClient";
import { getAllBooks, getChapter } from "@/lib/tamil-bible";

export const metadata: Metadata = {
  title: "Tamil Holy Bible | தமிழ் திருவிவிலியம் | St. Paul's Church, Rathinapuri, Coimbatore",
  description:
    "Read the complete Catholic Tamil Holy Bible (தமிழ் திருவிவிலியம் - பொது மொழிபெயர்ப்பு) online at St. Paul's Church, Rathinapuri, Coimbatore. Complete Old and New Testament with search, chapter navigation, comfortable reading font controls, and A4 print layout.",
  keywords: [
    "Tamil Holy Bible",
    "தமிழ் திருவிவிலியம்",
    "Tamil Catholic Bible",
    "St Pauls Church Rathinapuri Tamil Bible",
    "பொது மொழிபெயர்ப்பு விவிலியம்",
    "Tamil Bible Catholic Gallery",
    "Catholic Tamil Bible online",
    "Rathinapuri Coimbatore Tamil Bible"
  ],
  openGraph: {
    title: "தமிழ் திருவிவிலியம் — Tamil Holy Bible | St. Paul's Church, Rathinapuri",
    description:
      "Read the complete Catholic Tamil Holy Bible online with chapter navigation, search, and print view at St. Paul's Church, Rathinapuri, Coimbatore.",
    type: "website"
  }
};

interface PageProps {
  searchParams: Promise<{ book?: string; chapter?: string; q?: string }>;
}

export default async function TamilBiblePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialBookSlug = resolvedParams?.book || "genesis";
  const initialChapter = parseInt(resolvedParams?.chapter || "1", 10) || 1;

  const books = getAllBooks();
  let initialChapterData = null;

  try {
    initialChapterData = await getChapter(initialBookSlug, initialChapter);
  } catch (err) {
    console.error("Failed to preload initial chapter:", err);
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center py-24">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#80142b] border-t-transparent mx-auto" />
            <p className="mt-4 text-sm font-semibold text-slate-700">
              தமிழ் திருவிவிலியம் ஏற்றப்படுகிறது...
            </p>
          </div>
        </div>
      }
    >
      <TamilBibleClient
        books={books}
        initialBookSlug={initialBookSlug}
        initialChapter={initialChapter}
        initialChapterData={initialChapterData}
      />
    </Suspense>
  );
}
