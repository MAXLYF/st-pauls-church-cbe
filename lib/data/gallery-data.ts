export type GalleryCategoryId =
  | "church-exterior"
  | "church-interior"
  | "celebrations";

export type GalleryAspectRatio =
  | "tall"
  | "portrait"
  | "landscape"
  | "wide"
  | "square";

export interface GalleryPhoto {
  id: string;
  categoryId: GalleryCategoryId;
  src: string;
  title: string;
  caption?: string;
  /**
   * Optional editorial aspect ratio hint for Masonry View.
   * If omitted, the gallery automatically assigns a natural varied aspect ratio.
   */
  aspect?: GalleryAspectRatio;
  uploadedAt?: string;
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
      "Explore the sacred facade, twin bell towers, welcoming entrance arch, and illuminated exterior of St. Paul's Catholic Church, Rathinapuri.",
    coverImage:
      "/images/Parish_gallery/file_0000000056288210a2a3e65006865e4c.png"
  },
  {
    id: "church-interior",
    title: "Church Interior",
    label: "Worship",
    subtitle: "Sanctuary, Altar & Liturgical Space",
    description:
      "Step inside our sanctuary of prayer, featuring the high altar, crucifix, nave, and sacred moments of Eucharistic worship.",
    coverImage: "/images/Parish_gallery/614A2461.JPG"
  },
  {
    id: "celebrations",
    title: "Celebrations & Devotions",
    label: "Celebrations",
    subtitle: "Feast Days, Processions & Marian Grottos",
    description:
      "Moments of vibrant faith from Marian chariot processions, grotto devotions, and parish feast celebrations.",
    coverImage: "/images/Parish_gallery/614A1829.JPG"
  }
];

/**
 * Curated Parish Gallery Photographs from `public/images/Parish_gallery/`.
 *
 * HOW TO ADD NEW PHOTOS MANUALLY:
 * 1. Place your image file inside `public/images/Parish_gallery/`.
 * 2. Add an entry below (or let the gallery auto-discover new files placed in `public/images/Parish_gallery/`).
 */
export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  // ============================================================================
  // CHURCH EXTERIOR
  // ============================================================================
  {
    id: "parish-gallery-1",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/file_0000000056288210a2a3e65006865e4c.png",
    title: "St. Paul's Catholic Church Facade at Night",
    caption:
      "Warm golden illumination of the twin bell towers and main sanctuary entrance at Rathinapuri",
    aspect: "tall",
    uploadedAt: "2026-01-01T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-2",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/st-paul-s-church-rathinapuri-coimbatore-churches-61i7CShoD1.jpg",
    title: "Parish Entrance Arch & Twin Bell Towers",
    caption:
      "Welcome arch and white facade of St. Paul's Catholic Church, Rathinapuri, Coimbatore",
    aspect: "landscape",
    uploadedAt: "2026-01-02T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-3",
    categoryId: "church-interior",
    src: "/images/Parish_gallery/614A2461.JPG",
    title: "Main Sanctuary & High Altar",
    caption:
      "Inside the sanctuary during Holy Mass at St. Paul's Catholic Church",
    aspect: "tall",
    uploadedAt: "2026-01-03T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-4",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/614A1739.JPG",
    title: "Outdoor Liturgical Gathering at the Church Portico",
    caption:
      "Faithful gathered in prayer before the main portico of St. Paul's Catholic Church",
    aspect: "wide",
    uploadedAt: "2026-01-04T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-5",
    categoryId: "celebrations",
    src: "/images/Parish_gallery/614A1829.JPG",
    title: "Evening Marian Devotion at the Parish Grotto",
    caption:
      "Parishioners gathered for evening prayer before the illuminated Marian shrine and Calvary grotto",
    aspect: "landscape",
    uploadedAt: "2026-01-05T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-6",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/file_0000000012b88210a8c8aff7cd5d06a8.png",
    title: "Festival Illumination of St. Paul's Church",
    caption:
      "Twin bell towers and flagstaff adorned with festive lights during parish celebrations",
    aspect: "landscape",
    uploadedAt: "2026-01-06T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-7",
    categoryId: "celebrations",
    src: "/images/Parish_gallery/614A1751.JPG",
    title: "Decorated Marian Statue in Procession Palanquin",
    caption:
      "Our Lady adorned with floral garlands in the carved wooden palanquin",
    aspect: "tall",
    uploadedAt: "2026-01-07T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-8",
    categoryId: "church-interior",
    src: "/images/Parish_gallery/images.jpeg",
    title: "High Altar Adorned for Solemn Liturgy",
    caption:
      "Main altar and sanctuary decorated with fresh floral arrangements",
    aspect: "landscape",
    uploadedAt: "2026-01-08T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-9",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/614A1879.JPG",
    title: "Evening Gathering at the Illuminated Church Steps",
    caption:
      "Choir and faithful gathered at the church entrance beneath the glowing crosses",
    aspect: "portrait",
    uploadedAt: "2026-01-09T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-10",
    categoryId: "church-interior",
    src: "/images/Parish_gallery/StPaulsChurch-Rathinapuri-Coimbatore2.jpg",
    title: "Church Nave & Sanctuary Decorated for Feast",
    caption:
      "View along the central aisle towards the illuminated high altar",
    aspect: "wide",
    uploadedAt: "2026-01-10T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-11",
    categoryId: "church-interior",
    src: "/images/Parish_gallery/images (1).jpeg",
    title: "Sanctuary Crucifix & Tabernacle",
    caption:
      "The sanctuary crucifix, tabernacle, and floral decorations for liturgical celebration",
    aspect: "tall",
    uploadedAt: "2026-01-11T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-12",
    categoryId: "celebrations",
    src: "/images/Parish_gallery/614A1849.JPG",
    title: "Evening Marian Chariot Procession",
    caption:
      "Faithful accompanying the illuminated palanquin in solemn evening procession",
    aspect: "portrait",
    uploadedAt: "2026-01-12T00:00:00.000Z",
    isDefault: true
  },
  {
    id: "parish-gallery-13",
    categoryId: "church-exterior",
    src: "/images/Parish_gallery/images (2).jpeg",
    title: "Night View of Festive Church Illumination",
    caption:
      "St. Paul's Catholic Church glowing in festive lights during evening celebrations",
    aspect: "landscape",
    uploadedAt: "2026-01-13T00:00:00.000Z",
    isDefault: true
  }
];
