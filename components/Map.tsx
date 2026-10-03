"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: any = null;
    let cancelled = false;

    const initializeMap = async () => {
      if (!mapContainerRef.current) return;

      // Prevent duplicate Leaflet initialization
      if ((mapContainerRef.current as any)._leaflet_id) {
        return;
      }

      const leafletModule = await import("leaflet");
      const L = leafletModule.default || leafletModule;

      if (cancelled || !mapContainerRef.current) return;

      // Check again after async import
      if ((mapContainerRef.current as any)._leaflet_id) {
        return;
      }

      map = L.map(mapContainerRef.current).setView([11.021, 76.968], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([11.021, 76.968])
        .addTo(map)
        .bindPopup("<b>St. Paul's Church</b><br/>Rathinapuri, Coimbatore")
        .openPopup();
    };

    initializeMap();

    return () => {
      cancelled = true;

      if (map) {
        map.remove();
        map = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full min-h-[360px] w-full" />;
}
