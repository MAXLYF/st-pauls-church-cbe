import type { Metadata } from "next";
import AnbiyamClient from "./AnbiyamClient";
import { anbiyams } from "@/lib/data/anbiyam-data";

export const metadata: Metadata = {
  title: "Anbiyam | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Explore the 40 Anbiyams (Basic Christian Communities) of St. Paul's Catholic Church, Rathinapuri, Coimbatore. Growing together in faith, prayer, fellowship and service.",
  keywords: [
    "St. Paul's Catholic Church Anbiyam",
    "Anbiyam Rathinapuri",
    "Catholic Anbiyam Coimbatore",
    "Basic Christian Communities Coimbatore",
    "பங்கு அன்பியங்கள்",
    "அன்பியம் கோயம்புத்தூர்",
    "St Paul's Parish Communities"
  ]
};

export default function AnbiyamPage() {
  return <AnbiyamClient anbiyams={anbiyams} />;
}
