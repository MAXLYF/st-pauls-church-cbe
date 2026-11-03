import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  GalleryCategoryId,
  GalleryPhoto,
  GALLERY_CATEGORIES,
  INITIAL_GALLERY_PHOTOS
} from "@/lib/data/gallery-data";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "gallery-photos.json");
const PUBLIC_GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const VALID_CATEGORY_IDS = new Set<string>(
  GALLERY_CATEGORIES.map((cat) => cat.id)
);

async function readGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file doesn't exist or is invalid, initialize with defaults
  }

  await writeGalleryPhotos(INITIAL_GALLERY_PHOTOS);
  return INITIAL_GALLERY_PHOTOS;
}

async function writeGalleryPhotos(photos: GalleryPhoto[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(photos, null, 2), "utf-8");
}

function sanitizeBaseName(name: string): string {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) || "photo";
}

function formatTitleFromFilename(filename: string, categoryTitle: string): string {
  const base = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!base || /^\d+$/.test(base) || /^img\s*\d+/i.test(base) || /^whatsapp/i.test(base)) {
    return `${categoryTitle} Photo`;
  }

  return base.charAt(0).toUpperCase() + base.slice(1);
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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const categoryId = String(formData.get("categoryId") || "").trim() as GalleryCategoryId;

    if (!VALID_CATEGORY_IDS.has(categoryId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid gallery category selected."
        },
        { status: 400 }
      );
    }

    const categoryMeta = GALLERY_CATEGORIES.find((c) => c.id === categoryId)!;
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);
    const customTitlesRaw = formData.get("titles");
    let customTitles: Record<string, string> = {};

    if (typeof customTitlesRaw === "string" && customTitlesRaw.trim()) {
      try {
        customTitles = JSON.parse(customTitlesRaw);
      } catch {
        customTitles = {};
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select at least one image file to upload."
        },
        { status: 400 }
      );
    }

    // Validate all files first
    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      const mimeOk = ALLOWED_MIME_TYPES.has(file.type.toLowerCase());
      const extOk = ALLOWED_EXTENSIONS.has(ext);

      if (!mimeOk && !extOk) {
        return NextResponse.json(
          {
            success: false,
            error: `Unsupported file format for "${file.name}". Allowed formats: JPG, JPEG, PNG, WEBP.`
          },
          { status: 400 }
        );
      }
    }

    const categoryFolder = path.join(PUBLIC_GALLERY_DIR, categoryId);
    await fs.mkdir(categoryFolder, { recursive: true });

    const existingPhotos = await readGalleryPhotos();
    const newlyUploaded: GalleryPhoto[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const origExt = path.extname(file.name).toLowerCase();
      const safeExt = ALLOWED_EXTENSIONS.has(origExt)
        ? origExt
        : file.type === "image/png"
        ? ".png"
        : file.type === "image/webp"
        ? ".webp"
        : ".jpg";

      const timestamp = Date.now() + i;
      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const safeBase = sanitizeBaseName(file.name);
      const finalFileName = `${timestamp}-${randomSuffix}-${safeBase}${safeExt}`;
      const filePath = path.join(categoryFolder, finalFileName);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      const customTitle = customTitles[file.name]?.trim();
      const photoTitle =
        customTitle || formatTitleFromFilename(file.name, categoryMeta.title);

      const newPhoto: GalleryPhoto = {
        id: `photo-${categoryId}-${timestamp}-${randomSuffix}`,
        categoryId,
        src: `/images/gallery/${categoryId}/${finalFileName}`,
        title: photoTitle,
        caption: `${categoryMeta.title} • St. Paul's Catholic Church, Rathinapuri`,
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        fileSize: file.size,
        isDefault: false
      };

      newlyUploaded.push(newPhoto);
    }

    const updatedPhotos = [...existingPhotos, ...newlyUploaded];
    await writeGalleryPhotos(updatedPhotos);

    return NextResponse.json({
      success: true,
      message:
        newlyUploaded.length === 1
          ? `1 photo uploaded to ${categoryMeta.title}.`
          : `${newlyUploaded.length} photos uploaded to ${categoryMeta.title}.`,
      uploaded: newlyUploaded,
      photos: updatedPhotos
    });
  } catch (error) {
    console.error("Gallery photo upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload photos. Please try again."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get("id");

    if (!photoId) {
      return NextResponse.json(
        { success: false, error: "Photo ID is required." },
        { status: 400 }
      );
    }

    const existingPhotos = await readGalleryPhotos();
    const target = existingPhotos.find((p) => p.id === photoId);

    if (!target) {
      return NextResponse.json(
        { success: false, error: "Photo not found." },
        { status: 404 }
      );
    }

    if (target.isDefault) {
      return NextResponse.json(
        { success: false, error: "Default parish gallery photos cannot be deleted." },
        { status: 400 }
      );
    }

    // Remove file from public/images/gallery if it exists
    if (target.src.startsWith("/images/gallery/")) {
      const diskPath = path.join(process.cwd(), "public", target.src.replace(/^\//, ""));
      try {
        await fs.unlink(diskPath);
      } catch {
        // Ignore if file already missing on disk
      }
    }

    const updatedPhotos = existingPhotos.filter((p) => p.id !== photoId);
    await writeGalleryPhotos(updatedPhotos);

    return NextResponse.json({
      success: true,
      photos: updatedPhotos
    });
  } catch (error) {
    console.error("Failed to delete gallery photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete photo." },
      { status: 500 }
    );
  }
}

