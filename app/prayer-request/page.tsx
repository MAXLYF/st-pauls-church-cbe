import type { Metadata } from "next";
import PrayerRequestClient from "./PrayerRequestClient";

export const metadata: Metadata = {
  title: "Prayer Request | ஜெப வேண்டுகோள் | St. Paul's Church Rathinapuri",
  description:
    "Submit your prayer intention privately to the parish prayer group and priests of St. Paul's Church, Rathinapuri, Coimbatore. Support in English and Tamil.",
  keywords: [
    "Prayer Request Coimbatore",
    "St Paul's Church Prayer Request",
    "ஜெப வேண்டுகோள்",
    "Catholic Prayer Intentions Rathinapuri",
    "Online Catholic Prayer Coimbatore",
    "Parish Prayer Team Intentions"
  ]
};

export default function PrayerRequestPage() {
  return <PrayerRequestClient />;
}
