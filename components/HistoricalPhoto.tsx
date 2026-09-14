"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HistoricalPhotoProps {
  imageSrc?: string;
  caption?: string;
}

export default function HistoricalPhoto({
  imageSrc = "/images/church-interior.jpg",
  caption = "Parish Priests of St. Paul's Church through the years"
}: HistoricalPhotoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsZoomed(false);
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsZoomed(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsZoomed(false);
  };

  return (
    <div className="mt-20 border-t border-[#e7dec8] pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d] uppercase">
          OUR JOURNEY
        </div>
        <h3 className="mt-2 text-2xl md:text-3xl font-bold text-[#10233f]">
          Historical Parish Archive
        </h3>
        <div className="gold-line" />
        <p className="mt-4 text-sm md:text-base text-slate-600">
          Click the historical photo frame below to view the archival record in full resolution.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label={`View full historical image: ${caption}`}
          className="group relative cursor-pointer overflow-hidden rounded-3xl border-4 border-[#e7dec8] bg-white p-2 shadow-lg transition-all duration-300 hover:border-[#b18a3d] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#b18a3d]/30"
        >
          {/* Decorative Corner Accents */}
          <div className="pointer-events-none absolute top-3 left-3 z-10 h-6 w-6 border-t-2 border-l-2 border-[#d8bb73]" />
          <div className="pointer-events-none absolute top-3 right-3 z-10 h-6 w-6 border-t-2 border-r-2 border-[#d8bb73]" />
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-6 w-6 border-b-2 border-l-2 border-[#d8bb73]" />
          <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-6 w-6 border-b-2 border-r-2 border-[#d8bb73]" />

          {/* Archival Image View */}
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden rounded-2xl bg-[#10233f]">
            <Image
              src={imageSrc}
              alt={caption}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10233f]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Click to Zoom Badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#10233f]/90 px-4 py-2 text-xs font-semibold text-[#d8bb73] backdrop-blur-sm border border-[#d8bb73]/40 shadow-lg group-hover:bg-[#10233f] group-hover:scale-105 transition-all">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
              <span>Click to enlarge archive</span>
            </div>
          </div>

          {/* Caption */}
          <div className="py-4 text-center">
            <p className="font-serif text-base md:text-lg font-semibold text-[#10233f] italic">
              &ldquo;{caption}&rdquo;
            </p>
            <p className="mt-1 text-xs text-slate-500 uppercase tracking-widest">
              St. Paul&apos;s Church Historical Record
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Historical photo lightbox viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={handleClose}
        >
          {/* Lightbox Toolbar */}
          <div
            className="fixed top-4 right-4 z-50 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom toggle button */}
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              className="flex items-center gap-1.5 rounded-full bg-[#10233f]/90 px-4 py-2 text-xs font-semibold text-[#d8bb73] border border-[#d8bb73]/40 shadow-lg hover:bg-[#18365f] transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isZoomed ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                )}
              </svg>
              <span>{isZoomed ? "Reset Zoom" : "Zoom"}</span>
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close lightbox"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-[#d8bb73] transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div
            className="relative max-h-[85vh] max-w-5xl overflow-auto rounded-2xl bg-[#10233f] p-3 text-center shadow-2xl border border-[#d8bb73]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative mx-auto overflow-hidden transition-all duration-300 ${
                isZoomed
                  ? "cursor-zoom-out scale-150 my-16 max-w-none"
                  : "cursor-zoom-in max-h-[70vh]"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={imageSrc}
                alt={caption}
                className="mx-auto max-h-[70vh] w-auto rounded-lg object-contain"
              />
            </div>
            <div className="mt-3 px-4 pb-2 text-center">
              <p className="font-serif text-lg font-semibold text-[#d8bb73]">
                {caption}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                St. Paul&apos;s Church, Rathinapuri • Historical Archival Record
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
