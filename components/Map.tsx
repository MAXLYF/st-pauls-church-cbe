"use client";

import React, { useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

const GOOGLE_MAPS_SHORT_URL = "https://maps.app.goo.gl/UML8VeZmrEvJKPMPA";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1554316629235!2d76.96108347585094!3d11.026751489137452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f7c4d9837d%3A0x83e2cc0feec24549!2sSt.%20Paul's%20Church!5e0!3m2!1sen!2sin!4v1729514000000!5m2!1sen!2sin";

interface MapProps {
  className?: string;
  showOverlay?: boolean;
}

export default function Map({ className = "", showOverlay = true }: MapProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative h-full w-full min-h-[360px] overflow-hidden bg-[#faf7f2] ${className}`}>
      {!hasError ? (
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="St. Paul's Catholic Church, Rathinapuri, Coimbatore Location Map"
          className="h-full w-full min-h-[360px]"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Fallback if iframe cannot be loaded */
        <div className="flex h-full w-full min-h-[360px] flex-col items-center justify-center p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#80142b] text-[#f5d77f] shadow-md">
            <MapPin className="h-7 w-7" />
          </div>
          <h4 className="mt-4 text-lg font-bold text-[#1f040b]">
            St. Paul&apos;s Catholic Church
          </h4>
          <p className="mt-1 max-w-sm text-sm text-slate-600">
            Nehru Street, Tatabad / Rathinapuri, Coimbatore, Tamil Nadu 641027
          </p>
          <a
            href={GOOGLE_MAPS_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#781226] to-[#4e0917] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#80142b] transition"
          >
            <Navigation className="h-4 w-4 text-[#f5d77f]" />
            <span>Open in Google Maps / Get Directions</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#f5d77f]" />
          </a>
        </div>
      )}

      {/* Floating Action Button for Instant Directions on Google Maps */}
      {showOverlay && (
        <div className="pointer-events-none absolute bottom-3 right-3 z-10">
          <a
            href={GOOGLE_MAPS_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#80142b] shadow-lg border border-[#e2d7c5] hover:bg-[#80142b] hover:text-white transition-all backdrop-blur-sm"
            title="Open verified location in Google Maps"
          >
            <Navigation className="h-3.5 w-3.5 text-[#c59b27]" />
            <span>Get Directions</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      )}
    </div>
  );
}
