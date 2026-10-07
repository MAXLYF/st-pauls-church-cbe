import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowLeft, User, Calendar, Church } from "lucide-react";

interface SonDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SonDetailPage({ params }: SonDetailPageProps) {
  const { slug } = await params;
  const formattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-[#fbf8f1] py-10 text-[#172033]">
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Sons of the soil", href: "/about/sons-of-the-soil" },
          { label: formattedName }
        ]}
      />

      <div className="container-site max-w-3xl mt-6">
        <Link
          href="/about/sons-of-the-soil"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#80142b] hover:text-[#c59b27] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sons of the soil</span>
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#e7dec8] bg-white p-8 md:p-12 shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-[#d4af37] bg-[#781226] shadow-lg flex items-center justify-center">
              <User className="h-16 w-16 text-[#f5d77f]" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#1f040b]">
              Fr. {formattedName}
            </h1>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#781226]/10 px-4 py-1 text-xs font-bold text-[#1f040b]">
              <Church className="h-3.5 w-3.5 text-[#80142b]" />
              <span>Son of St. Paul&apos;s Church Parish</span>
            </div>

            <div className="mt-8 rounded-2xl bg-[#fbf8f1] p-6 text-slate-700 leading-relaxed text-sm border border-[#e7dec8] w-full text-left">
              <p className="font-semibold text-[#80142b]">
                Vocation Profile
              </p>
              <p className="mt-2 text-slate-600">
                Detailed profile, ordination milestone, and priestly assignments will be published here once provided by the parish office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
