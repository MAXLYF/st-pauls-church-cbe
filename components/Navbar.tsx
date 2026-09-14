"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const aboutSubmenu = [
  { label: "About the Parish", href: "/about", description: "Our heritage, mission & leadership" },
  { label: "Our Pastors Through the Years", href: "/about/pastors", description: "Historical timeline of parish priests" },
  { label: "Sons of the Parish", href: "/about/sons-of-parish", description: "Vocations & priests from our community" }
];

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Mass", href: "/mass-timings" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Prayer", href: "/prayer" },
  { label: "Prayer Request", href: "/prayer-request", tamilLabel: "ஜெப வேண்டுகோள்" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isAboutActive = pathname.startsWith("/about");

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/images/logo.jpg"
            alt="St. Paul's Church logo"
            className="h-12 w-12 rounded-full object-cover shadow-xs"
          />
          <div>
            <div className="text-sm font-semibold tracking-[.18em] text-[#b18a3d]">
              ST. PAUL&apos;S CHURCH
            </div>
            <div className="text-xs tracking-[.35em] text-slate-500">
              RATHINAPURI
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition hover:text-[#b18a3d] ${
              pathname === "/" ? "text-[#b18a3d] font-bold" : "text-slate-700"
            }`}
          >
            Home
          </Link>

          {/* About Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setAboutDropdownOpen(false);
              }}
              aria-expanded={aboutDropdownOpen}
              aria-haspopup="true"
              aria-label="About menu"
              className={`flex items-center gap-1 text-sm font-medium transition hover:text-[#b18a3d] focus:outline-none ${
                isAboutActive ? "text-[#b18a3d] font-bold" : "text-slate-700"
              }`}
            >
              <span>About</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  aboutDropdownOpen ? "rotate-180 text-[#b18a3d]" : "text-slate-400"
                }`}
              />
            </button>

            {/* Dropdown Box */}
            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 z-50 mt-2 w-72 origin-top-left rounded-2xl border border-[#e7dec8] bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-1">
                  {aboutSubmenu.map((item) => {
                    const isSubActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setAboutDropdownOpen(false)}
                        className={`group flex flex-col rounded-xl px-3.5 py-2.5 transition hover:bg-[#fbf8f1] ${
                          isSubActive ? "bg-[#fbf8f1] text-[#b18a3d]" : ""
                        }`}
                      >
                        <span
                          className={`text-sm font-bold ${
                            isSubActive ? "text-[#b18a3d]" : "text-[#10233f] group-hover:text-[#b18a3d]"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {item.description}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Other Main Links (Mass, Ministries, Events, Gallery, Videos, Prayer, Prayer Request, Contact) */}
          {mainLinks.slice(1).map((link) => {
            const isActive = pathname === link.href;
            const isPrayerReq = link.href === "/prayer-request";

            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.tamilLabel ? `${link.label} (${link.tamilLabel})` : link.label}
                className={`text-sm font-medium transition hover:text-[#b18a3d] whitespace-nowrap ${
                  isActive
                    ? "text-[#b18a3d] font-bold"
                    : isPrayerReq
                    ? "text-[#0f4c3a] font-semibold hover:text-[#b18a3d]"
                    : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/live"
            className="rounded-full bg-[#10233f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#18365f] transition shadow-xs whitespace-nowrap ml-1"
          >
            Live Mass
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t bg-white px-5 py-4 lg:hidden">
          <div className="container-site flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`py-2 text-sm font-medium ${
                pathname === "/" ? "text-[#b18a3d] font-bold" : "text-slate-800"
              }`}
            >
              Home
            </Link>

            {/* Mobile About Accordion */}
            <div className="border-y border-slate-100 py-1">
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className={`flex w-full items-center justify-between py-2 text-sm font-medium ${
                  isAboutActive ? "text-[#b18a3d] font-bold" : "text-slate-800"
                }`}
              >
                <span>About</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    mobileAboutOpen ? "rotate-180 text-[#b18a3d]" : ""
                  }`}
                />
              </button>

              {mobileAboutOpen && (
                <div className="mb-2 space-y-1 pl-3 border-l-2 border-[#b18a3d]/40">
                  {aboutSubmenu.map((subItem) => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setOpen(false)}
                        className={`block py-1.5 text-xs font-semibold ${
                          isSubActive
                            ? "text-[#b18a3d] font-bold"
                            : "text-[#10233f] hover:text-[#b18a3d]"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {mainLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-2 text-sm font-medium ${
                    isActive ? "text-[#b18a3d] font-bold" : "text-slate-800"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.tamilLabel && (
                    <span className="text-xs text-[#b18a3d] font-normal">{link.tamilLabel}</span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/live"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#10233f] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Live Mass
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
