import type { Metadata } from "next";
import PastorsPageClient from "./PastorsPageClient";

export const metadata: Metadata = {
  title: "Our Priests Through the Years | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Discover the history of St. Paul's Catholic Church, Rathinapuri and remember the priests who have served our parish community through the years.",
  keywords: [
    "Our Priests St. Paul's Catholic Church",
    "Parish Priests Rathinapuri",
    "Church History Coimbatore",
    "Priests of St. Paul's Catholic Church"
  ]
};

export default function PastorsPage() {
  return <PastorsPageClient />;
}
