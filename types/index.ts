export type ParishEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  description?: string;
  imageUrl?: string;
  published: boolean;
};

export type MassTiming = {
  id: string;
  day: string;
  time: string;
  title: string;
  active: boolean;
};

export type Pastor = {
  id: string;
  name: string;
  startYear: number;
  endYear: number | null;
  displayPeriod: string;
  role: string;
  image: string;
  photo?: string;
  photoUrl?: string;
  description?: string;
  biography?: string;
  order?: number;
  published?: boolean;
};

export type SonOfParish = {
  id: string;
  name: string;
  title?: "Rev. Fr." | "Rev. Sis." | string;
  type?: "Priestly Vocation" | "Religious Vocation" | string;
  vocation?: string;
  photo?: string;
  photoUrl?: string;
  ordained?: string | number;
  ordinationYear?: string | number;
  profession?: string | number;
  professionYear?: string | number;
  congregation?: string;
  diocese?: string;
  ministry?: string;
  currentService?: string;
  previousService?: string;
  parishConnection?: string;
  about?: string;
  description?: string;
  biography?: string;
  order?: number;
  published?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ParishVocation = SonOfParish;

export type PrayerResourceType =
  | "novena"
  | "bible"
  | "prayer"
  | "hymn"
  | "rosary"
  | "devotional";

export type PrayerResourceLanguage = "English" | "Tamil" | "All";

export type PrayerResource = {
  id: string;
  slug: string;
  type: PrayerResourceType;
  title: string;
  description: string;
  category?: string;
  content?: string;
  coverImage?: string;
  language: "English" | "Tamil";
  audioUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  pdfUrl?: string;
  feastDay?: string;
  startDate?: string;
  endDate?: string;
  daysCount?: number;
  duration?: string;
  reference?: string;
  lyrics?: string;
  published: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type DailyReflection = {
  title: string;
  verse?: string;
  reference?: string;
  content: string;
  date?: string;
  author?: string;
};

export type RosaryMystery = {
  id: string;
  name: string;
  tamilName?: string;
  day: string;
  description: string;
  mysteries: {
    number: number;
    title: string;
    scriptureRef?: string;
    fruitOfMystery?: string;
  }[];
};


