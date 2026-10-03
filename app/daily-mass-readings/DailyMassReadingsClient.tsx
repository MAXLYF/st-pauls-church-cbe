"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Printer,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Bookmark,
  Volume2,
  AlertCircle,
  RefreshCw,
  Home
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export interface FullReadingSection {
  heading: string;
  reference: string;
  intro?: string;
  paragraphs: string[];
  response?: string;
}

export interface FullReadingItem {
  slug: string;
  sourceUrl: string;
  dayTitle: string | null;
  firstReading?: FullReadingSection | null;
  psalm?: FullReadingSection | null;
  secondReading?: FullReadingSection | null;
  alleluia?: FullReadingSection | null;
  gospel?: FullReadingSection | null;
}

export interface DualReadingsApiResponse {
  success: boolean;
  date: string;
  fullEn?: FullReadingItem | null;
  fullTa?: FullReadingItem | null;
  enError?: string | null;
  taError?: string | null;
}

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getOffsetDateString(dateStr: string, dayOffset: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  dateObj.setDate(dateObj.getDate() + dayOffset);
  const nextY = dateObj.getFullYear();
  const nextM = String(dateObj.getMonth() + 1).padStart(2, "0");
  const nextD = String(dateObj.getDate()).padStart(2, "0");
  return `${nextY}-${nextM}-${nextD}`;
}

function formatDisplayDate(dateStr: string, lang: "en" | "ta"): string {
  if (!dateStr || !dateStr.includes("-")) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);

  if (lang === "ta") {
    const tamilDays = [
      "ஞாயிற்றுக்கிழமை",
      "திங்கட்கிழமை",
      "செவ்வாய்க்கிழமை",
      "புதன்கிழமை",
      "வியாழக்கிழமை",
      "வெள்ளிக்கிழமை",
      "சனிக்கிழமை"
    ];
    const tamilMonths = [
      "ஜனவரி",
      "பிப்ரவரி",
      "மார்ச்",
      "ஏப்ரல்",
      "மே",
      "ஜூன்",
      "ஜூலை",
      "ஆகஸ்ட்",
      "செப்டம்பர்",
      "அக்டோபர்",
      "நவம்பர்",
      "டிசம்பர்"
    ];
    const dayName = tamilDays[dateObj.getDay()];
    const monthName = tamilMonths[dateObj.getMonth()];
    return `${dayName}, ${d} ${monthName} ${y}`;
  }

  const enDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const enMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dayName = enDays[dateObj.getDay()];
  const monthName = enMonths[dateObj.getMonth()];
  return `${dayName}, ${d} ${monthName} ${y}`;
}

interface DailyMassReadingsClientProps {
  initialDate?: string;
  initialLang?: "en" | "ta";
  initialData?: DualReadingsApiResponse | null;
}

