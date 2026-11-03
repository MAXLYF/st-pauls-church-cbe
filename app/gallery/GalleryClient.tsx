"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Images,
  Sparkles,
  FileImage,
  LayoutGrid,
  Columns3,
  Plus,
  Loader2,
  Maximize2
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import MediaCard from "@/components/MediaCard";
import {
  GalleryCategory,
  GalleryCategoryId,
  GalleryPhoto,
  GALLERY_CATEGORIES
} from "@/lib/data/gallery-data";

interface SelectedUploadFile {
  id: string;
  file: File;
  previewUrl: string;
  customTitle: string;
}

interface GalleryClientProps {
  initialPhotos: GalleryPhoto[];
}

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export default function GalleryClient({ initialPhotos }: GalleryClientProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const [activeCategoryId, setActiveCategoryId] = useState<GalleryCategoryId | null>(null);
  const [layoutMode, setLayoutMode] = useState<"grid" | "masonry">("grid");
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedUploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadNotification, setUploadNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Toast notification on category page
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch latest persisted photos from server API on mount to ensure fresh state
  const refreshPhotos = useCallback(async () => {
    try {
      setIsLoadingPhotos(true);
      setFetchError(null);
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load gallery photos");
      const data = await res.json();
      if (data.success && Array.isArray(data.photos)) {
        setPhotos(data.photos);
      }
    } catch (err) {
      console.error("Error refreshing gallery photos:", err);
      setFetchError("Unable to sync latest gallery photos.");
    } finally {
      setIsLoadingPhotos(false);
    }
  }, []);

  useEffect(() => {
    refreshPhotos();
  }, [refreshPhotos]);

  // Sync URL query param (?category=church-exterior | church-interior) on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") as GalleryCategoryId | null;
    if (cat && GALLERY_CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategoryId(cat);
    }
  }, []);

  const handleOpenCategory = (categoryId: GalleryCategoryId) => {
    setActiveCategoryId(categoryId);
    setLightboxIndex(null);
    setUploadNotification(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("category", categoryId);
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseCategory = () => {
    setActiveCategoryId(null);
    setLightboxIndex(null);
    setIsUploadModalOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      window.history.pushState({}, "", url.toString());
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [selectedFiles]);

  const activeCategory: GalleryCategory | null = useMemo(
    () => GALLERY_CATEGORIES.find((c) => c.id === activeCategoryId) || null,
    [activeCategoryId]
  );

  const categoryPhotos = useMemo(() => {
    if (!activeCategoryId) return [];
    return photos.filter((p) => p.categoryId === activeCategoryId);
  }, [photos, activeCategoryId]);

  const getPhotoCountForCategory = useCallback(
    (categoryId: GalleryCategoryId) =>
      photos.filter((p) => p.categoryId === categoryId).length,
    [photos]
  );

  // Lightbox navigation handlers
  const handlePrevPhoto = useCallback(() => {
    if (lightboxIndex === null || categoryPhotos.length === 0) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + categoryPhotos.length) % categoryPhotos.length
    );
  }, [lightboxIndex, categoryPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    if (lightboxIndex === null || categoryPhotos.length === 0) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % categoryPhotos.length
    );
  }, [lightboxIndex, categoryPhotos.length]);

  // Keyboard navigation for Lightbox & Upload Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") {
          setLightboxIndex(null);
          setIsZoomed(false);
        } else if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        } else if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
      } else if (isUploadModalOpen && e.key === "Escape" && !isUploading) {
        setIsUploadModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, isUploadModalOpen, isUploading, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when lightbox or upload modal is open
  useEffect(() => {
    if (lightboxIndex !== null || isUploadModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, isUploadModalOpen]);

  // Validate and stage selected files
  const processIncomingFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;

    const validItems: SelectedUploadFile[] = [];
    const invalidNames: string[] = [];

    for (const file of incoming) {
      const lowerName = file.name.toLowerCase();
      const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());

      if (hasValidExt || hasValidMime) {
        const previewUrl = URL.createObjectURL(file);
        const defaultCleanTitle = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim();

        validItems.push({
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewUrl,
          customTitle: defaultCleanTitle
        });
      } else {
        invalidNames.push(file.name);
      }
    }

    if (invalidNames.length > 0) {
      setUploadNotification({
        type: "error",
        message: `Skipped unsupported file(s): ${invalidNames.join(", ")}. Allowed formats: JPG, JPEG, PNG, WEBP.`
      });
    } else {
      setUploadNotification(null);
    }

    if (validItems.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validItems]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processIncomingFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveSelectedFile = (id: string) => {
    setSelectedFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleClearAllSelected = () => {
    selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setSelectedFiles([]);
    setUploadNotification(null);
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    setSelectedFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, customTitle: newTitle } : item))
    );
  };

  const handleUploadSubmit = async () => {
    if (!activeCategoryId || selectedFiles.length === 0 || isUploading) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadNotification(null);

    const formData = new FormData();
    formData.append("categoryId", activeCategoryId);

    const customTitlesMap: Record<string, string> = {};
    selectedFiles.forEach((item) => {
      formData.append("files", item.file);
      if (item.customTitle.trim()) {
        customTitlesMap[item.file.name] = item.customTitle.trim();
      }
    });
    formData.append("titles", JSON.stringify(customTitlesMap));

    try {
      const responseData = await new Promise<{
        success: boolean;
        message?: string;
        error?: string;
        photos?: GalleryPhoto[];
        uploaded?: GalleryPhoto[];
      }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/gallery");

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.min(95, Math.round((event.loaded / event.total) * 100));
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          try {
            const parsed = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300 && parsed.success) {
              setUploadProgress(100);
              resolve(parsed);
            } else {
              reject(new Error(parsed.error || "Upload failed."));
            }
          } catch {
            reject(new Error("Unexpected response from upload server."));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Network error occurred while uploading photos."));
        };

        xhr.send(formData);
      });

      if (responseData.photos) {
        setPhotos(responseData.photos);
      } else {
        await refreshPhotos();
      }

      // Clean up staged previews
      selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setSelectedFiles([]);

      const successMsg =
        responseData.message ||
        `Successfully uploaded ${responseData.uploaded?.length || ""} photo(s) to ${activeCategory?.title}.`;

      setUploadNotification({
        type: "success",
        message: successMsg
      });
      setToast({
        type: "success",
        message: successMsg
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to upload photos. Please try again.";
      setUploadNotification({
        type: "error",
        message: errorMsg
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photo: GalleryPhoto, e: React.MouseEvent) => {
    e.stopPropagation();
    if (photo.isDefault) return;

    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(photo.id)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.photos)) {
        setPhotos(data.photos);
        setToast({
          type: "success",
          message: `Removed "${photo.title}" from ${activeCategory?.title}.`
        });
      } else {
        setToast({
          type: "error",
          message: data.error || "Could not remove photo."
        });
      }
    } catch {
      setToast({
        type: "error",
        message: "Error removing photo."
      });
    }
  };

  const currentLightboxPhoto =
    lightboxIndex !== null && categoryPhotos[lightboxIndex]
      ? categoryPhotos[lightboxIndex]
      : null;

  return (
    <section className="section-pad">
      <div className="container-site">
        {/* Floating Toast Notification */}
        {toast && (
          <div
            role="status"
            className={`fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
              toast.type === "success"
                ? "border-[#d4af37]/50 bg-[#1b0308]/95 text-white"
                : "border-red-400/50 bg-red-950/95 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#f5d77f]" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-300" />
            )}
            <p className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="ml-2 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* VIEW 1: MAIN GALLERY OVERVIEW (Category Cards with Explore Button) */}
        {!activeCategory ? (
          <>
            <SectionTitle
              eyebrow="MEDIA"
              title="Parish Gallery"
              description="Photo and media archives from liturgical celebrations, festivals, and community life at St. Paul's Catholic Church, Rathinapuri."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {GALLERY_CATEGORIES.map((category) => {
                const count = getPhotoCountForCategory(category.id);
                return (
                  <MediaCard
                    key={category.id}
                    src={category.coverImage}
                    title={category.title}
                    label={category.label}
                    subtitle={category.subtitle}
                    photoCount={count}
                    showExplore
                    onExplore={() => handleOpenCategory(category.id)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          /* VIEW 2: DEDICATED CATEGORY GALLERY EXPERIENCE */
          <div className="animate-in fade-in duration-300">
            {/* Category Hero Header Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/35 bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] p-6 sm:p-8 md:p-10 text-white shadow-[0_20px_50px_rgba(20,2,7,0.28)]">
              {/* Ambient gold radial glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 80% 0%, rgba(212,175,55,0.22) 0%, transparent 65%)"
                }}
              />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left: Back button + Category Heading */}
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCloseCategory}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md transition hover:border-[#f5d77f]/60 hover:bg-white/20"
                    >
                      <ArrowLeft className="h-3.5 w-3.5 text-[#f5d77f]" />
                      <span>Back to Gallery</span>
                    </button>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#781226]/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.2em] text-[#f5d77f] backdrop-blur-md">
                      <Sparkles className="h-3 w-3" />
                      {activeCategory.label}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md">
                      <Images className="h-3.5 w-3.5 text-[#f5d77f]" />
                      {categoryPhotos.length}{" "}
                      {categoryPhotos.length === 1 ? "Photo" : "Photos"}
                    </span>
                  </div>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                    {activeCategory.title}
                  </h1>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
                    {activeCategory.description}
                  </p>
                </div>

                {/* Right: Action Controls (Upload Photos + Layout Switcher + Close) */}
                <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
                  {/* Layout Mode Toggle */}
                  <div
                    className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 p-1 backdrop-blur-md"
                    role="group"
                    aria-label="Gallery layout mode"
                  >
                    <button
                      type="button"
                      onClick={() => setLayoutMode("grid")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        layoutMode === "grid"
                          ? "bg-[#f5d77f] text-[#1f040b] shadow-xs"
                          : "text-slate-200 hover:text-white"
                      }`}
                      title="Uniform Grid View"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLayoutMode("masonry")}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        layoutMode === "masonry"
                          ? "bg-[#f5d77f] text-[#1f040b] shadow-xs"
                          : "text-slate-200 hover:text-white"
                      }`}
                      title="Masonry Gallery View"
                    >
                      <Columns3 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Masonry</span>
                    </button>
                  </div>

                  {/* Upload Photos Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setUploadNotification(null);
                      setIsUploadModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#c59b27] via-[#e5c158] to-[#b8860b] px-5 py-3 text-xs sm:text-sm font-bold text-[#1f040b] shadow-[0_10px_25px_rgba(197,155,39,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(197,155,39,0.45)] focus:outline-none focus:ring-2 focus:ring-[#f5d77f]"
                  >
                    <Upload className="h-4 w-4 stroke-[2.5]" />
                    <span>Upload Photos</span>
                  </button>

                  {/* Close Category View Button */}
                  <button
                    type="button"
                    onClick={handleCloseCategory}
                    aria-label="Close category gallery and return to main gallery"
                    title="Close gallery"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-[#f5d77f]/60 hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Error State Banner if fetch failed */}
            {fetchError && (
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-xs sm:text-sm text-amber-900">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                  <span>{fetchError}</span>
                </div>
                <button
                  type="button"
                  onClick={refreshPhotos}
                  className="font-bold text-[#80142b] underline hover:text-[#9e1c36]"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoadingPhotos && categoryPhotos.length === 0 ? (
              <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-[#e7dec8] bg-white p-14 text-center shadow-xs">
                <Loader2 className="h-9 w-9 animate-spin text-[#80142b]" />
                <p className="mt-4 text-sm font-semibold text-[#1f040b]">
                  Loading {activeCategory.title} photos...
                </p>
              </div>
            ) : categoryPhotos.length === 0 ? (
              /* Empty State */
              <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d4af37]/60 bg-white/90 p-14 text-center shadow-xs">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#80142b]/10 text-[#80142b]">
                  <Images className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#1f040b]">
                  No Photos in {activeCategory.title} Yet
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Start building the {activeCategory.title} collection by uploading high-resolution parish photographs.
                </p>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#80142b] to-[#560b1a] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md transition hover:from-[#9e1c36] hover:to-[#6a0f21]"
                >
                  <Upload className="h-4 w-4 text-[#f5d77f]" />
                  <span>Upload First Photo</span>
                </button>
              </div>
            ) : layoutMode === "grid" ? (
              /* Modern Responsive Grid Gallery */
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setIsZoomed(false);
                      setLightboxIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsZoomed(false);
                        setLightboxIndex(index);
                      }
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-[#e7dec8] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/70 hover:shadow-[0_20px_40px_rgba(31,4,11,0.14)] cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1b0308]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#140207]/90 via-[#140207]/25 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/40 bg-[#1b0308]/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f5d77f] backdrop-blur-md">
                            {activeCategory.title}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {!photo.isDefault && (
                              <button
                                type="button"
                                onClick={(e) => handleDeletePhoto(photo, e)}
                                title="Delete uploaded photo"
                                aria-label={`Delete ${photo.title}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/30 bg-red-950/80 text-red-200 backdrop-blur-md transition hover:bg-red-700 hover:text-white"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md">
                              <Maximize2 className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white line-clamp-1">
                            {photo.title}
                          </h3>
                          <p className="mt-0.5 text-[11px] text-[#f5d77f]">
                            Click to open full-screen preview
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Caption Footer */}
                    <div className="flex items-center justify-between px-4 py-3.5 bg-white">
                      <div className="min-w-0 pr-2">
                        <h4 className="truncate text-sm font-semibold text-[#1f040b] group-hover:text-[#80142b] transition-colors">
                          {photo.title}
                        </h4>
                        <p className="truncate text-[11px] text-slate-400">
                          {activeCategory.title}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[#faf7f2] px-2.5 py-1 text-[11px] font-semibold text-[#80142b] border border-[#e7dec8]">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Quick Add Photo Card in Grid */}
                <button
                  type="button"
                  onClick={() => {
                    setUploadNotification(null);
                    setIsUploadModalOpen(true);
                  }}
                  className="group flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d4af37]/45 bg-gradient-to-b from-white to-[#faf7f2] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#80142b] hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#80142b]/10 text-[#80142b] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#80142b] group-hover:text-[#f5d77f]">
                    <Plus className="h-6 w-6" />
                  </div>
                  <span className="mt-3.5 text-sm font-bold text-[#1f040b]">
                    Add Photos to {activeCategory.title}
                  </span>
                  <span className="mt-1 text-xs text-slate-500">
                    Upload JPG, JPEG, PNG, or WEBP images
                  </span>
                </button>
              </div>
            ) : (
              /* Responsive Masonry Gallery View */
              <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
                {categoryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setIsZoomed(false);
                      setLightboxIndex(index);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsZoomed(false);
                        setLightboxIndex(index);
                      }
                    }}
                    className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-[#e7dec8] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/70 hover:shadow-xl cursor-pointer"
                  >
                    <div className="relative w-full overflow-hidden bg-[#1b0308]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#140207]/90 via-transparent to-black/20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex justify-end gap-1.5">
                          {!photo.isDefault && (
                            <button
                              type="button"
                              onClick={(e) => handleDeletePhoto(photo, e)}
                              title="Delete uploaded photo"
                              aria-label={`Delete ${photo.title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-red-400/30 bg-red-950/80 text-red-200 backdrop-blur-md transition hover:bg-red-700 hover:text-white"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md">
                            <Maximize2 className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{photo.title}</h3>
                          <p className="text-[11px] text-[#f5d77f]">Click to preview</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH NEXT/PREV NAVIGATION */}
      {currentLightboxPhoto && activeCategory && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0c0104]/95 backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentLightboxPhoto.title} full-screen view`}
        >
          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 rounded-full border border-[#d4af37]/40 bg-[#781226]/70 px-3 py-1 text-xs font-bold text-[#f5d77f]">
                {lightboxIndex + 1} / {categoryPhotos.length}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-sm sm:text-base font-bold text-white">
                  {currentLightboxPhoto.title}
                </h3>
                <p className="truncate text-[11px] text-slate-400">
                  {activeCategory.title} • St. Paul&apos;s Catholic Church
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:border-[#f5d77f]/50 hover:bg-white/20"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </button>

              <a
                href={currentLightboxPhoto.src}
                download={currentLightboxPhoto.fileName || `${currentLightboxPhoto.title}.jpg`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:border-[#f5d77f]/50 hover:bg-white/20"
                title="Download photo"
                aria-label="Download photo"
              >
                <Download className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  setIsZoomed(false);
                }}
                aria-label="Close full-screen preview"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-[#80142b] text-white transition hover:bg-[#9e1c36]"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center Image Stage with Prev/Next Controls */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-16"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {categoryPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#1b0308]/80 text-[#f5d77f] shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-[#f5d77f] hover:bg-[#80142b] hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <img
              src={currentLightboxPhoto.src}
              alt={currentLightboxPhoto.title}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed((z) => !z);
              }}
              className={`max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-300 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
            />

            {categoryPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#1b0308]/80 text-[#f5d77f] shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-[#f5d77f] hover:bg-[#80142b] hover:text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {categoryPhotos.length > 1 && (
            <div className="relative z-10 flex items-center justify-center gap-2.5 overflow-x-auto border-t border-white/10 bg-black/50 px-4 py-3">
              {categoryPhotos.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => {
                    setIsZoomed(false);
                    setLightboxIndex(idx);
                  }}
                  aria-label={`View photo ${idx + 1}: ${thumb.title}`}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    idx === lightboxIndex
                      ? "border-[#f5d77f] scale-105 shadow-[0_0_12px_rgba(245,215,127,0.45)]"
                      : "border-transparent opacity-55 hover:opacity-90"
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* GLASSMORPHIC PHOTO UPLOAD MODAL */}
      {isUploadModalOpen && activeCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120206]/75 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => {
              if (!isUploading) setIsUploadModalOpen(false);
            }}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#faf7f2]/95 shadow-[0_25px_70px_rgba(20,2,7,0.55)] backdrop-blur-xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#1b0308] via-[#3d0813] to-[#1b0308] px-6 py-5 text-white border-b border-[#d4af37]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#781226]/60 text-[#f5d77f] shadow-inner">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#f5d77f]">
                      PHOTO UPLOAD • {activeCategory.title}
                    </span>
                    <h2 id="upload-modal-title" className="text-lg sm:text-xl font-bold text-white">
                      Upload to {activeCategory.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsUploadModalOpen(false)}
                  aria-label="Close upload modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isUploading) setIsDraggingOver(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDraggingOver(false);
                }}
                onDrop={handleDrop}
                onClick={() => {
                  if (!isUploading) fileInputRef.current?.click();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isUploading) {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDraggingOver
                    ? "border-[#80142b] bg-[#80142b]/8 scale-[1.01] shadow-inner"
                    : "border-[#c59b27]/60 bg-white/80 hover:border-[#80142b] hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 ${
                    isDraggingOver
                      ? "border-[#80142b] bg-[#80142b] text-[#f5d77f] scale-110"
                      : "border-[#d4af37]/40 bg-gradient-to-br from-[#80142b]/10 to-[#c59b27]/15 text-[#80142b] group-hover:scale-105"
                  }`}
                >
                  <FileImage className="h-8 w-8" />
                </div>

                <h3 className="mt-4 text-base font-bold text-[#1f040b]">
                  {isDraggingOver
                    ? `Drop photos here to add to ${activeCategory.title}`
                    : "Drag & drop parish photos here"}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  or click the button below to select multiple images from your device
                </p>

                <button
                  type="button"
                  disabled={isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#d4af37]/50 bg-gradient-to-r from-[#80142b] to-[#560b1a] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition hover:from-[#9e1c36] hover:to-[#6a0f21]"
                >
                  <Plus className="h-3.5 w-3.5 text-[#f5d77f]" />
                  <span>Browse Files</span>
                </button>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
                  <span className="rounded-md bg-[#faf7f2] px-2 py-0.5 border border-[#e7dec8] text-[#80142b] font-semibold">
                    JPG
                  </span>
                  <span className="rounded-md bg-[#faf7f2] px-2 py-0.5 border border-[#e7dec8] text-[#80142b] font-semibold">
                    JPEG
                  </span>
                  <span className="rounded-md bg-[#faf7f2] px-2 py-0.5 border border-[#e7dec8] text-[#80142b] font-semibold">
                    PNG
                  </span>
                  <span className="rounded-md bg-[#faf7f2] px-2 py-0.5 border border-[#e7dec8] text-[#80142b] font-semibold">
                    WEBP
                  </span>
                  <span>• Multiple files supported</span>
                </div>
              </div>

              {/* Upload Progress Indicator */}
              {isUploading && (
                <div className="rounded-2xl border border-[#d4af37]/50 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1f040b]">
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-[#80142b]" />
                      Uploading to {activeCategory.title}...
                    </span>
                    <span className="text-[#80142b]">{uploadProgress}%</span>
                  </div>
                  <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#faf7f2] border border-[#e7dec8]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#80142b] via-[#c59b27] to-[#80142b] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success / Error Notification Inside Modal */}
              {uploadNotification && (
                <div
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-xs sm:text-sm ${
                    uploadNotification.type === "success"
                      ? "border-emerald-300 bg-emerald-50/90 text-emerald-950"
                      : "border-red-300 bg-red-50/90 text-red-950"
                  }`}
                >
                  {uploadNotification.type === "success" ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  ) : (
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-700" />
                  )}
                  <div className="flex-1 font-medium">{uploadNotification.message}</div>
                  <button
                    type="button"
                    onClick={() => setUploadNotification(null)}
                    className="text-slate-400 hover:text-slate-700"
                    aria-label="Close message"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Selected Images Preview Grid Before Uploading */}
              {selectedFiles.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#80142b]">
                      Selected Photos ({selectedFiles.length})
                    </span>
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={handleClearAllSelected}
                        className="text-xs font-semibold text-slate-500 hover:text-red-700 transition"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {selectedFiles.map((item) => (
                      <div
                        key={item.id}
                        className="group relative flex items-center gap-3 rounded-2xl border border-[#e7dec8] bg-white p-2.5 shadow-2xs transition hover:border-[#c59b27]/60"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#1b0308]">
                          <img
                            src={item.previewUrl}
                            alt={item.customTitle || item.file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <input
                            type="text"
                            value={item.customTitle}
                            disabled={isUploading}
                            onChange={(e) => handleTitleChange(item.id, e.target.value)}
                            placeholder="Photo title..."
                            aria-label="Photo title"
                            className="w-full truncate rounded-lg border border-slate-200 bg-[#faf7f2] px-2.5 py-1 text-xs font-semibold text-[#1f040b] focus:border-[#80142b] focus:bg-white focus:outline-none"
                          />
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                            <span className="truncate max-w-[120px]">{item.file.name}</span>
                            <span>•</span>
                            <span>{formatBytes(item.file.size)}</span>
                          </div>
                        </div>

                        {!isUploading && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedFile(item.id)}
                            aria-label={`Remove ${item.file.name}`}
                            title="Remove image"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#e7dec8] bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-500">
                Target Album:{" "}
                <strong className="text-[#80142b]">{activeCategory.title}</strong>
              </span>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsUploadModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={selectedFiles.length === 0 || isUploading}
                  onClick={handleUploadSubmit}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#80142b] via-[#941933] to-[#6a0f21] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition hover:from-[#9e1c36] hover:to-[#560b1a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-[#f5d77f]" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5 text-[#f5d77f]" />
                      <span>
                        Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : "Photos"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

