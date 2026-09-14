import type { Metadata } from "next";
import PrayerPageClient from "@/app/prayer/PrayerPageClient";

export const metadata: Metadata = {
  title: "Prayer & Spiritual Resources | St. Paul's Church Rathinapuri",
  description:
    "Explore prayers, novenas, Bible resources, hymns, the Holy Rosary and other spiritual resources from St. Paul's Church Rathinapuri.",
  keywords: [
    "St Paul's Church Prayer",
    "Catholic Prayers Rathinapuri",
    "Novena Prayers Coimbatore",
    "Holy Rosary Mysteries",
    "Catholic Hymns Tamil English",
    "Daily Scripture Reflection"
  ]
};

export default function PrayerPage() {
  return <PrayerPageClient />;
}
