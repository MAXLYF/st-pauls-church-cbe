import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";
import { GalleryPhoto, INITIAL_GALLERY_PHOTOS } from "@/lib/data/gallery-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parish Gallery | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Photo and media gallery capturing worship, community life, celebrations, and events at St. Paul's Catholic Church, Rathinapuri, Coimbatore."
};

async function getInitialGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "gallery-photos.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback to initial defaults if file hasn't been created yet
  }
  return INITIAL_GALLERY_PHOTOS;
}

export default async function Gallery() {
  const initialPhotos = await getInitialGalleryPhotos();
  return <GalleryClient initialPhotos={initialPhotos} />;
}
