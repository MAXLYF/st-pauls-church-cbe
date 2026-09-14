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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#10233f] via-[#18365f] to-[#0d1e36] py-24 text-center text-white" aria-label="Ministries page header">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(177,138,61,0.18) 0%, transparent 65%)" }} />
        <div className="container-site relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b18a3d]/40 bg-[#b18a3d]/10 px-4 py-1.5">
            <Cross className="h-3.5 w-3.5 text-[#d8bb73]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[.25em] text-[#d8bb73]">
              MINISTRIES & GROUPS
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Serving Together in Faith
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Discover the ministries and groups that help our parish grow in faith, service, fellowship and love.
          </p>
          <div className="mx-auto mt-6 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-[#b18a3d] to-transparent" />
        </div>
      </section>

      {/* List Component (Client) */}
      <MinistriesList initialMinistries={ministries} />
    </>
  );
}