export default function DailyMassReadingsClient({
  initialDate: propDate,
  initialLang: propLang,
  initialData: propData
}: DailyMassReadingsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Read initial date & lang from props or URL or default to Today and English
  const resolvedInitialDate =
    searchParams?.get("date") || propDate || getTodayDateString();
  const resolvedInitialLang =
    searchParams?.get("lang") === "ta" || propLang === "ta" ? "ta" : "en";

  const [activeDate, setActiveDate] = useState<string>(resolvedInitialDate);
  const [language, setLanguage] = useState<"en" | "ta">(resolvedInitialLang);
  const [readingData, setReadingData] = useState<DualReadingsApiResponse | null>(
    propData && propData.date === resolvedInitialDate ? propData : null
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !(propData && propData.date === resolvedInitialDate)
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg" | "xl">("base");

  // Sync state with URL params if changed externally
  useEffect(() => {
    const paramDate = searchParams?.get("date");
    const paramLang = searchParams?.get("lang");
    if (paramDate && paramDate !== activeDate) {
      setActiveDate(paramDate);
    }
    if (paramLang && (paramLang === "en" || paramLang === "ta") && paramLang !== language) {
      setLanguage(paramLang);
    }
  }, [searchParams]);

  // Update URL search parameters without full page reload
  const updateUrl = useCallback((newDate: string, newLang: "en" | "ta") => {
    const params = new URLSearchParams();
    params.set("date", newDate);
    params.set("lang", newLang);
    const newUrl = `/daily-mass-readings?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, []);

  // Fetch readings from the internal API
  const loadReadings = useCallback(async (dateStr: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const res = await fetch(`/api/readings?date=${dateStr}&_t=${Date.now()}`, {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const json: DualReadingsApiResponse = await res.json();
      if (json.success && (json.fullEn || json.fullTa)) {
        setReadingData(json);
        setIsError(false);
      } else {
        throw new Error("Readings not available for this date");
      }
    } catch (err) {
      console.warn("Could not retrieve readings:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load when activeDate changes
  useEffect(() => {
    loadReadings(activeDate);
  }, [activeDate, loadReadings]);

  // Date navigation handlers
  const handlePreviousDay = () => {
    const prevDate = getOffsetDateString(activeDate, -1);
    setActiveDate(prevDate);
    updateUrl(prevDate, language);
  };

  const handleNextDay = () => {
    const nextDate = getOffsetDateString(activeDate, 1);
    setActiveDate(nextDate);
    updateUrl(nextDate, language);
  };

  const handleToday = () => {
    const today = getTodayDateString();
    setActiveDate(today);
    updateUrl(today, language);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected) {
      setActiveDate(selected);
      updateUrl(selected, language);
    }
  };

  // Language switch handler
  const handleToggleLanguage = (newLang: "en" | "ta") => {
    setLanguage(newLang);
    updateUrl(activeDate, newLang);
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Current active reading object
  const currentItem: FullReadingItem | null =
    language === "ta" ? readingData?.fullTa || null : readingData?.fullEn || null;

  const fallbackItem: FullReadingItem | null =
    language === "ta" ? readingData?.fullEn || null : readingData?.fullTa || null;

  const effectiveItem = currentItem || fallbackItem;

  const formattedDate = formatDisplayDate(activeDate, language);
  const isToday = activeDate === getTodayDateString();

  // Copy full reading text to clipboard
  const handleCopy = () => {
    if (!effectiveItem) return;

    const sections: string[] = [];
    sections.push(`ST. PAUL'S CHURCH, RATHINAPURI, COIMBATORE`);
    sections.push(language === "ta" ? "அன்றாட திருப்பலி வாசகங்கள்" : "DAILY MASS READINGS");
    sections.push(formattedDate);
    if (effectiveItem.dayTitle) sections.push(effectiveItem.dayTitle);
    sections.push("\n----------------------------------------\n");

    if (effectiveItem.firstReading) {
      sections.push(`${effectiveItem.firstReading.heading.toUpperCase()}: ${effectiveItem.firstReading.reference}`);
      if (effectiveItem.firstReading.intro) sections.push(`(${effectiveItem.firstReading.intro})`);
      sections.push(effectiveItem.firstReading.paragraphs.join("\n\n"));
      sections.push("\n----------------------------------------\n");
    }

    if (effectiveItem.psalm) {
      sections.push(`${effectiveItem.psalm.heading.toUpperCase()}: ${effectiveItem.psalm.reference}`);
      if (effectiveItem.psalm.response) sections.push(effectiveItem.psalm.response);
      sections.push(effectiveItem.psalm.paragraphs.join("\n\n"));
      sections.push("\n----------------------------------------\n");
    }

    if (effectiveItem.secondReading) {
      sections.push(`${effectiveItem.secondReading.heading.toUpperCase()}: ${effectiveItem.secondReading.reference}`);
      if (effectiveItem.secondReading.intro) sections.push(`(${effectiveItem.secondReading.intro})`);
      sections.push(effectiveItem.secondReading.paragraphs.join("\n\n"));
      sections.push("\n----------------------------------------\n");
    }

    if (effectiveItem.alleluia) {
      sections.push(`${effectiveItem.alleluia.heading.toUpperCase()}: ${effectiveItem.alleluia.reference}`);
      sections.push(effectiveItem.alleluia.paragraphs.join("\n\n"));
      sections.push("\n----------------------------------------\n");
    }

    if (effectiveItem.gospel) {
      sections.push(`${effectiveItem.gospel.heading.toUpperCase()}: ${effectiveItem.gospel.reference}`);
      if (effectiveItem.gospel.intro) sections.push(`(${effectiveItem.gospel.intro})`);
      sections.push(effectiveItem.gospel.paragraphs.join("\n\n"));
    }

    navigator.clipboard.writeText(sections.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Font size classes
  const fontClass =
    fontSizeLevel === "sm"
      ? "text-sm leading-relaxed"
      : fontSizeLevel === "lg"
      ? "text-lg leading-loose"
      : fontSizeLevel === "xl"
      ? "text-xl leading-loose"
      : "text-base leading-relaxed";

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f040b]">
      {/* Breadcrumbs - screen only */}
      <div className="no-print">
        <Breadcrumbs
          items={[
            { label: "Prayer & Liturgy", href: "/prayer" },
            { label: language === "ta" ? "திருப்பலி வாசகங்கள்" : "Daily Mass Readings" }
          ]}
        />
      </div>

      {/* Screen Hero Banner with St. Paul's Church Identity */}
      <section className="no-print relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#450a16] to-[#140206] py-12 md:py-16 text-white border-b-2 border-[#c59b27]/40 shadow-md">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-[#c59b27]/15 blur-3xl"
        />

        <div className="container-site relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            {/* Top Church Identity Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f5d77f]/40 bg-[#781226]/60 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] uppercase shadow-inner backdrop-blur">
              <BookOpen className="h-3.5 w-3.5 text-[#f5d77f]" />
              <span>ST. PAUL&apos;S CHURCH • RATHINAPURI, COIMBATORE</span>
            </div>

            {/* Main Header Title */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl drop-shadow-sm">
              {language === "ta" ? "அன்றாட திருப்பலி வாசகங்கள்" : "DAILY MASS READINGS"}
            </h1>

            {/* Date Display */}
            <p className="mt-3 text-lg md:text-2xl font-semibold text-[#f5d77f] tracking-wide">
              {formattedDate}
            </p>

            {/* Liturgical Day Title / Feast */}
            {effectiveItem?.dayTitle && (
              <div className="mt-3 inline-block rounded-xl border border-[#c59b27]/30 bg-black/25 px-4 py-1.5 text-sm md:text-base font-medium text-amber-100/90 shadow-xs backdrop-blur">
                <span>✦ </span>
                <span>{effectiveItem.dayTitle}</span>
                <span> ✦</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Controls Bar: Language + Date Nav + Print (Screen Only) */}
      <nav aria-label="Reading Controls" className="no-print sticky top-0 z-30 border-b border-[#e7dec8] bg-white/95 backdrop-blur-md shadow-xs">
        <div className="container-site py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Language Toggle (English | தமிழ்) */}
          <div className="flex items-center gap-2 bg-[#f4ece1] p-1 rounded-full border border-[#d8c7a8]">
            <button
              type="button"
              onClick={() => handleToggleLanguage("en")}
              aria-pressed={language === "en"}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#80142b] text-white shadow-xs"
                  : "text-[#80142b] hover:text-[#5a0d1d] hover:bg-white/60"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleToggleLanguage("ta")}
              aria-pressed={language === "ta"}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                language === "ta"
                  ? "bg-[#80142b] text-white shadow-xs"
                  : "text-[#80142b] hover:text-[#5a0d1d] hover:bg-white/60"
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Center: Date Navigation (Previous Day | Today | Next Day + Date Picker) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handlePreviousDay}
              title={language === "ta" ? "முந்தைய நாள்" : "Previous Day"}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 hover:border-[#80142b] px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 transition shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="h-4 w-4 text-[#80142b]" />
              <span className="hidden sm:inline">{language === "ta" ? "முந்தைய நாள்" : "Previous"}</span>
            </button>

            <button
              type="button"
              onClick={handleToday}
              disabled={isToday}
              className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
                isToday
                  ? "bg-[#80142b] text-white cursor-default"
                  : "bg-white border border-slate-300 hover:border-[#80142b] text-[#80142b] hover:bg-slate-50 active:scale-95"
              }`}
            >
              {language === "ta" ? "இன்று" : "Today"}
            </button>

            <button
              type="button"
              onClick={handleNextDay}
              title={language === "ta" ? "அடுத்த நாள்" : "Next Day"}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 hover:border-[#80142b] px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 transition shadow-xs cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">{language === "ta" ? "அடுத்த நாள்" : "Next"}</span>
              <ChevronRight className="h-4 w-4 text-[#80142b]" />
            </button>

            {/* Quick Calendar Jump */}
            <div className="relative inline-flex items-center">
              <label htmlFor="calendar-jump-input" className="sr-only">
                {language === "ta" ? "தேதியைத் தேர்ந்தெடுக்கவும்" : "Select date"}
              </label>
              <input
                id="calendar-jump-input"
                type="date"
                min="2026-01-01"
                max="2026-12-31"
                value={activeDate}
                onChange={handleDateChange}
                aria-label="Select Date"
                title={language === "ta" ? "தேதியைத் தேர்ந்தெடுக்கவும்" : "Pick Date"}
                className="w-9 h-9 p-0 rounded-lg border border-slate-300 bg-white hover:border-[#80142b] text-transparent cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#80142b] transition"
              />
              <Calendar className="pointer-events-none absolute left-2.5 h-4 w-4 text-[#80142b]" />
            </div>
          </div>

          {/* Right: Print Button + Tools (Font Size, Copy) */}
          <div className="flex items-center gap-2">
            {/* Font size adjuster */}
            <div className="hidden lg:flex items-center gap-1 border border-slate-200 rounded-lg bg-slate-50 p-0.5 text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setFontSizeLevel("sm")}
                title="Small text"
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeLevel === "sm" ? "bg-white shadow-xs text-[#80142b]" : "hover:text-[#80142b]"}`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel("base")}
                title="Normal text"
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeLevel === "base" ? "bg-white shadow-xs text-[#80142b]" : "hover:text-[#80142b]"}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel("lg")}
                title="Large text"
                className={`px-2 py-1 rounded cursor-pointer ${fontSizeLevel === "lg" ? "bg-white shadow-xs text-[#80142b]" : "hover:text-[#80142b]"}`}
              >
                A+
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              title={language === "ta" ? "வாசகத்தை நகலெடுக்க" : "Copy reading text"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 hover:border-[#80142b] px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 transition shadow-xs cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700">{language === "ta" ? "நகலெடுக்கப்பட்டது" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[#80142b]" />
                  <span className="hidden sm:inline">{language === "ta" ? "நகலெடு" : "Copy"}</span>
                </>
              )}
            </button>

            {/* Prominent Print Reading Button */}
            <button
              type="button"
              onClick={handlePrint}
              title={language === "ta" ? "இன்றைய வாசகத்தை அச்சிடுக" : "Print Today's Mass Reading"}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#781226] via-[#8c1830] to-[#6a0f21] hover:from-[#8d1630] hover:to-[#a11b37] border border-[#d4af37]/40 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Printer className="h-4 w-4 text-[#f5d77f]" />
              <span>{language === "ta" ? "அச்சிடுக (Print)" : "Print Reading"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area: Responsive Reading Cards + Print Document Layout */}
      <main className="container-site py-8 md:py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="mx-auto max-w-3xl py-20 text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[#80142b]" />
            <p className="mt-4 text-base font-medium text-slate-600">
              {language === "ta"
                ? "திருப்பலி வாசகங்கள் பெறப்படுகின்றன..."
                : "Retrieving Daily Mass Readings..."}
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-amber-300 bg-amber-50/80 p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto h-10 w-10 text-amber-600" />
            <h2 className="mt-3 text-lg font-bold text-amber-950">
              {language === "ta"
                ? "வாசகங்களை ஏற்றுவதில் சிக்கல் ஏற்பட்டது"
                : "Unable to Load Mass Readings"}
            </h2>
            <p className="mt-2 text-sm text-amber-900 leading-relaxed">
              {language === "ta"
                ? "தேர்ந்தெடுக்கப்பட்ட தேதிக்கான திருப்பலி வாசகங்கள் தற்காலிகமாக கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்."
                : "Mass readings for this date are currently unavailable. Please verify your connection or try another date."}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => loadReadings(activeDate)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#80142b] px-4 py-2 text-sm font-bold text-white shadow-xs hover:bg-[#9e1c36] cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>{language === "ta" ? "மீண்டும் முயற்சி செய்" : "Try Again"}</span>
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {language === "ta" ? "இன்றைய தேதிக்கு செல்" : "Go to Today"}
              </button>
            </div>
          </div>
        )}

        {/* Reading Sections Wrapper */}
        {!isLoading && !isError && effectiveItem && (
          <div className="mx-auto max-w-4xl">
            {/* A4 PRINT TABLE WRAPPER:
                thead repeats on every printed page
                tfoot repeats on every printed page
                tbody contains reading content
            */}
            <table className="w-full border-collapse">
              {/* PRINT ONLY: Dedicated Church Header on EVERY printed page */}
              <thead className="print-only print-table-header">
                <tr>
                  <th className="font-normal text-left pb-4 border-b-2 border-black/80">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/images/logo.jpg"
                          alt="St. Paul's Church Logo"
                          className="h-14 w-14 rounded-full border border-black/80 object-cover"
                        />
                        <div>
                          <div className="text-base font-bold tracking-wider text-black uppercase">
                            ST. PAUL&apos;S CHURCH
                          </div>
                          <div className="text-xs font-semibold tracking-widest text-neutral-700 uppercase">
                            RATHINAPURI, COIMBATORE
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold tracking-wider text-black uppercase">
                          {language === "ta" ? "அன்றாட திருப்பலி வாசகங்கள்" : "DAILY MASS READINGS"}
                        </div>
                        <div className="text-xs font-medium text-neutral-900 mt-0.5">
                          {formattedDate}
                        </div>
                        {effectiveItem.dayTitle && (
                          <div className="text-[10px] text-neutral-600 italic max-w-xs mt-0.5">
                            {effectiveItem.dayTitle}
                          </div>
                        )}
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* PRINT ONLY: Dedicated Church Footer on EVERY printed page */}
              <tfoot className="print-only print-table-footer">
                <tr>
                  <td className="pt-3 border-t border-black/40 text-[9pt] text-neutral-700">
                    <div className="flex justify-between items-center">
                      <span>St. Paul&apos;s Church, Rathinapuri, Coimbatore</span>
                      <span className="print-page-number"></span>
                    </div>
                  </td>
                </tr>
              </tfoot>

              {/* Body containing all reading sections */}
              <tbody>
                <tr>
                  <td className="py-2">
                    <div className="space-y-8 md:space-y-10">
                      {/* SECTION 1: FIRST READING (முதல் வாசகம்) */}
                      {effectiveItem.firstReading && (
                        <article className="reading-section-card relative rounded-2xl border border-[#e5dcce] bg-white p-6 md:p-8 shadow-sm transition hover:shadow-md">
                          <header className="reading-heading-box border-b border-[#e5dcce]/80 pb-4 mb-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbf4e6] border border-[#d4af37]/40 px-3 py-1 text-xs font-bold tracking-wider text-[#80142b] uppercase">
                                <Bookmark className="h-3.5 w-3.5 text-[#c59b27]" />
                                <span>{effectiveItem.firstReading.heading}</span>
                              </span>
                              <span className="text-sm font-semibold text-[#80142b] bg-[#faf7f2] px-3 py-1 rounded-md border border-[#e5dcce]">
                                {effectiveItem.firstReading.reference}
                              </span>
                            </div>

                            {/* Tamil or English reading intro citation */}
                            {effectiveItem.firstReading.intro && (
                              <p className="mt-3 text-sm italic font-medium text-slate-700">
                                &ldquo;{effectiveItem.firstReading.intro}&rdquo;
                              </p>
                            )}
                          </header>

                          {/* Paragraphs */}
                          <div className={`space-y-4 text-slate-800 ${fontClass}`}>
                            {effectiveItem.firstReading.paragraphs.map((p, pIdx) => (
                              <p key={pIdx} className="leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>

                          <footer className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 italic">
                            {language === "ta"
                              ? "ஆண்டவரின் அருள்வாக்கு. — இறைவனுக்கு நன்றி."
                              : "The Word of the Lord. — Thanks be to God."}
                          </footer>
                        </article>
                      )}

                      {/* SECTION 2: RESPONSORIAL PSALM (பதிலுரைப் பாடல்) */}
                      {effectiveItem.psalm && (
                        <article className="reading-section-card relative rounded-2xl border border-[#e5dcce] bg-white p-6 md:p-8 shadow-sm transition hover:shadow-md">
                          <header className="reading-heading-box border-b border-[#e5dcce]/80 pb-4 mb-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbf4e6] border border-[#d4af37]/40 px-3 py-1 text-xs font-bold tracking-wider text-[#80142b] uppercase">
                                <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" />
                                <span>{effectiveItem.psalm.heading}</span>
                              </span>
                              <span className="text-sm font-semibold text-[#80142b] bg-[#faf7f2] px-3 py-1 rounded-md border border-[#e5dcce]">
                                {effectiveItem.psalm.reference}
                              </span>
                            </div>

                            {/* Prominent Psalm Response / பல்லவி Refrain */}
                            {effectiveItem.psalm.response && (
                              <div className="mt-4 rounded-xl border-l-4 border-[#80142b] bg-[#fbf6ea] p-4 text-slate-900 shadow-xs">
                                <div className="text-xs font-bold uppercase tracking-wider text-[#80142b] mb-1">
                                  {language === "ta" ? "பல்லவி (Response)" : "Response (R.)"}
                                </div>
                                <p className="text-base sm:text-lg font-bold text-[#80142b] italic">
                                  {effectiveItem.psalm.response}
                                </p>
                              </div>
                            )}
                          </header>

                          {/* Psalm verses / strophes */}
                          <div className={`space-y-4 text-slate-800 ${fontClass}`}>
                            {effectiveItem.psalm.paragraphs.map((p, pIdx) => {
                              const isRefrainEcho = p.startsWith("R.") || p.includes("– பல்லவி") || p.includes("–பல்லவி");
                              return (
                                <p
                                  key={pIdx}
                                  className={
                                    isRefrainEcho
                                      ? "pl-4 text-slate-700 italic border-l-2 border-[#d4af37]/50"
                                      : "leading-relaxed"
                                  }
                                >
                                  {p}
                                </p>
                              );
                            })}
                          </div>
                        </article>
                      )}

                      {/* SECTION 3: SECOND READING (இரண்டாம் வாசகம்) - Conditional! */}
                      {effectiveItem.secondReading && (
                        <article className="reading-section-card relative rounded-2xl border border-[#e5dcce] bg-white p-6 md:p-8 shadow-sm transition hover:shadow-md">
                          <header className="reading-heading-box border-b border-[#e5dcce]/80 pb-4 mb-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbf4e6] border border-[#d4af37]/40 px-3 py-1 text-xs font-bold tracking-wider text-[#80142b] uppercase">
                                <Bookmark className="h-3.5 w-3.5 text-[#c59b27]" />
                                <span>{effectiveItem.secondReading.heading}</span>
                              </span>
                              <span className="text-sm font-semibold text-[#80142b] bg-[#faf7f2] px-3 py-1 rounded-md border border-[#e5dcce]">
                                {effectiveItem.secondReading.reference}
                              </span>
                            </div>

                            {effectiveItem.secondReading.intro && (
                              <p className="mt-3 text-sm italic font-medium text-slate-700">
                                &ldquo;{effectiveItem.secondReading.intro}&rdquo;
                              </p>
                            )}
                          </header>

                          <div className={`space-y-4 text-slate-800 ${fontClass}`}>
                            {effectiveItem.secondReading.paragraphs.map((p, pIdx) => (
                              <p key={pIdx} className="leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>

                          <footer className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500 italic">
                            {language === "ta"
                              ? "ஆண்டவரின் அருள்வாக்கு. — இறைவனுக்கு நன்றி."
                              : "The Word of the Lord. — Thanks be to God."}
                          </footer>
                        </article>
                      )}

                      {/* SECTION 4: ALLELUIA / GOSPEL ACCLAMATION (நற்செய்திக்கு முன் வாழ்த்தொலி) */}
                      {effectiveItem.alleluia && (
                        <article className="reading-section-card relative rounded-2xl border border-[#e5dcce] bg-gradient-to-br from-white to-[#fbf8f2] p-6 md:p-8 shadow-sm transition hover:shadow-md">
                          <header className="reading-heading-box border-b border-[#e5dcce]/80 pb-4 mb-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#781226]/10 border border-[#80142b]/30 px-3 py-1 text-xs font-bold tracking-wider text-[#80142b] uppercase">
                                <Sparkles className="h-3.5 w-3.5 text-[#80142b]" />
                                <span>{effectiveItem.alleluia.heading}</span>
                              </span>
                              <span className="text-sm font-semibold text-[#80142b] bg-[#faf7f2] px-3 py-1 rounded-md border border-[#e5dcce]">
                                {effectiveItem.alleluia.reference}
                              </span>
                            </div>
                          </header>

                          <div className={`space-y-3 text-slate-800 font-medium ${fontClass}`}>
                            {effectiveItem.alleluia.paragraphs.map((p, pIdx) => (
                              <p key={pIdx} className="italic text-[#80142b]">
                                {p}
                              </p>
                            ))}
                          </div>
                        </article>
                      )}

                      {/* SECTION 5: GOSPEL (நற்செய்தி வாசகம்) */}
                      {effectiveItem.gospel && (
                        <article className="reading-section-card relative rounded-2xl border-2 border-[#d4af37]/60 bg-white p-6 md:p-8 shadow-md transition hover:shadow-lg">
                          <header className="reading-heading-box border-b-2 border-[#d4af37]/40 pb-4 mb-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#80142b] px-3.5 py-1 text-xs font-bold tracking-wider text-[#f5d77f] uppercase shadow-xs">
                                <span>✠</span>
                                <span>{effectiveItem.gospel.heading}</span>
                              </span>
                              <span className="text-sm font-bold text-[#80142b] bg-[#faf7f2] px-3.5 py-1 rounded-md border border-[#d4af37]/40">
                                {effectiveItem.gospel.reference}
                              </span>
                            </div>

                            {effectiveItem.gospel.intro && (
                              <p className="mt-3 text-sm italic font-semibold text-[#80142b]">
                                &ldquo;{effectiveItem.gospel.intro}&rdquo;
                              </p>
                            )}
                          </header>

                          <div className={`space-y-4 text-slate-900 ${fontClass}`}>
                            {effectiveItem.gospel.paragraphs.map((p, pIdx) => (
                              <p key={pIdx} className="leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>

                          <footer className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600 italic">
                            {language === "ta"
                              ? "ஆண்டவரின் அருள்வாக்கு. — கிறிஸ்துவே, உமக்கு புகழ்."
                              : "The Gospel of the Lord. — Praise to you, Lord Jesus Christ."}
                          </footer>
                        </article>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Bottom Screen Navigation Controls */}
            <div className="no-print mt-10 pt-6 border-t border-[#e7dec8] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition shadow-xs"
              >
                <Home className="h-4 w-4 text-[#80142b]" />
                <span>{language === "ta" ? "முகப்புக்குச் செல்" : "Back to Home"}</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousDay}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition shadow-xs cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 text-[#80142b]" />
                  <span>{language === "ta" ? "முந்தைய நாள்" : "Previous Day"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextDay}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition shadow-xs cursor-pointer"
                >
                  <span>{language === "ta" ? "அடுத்த நாள்" : "Next Day"}</span>
                  <ChevronRight className="h-4 w-4 text-[#80142b]" />
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-lg bg-[#80142b] hover:bg-[#9e1c36] px-4 py-2 text-sm font-bold text-white shadow-xs transition cursor-pointer"
              >
                <Printer className="h-4 w-4 text-[#f5d77f]" />
                <span>{language === "ta" ? "அச்சிடுக (Print)" : "Print Readings"}</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
