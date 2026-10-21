import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DailyReadingsBar from "@/components/DailyReadingsBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "St. Paul's Catholic Church, Rathinapuri | Coimbatore",
    template: "%s | St. Paul's Catholic Church, Rathinapuri"
  },
  description:
    "Official parish website for St. Paul's Catholic Church, Rathinapuri, Coimbatore — faith, fellowship, service and prayer.",
  keywords: [
    "St. Paul's Catholic Church Rathinapuri",
    "St. Paul's Catholic Church Coimbatore",
    "St Paul's Catholic Church Rathinapuri",
    "Catholic Church Coimbatore",
    "Mass timings Rathinapuri"
  ],
  openGraph: {
    title: "St. Paul's Catholic Church, Rathinapuri",
    description:
      "Official parish website for St. Paul's Catholic Church, Rathinapuri, Coimbatore — faith, fellowship, service and prayer.",
    siteName: "St. Paul's Catholic Church, Rathinapuri",
    locale: "en_IN",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0 z-50 w-full no-print">
          <Navbar />
          <DailyReadingsBar />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
