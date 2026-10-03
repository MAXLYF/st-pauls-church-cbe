"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { RefreshCw, AlertCircle, BookOpen, Languages, ChevronRight } from "lucide-react";

export interface ReadingItem {
  slug: string;
  sourceUrl: string;
  firstReading: string | null;
  psalm: string | null;
  secondReading: string | null;
  alleluia: string | null;
  gospel: string | null;
  dayDescription: string | null;
  tickerText: string;
}

export interface DualReadingsResponse {
  success: boolean;
  date: string;
  en: ReadingItem | null;
  ta: ReadingItem | null;
  enError?: string | null;
  taError?: string | null;
}

export default function DailyReadingsBar() {
  const [dualData, setDualData] = useState<DualReadingsResponse | null>(null);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentDateStr, setCurrentDateStr] = useState<string>("");
  const activeDateRef = useRef<string>("");
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine user's local calendar date dynamically (YYYY-MM-DD)
  const getLocalDateString = (): string => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Fetch readings for a given date from the API
  const fetchReadingsForDate = useCallback(async (dateStr: string) => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`/api/readings?date=${dateStr}&_t=${Date.now()}`, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const result: DualReadingsResponse = await response.json();

      if (result.success && (result.en || result.ta)) {
        setDualData(result);
        setIsError(false);
        setIsLoading(false);
      } else {
        throw new Error(result.enError || result.taError || "Readings unavailable");
      }
    } catch (err) {
      console.warn("Could not retrieve Mass Readings for", dateStr, err);
      // Reset reading data so incorrect or stale readings are NEVER shown
      setDualData(null);
      setIsError(true);
      setIsLoading(false);

      // Automatic retry after 20 seconds
      retryTimeoutRef.current = setTimeout(() => {
        const currentDate = getLocalDateString();
        fetchReadingsForDate(currentDate);
      }, 20000);
    }
  }, []);

  // Initial load & automatic date rollover detection (e.g. across midnight)
  useEffect(() => {
    const initialDate = getLocalDateString();
    activeDateRef.current = initialDate;
    setCurrentDateStr(initialDate);
    fetchReadingsForDate(initialDate);

    // Periodic check every 10 seconds to catch midnight date transition
    const intervalId = setInterval(() => {
      const currentDate = getLocalDateString();
      if (currentDate !== activeDateRef.current) {
        // Calendar date changed! Switch immediately to the new day's readings
        activeDateRef.current = currentDate;
        setCurrentDateStr(currentDate);
        setDualData(null);
        fetchReadingsForDate(currentDate);
      }
    }, 10000);

    // Also check on tab focus (e.g. if device wakes from sleep on a new day)
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        const currentDate = getLocalDateString();
        if (currentDate !== activeDateRef.current) {
          activeDateRef.current = currentDate;
          setCurrentDateStr(currentDate);
          setDualData(null);
          fetchReadingsForDate(currentDate);
        }
      }
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [fetchReadingsForDate]);

  // Current active reading item according to selected language
  const currentReading = language === "en" ? dualData?.en : dualData?.ta;
  const currentError =
    language === "en"
      ? dualData?.enError || "Today's Mass Readings are temporarily unavailable. Please try again shortly."
      : dualData?.taError || "தமிழ் திருப்பலி வாசகங்கள் தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்.";

  // Target Catholic Gallery URL for the active language
  const targetUrl =
    currentReading?.sourceUrl ||
    (language === "ta"
      ? "https://bible.catholicgallery.org/tamil-mass-reading/tr-2026/"
      : "https://www.catholicgallery.org/mass-reading/daily-mass-readings-2026/");

  // Toggle language between English and Tamil
  const handleToggleLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  // Render individual ticker item for English mode
  const renderEnglishTicker = (item: ReadingItem) => (
    <span className="inline-flex items-center gap-3 text-xs sm:text-[13px] tracking-wide font-medium">
      <span className="font-bold tracking-wider text-[#fde047] drop-shadow-xs flex items-center gap-1.5 shrink-0">
        <span>📖</span>
        <span>TODAY&apos;S MASS READINGS</span>
      </span>
      <span className="text-[#d4af37]/60">|</span>
      {item.firstReading && (
        <>
          <span className="text-white/90">
            First Reading:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.firstReading}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.psalm && (
        <>
          <span className="text-white/90">
            Psalm:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.psalm}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.secondReading && (
        <>
          <span className="text-white/90">
            Second Reading:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.secondReading}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.gospel && (
        <span className="text-white/90">
          Gospel:{" "}
          <strong className="font-semibold text-white tracking-normal">{item.gospel}</strong>
        </span>
      )}
    </span>
  );

  // Render individual ticker item for Tamil mode
  // Format: 📖 இன்றைய திருப்பலி வாசகங்கள் | முதல் வாசகம்: ... | திருப்பாடல்: ... | இரண்டாம் வாசகம்: ... | நற்செய்தி: ...
  const renderTamilTicker = (item: ReadingItem) => (
    <span className="inline-flex items-center gap-3 text-xs sm:text-[13px] tracking-wide font-medium">
      <span className="font-bold tracking-wider text-[#fde047] drop-shadow-xs flex items-center gap-1.5 shrink-0">
        <span>📖</span>
        <span>இன்றைய திருப்பலி வாசகங்கள்</span>
      </span>
      <span className="text-[#d4af37]/60">|</span>
      {item.firstReading && (
        <>
          <span className="text-white/90">
            முதல் வாசகம்:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.firstReading}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.psalm && (
        <>
          <span className="text-white/90">
            திருப்பாடல்:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.psalm}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.secondReading && (
        <>
          <span className="text-white/90">
            இரண்டாம் வாசகம்:{" "}
            <strong className="font-semibold text-white tracking-normal">{item.secondReading}</strong>
          </span>
          <span className="text-[#d4af37]/60">|</span>
        </>
      )}
      {item.gospel && (
        <span className="text-white/90">
          நற்செய்தி:{" "}
          <strong className="font-semibold text-white tracking-normal">{item.gospel}</strong>
        </span>
      )}
    </span>
  );

  return (
    <aside
      aria-label="Daily Mass Readings"
      className="relative z-40 w-full border-b border-[#c59b27]/30 bg-gradient-to-r from-[#3b0812] via-[#630f20] to-[#3b0812] text-white shadow-xs transition-colors duration-200 print:hidden"
    >
      <div className="relative flex h-10 w-full items-center overflow-hidden px-2.5 sm:px-4">
        {/* Left pinned compact badge for brand identity */}
        <div className="flex items-center gap-1.5 shrink-0 pr-2.5 sm:pr-3 border-r border-[#c59b27]/30 bg-gradient-to-r from-[#3b0812] to-transparent z-10 select-none">
          <BookOpen className="h-3.5 w-3.5 text-[#f5d77f] shrink-0" />
          <span className="hidden md:inline text-[11px] font-bold uppercase tracking-wider text-[#f5d77f]">
            {language === "ta" ? "வாசகங்கள்" : "Readings"}
          </span>
        </div>

        {/* Center scrolling ticker / state display - Clickable to open full readings internally */}
        <Link
          href={`/daily-mass-readings?lang=${language}&date=${currentDateStr || getLocalDateString()}`}
          title={
            language === "ta"
              ? "முழு திருப்பலி வாசகங்களையும் வாசிக்க கிளிக் செய்யவும்"
              : "Click to read today's complete Daily Mass Readings"
          }
          className="group relative flex-1 overflow-hidden h-full flex items-center cursor-pointer px-2 sm:px-3 focus:outline-hidden focus:ring-1 focus:ring-[#f5d77f]/60"
        >
          {isLoading && !dualData && (
            <div className="flex items-center gap-2 text-xs text-white/80 pl-2 italic">
              <RefreshCw className="h-3 w-3 animate-spin text-[#f5d77f]" />
              <span>
                {language === "ta"
                  ? "இன்றைய திருப்பலி வாசகங்கள் பெறப்படுகின்றன..."
                  : "Loading today's Mass readings..."}
              </span>
            </div>
          )}

          {(isError || (!isLoading && !currentReading)) && (
            <div className="flex items-center gap-2 text-xs text-amber-200 pl-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>{currentError}</span>
            </div>
          )}

          {currentReading && (
            <div
              key={`marquee-${language}-${currentDateStr}`}
              className="marquee-wrapper w-full h-full flex items-center overflow-hidden"
            >
              <div className="animate-readings-marquee group-hover:[animation-play-state:paused] flex items-center">
                {/* 4 duplicated sets for seamless infinite scrolling */}
                {[0, 1, 2, 3].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="flex items-center shrink-0 pr-16"
                    aria-hidden={copyIndex > 0 ? "true" : undefined}
                  >
                    {language === "en" ? renderEnglishTicker(currentReading) : renderTamilTicker(currentReading)}
                    <span className="mx-8 text-[#d4af37]/40 text-xs">✦</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Link>

        {/* Right side controls: Language Selector + Internal Full readings button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 pl-2 sm:pl-3 border-l border-[#c59b27]/30 bg-gradient-to-l from-[#3b0812] to-transparent z-10">
          {/* Small, elegant Language Selector Button */}
          <button
            type="button"
            onClick={handleToggleLanguage}
            title={language === "en" ? "தமிழில் திருப்பலி வாசகங்களை வாசிக்க கிளிக் செய்யவும்" : "Switch to English Mass Readings"}
            aria-label={language === "en" ? "Switch to Tamil Mass Readings" : "Switch to English Mass Readings"}
            className="inline-flex items-center gap-1 rounded-full border border-[#f5d77f]/50 bg-[#781226]/85 hover:bg-[#8e172f] hover:border-[#f5d77f] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-semibold text-[#f5d77f] hover:text-white shadow-xs transition-all active:scale-95 cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-[#f5d77f]"
          >
            <Languages className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#f5d77f] shrink-0" />
            <span>{language === "en" ? "தமிழ்" : "English"}</span>
          </button>

          {/* Full Readings Internal Link */}
          <Link
            href={`/daily-mass-readings?lang=${language}&date=${currentDateStr || getLocalDateString()}`}
            title={
              language === "ta"
                ? "முழு திருப்பலி வாசகங்களை வாசிக்கவும்"
                : "Read Complete Daily Mass Readings"
            }
            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 border border-[#f5d77f]/40 px-2 py-0.5 text-[11px] text-[#f5d77f] font-semibold hover:text-white transition-all cursor-pointer"
          >
            <span>{language === "ta" ? "முழு வாசகங்கள்" : "Full Reading"}</span>
            <ChevronRight className="h-3 w-3 shrink-0" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

