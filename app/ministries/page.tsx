import type { Metadata } from "next";
import { Cross } from "lucide-react";
import MinistriesList from "./MinistriesList";
import { ministries } from "@/lib/data/ministries";

export const metadata: Metadata = {
  title: "Ministries & Groups",
  description:
    "Discover the ministries and groups that help our parish grow in faith, service, fellowship and love.",
};

export default function MinistriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-24 text-center text-white" aria-label="Ministries page header">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(197,155,39,0.18) 0%, transparent 65%)" }} />
        <div className="container-site relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 backdrop-blur">
            <Cross className="h-3.5 w-3.5 text-[#f5d77f]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[.25em] text-[#f5d77f]">
              MINISTRIES &amp; GROUPS
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl text-white">
            Serving Together in Faith
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Discover the ministries and groups that help our parish grow in faith, service, fellowship and love.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />
        </div>
      </section>

      {/* List Component (Client) */}
      <MinistriesList initialMinistries={ministries} />
    </>
  );
}
