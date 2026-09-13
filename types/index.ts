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
