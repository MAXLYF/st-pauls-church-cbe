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
    id: "altar-service",
    name: "Altar Service",
    category: "Liturgy",
    shortDescription:
      "A ministry of faithful service that assists in the celebration of the Holy Mass and supports the liturgical life of the parish.",
    coverImage: "/images/church-interior.jpg", // placeholder
    motto: "Faithful in service",
    about: {
      introduction: "The Altar Service ministry is dedicated to assisting the priest during the celebration of the Holy Mass and other liturgical services.",
      mission: "To serve at the altar with reverence, faith and dedication, and to help the congregation enter more deeply into worship.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "choir",
    name: "Choir",
    category: "Music",
    shortDescription:
      "A ministry that supports the parish community through sacred music, singing and joyful participation in worship.",
    coverImage: "/images/church-banner.jpg", // placeholder
    about: {
      introduction: "The Choir leads the congregation in sung prayer during Sunday Masses and special liturgical celebrations.",
      mission: "To praise God through the beauty of music and to lead the faithful in joyful worship.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "catechism",
    name: "Catechism",
    category: "Faith Formation",
    shortDescription:
      "A ministry dedicated to helping children and young people grow in Christian faith, knowledge and love.",
    coverImage: "/images/church-front.png", // placeholder
    about: {
      introduction: "The Catechism ministry provides formal religious education for children, preparing them for the sacraments and a lifelong journey of faith.",
      mission: "To form children and young people as disciples of Jesus Christ by teaching the Catholic faith.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "vbs",
    name: "VBS",
    category: "Children",
    shortDescription:
      "A faith-filled children's ministry focused on helping children discover and grow in their relationship with God through learning, prayer, creativity and fellowship.",
    coverImage: "/images/church-banner.jpg", // placeholder
    about: {
      introduction: "Vacation Bible School (VBS) is an exciting program for children to learn about the Bible and their faith in a fun, interactive environment.",
      mission: "To provide a fun and faithful environment where children can encounter Jesus through engaging activities, songs, and lessons.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "social-media-team",
    name: "Social Media Team",
    category: "Media",
    shortDescription:
      "A creative ministry that communicates parish activities, celebrations, events and messages through digital and social media.",
    coverImage: "/images/church-interior.jpg", // placeholder
    about: {
      introduction: "The Social Media Team helps the parish communicate its mission and events to the broader community using digital platforms.",
      mission: "To evangelize and connect our parish family through digital communication, sharing the joy of our parish life online.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
];
