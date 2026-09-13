"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Map() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current).setView([11.021, 76.968], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([11.021, 76.968]).addTo(map).bindPopup("<b>St. Paul's Church</b><br/>Rathinapuri, Coimbatore").openPopup();

    return () => map.remove();
  }, []);

  return <div ref={ref} className="h-full min-h-[360px] w-full" />;
}
