"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ParishEvent } from "@/types";
import { initialParishEvents, fetchParishEvents } from "@/lib/data/events";
import EventHeroSection from "@/components/events/EventHeroSection";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import CategoryFilterRow from "@/components/events/CategoryFilterRow";
import EventGridCard from "@/components/events/EventGridCard";
import EventTimelineView from "@/components/events/EventTimelineView";
import EventDetailsModal from "@/components/events/EventDetailsModal";
import EmptyEventsState from "@/components/events/EmptyEventsState";
import { Bell, Sparkles } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<ParishEvent[]>(initialParishEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [activeModalEvent, setActiveModalEvent] = useState<ParishEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch Firestore events if available, falling back gracefully
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchParishEvents();
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (err) {
        console.warn("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Identify featured event (first with featured: true, or first item)
  const featuredEvent = useMemo(() => {
    return events.find((e) => e.featured) || events[0] || null;
  }, [events]);

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    let list = events;
    if (selectedCategory !== "ALL") {
      list = list.filter((e) => e.category?.toUpperCase() === selectedCategory);
    }
    return list;
  }, [events, selectedCategory]);

  return (
    <div className="bg-[#faf7f2] min-h-screen pb-20 text-[#1f040b]">
      {/* 1. HERO SECTION */}
      <EventHeroSection />

      {/* 2. FEATURED EVENT SECTION */}
      {featuredEvent && (
        <FeaturedEventCard
          event={featuredEvent}
          onSelect={(evt) => setActiveModalEvent(evt)}
        />
      )}

      {/* 3. UPCOMING EVENTS SECTION */}
      <section className="container-site py-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] text-[#80142b] uppercase mb-1">
              PARISH SCHEDULE
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1f040b] sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Moments of faith, fellowship and celebration.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="gold-line !m-0" />
          </div>
        </div>

        {/* 5. CATEGORY FILTER & VIEW SWITCHER */}
        <CategoryFilterRow
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          viewMode={viewMode}
          onToggleViewMode={(mode) => setViewMode(mode)}
          totalCount={filteredEvents.length}
        />

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-white/70 animate-pulse border border-[#e7dec8] p-6" />
            ))}
          </div>
        )}

        {/* 8. EMPTY STATE */}
        {!isLoading && filteredEvents.length === 0 && (
          <EmptyEventsState onResetFilter={() => setSelectedCategory("ALL")} />
        )}

        {/* EVENTS LIST: GRID VIEW */}
        {!isLoading && filteredEvents.length > 0 && viewMode === "grid" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventGridCard
                key={event.id}
                event={event}
                onSelect={(evt) => setActiveModalEvent(evt)}
              />
            ))}
          </div>
        )}

        {/* 6. EVENTS LIST: TIMELINE VIEW */}
        {!isLoading && filteredEvents.length > 0 && viewMode === "timeline" && (
          <EventTimelineView
            events={filteredEvents}
            onSelect={(evt) => setActiveModalEvent(evt)}
          />
        )}
      </section>

      {/* PARISH ANNOUNCEMENT NOTICE BANNER */}
      <section className="container-site mt-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1b0308] via-[#3d0813] to-[#140206] p-8 text-white shadow-xl border border-[#c59b27]/30">
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#c59b27]/15 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c59b27]/20 border border-[#f5d77f]/40 text-[#f5d77f]">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#f5d77f] uppercase">
                  WEEKLY ANNOUNCEMENTS
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  Have an announcement or ministry update?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  For inclusion in the weekly parish bulletin or online calendar, please contact the St. Paul&apos;s Parish Office at least 5 days prior to the event date.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c59b27] via-[#e5c158] to-[#b8860b] px-6 py-3 text-xs font-bold text-[#1f040b] shadow-md hover:brightness-110 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Contact Parish Office</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. EVENT DETAILS MODAL */}
      <EventDetailsModal
        event={activeModalEvent}
        onClose={() => setActiveModalEvent(null)}
      />
    </div>
  );
}
