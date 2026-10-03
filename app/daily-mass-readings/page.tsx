import React, { Suspense } from "react";
import type { Metadata } from "next";
import DailyMassReadingsClient from "./DailyMassReadingsClient";
import { getReadingsForDate } from "@/lib/readings";

export const metadata: Metadata = {
  title: "Daily Mass Readings",
  description:
    "Official Catholic Daily Mass Readings in English and Tamil (முழு திருப்பலி வாசகங்கள்) at St. Paul's Church, Rathinapuri, Coimbatore. First Reading, Responsorial Psalm, Second Reading, Alleluia and Gospel with print layout.",
  keywords: [
    "Daily Mass Readings Coimbatore",
    "Tamil Catholic Mass Readings",
    "Catholic Gallery Daily Mass Readings",
    "St Pauls Church Rathinapuri Readings",
    "இன்றைய திருப்பலி வாசகங்கள்",
    "Rathinapuri Church Readings"
  ]
};

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface PageProps {
  searchParams: Promise<{ date?: string; lang?: string }>;
}

export default async function DailyMassReadingsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialDate = resolvedParams?.date || getTodayDateString();
  const initialLang = resolvedParams?.lang === "ta" ? "ta" : "en";

  let initialData = null;
  try {
    initialData = await getReadingsForDate(initialDate);
  } catch (e) {
    // Client fallback will handle on-the-fly fetch
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center py-24">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#80142b] border-t-transparent mx-auto" />
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Loading Daily Mass Readings...
            </p>
          </div>
        </div>
      }
    >
      <DailyMassReadingsClient
        initialDate={initialDate}
        initialLang={initialLang}
        initialData={initialData}
      />
    </Suspense>
  );
}
