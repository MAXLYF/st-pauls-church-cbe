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
          { label: "Sons of the Parish", href: "/about/sons-of-parish" },
          { label: formattedName }
        ]}
      />

      <div className="container-site max-w-3xl mt-6">
        <Link
          href="/about/sons-of-parish"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10233f] hover:text-[#b18a3d] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sons of the Parish</span>
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#e7dec8] bg-white p-8 md:p-12 shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-[#d8bb73] bg-[#10233f] shadow-lg flex items-center justify-center">
              <User className="h-16 w-16 text-[#d8bb73]" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#10233f]">
              Fr. {formattedName}
            </h1>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#f2eee5] px-4 py-1 text-xs font-bold text-[#10233f]">
              <Church className="h-3.5 w-3.5 text-[#b18a3d]" />
              <span>Son of St. Paul&apos;s Church Parish</span>
            </div>

            <div className="mt-8 rounded-2xl bg-[#fbf8f1] p-6 text-slate-700 leading-relaxed text-sm border border-[#e7dec8] w-full text-left">
              <p className="font-semibold text-[#10233f]">
                Vocation Profile
              </p>
              <p className="mt-2 text-slate-600">
                Detailed profile, ordination milestone, and pastoral assignments will be published here once provided by the parish office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
