"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type * as LType from "leaflet";

export default function Map() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    let map: LType.Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default || await import("leaflet");
      map = L.map(ref.current!).setView([11.021, 76.968], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([11.021, 76.968]).addTo(map).bindPopup("<b>St. Paul's Church</b><br/>Rathinapuri, Coimbatore").openPopup();
    })();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return <div ref={ref} className="h-full min-h-[360px] w-full" />;
}
