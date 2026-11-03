export type GalleryCategoryId = "church-exterior" | "church-interior";

export interface GalleryPhoto {
  id: string;
  categoryId: GalleryCategoryId;
  src: string;
  title: string;
  caption?: string;
  uploadedAt: string;
  fileName?: string;
  fileSize?: number;
  isDefault?: boolean;
}

export interface GalleryCategory {
  id: GalleryCategoryId;
  title: string;
  label: string;
  subtitle: string;
  description: string;
  coverImage: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: "church-exterior",
    title: "Church Exterior",
    label: "Church",
    subtitle: "Architecture & Sacred Grounds",
    description:
      "Explore the sacred facade, bell towers, courtyard, and architectural heritage of St. Paul's Catholic Church, Rathinapuri.",
    coverImage: "/images/church-front.png"
  },
  {
    id: "church-interior",
    title: "Church Interior",
    label: "Worship",
    subtitle: "Sanctuary, Altar & Liturgical Space",
    description:
      "Step inside our sanctuary of prayer, featuring the main altar, nave, stained glass, and sacred moments of Eucharistic worship.",
    coverImage: "/images/church-interior.jpg"
  }
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "default-exterior-1",
    categoryId: "church-exterior",
    src: "/images/church-front.png",
    title: "St. Paul's Catholic Church Exterior",
    caption: "Front facade and twin bell towers of St. Paul's Catholic Church, Rathinapuri",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "default-interior-1",
    categoryId: "church-interior",
    src: "/images/church-interior.jpg",
    title: "Main Sanctuary & Altar",
    caption: "Inside the sanctuary prepared for Holy Mass and community worship",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    isDefault: true
  }
];

