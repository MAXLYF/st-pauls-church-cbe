import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  GalleryPhoto,
  GALLERY_CATEGORIES,
  INITIAL_GALLERY_PHOTOS
} from "@/lib/data/gallery-data";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "gallery-photos.json");
const PARISH_GALLERY_DIR = path.join(
  process.cwd(),
  "public",
  "images",
  "Parish_gallery"
);
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VALID_CATEGORY_IDS = new Set<string>(
  GALLERY_CATEGORIES.map((cat) => cat.id)
);

function formatTitleFromFilename(filename: string, categoryTitle: string): string {
  const base = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+-[a-z0-9]+-/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (
    !base ||
    /^\d+$/.test(base) ||
    /^file\s+[a-f0-9]+/i.test(base) ||
    /^images(\s*\(\d+\))?$/i.test(base) ||
    /^614A\d+$/i.test(base)
  ) {
    return `${categoryTitle} Photograph`;
  }

  return base.charAt(0).toUpperCase() + base.slice(1);
}

async function readGalleryPhotos(): Promise<GalleryPhoto[]> {
  const mergedMap = new Map<string, GalleryPhoto>();

  for (const photo of INITIAL_GALLERY_PHOTOS) {
    mergedMap.set(photo.src, photo);
  }

  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
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
    // Fallback to INITIAL_GALLERY_PHOTOS
  }

  try {
    const files = await fs.readdir(PARISH_GALLERY_DIR);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) continue;
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
    // Ignore missing directory
  }

  for (const category of GALLERY_CATEGORIES) {
    const categoryDir = path.join(PARISH_GALLERY_DIR, category.id);
    try {
      const files = await fs.readdir(categoryDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!ALLOWED_EXTENSIONS.has(ext)) continue;
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
      // Ignore missing subfolder
    }
  }

  return Array.from(mergedMap.values());
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

    const photos = await readGalleryPhotos();

    const filtered =
      categoryParam && VALID_CATEGORY_IDS.has(categoryParam)
        ? photos.filter((p) => p.categoryId === categoryParam)
        : photos;

    return NextResponse.json(
      {
        success: true,
        photos: filtered
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate"
        }
      }
    );
  } catch (error) {
    console.error("Failed to fetch gallery photos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to load gallery photos."
      },
      { status: 500 }
    );
  }
}
