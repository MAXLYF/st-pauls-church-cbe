"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Images,
  Sparkles,
  LayoutGrid,
  Columns3,
  Maximize2,
  Camera
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import {
  GalleryAspectRatio,
  GalleryCategory,
  GalleryCategoryId,
  GalleryPhoto,
  GALLERY_CATEGORIES
} from "@/lib/data/gallery-data";

interface GalleryClientProps {
  initialPhotos: GalleryPhoto[];
}

const MASONRY_ASPECT_CYCLE: GalleryAspectRatio[] = [
  "tall",
  "wide",
  "portrait",
  "landscape",
  "square",
  "tall"
];

function getMasonryAspectClass(aspect?: GalleryAspectRatio, index = 0): string {
  const resolved =
    aspect || MASONRY_ASPECT_CYCLE[index % MASONRY_ASPECT_CYCLE.length];

  switch (resolved) {
    case "tall":
      return "aspect-[4/5]";
    case "portrait":
      return "aspect-[3/4]";
    case "wide":
      return "aspect-[16/10]";
    case "square":
      return "aspect-[1/1]";
    case "landscape":
    default:
      return "aspect-[4/3]";
  }
}

function formatPhotoNumber(num: number): string {
  return String(num).padStart(2, "0");
}

export default function GalleryClient({ initialPhotos }: GalleryClientProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [activeCategoryId, setActiveCategoryId] =
    useState<GalleryCategoryId | null>(null);
  const [layoutMode, setLayoutMode] = useState<"masonry" | "grid">("masonry");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync latest photos from read-only server endpoint on mount
  const refreshPhotos = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.photos) && data.photos.length > 0) {
        setPhotos(data.photos);
      }
    } catch {
      // Keep initial server-rendered photos if offline
    }
  }, []);

  useEffect(() => {
    refreshPhotos();
  }, [refreshPhotos]);

  // Sync URL query param (?category=church-exterior | church-interior) on initial load and popstate
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category") as GalleryCategoryId | null;
      if (cat && GALLERY_CATEGORIES.some((c) => c.id === cat)) {
        setActiveCategoryId(cat);
      } else {
        setActiveCategoryId(null);
      }
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const triggerSmoothViewTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true);
    callback();
    const timer = setTimeout(() => setIsTransitioning(false), 260);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCategory = (categoryId: GalleryCategoryId) => {
    triggerSmoothViewTransition(() => {
      setActiveCategoryId(categoryId);
      setLightboxIndex(null);
      setIsZoomed(false);
    });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("category", categoryId);
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseCategory = () => {
    triggerSmoothViewTransition(() => {
      setActiveCategoryId(null);
      setLightboxIndex(null);
      setIsZoomed(false);
    });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLayoutChange = (mode: "masonry" | "grid") => {
    if (mode === layoutMode) return;
    triggerSmoothViewTransition(() => {
      setLayoutMode(mode);
    });
  };

  const activeCategory: GalleryCategory | null = useMemo(
    () => GALLERY_CATEGORIES.find((c) => c.id === activeCategoryId) || null,
    [activeCategoryId]
  );

  const displayedPhotos = useMemo(() => {
    if (!activeCategoryId) return photos;
    return photos.filter((p) => p.categoryId === activeCategoryId);
  }, [photos, activeCategoryId]);

  const getCategoryMeta = useCallback(
    (categoryId: GalleryCategoryId) =>
      GALLERY_CATEGORIES.find((c) => c.id === categoryId),
    []
  );

  const getPhotoCountForCategory = useCallback(
    (categoryId: GalleryCategoryId) =>
      photos.filter((p) => p.categoryId === categoryId).length,
    [photos]
  );

  // Lightbox navigation handlers
  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null || displayedPhotos.length === 0) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + displayedPhotos.length) % displayedPhotos.length
    );
  }, [lightboxIndex, displayedPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null || displayedPhotos.length === 0) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % displayedPhotos.length
    );
  }, [lightboxIndex, displayedPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  const currentLightboxPhoto =
    lightboxIndex !== null && displayedPhotos[lightboxIndex]
      ? displayedPhotos[lightboxIndex]
      : null;

  const currentLightboxCategory = currentLightboxPhoto
    ? getCategoryMeta(currentLightboxPhoto.categoryId)
    : activeCategory;

  const renderPhotoPortfolio = (items: GalleryPhoto[]) => {
    if (items.length === 0) {
      return (
        <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-[#e7dec8] bg-white/90 p-14 text-center shadow-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#80142b]/8 text-[#80142b]">
            <Camera className="h-7 w-7" />
          </div>
          <h3 className="mt-4 font-serif text-xl font-bold text-[#1f040b]">
            No Photographs in This Collection Yet
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6b5c5f]">
            Photographs added to the parish gallery archive for this category
            will automatically appear here.
          </p>
        </div>
      );
    }

    if (layoutMode === "masonry") {
      return (
        <div
          className={`mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6 transition-opacity duration-300 ${
            isTransitioning ? "opacity-60" : "opacity-100"
          }`}
        >
          {items.map((photo, index) => {
            const catMeta = getCategoryMeta(photo.categoryId);
            const aspectClass = getMasonryAspectClass(photo.aspect, index);

            return (
              <figure
                key={photo.id}
                onClick={() => {
                  setIsZoomed(false);
                  setLightboxIndex(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${photo.title} in full-screen lightbox`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsZoomed(false);
                    setLightboxIndex(index);
                  }
                }}
                className="group relative break-inside-avoid overflow-hidden rounded-[22px] border border-[#e7dec8]/90 bg-[#180308] shadow-[0_10px_28px_rgba(31,4,11,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/75 hover:shadow-[0_24px_50px_rgba(31,4,11,0.2)] focus:outline-none focus:ring-2 focus:ring-[#c59b27] cursor-pointer"
              >
                {/* Top subtle gold highlight on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#f5d77f] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className={`relative w-full overflow-hidden ${aspectClass}`}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center [image-orientation:from-image] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle ambient bottom vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120206]/35 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />

                  {/* Hover Editorial Overlay (Title & Details shown ONLY on hover) */}
                  <figcaption className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-[#120206]/92 via-[#120206]/30 to-black/15 p-5 opacity-0 transition-all duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {/* Top Bar: Index Pill + Expand Icon */}
                    <div className="flex items-center justify-between -translate-y-1.5 transition-transform duration-400 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/45 bg-[#1b0308]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5d77f] backdrop-blur-md">
                        <span>{formatPhotoNumber(index + 1)}</span>
                        <span className="text-white/40">•</span>
                        <span>{catMeta?.label || "Parish"}</span>
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105 group-hover:border-[#f5d77f]/60 group-hover:text-[#f5d77f]">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Bottom Title & Caption */}
                    <div className="translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
                      <div className="mb-1.5 h-[1.5px] w-8 rounded-full bg-[#d4af37]" />
                      <h3 className="font-serif text-base sm:text-lg font-bold leading-snug text-white drop-shadow-xs">
                        {photo.title}
                      </h3>
                      {photo.caption && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-200/85 line-clamp-2">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      );
    }

    /* Clean & Organized Uniform Grid View */
    return (
      <div
        className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
          isTransitioning ? "opacity-60" : "opacity-100"
        }`}
      >
        {items.map((photo, index) => {
          const catMeta = getCategoryMeta(photo.categoryId);

          return (
            <figure
              key={photo.id}
              onClick={() => {
                setIsZoomed(false);
                setLightboxIndex(index);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${photo.title} in full-screen lightbox`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsZoomed(false);
                  setLightboxIndex(index);
                }
              }}
              className="group relative overflow-hidden rounded-[22px] border border-[#e7dec8]/90 bg-[#180308] shadow-[0_10px_28px_rgba(31,4,11,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/75 hover:shadow-[0_24px_50px_rgba(31,4,11,0.2)] focus:outline-none focus:ring-2 focus:ring-[#c59b27] cursor-pointer"
            >
              {/* Top subtle gold highlight on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#f5d77f] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center [image-orientation:from-image] transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Editorial Overlay (Title & Details shown ONLY on hover) */}
                <figcaption className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-t from-[#120206]/92 via-[#120206]/30 to-black/15 p-5 opacity-0 transition-all duration-400 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <div className="flex items-center justify-between -translate-y-1.5 transition-transform duration-400 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/45 bg-[#1b0308]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5d77f] backdrop-blur-md">
                      <span>{formatPhotoNumber(index + 1)}</span>
                      <span className="text-white/40">•</span>
                      <span>{catMeta?.label || "Parish"}</span>
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105 group-hover:border-[#f5d77f]/60 group-hover:text-[#f5d77f]">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
                    <div className="mb-1.5 h-[1.5px] w-8 rounded-full bg-[#d4af37]" />
                    <h3 className="font-serif text-base sm:text-lg font-bold leading-snug text-white drop-shadow-xs">
                      {photo.title}
                    </h3>
                    {photo.caption && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-200/85 line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
    );
  };

  return (
    <section className="section-pad">
      <div className="container-site">
        {/* VIEW 1: MAIN GALLERY OVERVIEW (Curated Showcase) */}
        {!activeCategory ? (
          <div className="animate-in fade-in duration-500">
            <SectionTitle
              eyebrow="SACRED ARCHIVES • PHOTOGRAPHY"
              title="Parish Gallery"
              description="A curated visual chronicle of sacred architecture, Eucharistic liturgy, and parish life at St. Paul's Catholic Church, Rathinapuri."
            />

            {/* Curated Photography Portfolio Showcase */}
            <div>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#80142b]">
                    <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" />
                    <span>FEATURED PORTFOLIO</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1f040b]">
                    Complete Parish Collection
                  </h3>
                  <p className="mt-1 text-sm text-[#6b5c5f]">
                    Hover over any photograph for details, or click to enter
                    full-screen exhibition view.
                  </p>
                </div>

                {/* Category Filter Pills + Layout Switcher + Total Count */}
                <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
                  {/* Category Quick Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#e2d6be] bg-white p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={handleCloseCategory}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#80142b] px-3 py-1.5 text-xs font-semibold text-[#f5d77f] shadow-xs transition"
                    >
                      <span>All</span>
                      <span className="rounded-full bg-black/25 px-1.5 py-0.2 text-[10px]">
                        {formatPhotoNumber(photos.length)}
                      </span>
                    </button>
                    {GALLERY_CATEGORIES.map((cat) => {
                      const count = getPhotoCountForCategory(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleOpenCategory(cat.id)}
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-[#6b5c5f] transition hover:bg-[#faf7f2] hover:text-[#1f040b]"
                        >
                          <span>{cat.title}</span>
                          <span className="rounded-full bg-[#f3ede0] px-1.5 py-0.2 text-[10px] text-[#80142b]">
                            {formatPhotoNumber(count)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2d6be] bg-white px-3.5 py-2 text-xs font-semibold text-[#1f040b] shadow-2xs">
                    <Images className="h-3.5 w-3.5 text-[#c59b27]" />
                    <span>{formatPhotoNumber(photos.length)} Photographs</span>
                  </span>

                  <div
                    className="inline-flex items-center rounded-2xl border border-[#e2d6be] bg-white p-1 shadow-2xs"
                    role="group"
                    aria-label="Gallery layout mode"
                  >
                    <button
                      type="button"
                      onClick={() => handleLayoutChange("masonry")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        layoutMode === "masonry"
                          ? "bg-[#80142b] text-[#f5d77f] shadow-xs"
                          : "text-[#6b5c5f] hover:text-[#1f040b]"
                      }`}
                      title="Editorial Masonry View"
                    >
                      <Columns3 className="h-3.5 w-3.5" />
                      <span>Masonry</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLayoutChange("grid")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        layoutMode === "grid"
                          ? "bg-[#80142b] text-[#f5d77f] shadow-xs"
                          : "text-[#6b5c5f] hover:text-[#1f040b]"
                      }`}
                      title="Clean Grid View"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span>Grid</span>
                    </button>
                  </div>
                </div>
              </div>

              {renderPhotoPortfolio(displayedPhotos)}
            </div>
          </div>
        ) : (
          /* VIEW 2: DEDICATED CATEGORY PHOTOGRAPHY PORTFOLIO */
          <div className="animate-in fade-in duration-500">
            {/* Redesigned Dark Burgundy Editorial Header */}
            <header className="relative overflow-hidden rounded-[28px] border border-[#d4af37]/35 bg-gradient-to-br from-[#190308] via-[#380814] to-[#120206] p-6 sm:p-9 md:p-11 text-white shadow-[0_24px_60px_rgba(20,2,7,0.28)]">
              {/* Top golden hairline accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent" />

              {/* Subtle ambient gold glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 85% 10%, rgba(212,175,55,0.18) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(128,20,43,0.35) 0%, transparent 55%)"
                }}
              />

              <div className="relative z-10 flex flex-col gap-7">
                {/* Top Navigation & Controls Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Back to Gallery Navigation */}
                  <button
                    type="button"
                    onClick={handleCloseCategory}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#f5d77f]/60 hover:bg-white/[0.15]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 text-[#f5d77f] transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Gallery</span>
                  </button>

                  {/* Right Controls: Total Photo Count + Masonry/Grid Toggle */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Total Photo Count */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-black/30 px-4 py-2 text-xs font-semibold tracking-wider text-slate-100 backdrop-blur-md">
                      <Images className="h-3.5 w-3.5 text-[#f5d77f]" />
                      <span>
                        {formatPhotoNumber(displayedPhotos.length)}{" "}
                        {displayedPhotos.length === 1 ? "Photo" : "Photos"}
                      </span>
                    </div>

                    {/* Masonry / Grid Layout Toggle */}
                    <div
                      className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.08] p-1 backdrop-blur-md"
                      role="group"
                      aria-label="Gallery layout mode"
                    >
                      <button
                        type="button"
                        onClick={() => handleLayoutChange("masonry")}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 ${
                          layoutMode === "masonry"
                            ? "bg-gradient-to-r from-[#e5c158] to-[#c59b27] text-[#1f040b] shadow-sm"
                            : "text-slate-200 hover:text-white"
                        }`}
                        title="Masonry View – Editorial photography layout"
                      >
                        <Columns3 className="h-3.5 w-3.5" />
                        <span>Masonry</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLayoutChange("grid")}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-all duration-200 ${
                          layoutMode === "grid"
                            ? "bg-gradient-to-r from-[#e5c158] to-[#c59b27] text-[#1f040b] shadow-sm"
                            : "text-slate-200 hover:text-white"
                        }`}
                        title="Grid View – Clean and organized image layout"
                      >
                        <LayoutGrid className="h-3.5 w-3.5" />
                        <span>Grid</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Editorial Title & Description */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/55 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#f5d77f] backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-[#f5d77f]" />
                    <span>{activeCategory.label}</span>
                  </div>

                  <h1 className="mt-3.5 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                    {activeCategory.title}
                  </h1>

                  <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />

                  <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200/90">
                    {activeCategory.description}
                  </p>
                </div>

                {/* Bottom Category Switcher Bar for Seamless Category Transitions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5d77f]/80">
                      Collections:
                    </span>
                    {GALLERY_CATEGORIES.map((cat) => {
                      const isCurrent = cat.id === activeCategory.id;
                      const count = getPhotoCountForCategory(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleOpenCategory(cat.id)}
                          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                            isCurrent
                              ? "border border-[#f5d77f]/60 bg-[#80142b] text-[#f5d77f] shadow-xs"
                              : "border border-white/10 bg-white/[0.05] text-slate-300 hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
                          }`}
                        >
                          <span>{cat.title}</span>
                          <span
                            className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                              isCurrent
                                ? "bg-black/30 text-[#f5d77f]"
                                : "bg-white/10 text-slate-300"
                            }`}
                          >
                            {formatPhotoNumber(count)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <span className="hidden md:inline-block text-xs text-slate-300/75 italic">
                    {layoutMode === "masonry"
                      ? "Showing Masonry View — Editorial photography layout"
                      : "Showing Grid View — Uniform gallery layout"}
                  </span>
                </div>
              </div>
            </header>

            {/* Category Photo Portfolio (Masonry or Grid) */}
            {renderPhotoPortfolio(displayedPhotos)}
          </div>
        )}
      </div>

      {/* FULL-SCREEN EXHIBITION LIGHTBOX */}
      {currentLightboxPhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0104]/95 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentLightboxPhoto.title} full-screen preview`}
        >
          {/* Top Bar */}
          <div className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3.5 sm:px-8">
            <div className="flex items-center gap-3 min-w-0">
              {/* Photo Number Indicator (e.g. 01 / 20) */}
              <span className="shrink-0 rounded-full border border-[#d4af37]/45 bg-[#1b0308]/90 px-3.5 py-1 text-xs font-bold tracking-[0.18em] text-[#f5d77f]">
                {formatPhotoNumber(lightboxIndex + 1)} /{" "}
                {formatPhotoNumber(displayedPhotos.length)}
              </span>

              <div className="hidden sm:flex items-center gap-2 min-w-0 text-xs uppercase tracking-[0.2em] text-slate-300">
                <span className="text-[#f5d77f] font-semibold">
                  {currentLightboxCategory?.label || "Parish"}
                </span>
                <span className="text-white/30">•</span>
                <span className="truncate text-slate-300">
                  {currentLightboxCategory?.title || "Parish Gallery"}
                </span>
              </div>
            </div>

            {/* Right Controls: Zoom + Close */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                title={isZoomed ? "Zoom Out" : "Zoom In"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white transition hover:border-[#f5d77f]/60 hover:bg-white/[0.15] hover:text-[#f5d77f]"
              >
                {isZoomed ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  setIsZoomed(false);
                }}
                aria-label="Close full-screen preview"
                title="Close (Esc)"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#80142b] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase transition hover:border-[#f5d77f] hover:bg-[#9e1c36]"
              >
                <span className="hidden sm:inline text-[11px] text-[#f5d77f]">
                  ESC
                </span>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center Image Stage with Prev/Next Navigation */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-20"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {/* Previous Button */}
            {displayedPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                aria-label="Previous photo"
                title="Previous photo (Left Arrow)"
                className="absolute left-3 sm:left-7 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#1b0308]/85 text-[#f5d77f] shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#f5d77f] hover:bg-[#80142b] hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Animated Image Wrapper */}
            <div
              key={currentLightboxPhoto.id}
              onClick={(e) => e.stopPropagation()}
              className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-300"
            >
              <img
                src={currentLightboxPhoto.src}
                alt={currentLightboxPhoto.title}
                onClick={() => setIsZoomed((z) => !z)}
                className={`max-h-[68vh] max-w-[88vw] rounded-2xl border border-white/10 object-contain [image-orientation:from-image] shadow-[0_25px_80px_rgba(0,0,0,0.85)] transition-transform duration-300 ${
                  isZoomed
                    ? "scale-125 cursor-zoom-out"
                    : "scale-100 cursor-zoom-in"
                }`}
              />
            </div>

            {/* Next Button */}
            {displayedPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                aria-label="Next photo"
                title="Next photo (Right Arrow)"
                className="absolute right-3 sm:right-7 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#1b0308]/85 text-[#f5d77f] shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#f5d77f] hover:bg-[#80142b] hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Filmstrip Footer */}
          <div className="relative z-20 border-t border-white/10 bg-black/60 px-4 py-4 sm:px-8 backdrop-blur-xl">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-serif text-base sm:text-xl font-bold text-white">
                {currentLightboxPhoto.title}
              </h3>
              {currentLightboxPhoto.caption && (
                <p className="mt-1 text-xs sm:text-sm text-slate-300/85">
                  {currentLightboxPhoto.caption}
                </p>
              )}
            </div>

            {/* Minimal Filmstrip Thumbnails */}
            {displayedPhotos.length > 1 && (
              <div className="mt-3.5 flex items-center justify-center gap-2 overflow-x-auto pb-1">
                {displayedPhotos.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => {
                      setIsZoomed(false);
                      setLightboxIndex(idx);
                    }}
                    aria-label={`View photo ${formatPhotoNumber(idx + 1)}: ${thumb.title}`}
                    className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                      idx === lightboxIndex
                        ? "border-[#f5d77f] scale-105 opacity-100 shadow-[0_0_12px_rgba(245,215,127,0.4)]"
                        : "border-white/15 opacity-45 hover:opacity-85"
                    }`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.title}
                      className="h-full w-full object-cover [image-orientation:from-image]"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
