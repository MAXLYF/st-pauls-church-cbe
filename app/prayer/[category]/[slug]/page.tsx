import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Youtube,
  Languages,
  Share2,
  BookOpen
} from "lucide-react";
import AudioPlayerCompact from "@/components/prayer/AudioPlayerCompact";

interface ResourceDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ResourceDetailPage({
  params
}: ResourceDetailPageProps) {
  const { category, slug } = await params;

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-[#fbf8f1] py-16 text-[#172033]">
      <div className="container-site max-w-4xl">
        {/* Back Link */}
        <Link
          href="/prayer"
          className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#e7dec8] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#80142b] shadow-2xs hover:border-[#c59b27] hover:text-[#c59b27] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Prayer Resources</span>
        </Link>

        {/* Main Resource Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#e7dec8] bg-white shadow-md">
          <div className="bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] p-8 text-white md:p-12">
            <span className="rounded-full bg-[#781226]/40 px-3.5 py-1 text-xs font-bold text-[#f5d77f] uppercase tracking-wider border border-[#d4af37]/30 backdrop-blur">
              {category}
            </span>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl text-white">
              {formattedTitle}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Languages className="h-3.5 w-3.5 text-[#f5d77f]" /> English • தமிழ்
              </span>
              <span>• St. Paul&apos;s Church Spiritual Archive</span>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="rounded-2xl bg-[#fbf8f1] p-6 border border-[#e7dec8] text-slate-700 leading-relaxed">
              <p className="font-semibold text-[#80142b]">
                Resource Content Placeholder
              </p>
              <p className="mt-2 text-sm text-slate-600">
                The text, audio recordings, or PDF guides for <strong>{formattedTitle}</strong> will be published here once provided by the parish ministry team.
              </p>
            </div>

            {/* Back to Overview */}
            <div className="border-t border-slate-100 pt-8 flex items-center justify-between">
              <Link
                href="/prayer"
                className="text-xs font-bold uppercase tracking-wider text-[#80142b] hover:text-[#c59b27]"
              >
                ← Return to All Resources
              </Link>
              <Link
                href="/prayer-request"
                className="rounded-xl bg-[#80142b] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#9e1c36]"
              >
                Submit Prayer Request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
