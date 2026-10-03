import type { Metadata } from "next";
import PastorsPageClient from "./PastorsPageClient";

export const metadata: Metadata = {
  title: "Our Priests Through the Years | St. Paul's Church Rathinapuri",
  description:
    "Discover the history of St. Paul's Church Rathinapuri and remember the priests who have served our parish community through the years.",
  keywords: [
    "Our Priests St Paul's Church",
    "Parish Priests Rathinapuri",
    "Church History Coimbatore",
    "Priests of St Paul's Church"
  ]
};

export default function PastorsPage() {
  return <PastorsPageClient />;
}
