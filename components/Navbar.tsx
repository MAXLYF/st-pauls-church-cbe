"use client";

import Link from "next/link";
import { Menu, X, Cross } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Mass", "/mass-timings"],
  ["Events", "/events"],
  ["Gallery", "/gallery"],
  ["Videos", "/videos"],
  ["Prayer", "/prayer-request"],
  ["Contact", "/contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="St. Paul's Church logo" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="text-sm font-semibold tracking-[.18em] text-[#b18a3d]">ST. PAUL&apos;S CHURCH</div>
            <div className="text-xs tracking-[.35em] text-slate-500">RATHINAPURI</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-700 transition hover:text-[#b18a3d]">
              {label}
            </Link>
          ))}
          <Link href="/live" className="rounded-full bg-[#10233f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#18365f]">
            Live Mass
          </Link>
        </nav>

        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="rounded-lg p-2 lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-5 py-4 lg:hidden">
          <div className="container-site flex flex-col gap-3">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 font-medium">
                {label}
              </Link>
            ))}
            <Link href="/live" onClick={() => setOpen(false)} className="rounded-xl bg-[#10233f] px-4 py-3 text-center font-semibold text-white">
              Live Mass
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
