"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Church,
  Users,
  Image as GalleryIcon,
  Clock,
  Sparkles,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const aboutSubmenu = [
  {
    label: "About the Parish",
    href: "/about",
    description: "Our heritage, mission & leadership",
    icon: Church
  },
  {
    label: "Our Priests Through the Years",
    href: "/about/pastors",
    description: "Historical timeline of parish priests",
    icon: Clock
  },
  {
    label: "Sons of the Soil",
    href: "/about/sons-of-the-soil",
    description: "Vocations & priests from our community",
    icon: Users
  },
  {
    label: "Parish Gallery",
    href: "/gallery",
    description: "Photo archives of celebrations & parish life",
    icon: GalleryIcon
  }
];

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Mass Timings", href: "/#mass-timings" },
  { label: "Ministries", href: "/ministries" },
  { label: "Anbiyam", href: "/anbiyam" },
  { label: "Prayer", href: "/prayer" },
  { label: "Prayer Request", href: "/prayer-request", tamilLabel: "ஜெப வேண்டுகோள்" },
  { label: "Tamil Bible", href: "/tamil-bible", tamilLabel: "திருவிவிலியம்" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);
  const submenuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isAboutActive =
    pathname === "/about" ||
    pathname.startsWith("/about/") ||
    pathname === "/gallery";

  // Debounced mouse enter/leave to prevent accidental closing when moving pointer
  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setAboutDropdownOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // 200ms grace period so moving cursor between menu and panel never flickers or slams shut
    closeTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setAboutDropdownOpen(false);
  }, [pathname]);

  // Keyboard navigation handler for desktop dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setAboutDropdownOpen(false);
      dropdownButtonRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setAboutDropdownOpen(true);
      setTimeout(() => {
        submenuRefs.current[0]?.focus();
      }, 50);
    }
  };

  const handleSubmenuKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setAboutDropdownOpen(false);
      dropdownButtonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % aboutSubmenu.length;
      submenuRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + aboutSubmenu.length) % aboutSubmenu.length;
      submenuRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <header className="relative w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="container-site flex h-16 sm:h-20 items-center justify-between gap-3 xl:gap-6">
        {/* Church Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 focus:outline-hidden focus:ring-2 focus:ring-[#80142b]/30 rounded-lg p-1"
          aria-label="St. Paul's Catholic Church, Rathinapuri Homepage"
        >
          <img
            src="/images/logo.jpg"
            alt="St. Paul's Catholic Church, Rathinapuri logo"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-[#d4af37]/60 shadow-xs"
          />
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-[.16em] sm:tracking-[.18em] text-[#80142b] leading-tight">
              ST. PAUL&apos;S CATHOLIC CHURCH
            </div>
            <div className="text-[10px] sm:text-xs font-semibold tracking-[.28em] sm:tracking-[.32em] text-[#c59b27] leading-tight mt-0.5">
              RATHINAPURI
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-1.5 lg:gap-2.5 xl:gap-4 lg:flex"
          aria-label="Main Navigation"
        >
          {/* Home Link */}
          <Link
            href="/"
            className={`px-2 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-md hover:text-[#80142b] ${
              pathname === "/"
                ? "text-[#80142b] font-bold bg-[#80142b]/5"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* About Dropdown (with seamless hover bridge and click-to-open) */}
          <div
            ref={dropdownContainerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center">
              <Link
                href="/about"
                className={`px-2 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-l-md hover:text-[#80142b] ${
                  isAboutActive
                    ? "text-[#80142b] font-bold bg-[#80142b]/5"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                About
              </Link>
              <button
                ref={dropdownButtonRef}
                type="button"
                onClick={() => setAboutDropdownOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
                aria-label="Toggle About submenu"
                className={`p-1.5 transition-colors rounded-r-md cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#80142b]/30 ${
                  isAboutActive || aboutDropdownOpen
                    ? "text-[#80142b] bg-[#80142b]/5"
                    : "text-slate-500 hover:text-[#80142b] hover:bg-slate-50"
                }`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    aboutDropdownOpen ? "rotate-180 text-[#80142b]" : ""
                  }`}
                />
              </button>
            </div>

            {/* Desktop Dropdown Panel with zero-gap hover bridge */}
            {aboutDropdownOpen && (
              <div
                role="menu"
                aria-label="About Menu"
                className="absolute top-full left-0 z-50 pt-2 w-80 origin-top-left animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Visual dropdown panel box */}
                <div className="rounded-2xl border border-[#e7dec8] bg-white p-2.5 shadow-2xl ring-1 ring-black/5">
                  <div className="space-y-1">
                    {aboutSubmenu.map((item, idx) => {
                      const isSubActive =
                        pathname === item.href ||
                        (item.href === "/about/sons-of-the-soil" &&
                          pathname === "/about/sons-of-parish");
                      const IconComponent = item.icon;

                      return (
                        <Link
                          key={item.href}
                          ref={(el) => {
                            submenuRefs.current[idx] = el;
                          }}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setAboutDropdownOpen(false)}
                          onKeyDown={(e) => handleSubmenuKeyDown(idx, e)}
                          className={`group flex items-start gap-3 rounded-xl px-3.5 py-2.5 transition-all focus:outline-hidden focus:ring-2 focus:ring-[#80142b]/40 ${
                            isSubActive
                              ? "bg-[#fbf8f1] text-[#80142b] border border-[#d4af37]/30"
                              : "hover:bg-[#fbf8f1] text-slate-800"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                              isSubActive
                                ? "bg-[#80142b] text-[#f5d77f] border-[#d4af37]/50"
                                : "bg-[#80142b]/5 text-[#80142b] border-[#80142b]/15 group-hover:bg-[#80142b] group-hover:text-[#f5d77f]"
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <div
                              className={`text-xs xl:text-sm font-bold leading-snug ${
                                isSubActive
                                  ? "text-[#80142b]"
                                  : "text-[#1f040b] group-hover:text-[#80142b]"
                              }`}
                            >
                              {item.label}
                            </div>
                            <div className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Links (Mass Timings, Ministries, Anbiyam, Prayer, Prayer Request, Tamil Bible, Contact) */}
          {mainLinks.slice(1).map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/mass-timings" &&
                (pathname === "/mass-timings" || pathname.startsWith("/mass-timings"))) ||
              (link.href === "/tamil-bible" && pathname.startsWith("/tamil-bible"));
            const isPrayerReq = link.href === "/prayer-request";

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if ((link.href === "/#mass-timings" || link.href === "/mass-timings") && pathname === "/") {
                    e.preventDefault();
                    document.getElementById("mass-timings")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "/#mass-timings");
                  }
                }}
                title={link.tamilLabel ? `${link.label} (${link.tamilLabel})` : link.label}
                className={`px-2 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-md whitespace-nowrap hover:text-[#80142b] ${
                  isActive
                    ? "text-[#80142b] font-bold bg-[#80142b]/5"
                    : isPrayerReq
                    ? "text-[#80142b] font-semibold hover:bg-[#80142b]/5"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={mobileDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileDrawerOpen}
          aria-controls="mobile-navigation-drawer"
          onClick={() => setMobileDrawerOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#80142b] active:scale-95 transition-all lg:hidden cursor-pointer"
        >
          {mobileDrawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileDrawerOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Dark Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex h-16 sm:h-20 items-center justify-between px-5 border-b border-slate-200/80 bg-white shrink-0">
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center gap-2.5"
              >
                <img
                  src="/images/logo.jpg"
                  alt="St. Paul's Catholic Church logo"
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#d4af37]"
                />
                <div>
                  <div className="text-xs font-bold tracking-wider text-[#80142b]">
                    ST. PAUL&apos;S CHURCH
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-[#c59b27]">
                    RATHINAPURI
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body - Scrollable links */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Home
              </Link>

              {/* Accordion Menu for About */}
              <div className="rounded-xl border border-slate-200/70 overflow-hidden my-1">
                <div
                  className={`flex items-center justify-between px-4 h-12 cursor-pointer transition-colors ${
                    isAboutActive ? "bg-[#80142b]/5 text-[#80142b]" : "text-slate-800 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileAboutOpen((prev) => !prev)}
                >
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span>About</span>
                    {isAboutActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#80142b]" />
                    )}
                  </span>
                  <button
                    type="button"
                    aria-label={mobileAboutOpen ? "Collapse About submenu" : "Expand About submenu"}
                    aria-expanded={mobileAboutOpen}
                    className="p-1 text-slate-400 hover:text-[#80142b] transition-colors"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileAboutOpen ? "rotate-180 text-[#80142b]" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expanded Accordion Submenu Items */}
                {mobileAboutOpen && (
                  <div className="bg-[#fbf8f1] border-t border-slate-200/60 p-2 space-y-1">
                    {aboutSubmenu.map((subItem) => {
                      const isSubActive =
                        pathname === subItem.href ||
                        (subItem.href === "/about/sons-of-the-soil" &&
                          pathname === "/about/sons-of-parish");
                      const IconComponent = subItem.icon;

                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                            isSubActive
                              ? "bg-white text-[#80142b] font-bold shadow-xs border border-[#d4af37]/40"
                              : "text-slate-700 hover:bg-white hover:text-[#80142b]"
                          }`}
                        >
                          <IconComponent className="h-4 w-4 shrink-0 text-[#80142b]" />
                          <div className="flex-1">
                            <div className="text-xs font-semibold">{subItem.label}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              {subItem.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mass Timings */}
              <Link
                href="/#mass-timings"
                onClick={(e) => {
                  setMobileDrawerOpen(false);
                  if (pathname === "/") {
                    e.preventDefault();
                    document.getElementById("mass-timings")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "/#mass-timings");
                  }
                }}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/#mass-timings" || pathname === "/mass-timings"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Mass Timings
              </Link>

              {/* Ministries */}
              <Link
                href="/ministries"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/ministries"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Ministries
              </Link>

              {/* Anbiyam */}
              <Link
                href="/anbiyam"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/anbiyam"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Anbiyam
              </Link>

              {/* Prayer */}
              <Link
                href="/prayer"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/prayer"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Prayer
              </Link>

              {/* Prayer Request */}
              <Link
                href="/prayer-request"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/prayer-request"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-[#80142b] hover:bg-[#80142b]/5"
                }`}
              >
                <span>Prayer Request</span>
                <span className="text-xs bg-[#80142b]/10 text-[#80142b] px-2 py-0.5 rounded-full font-medium">
                  ஜெப வேண்டுகோள்
                </span>
              </Link>

              {/* Tamil Bible */}
              <Link
                href="/tamil-bible"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname.startsWith("/tamil-bible")
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#80142b]" />
                  <span>Tamil Bible</span>
                </span>
                <span className="text-xs text-[#c59b27] font-semibold">திருவிவிலியம்</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex h-12 items-center rounded-xl px-4 text-sm font-semibold transition-colors ${
                  pathname === "/contact"
                    ? "bg-[#80142b]/10 text-[#80142b]"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Drawer Footer with Quick Live Mass Link */}
            <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 shrink-0">
              <Link
                href="/mass-timings#live-telecast"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#781226] via-[#8c1830] to-[#6a0f21] px-4 py-3 text-center text-xs font-bold text-white shadow-sm border border-[#d4af37]/35 hover:shadow-md transition-all"
              >
                <span>📺 Mass Will Be Live Telecasted</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
