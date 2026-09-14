// ─────────────────────────────────────────────────────────────────────────────
// Ministry data types — Firebase-ready
// Each field maps 1:1 to a Firestore document field.
// ─────────────────────────────────────────────────────────────────────────────

export type MinistryCategory =
  | "Liturgy"
  | "Music"
  | "Faith Formation"
  | "Children"
  | "Media"
  | "Youth"
  | "Service"
  | "Prayer"
  | "Fellowship";

export type Ministry = {
  id: string;               // Firestore document ID / URL slug
  name: string;
  category: MinistryCategory;
  shortDescription: string;
  coverImage: string;       // path relative to /public or Firebase Storage URL
  logo: string;
  motto: string;
  establishedYear: number | null;
  published: boolean;

  about: {
    introduction: string;
    mission: string;
    vision: string;
    whoCanJoin: string;
    responsibilities: string[];
  };

  leadership: {
    coordinator: string;
    assistantCoordinator: string;
    spiritualDirector: string;
    members: { name: string; role: string; photo: string }[];
  };

  activities: { title: string; description: string; icon: string }[];

  schedule: {
    meetingDay: string;
    meetingTime: string;
    location: string;
    practiceTime: string;
    trainingTime: string;
  };

  upcomingActivities: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }[];

  gallery: string[];   // image paths or URLs
  videos: string[];    // embed URLs
  youtubeLinks: string[];

  contact: {
    person: string;
    phone: string;
    email: string;
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Static data — replace with Firestore fetch when Firebase is connected
// ─────────────────────────────────────────────────────────────────────────────

export const ministriesData: Ministry[] = [
  {
    id: "altar-service",
    name: "Altar Service",
    category: "Liturgy",
    shortDescription:
      "A ministry of faithful service that assists in the celebration of the Holy Mass and supports the liturgical life of the parish.",
    coverImage: "/images/ministries/altar-service.jpg",
    logo: "",
    motto: "",
    establishedYear: null,
    published: true,

    about: {
      introduction:
        "The Altar Service ministry plays a vital and honoured role in the celebration of the Holy Mass and other liturgical services at St. Paul's Church. Altar servers serve with reverence and dedication, supporting the priest at the altar and helping to create a spirit of worship and prayerful participation in the congregation.",
      mission:
        "To serve the parish faithfully at the altar, assisting in the dignified celebration of the Holy Eucharist and all liturgical ceremonies.",
      vision:
        "To form a devoted community of servers who grow in faith, reverence and a deep love for the Holy Mass through their ministry.",
      whoCanJoin:
        "Young men and women who have received their First Holy Communion are welcome to join the Altar Service ministry.",
      responsibilities: [
        "Assisting the priest at the altar during Holy Mass",
        "Carrying the cross and candles in processions",
        "Preparing and arranging liturgical items before Mass",
        "Serving at special liturgical celebrations, feast days and Holy Week services",
        "Attending regular training and formation sessions",
      ],
    },

    leadership: {
      coordinator: "",
      assistantCoordinator: "",
      spiritualDirector: "",
      members: [],
    },

    activities: [],
    schedule: { meetingDay: "", meetingTime: "", location: "", practiceTime: "", trainingTime: "" },
    upcomingActivities: [],
    gallery: [],
    videos: [],
    youtubeLinks: [],
    contact: { person: "", phone: "", email: "" },
  },

  {
    id: "choir",
    name: "Choir",
    category: "Music",
    shortDescription:
      "A ministry that supports the parish community through sacred music, singing and joyful participation in worship.",
    coverImage: "/images/ministries/choir.jpg",
    logo: "",
    motto: "",
    establishedYear: null,
    published: true,

    about: {
      introduction:
        "The Choir ministry of St. Paul's Church enriches the celebration of the Holy Mass and all parish liturgies through sacred music and song. The choir leads the congregation in prayerful worship, lifting hearts and minds to God through music.",
      mission:
        "To glorify God through sacred music and to lead the parish community in meaningful, prayerful and joyful worship.",
      vision:
        "To build a skilled and faith-filled choir that enhances every liturgical celebration and draws the parish closer to God through the gift of music.",
      whoCanJoin:
        "Any parishioner who loves sacred music and wishes to dedicate their musical gifts to the service of the parish is welcome to join.",
      responsibilities: [
        "Leading the congregation in singing during Holy Mass",
        "Preparing and rehearsing sacred music for liturgical celebrations",
        "Singing at special Masses, feast days, Holy Week and parish events",
        "Learning new hymns and liturgical music",
        "Attending regular choir rehearsals",
      ],
    },

    leadership: {
      coordinator: "",
      assistantCoordinator: "",
      spiritualDirector: "",
      members: [],
    },

    activities: [],
    schedule: { meetingDay: "", meetingTime: "", location: "", practiceTime: "", trainingTime: "" },
    upcomingActivities: [],
    gallery: [],
    videos: [],
    youtubeLinks: [],
    contact: { person: "", phone: "", email: "" },
  },

  {
    id: "catechism",
    name: "Catechism",
    category: "Faith Formation",
    shortDescription:
      "A ministry dedicated to helping children and young people grow in Christian faith, knowledge and love.",
    coverImage: "/images/ministries/catechism.jpg",
    logo: "",
    motto: "",
    establishedYear: null,
    published: true,

    about: {
      introduction:
        "The Catechism ministry at St. Paul's Church is committed to nurturing the faith of children and young people through systematic religious education. Catechism classes provide a foundation in Catholic teaching, prayer, the sacraments and Christian living.",
      mission:
        "To teach, form and inspire children and youth in the Catholic faith, preparing them to live as disciples of Jesus Christ.",
      vision:
        "To create a vibrant faith formation programme that equips young parishioners with a living knowledge of their Catholic faith and a personal relationship with God.",
      whoCanJoin:
        "Children and young people who are preparing to receive the sacraments or who wish to grow deeper in their Catholic faith are welcome.",
      responsibilities: [
        "Teaching Catholic doctrine, scripture and prayer",
        "Preparing children for the sacraments of First Communion and Confirmation",
        "Organising faith formation activities and events",
        "Accompanying young people in their spiritual journey",
        "Collaborating with parents and the parish clergy",
      ],
    },

    leadership: {
      coordinator: "",
      assistantCoordinator: "",
      spiritualDirector: "",
      members: [],
    },

    activities: [],
    schedule: { meetingDay: "", meetingTime: "", location: "", practiceTime: "", trainingTime: "" },
    upcomingActivities: [],
    gallery: [],
    videos: [],
    youtubeLinks: [],
    contact: { person: "", phone: "", email: "" },
  },

  {
    id: "vbs",
    name: "VBS",
    category: "Children",
    shortDescription:
      "A faith-filled children's ministry focused on helping children discover and grow in their relationship with God through learning, prayer, creativity and fellowship.",
    coverImage: "/images/ministries/vbs.jpg",
    logo: "",
    motto: "",
    establishedYear: null,
    published: true,

    about: {
      introduction:
        "Vacation Bible School (VBS) is a joyful and energetic children's programme at St. Paul's Church that brings children together for days filled with faith, fun, creativity and prayer. VBS is a highlight of the parish year for children and families.",
      mission:
        "To introduce children to the love of God through engaging, age-appropriate programmes that combine faith, fun, creativity and community.",
      vision:
        "To be a welcoming space where every child experiences the joy of knowing God and leaves with a deeper faith and lasting friendships.",
      whoCanJoin:
        "Children of the parish and surrounding community are welcome to participate in VBS programmes.",
      responsibilities: [
        "Planning and organising annual VBS programmes",
        "Creating faith-based activities, crafts and games",
        "Teaching children about Jesus, the Bible and prayer",
        "Providing a safe, joyful and welcoming environment",
        "Coordinating with parish leadership and volunteers",
      ],
    },

    leadership: {
      coordinator: "",
      assistantCoordinator: "",
      spiritualDirector: "",
      members: [],
    },

    activities: [],
    schedule: { meetingDay: "", meetingTime: "", location: "", practiceTime: "", trainingTime: "" },
    upcomingActivities: [],
    gallery: [],
    videos: [],
    youtubeLinks: [],
    contact: { person: "", phone: "", email: "" },
  },

  {
    id: "social-media-team",
    name: "Social Media Team",
    category: "Media",
    shortDescription:
      "A creative ministry that communicates parish activities, celebrations, events and messages through digital and social media.",
    coverImage: "/images/ministries/social-media-team.jpg",
    logo: "",
    motto: "",
    establishedYear: null,
    published: true,

    about: {
      introduction:
        "The Social Media Team at St. Paul's Church is a creative and dedicated group that helps the parish communicate with its community through digital platforms. From sharing Mass schedules and parish news to celebrating special feast days online, the team brings the parish closer together in the digital space.",
      mission:
        "To proclaim the Good News and connect the parish community through faithful, creative and impactful digital communications.",
      vision:
        "To make the digital presence of St. Paul's Church a place of encounter with faith, community and the love of God.",
      whoCanJoin:
        "Parishioners with a passion for communication, creativity, photography, video or social media are welcome to serve on the team.",
      responsibilities: [
        "Managing parish social media platforms",
        "Creating and publishing faith-based digital content",
        "Photographing and videographing parish events and celebrations",
        "Designing digital posters, banners and announcements",
        "Keeping the parish community informed and connected",
      ],
    },

    leadership: {
      coordinator: "",
      assistantCoordinator: "",
      spiritualDirector: "",
      members: [],
    },

    activities: [],
    schedule: { meetingDay: "", meetingTime: "", location: "", practiceTime: "", trainingTime: "" },
    upcomingActivities: [],
    gallery: [],
    videos: [],
    youtubeLinks: [],
    contact: { person: "", phone: "", email: "" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Return only published ministries (matches future Firestore query) */
export function getAllMinistries(): Ministry[] {
  return ministriesData.filter((m) => m.published);
}

/** Find a ministry by its slug / id */
export function getMinistryBySlug(slug: string): Ministry | undefined {
  return ministriesData.find((m) => m.id === slug && m.published);
}

/** All unique categories present in published ministries */
export function getMinistryCategories(): MinistryCategory[] {
  const cats = new Set(getAllMinistries().map((m) => m.category));
  return Array.from(cats);
}
