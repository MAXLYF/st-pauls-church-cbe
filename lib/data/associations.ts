export type MinistryCategory =
  | "Liturgy"
  | "Music"
  | "Faith Formation"
  | "Children"
  | "Media"
  | "Youth"
  | "Service"
  | "Prayer"
  | "Fellowship"
  | "Other";

export type Ministry = {
  id: string; // The slug, e.g. 'altar-service'
  name: string;
  category: MinistryCategory;
  shortDescription: string;
  coverImage: string; // URL path, e.g. '/images/ministries/altar-service.jpg'
  logo?: string;
  motto?: string;
  establishedYear?: number | null;

  about: {
    introduction: string;
    mission: string;
    vision?: string;
    whoCanJoin?: string;
    responsibilities?: string[];
  };

  leadership: {
    coordinator?: string;
    assistantCoordinator?: string;
    spiritualDirector?: string;
    members?: { name: string; role: string; photo?: string }[];
  };

  activities: {
    title: string;
    description: string;
    icon?: string;
  }[];

  schedule: {
    meetingDay?: string;
    meetingTime?: string;
    location?: string;
    practiceTime?: string;
    trainingTime?: string;
  };

  upcomingEvents?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image?: string;
    registerLink?: string;
  }[];

  gallery?: string[];
  videos?: { url: string; title?: string }[];
  youtubeLinks?: { url: string; title?: string }[];

  contact?: {
    person?: string;
    phone?: string;
    email?: string;
  };
};

export const ministries: Ministry[] = [
  {
    id: "main-choir",
    name: "Main Choir",
    category: "Music",
    shortDescription:
      "The primary liturgical music ministry that leads the congregation in prayerful singing during Mass and major parish celebrations.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Main Choir is the central music ministry of St. Paul's Church, leading the parish in worship through sacred song and beautiful liturgical music.",
      mission:
        "To glorify God and enrich the celebration of the Mass through joyful, reverent, and prayerful singing.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "youth-choir",
    name: "Youth Choir",
    category: "Music",
    shortDescription:
      "A vibrant choir ministry that helps young parishioners participate actively in worship through music and faith-filled singing.",
    coverImage: "/images/church-interior.jpg",
    about: {
      introduction:
        "The Youth Choir empowers young members of the parish to share their musical gifts in service of the Church and the liturgical life of the community.",
      mission:
        "To nurture youth in faith and worship through music, discipleship, and joyful participation in parish celebrations.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "kids-choir",
    name: "Kids Choir",
    category: "Music",
    shortDescription:
      "A joyful music ministry for children that helps them grow in faith, prayer, and love for sacred music.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Kids Choir provides children with a welcoming space to sing, pray, and celebrate their faith through music in a joyful and nurturing environment.",
      mission:
        "To help children develop a love for worship, music, and Christian community while growing in faith and confidence.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "boys-youth-commission",
    name: "Boys Youth Commission",
    category: "Youth",
    shortDescription:
      "A youth formation and service ministry helping boys grow in faith, leadership, and commitment to the Church.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Boys Youth Commission is a faith-filled community for young boys to grow in prayer, values, and active Christian leadership.",
      mission:
        "To form young boys into responsible, prayerful, and service-oriented disciples of Jesus Christ.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "girls-youth-commission",
    name: "Girls Youth Commission",
    category: "Youth",
    shortDescription:
      "A faith-centered youth ministry that helps girls grow in holiness, leadership, and service to the parish and community.",
    coverImage: "/images/church-interior.jpg",
    about: {
      introduction:
        "The Girls Youth Commission encourages young girls to live out their faith with courage, compassion, and a strong sense of Christian identity.",
      mission:
        "To empower young girls through prayer, formation, leadership, and active witness to the Gospel.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
];

export function getAllMinistries(): Ministry[] {
  return ministries;
}

export function getMinistryBySlug(slug: string): Ministry | undefined {
  return ministries.find((ministry) => ministry.id === slug);
}

export function getMinistryCategories(): MinistryCategory[] {
  const categories = new Set(ministries.map((ministry) => ministry.category));
  return Array.from(categories);
}
