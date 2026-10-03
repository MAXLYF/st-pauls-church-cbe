"use client";

import React, { useState, useMemo } from "react";
import PrayerHero from "@/components/prayer/PrayerHero";
import TodaysReflection from "@/components/prayer/TodaysReflection";
import BibleSection from "@/components/prayer/BibleSection";
import ResourceDetailModal from "@/components/prayer/ResourceDetailModal";
import {
  initialDailyReflection,
  initialPrayerResources
} from "@/lib/data/prayers";
import {
  PrayerResource,
  PrayerResourceLanguage,
  PrayerResourceType
} from "@/types";

export default function PrayerPageClient() {
  const [resources] = useState<PrayerResource[]>(initialPrayerResources);
  const [searchQuery] = useState("");
  const [selectedCategory] = useState<PrayerResourceType | "all">("all");
  const [selectedLanguage] = useState<PrayerResourceLanguage>("All");
  const [selectedResource, setSelectedResource] = useState<PrayerResource | null>(null);

  // Filtered resources for search/category/language
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Category match
      if (selectedCategory !== "all" && res.type !== selectedCategory) {
        return false;
      }
      // Language match
      if (selectedLanguage !== "All" && res.language !== selectedLanguage) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesDesc = res.description.toLowerCase().includes(q);
        const matchesCat = res.category?.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [resources, selectedCategory, selectedLanguage, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* 1. Prayer Page Hero / Header */}
      <PrayerHero />

      {/* 2. Today's Reflection */}
      <TodaysReflection reflection={initialDailyReflection} />

      {/* 3. THE HOLY BIBLE - Word of God & Sacred Scripture */}
      <BibleSection
        resources={filteredResources}
        onOpenResource={setSelectedResource}
      />

      {/* Resource Detail & Share Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
}
