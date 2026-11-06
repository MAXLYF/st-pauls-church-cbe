import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";
import {
  GalleryPhoto,
  GALLERY_CATEGORIES,
  INITIAL_GALLERY_PHOTOS
} from "@/lib/data/gallery-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parish Gallery | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Curated photography portfolio capturing sacred architecture, worship, community life, and liturgical celebrations at St. Paul's Catholic Church, Rathinapuri, Coimbatore."
};

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif"
]);

function formatTitleFromFilename(filename: string, categoryTitle: string): string {
  const cleaned = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+-[a-z0-9]+-/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (
    !cleaned ||
    /^\d+$/.test(cleaned) ||
    /^file\s+[a-f0-9]+/i.test(cleaned) ||
    /^images(\s*\(\d+\))?$/i.test(cleaned) ||
    /^614A\d+$/i.test(cleaned)
  ) {
    return `${categoryTitle} Photograph`;
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const mergedMap = new Map<string, GalleryPhoto>();

  // 1. Start with curated photos from lib/data/gallery-data.ts
  for (const photo of INITIAL_GALLERY_PHOTOS) {
    mergedMap.set(photo.src, photo);
  }

  // 2. Merge any additional entries from data/gallery-photos.json
  try {
    const filePath = path.join(process.cwd(), "data", "gallery-photos.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (
          item &&
          typeof item.src === "string" &&
          item.src.startsWith("/images/Parish_gallery/") &&
          item.categoryId
        ) {
          const existing = mergedMap.get(item.src);
          mergedMap.set(item.src, existing ? { ...item, ...existing } : item);
        }
      }
    }
  } catch {
    // Ignore if JSON file doesn't exist
  }

  // 3. Auto-discover any newly added image files in public/images/Parish_gallery/
  const parishGalleryDir = path.join(
    process.cwd(),
    "public",
    "images",
    "Parish_gallery"
  );
  try {
    const files = await fs.readdir(parishGalleryDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) continue;
      const src = `/images/Parish_gallery/${file}`;
      if (!mergedMap.has(src)) {
        mergedMap.set(src, {
          id: `parish-gallery-auto-${file}`,
          categoryId: "church-exterior",
          src,
          title: formatTitleFromFilename(file, "St. Paul's Parish"),
          caption: "St. Paul's Catholic Church, Rathinapuri, Coimbatore",
          isDefault: true
        });
      }
    }
  } catch {
    // Ignore if directory does not exist
  }

  // 4. Also auto-discover any files placed inside public/images/Parish_gallery/<category-id>/
  for (const category of GALLERY_CATEGORIES) {
    const categoryDir = path.join(parishGalleryDir, category.id);
    try {
      const files = await fs.readdir(categoryDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) continue;
        const src = `/images/Parish_gallery/${category.id}/${file}`;
        if (!mergedMap.has(src)) {
          mergedMap.set(src, {
            id: `auto-${category.id}-${file}`,
            categoryId: category.id,
            src,
            title: formatTitleFromFilename(file, category.title),
            caption: `${category.title} • St. Paul's Catholic Church, Rathinapuri`,
            isDefault: true
          });
        }
      }
    } catch {
      // Subfolder is optional
    }
  }

  return Array.from(mergedMap.values());
}

export default async function Gallery() {
  const initialPhotos = await getGalleryPhotos();
  return <GalleryClient initialPhotos={initialPhotos} />;
}
