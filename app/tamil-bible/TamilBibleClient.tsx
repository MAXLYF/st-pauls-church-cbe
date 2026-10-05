"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Printer,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Search,
  X,
  Sliders,
  Sparkles,
  RefreshCw,
  Bookmark,
  Share2,
  Copy,
  Check,
  Layers,
  ChevronDown,
  Info
} from "lucide-react";
import type { BibleBook, ChapterData, ChapterItem } from "@/lib/tamil-bible";

interface TamilBibleClientProps {
  books: BibleBook[];
  initialBookSlug: string;
  initialChapter: number;
  initialChapterData: ChapterData | null;
}

export default function TamilBibleClient({
  books,
  initialBookSlug,
  initialChapter,
  initialChapterData
}: TamilBibleClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Active book and chapter state
  const [currentBookSlug, setCurrentBookSlug] = useState<string>(initialBookSlug);
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [chapterData, setChapterData] = useState<ChapterData | null>(initialChapterData);
  const [isLoading, setIsLoading] = useState<boolean>(!initialChapterData);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Reading Controls State
  // Font size: 0 = small (16px), 1 = normal (18px), 2 = large (21px), 3 = xl (24px)
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1);
  // Width: "normal" (max-w-3xl ~ 768px) vs "wide" (max-w-5xl ~ 1024px)
  const [readingWidth, setReadingWidth] = useState<"normal" | "wide">("normal");

  // Book Selection Modal / Drawer
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [selectedTestamentTab, setSelectedTestamentTab] = useState<"OT" | "NT">(
    books.find((b) => b.slug === initialBookSlug)?.testament || "OT"
  );
  const [bookSearchQuery, setBookSearchQuery] = useState<string>("");
  const [modalSelectedBook, setModalSelectedBook] = useState<BibleBook | null>(
    books.find((b) => b.slug === initialBookSlug) || books[0] || null
  );

  // Bible Search State
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

  // Copy share state
  const [copied, setCopied] = useState<boolean>(false);

  // References
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Find current book metadata
  const currentBook = books.find((b) => b.slug === currentBookSlug) || books[0];

  // Fetch chapter data when book or chapter changes
  const loadChapter = (bookSlug: string, ch: number, targetVerse?: string) => {
    setIsLoading(true);
    setLoadError(null);
    setCurrentBookSlug(bookSlug);
    setCurrentChapter(ch);
    if (targetVerse) {
      setHighlightedVerse(targetVerse);
    } else {
      setHighlightedVerse(null);
    }

    // Update URL query without full reload
    const url = `/tamil-bible?book=${encodeURIComponent(bookSlug)}&chapter=${ch}`;
    window.history.pushState(null, "", url);

    fetch(`/api/tamil-bible/chapter?book=${encodeURIComponent(bookSlug)}&chapter=${ch}`)
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data: ChapterData) => {
        setChapterData(data);
        setIsLoading(false);
        // Scroll to top or verse
        setTimeout(() => {
          if (targetVerse) {
            const el = document.getElementById(`verse-${targetVerse}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 150);
      })
      .catch((err) => {
        console.error("Failed to load chapter:", err);
        setLoadError(err.message || "அதிகாரத்தை ஏற்றுவதில் சிக்கல் ஏற்பட்டது.");
        setIsLoading(false);
      });
  };

  // Perform search across cached Bible
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      fetch(`/api/tamil-bible/search?q=${encodeURIComponent(searchQuery.trim())}&limit=30`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results || []);
          setIsSearching(false);
        })
        .catch(() => {
          setIsSearching(false);
        });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Copy current chapter text
  const handleCopyChapter = () => {
    if (!chapterData) return;
    const textLines = chapterData.items
      .map((item) => {
        if (item.type === "heading") return `\n[ ${item.text} ]\n`;
        if (item.type === "subheading") return `\n(${item.text})\n`;
        return `${item.verse} ${item.text}`;
      })
      .join("\n");

    const fullContent = `${chapterData.title}\nSt. Paul's Church, Rathinapuri, Coimbatore\n${"-".repeat(
      40
    )}\n\n${textLines}\n\nமூலம்: கத்தோலிக்க திருவிவிலியம் (Catholic Gallery Tamil Bible)`;

    navigator.clipboard.writeText(fullContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Font size classes
  const fontSizes = [
    { textClass: "text-base leading-relaxed", badgeClass: "text-xs" },
    { textClass: "text-lg leading-[1.85]", badgeClass: "text-xs" },
    { textClass: "text-xl leading-[1.95]", badgeClass: "text-sm" },
    { textClass: "text-2xl leading-[2.1]", badgeClass: "text-sm" }
  ];
  const activeFontSize = fontSizes[fontSizeLevel] || fontSizes[1];

  // Old & New Testament book lists
  const otBooks = books.filter((b) => b.testament === "OT");
  const ntBooks = books.filter((b) => b.testament === "NT");

  const filteredOtBooks = otBooks.filter(
    (b) =>
      b.tamilName.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.englishName.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );
  const filteredNtBooks = ntBooks.filter(
    (b) =>
      b.tamilName.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.englishName.toLowerCase().includes(bookSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-800">
      {/* 1. CHURCH BRANDING HEADER (Screen & Web View) */}
      <section className="border-b border-[#e8dfcf] bg-gradient-to-b from-[#fbf7f0] to-[#f4ebe1] px-4 py-8 sm:py-10 text-center no-print">
        <div className="container-site max-w-4xl mx-auto">
          {/* Church Badge & Location */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/images/logo.jpg"
              alt="St. Paul's Church logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-[#d4af37]/60 object-cover shadow-sm"
            />
            <div className="text-left">
              <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#80142b] uppercase">
                ST. PAUL&apos;S CHURCH
              </h2>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#b8860b] uppercase">
                RATHINAPURI, COIMBATORE
              </p>
            </div>
          </div>

          {/* Main Title: தமிழ் திருவிவிலியம் / Tamil Holy Bible */}
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#781226] tracking-tight font-['Noto_Sans_Tamil',sans-serif]">
            தமிழ் திருவிவிலியம்
          </h1>
          <div className="mt-1 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-slate-600">
            <span>/</span>
            <span className="tracking-wider">Tamil Holy Bible</span>
          </div>

          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 max-w-xl mx-auto">
            கத்தோலிக்க பொது மொழிபெயர்ப்பு • Catholic Ecumenical Translation
          </p>
        </div>
      </section>

      {/* 2. COMPACT STICKY READING TOOLBAR */}
      <header className="sticky top-20 z-40 border-b border-[#e6dbc8] bg-white/95 backdrop-blur-md shadow-xs no-print">
        <div className="container-site max-w-5xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Book & Chapter Quick Dropdowns + Visual Selector Button */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Full Book Grid Selector Button */}
            <button
              type="button"
              onClick={() => {
                setModalSelectedBook(currentBook);
                setIsBookModalOpen(true);
              }}
              title="அனைத்து விவிலிய நூல்கள் பட்டியல்"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#80142b]/10 hover:bg-[#80142b]/20 text-[#80142b] px-3 py-1.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer border border-[#80142b]/20"
            >
              <BookOpen className="h-4 w-4" />
              <span>நூல்கள் (Books)</span>
            </button>

            {/* Book Selector Dropdown */}
            <div className="relative">
              <select
                aria-label="Select Bible Book"
                value={currentBookSlug}
                onChange={(e) => {
                  const bSlug = e.target.value;
                  loadChapter(bSlug, 1);
                }}
                className="appearance-none rounded-lg border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs hover:border-[#80142b] focus:border-[#80142b] focus:outline-hidden cursor-pointer"
              >
                <optgroup label="── பழைய ஏற்பாடு (Old Testament) ──">
                  {otBooks.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.tamilName} ({b.englishName})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="── புதிய ஏற்பாடு (New Testament) ──">
                  {ntBooks.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.tamilName} ({b.englishName})
                    </option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>

            {/* Chapter Selector Dropdown */}
            <div className="relative">
              <select
                aria-label="Select Bible Chapter"
                value={currentChapter}
                onChange={(e) => {
                  const ch = parseInt(e.target.value, 10);
                  loadChapter(currentBookSlug, ch);
                }}
                className="appearance-none rounded-lg border border-slate-300 bg-white py-1.5 pl-3 pr-7 text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-[#80142b] focus:border-[#80142b] focus:outline-hidden cursor-pointer"
              >
                {currentBook?.chapters.map((ch) => (
                  <option key={ch} value={ch}>
                    அதி. {ch}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>

          {/* Right: Reading Controls (Font Size, Width, Search, Print) */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {/* Font Size Controls: A− | A | A+ */}
            <div
              className="flex items-center rounded-lg border border-slate-300 bg-slate-50 p-0.5"
              title="எழுத்து அளவு (Font Size)"
            >
              <button
                type="button"
                onClick={() => setFontSizeLevel((l) => Math.max(0, l - 1))}
                disabled={fontSizeLevel === 0}
                className="px-2 py-1 text-xs font-bold text-slate-700 hover:text-[#80142b] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="எழுத்தை சிறிதாக்கு (Decrease Font Size)"
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel(1)}
                className={`px-2 py-1 text-xs font-bold transition ${
                  fontSizeLevel === 1 ? "bg-white text-[#80142b] shadow-xs rounded-sm" : "text-slate-600 hover:text-[#80142b]"
                } cursor-pointer`}
                title="இயல்பான அளவு (Default Font Size)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel((l) => Math.min(3, l + 1))}
                disabled={fontSizeLevel === 3}
                className="px-2 py-1 text-xs font-bold text-slate-700 hover:text-[#80142b] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="எழுத்தை பெரிதாக்கு (Increase Font Size)"
              >
                A+
              </button>
            </div>

            {/* Width Toggle (Normal 760px vs Wide 1000px) */}
            <button
              type="button"
              onClick={() => setReadingWidth((w) => (w === "normal" ? "wide" : "normal"))}
              className={`hidden sm:inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                readingWidth === "wide"
                  ? "bg-[#80142b] text-white border-[#80142b]"
                  : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
              }`}
              title="வாசிப்பு அகலத்தை மாற்று (Toggle Reading Width)"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>{readingWidth === "wide" ? "அகலம்: விரிவு" : "அகலம்: இயல்பு"}</span>
            </button>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 150);
              }}
              title="விவிலிய வார்த்தைகளைத் தேடு (Search Bible)"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs cursor-pointer"
            >
              <Search className="h-4 w-4 text-[#80142b]" />
              <span className="hidden md:inline">தேடுக</span>
            </button>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyChapter}
              title="அதிகாரத்தை நகலெடு (Copy Chapter)"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 p-1.5 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-700 shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="hidden lg:inline text-emerald-600 font-semibold">நகலெடுக்கப்பட்டது</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-600" />
                  <span className="hidden lg:inline">நகலெடு</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              title="இந்த அதிகாரத்தை அச்சிடுக (Print Chapter)"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#781226] via-[#8c1830] to-[#6a0f21] hover:from-[#8d1630] hover:to-[#a11b37] border border-[#d4af37]/40 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition cursor-pointer"
            >
              <Printer className="h-4 w-4 text-[#f5d77f]" />
              <span>அச்சிடுக</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. MAIN READING BODY & PRINT WRAPPER */}
      <main className="container-site py-6 sm:py-10 px-4">
        <div
          className={`mx-auto transition-all duration-200 ${
            readingWidth === "wide" ? "max-w-5xl" : "max-w-3xl"
          }`}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="py-24 text-center">
              <RefreshCw className="mx-auto h-9 w-9 animate-spin text-[#80142b]" />
              <p className="mt-4 text-base font-semibold text-slate-700 font-['Noto_Sans_Tamil',sans-serif]">
                திருவிவிலிய அதிகாரம் பெறப்படுகிறது...
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {currentBook?.tamilName} — அதிகாரம் {currentChapter}
              </p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && loadError && (
            <div className="my-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800">
              <h3 className="text-lg font-bold">அதிகாரத்தை ஏற்றுவதில் சிக்கல்</h3>
              <p className="mt-2 text-sm text-red-600">{loadError}</p>
              <button
                type="button"
                onClick={() => loadChapter(currentBookSlug, currentChapter)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#80142b] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#681023] cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>மீண்டும் முயல்க (Retry)</span>
              </button>
            </div>
          )}

          {/* 4. CHAPTER CONTENT & A4 PRINT TABLE */}
          {!isLoading && chapterData && (
            <div>
              {/* Top Chapter Navigation Bar (Screen Only) */}
              <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#ebdccb] pb-4 no-print">
                {chapterData.prevChapter ? (
                  <button
                    type="button"
                    onClick={() =>
                      loadChapter(chapterData.prevChapter!.bookSlug, chapterData.prevChapter!.chapter)
                    }
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#80142b] hover:text-[#5f0d1f] hover:underline cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>
                      {chapterData.prevChapter.bookName} {chapterData.prevChapter.chapter}
                    </span>
                  </button>
                ) : (
                  <div className="text-xs text-slate-400">முதல் அதிகாரம்</div>
                )}

                <div className="text-center">
                  <span className="inline-block rounded-full bg-[#80142b]/10 px-3 py-1 text-xs font-bold text-[#80142b]">
                    {chapterData.testament === "OT" ? "பழைய ஏற்பாடு" : "புதிய ஏற்பாடு"}
                  </span>
                </div>

                {chapterData.nextChapter ? (
                  <button
                    type="button"
                    onClick={() =>
                      loadChapter(chapterData.nextChapter!.bookSlug, chapterData.nextChapter!.chapter)
                    }
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#80142b] hover:text-[#5f0d1f] hover:underline cursor-pointer text-right"
                  >
                    <span>
                      {chapterData.nextChapter.bookName} {chapterData.nextChapter.chapter}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="text-xs text-slate-400">இறுதி அதிகாரம்</div>
                )}
              </div>

              {/* TABLE WRAPPER FOR PERFECT PRINT PAGINATION:
                  thead automatically repeats church header on each printed page
                  tfoot automatically repeats church footer on each printed page
              */}
              <table className="w-full border-collapse">
                {/* PRINT ONLY HEADER ON EVERY A4 PAGE */}
                <thead className="print-only print-table-header">
                  <tr>
                    <th className="font-normal text-left pb-4 border-b-2 border-black">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="/images/logo.jpg"
                            alt="St. Paul's Church Logo"
                            className="h-14 w-14 rounded-full border border-black object-cover"
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
                          <div className="text-sm font-extrabold tracking-wider text-black">
                            தமிழ் திருவிவிலியம்
                          </div>
                          <div className="text-xs font-semibold text-neutral-800 mt-0.5">
                            {chapterData.bookName} — அதிகாரம் {chapterData.chapter}
                          </div>
                          <div className="text-[10px] text-neutral-600 italic">
                            {chapterData.bookEnglishName} Chapter {chapterData.chapter}
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* PRINT ONLY FOOTER ON EVERY A4 PAGE */}
                <tfoot className="print-only print-table-footer">
                  <tr>
                    <td className="pt-3 border-t border-black/50 text-[9pt] text-neutral-700">
                      <div className="flex justify-between items-center">
                        <span>St. Paul&apos;s Church, Rathinapuri, Coimbatore</span>
                        <span className="print-page-number"></span>
                      </div>
                    </td>
                  </tr>
                </tfoot>

                {/* TABLE BODY (The Scripture Content) */}
                <tbody>
                  <tr>
                    <td className="py-2">
                      {/* Chapter Title Badge in Web View */}
                      <div className="mb-6 text-center no-print">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#781226] font-['Noto_Sans_Tamil',sans-serif]">
                          {chapterData.bookName} — அதிகாரம் {chapterData.chapter}
                        </h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {chapterData.bookEnglishName} Chapter {chapterData.chapter}
                        </p>
                      </div>

                      {/* Bible Reading Verses & Headings */}
                      <article className="space-y-4 font-['Noto_Sans_Tamil',sans-serif]">
                        {chapterData.items.map((item, idx) => {
                          if (item.type === "heading") {
                            return (
                              <div
                                key={idx}
                                className="my-6 pt-4 pb-2 border-b border-[#e9ded0] text-center reading-heading-box page-break-after-avoid"
                              >
                                <h3 className="text-lg sm:text-xl font-bold text-[#80142b] tracking-wide inline-block bg-[#f8f4ec] px-4 py-1.5 rounded-full border border-[#e2d5c3]">
                                  {item.text}
                                </h3>
                              </div>
                            );
                          }

                          if (item.type === "subheading") {
                            return (
                              <div
                                key={idx}
                                className="my-4 pt-2 text-center sm:text-left reading-heading-box page-break-after-avoid"
                              >
                                <h4 className="text-base sm:text-lg font-bold text-[#912338] italic">
                                  {item.text}
                                </h4>
                              </div>
                            );
                          }

                          // Verse Element
                          const isHighlighted = highlightedVerse === item.verse;
                          return (
                            <div
                              key={idx}
                              id={`verse-${item.verse}`}
                              className={`group relative flex items-baseline gap-2.5 sm:gap-3 py-1.5 px-2 rounded-lg transition-colors ${
                                isHighlighted
                                  ? "bg-amber-100 ring-2 ring-amber-400"
                                  : "hover:bg-[#f5ede3]/50"
                              } break-inside-avoid`}
                            >
                              {/* Distinct Verse Number */}
                              <span
                                className={`inline-flex shrink-0 items-center justify-center font-bold tracking-tight select-none rounded-md px-1.5 py-0.5 min-w-[2rem] text-center ${
                                  isHighlighted
                                    ? "bg-[#80142b] text-white"
                                    : "bg-[#80142b]/10 text-[#80142b] group-hover:bg-[#80142b] group-hover:text-white"
                                } transition-colors ${activeFontSize.badgeClass}`}
                              >
                                {item.verse}
                              </span>

                              {/* Verse Tamil Text */}
                              <p
                                className={`text-slate-800 ${activeFontSize.textClass} text-justify sm:text-left tracking-normal flex-1`}
                              >
                                {item.text}
                              </p>
                            </div>
                          );
                        })}
                      </article>

                      {/* Cross-References & Footnotes Section */}
                      {(chapterData.crossrefs.length > 0 || chapterData.footnotes.length > 0) && (
                        <div className="mt-12 rounded-xl border border-[#ebdccb] bg-[#faf6ee] p-5 text-xs text-slate-700 space-y-4 no-print">
                          {chapterData.crossrefs.length > 0 && (
                            <div>
                              <h5 className="font-bold text-[#80142b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Bookmark className="h-3.5 w-3.5" />
                                <span>இணைப்பு வாசகங்கள் (Cross References)</span>
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                                {chapterData.crossrefs.map((cr, i) => (
                                  <div key={i} className="bg-white/80 p-2 rounded-md border border-[#e3d5c4]">
                                    {cr}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {chapterData.footnotes.length > 0 && (
                            <div className="pt-3 border-t border-[#e8dac8]">
                              <h5 className="font-bold text-[#80142b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Info className="h-3.5 w-3.5" />
                                <span>அடிக்குறிப்புகள் (Footnotes)</span>
                              </h5>
                              <div className="space-y-1.5 text-slate-600">
                                {chapterData.footnotes.map((fn, i) => (
                                  <div key={i} className="bg-white/80 p-2 rounded-md border border-[#e3d5c4]">
                                    {fn}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Source & Attribution Notice */}
                      <div className="mt-10 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1 no-print">
                        <p className="font-semibold text-slate-700">
                          மூலம்: கத்தோலிக்க பொது மொழிபெயர்ப்பு திருவிவிலியம் • Catholic Gallery Tamil Holy Bible
                        </p>
                        <p>
                          திருவிவிலிய வாசகங்கள் மாற்றமின்றி பொது மொழிபெயர்ப்பின்படி வழங்கப்பட்டுள்ளன.
                        </p>
                        <p className="text-[11px] text-slate-400">
                          St. Paul&apos;s Church • Rathinapuri, Coimbatore
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Bottom Navigation Buttons (Screen Only) */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#ebdccb] pt-6 no-print">
                {chapterData.prevChapter ? (
                  <button
                    type="button"
                    onClick={() =>
                      loadChapter(chapterData.prevChapter!.bookSlug, chapterData.prevChapter!.chapter)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#80142b] shadow-xs hover:border-[#80142b] transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>
                      முந்தைய அதிகாரம்: {chapterData.prevChapter.bookName} {chapterData.prevChapter.chapter}
                    </span>
                  </button>
                ) : (
                  <div />
                )}

                {chapterData.nextChapter && (
                  <button
                    type="button"
                    onClick={() =>
                      loadChapter(chapterData.nextChapter!.bookSlug, chapterData.nextChapter!.chapter)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#781226] via-[#8c1830] to-[#6a0f21] hover:from-[#8d1630] hover:to-[#a11b37] border border-[#d4af37]/40 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-md transition cursor-pointer ml-auto"
                  >
                    <span>
                      அடுத்த அதிகாரம்: {chapterData.nextChapter.bookName} {chapterData.nextChapter.chapter}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 5. VISUAL BOOK & CHAPTER SELECTION MODAL */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in no-print">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-[#d9ccb9] bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#faf6f0] px-5 py-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#781226] font-['Noto_Sans_Tamil',sans-serif]">
                  விவிலிய நூல்கள் & அதிகாரங்கள்
                </h3>
                <p className="text-xs text-slate-500">
                  பழைய ஏற்பாடு (48 நூல்கள்) • புதிய ஏற்பாடு (27 நூல்கள்)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Search & Testament Tabs */}
            <div className="border-b border-slate-200 p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              {/* Tab: OT vs NT */}
              <div className="flex items-center rounded-xl bg-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setSelectedTestamentTab("OT")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    selectedTestamentTab === "OT"
                      ? "bg-[#80142b] text-white shadow-xs"
                      : "text-slate-700 hover:text-black"
                  }`}
                >
                  பழைய ஏற்பாடு ({otBooks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTestamentTab("NT")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    selectedTestamentTab === "NT"
                      ? "bg-[#80142b] text-white shadow-xs"
                      : "text-slate-700 hover:text-black"
                  }`}
                >
                  புதிய ஏற்பாடு ({ntBooks.length})
                </button>
              </div>

              {/* Book filter search input */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <input
                  type="text"
                  placeholder="நூல் பெயரைத் தேடுக..."
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs sm:text-sm font-medium placeholder-slate-400 focus:border-[#80142b] focus:outline-hidden"
                />
                <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>

            {/* Modal Body: Book Grid & Chapter Pills */}
            <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Book Cards List */}
              <div className="md:col-span-1 space-y-1 max-h-[55vh] overflow-y-auto pr-1">
                {(selectedTestamentTab === "OT" ? filteredOtBooks : filteredNtBooks).map((b) => {
                  const isSelected = modalSelectedBook?.slug === b.slug;
                  return (
                    <button
                      key={b.slug}
                      type="button"
                      onClick={() => setModalSelectedBook(b)}
                      className={`w-full text-left rounded-xl px-3 py-2 transition-all flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? "bg-[#80142b] text-white border-[#80142b] font-bold shadow-xs"
                          : "bg-white hover:bg-[#faf4ec] text-slate-800 border-slate-200"
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{b.tamilName}</div>
                        <div
                          className={`text-[11px] ${
                            isSelected ? "text-amber-200" : "text-slate-500"
                          }`}
                        >
                          {b.englishName}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {b.totalChapters}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Chapter Grid for Selected Book */}
              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 pt-4 md:pt-0">
                {modalSelectedBook ? (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-lg font-extrabold text-[#781226]">
                        {modalSelectedBook.tamilName} ({modalSelectedBook.englishName})
                      </h4>
                      <p className="text-xs text-slate-500">
                        மொத்த அதிகாரங்கள்: {modalSelectedBook.totalChapters} — அதிகாரத்தைத் தேர்ந்தெடுக்கவும்:
                      </p>
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[48vh] overflow-y-auto pr-1">
                      {modalSelectedBook.chapters.map((ch) => {
                        const isCurrentActive =
                          currentBookSlug === modalSelectedBook.slug && currentChapter === ch;
                        return (
                          <button
                            key={ch}
                            type="button"
                            onClick={() => {
                              setIsBookModalOpen(false);
                              loadChapter(modalSelectedBook.slug, ch);
                            }}
                            className={`rounded-lg py-2 text-center text-xs sm:text-sm font-bold transition shadow-2xs cursor-pointer border ${
                              isCurrentActive
                                ? "bg-[#80142b] text-white border-[#80142b] ring-2 ring-amber-400"
                                : "bg-slate-50 hover:bg-[#80142b] hover:text-white text-slate-700 border-slate-200"
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">நூலைத் தேர்ந்தெடுக்கவும்.</p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-right">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                மூடுக (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. BIBLE SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24 overflow-y-auto animate-in fade-in no-print">
          <div className="relative w-full max-w-2xl rounded-3xl border border-[#d9ccb9] bg-white shadow-2xl overflow-hidden">
            {/* Search Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#faf6f0] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-[#80142b]" />
                <h3 className="text-base sm:text-lg font-extrabold text-[#781226]">
                  விவிலியத் தேடல் (Bible Search)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input Box */}
            <div className="p-4 border-b border-slate-200 bg-white">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="தமிழ் வார்த்தை அல்லது சொற்றொடரைத் தேடுக (எ.கா. கடவுள், அன்பு, ஆயர், மீட்பர்)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-10 text-sm font-medium placeholder-slate-400 focus:border-[#80142b] focus:outline-hidden"
                />
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                தேடப்படும் வார்த்தைகள் உள்ள வசனங்களை கிளிக் செய்வதன் மூலம் நேரடியாக அந்த அதிகாரத்திற்கும் வசனத்திற்கும் செல்லலாம்.
              </p>
            </div>

            {/* Search Results List */}
            <div className="max-h-[50vh] overflow-y-auto p-4 space-y-2.5">
              {isSearching && (
                <div className="py-12 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#80142b]" />
                  <span>தேடப்படுகிறது...</span>
                </div>
              )}

              {!isSearching && searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-sm">
                  &ldquo;{searchQuery}&rdquo; என்ற வார்த்தைக்கான முடிவுகள் கிடைக்கவில்லை.
                </div>
              )}

              {!isSearching &&
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      loadChapter(res.bookSlug, res.chapter, res.verse);
                    }}
                    className="w-full text-left rounded-xl p-3 border border-slate-200 bg-slate-50/50 hover:bg-[#faf4ec] hover:border-[#80142b]/40 transition cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#80142b]">
                      <span>
                        {res.bookName} {res.chapter}:{res.verse}
                      </span>
                      <span className="text-slate-400 font-normal">{res.bookEnglishName}</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 line-clamp-2">
                      {res.text}
                    </p>
                  </button>
                ))}
            </div>

            {/* Search Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
              <span>{searchResults.length > 0 ? `${searchResults.length} முடிவுகள்` : ""}</span>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 font-semibold hover:bg-slate-100 cursor-pointer"
              >
                மூடுக
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
