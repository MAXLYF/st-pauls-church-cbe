import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pastPriests } from "@/lib/data/pastors";
import { Pastor } from "@/types";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface PastorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PastorDetailPage({ params }: PastorDetailPageProps) {
  const { slug } = await params;
  const fallbackPastor: Pastor = {
    id: slug,
    name: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    startYear: 2000,
    endYear: null,
    displayPeriod: "Parish Priest",
    role: "Parish Priest",
    image: "/images/church-front.png",
    description: "Historical parish priest of St. Paul's Church, Rathinapuri.",
    biography: "Historical parish priest of St. Paul's Church, Rathinapuri."
  };

  const pastor: Pastor = pastPriests.find((p) => p.id === slug) || fallbackPastor;

  return (
    <div className="min-h-screen bg-[#fbf8f1] py-10 text-[#172033]">
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Our Pastors", href: "/about/pastors" },
          { label: pastor.name }
        ]}
      />

      <div className="container-site max-w-3xl mt-6">
        <Link
          href="/about/pastors"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10233f] hover:text-[#b18a3d] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Pastors Timeline</span>
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#e7dec8] bg-white p-8 md:p-12 shadow-md">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-3xl border-4 border-[#d8bb73] bg-[#10233f] shadow-lg">
              {pastor.image ? (
                <Image
                  src={pastor.image}
                  alt={pastor.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white">
                  <User className="h-16 w-16 text-[#d8bb73]" />
                </div>
              )}
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#10233f]">
              {pastor.name}
            </h1>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#f2eee5] px-4 py-1 text-xs font-bold text-[#10233f]">
              <Calendar className="h-3.5 w-3.5 text-[#b18a3d]" />
              <span>{pastor.displayPeriod}</span>
            </div>

            <p className="mt-1 text-xs font-bold text-[#b18a3d] uppercase tracking-wider">
              {pastor.role || "Parish Priest"}
            </p>

            <div className="mt-8 rounded-2xl bg-[#fbf8f1] p-6 text-slate-700 leading-relaxed text-sm border border-[#e7dec8] w-full text-left">
              <p className="font-semibold text-[#10233f]">
                Parish Ministry &amp; Pastoral Legacy
              </p>
              <p className="mt-2 text-slate-600">
                {pastor.description || pastor.biography || "Dedicated shepherd of St. Paul's Church Rathinapuri parish community, faithfully guiding the congregation in prayer, fellowship, and sacred liturgies."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
