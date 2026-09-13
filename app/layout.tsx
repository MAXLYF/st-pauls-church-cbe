import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "St. Paul's Church | Rathinapuri, Coimbatore",
    template: "%s | St. Paul's Church"
  },
  description:
    "Official parish website for St. Paul's Church, Rathinapuri, Coimbatore — faith, fellowship, service and prayer.",
  keywords: [
    "St Paul's Church Coimbatore",
    "St Paul's Church Rathinapuri",
    "Catholic Church Coimbatore",
    "Mass timings Rathinapuri"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
