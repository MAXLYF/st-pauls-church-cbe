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
    id: "society-of-saint-vincent-de-paul",
    name: "Society of Saint Vincent de Paul",
    category: "Service",
    shortDescription:
      "A parish service ministry that reaches out to the poor, sick, and vulnerable with compassion and practical care.",
    coverImage: "/images/church-banner.jpg",
    motto: "Serve with love and dignity",
    about: {
      introduction:
        "The Society of Saint Vincent de Paul at St. Paul's Catholic Church serves the poor and needy with compassion, dignity, and Christian charity.",
      mission:
        "To visit, comfort, and support those in need through acts of charity, prayer, and practical assistance.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "st-pauls-resurrection-club",
    name: "St. Paul's Resurrection Club",
    category: "Fellowship",
    shortDescription:
      "A faith-filled fellowship that promotes prayer, togetherness, and Christian service among parish members.",
    coverImage: "/images/church-interior.jpg",
    about: {
      introduction:
        "The St. Paul's Resurrection Club brings parish members together in prayer, friendship, and service, helping them grow in faith and community life.",
      mission:
        "To strengthen the spiritual life of parishioners through fellowship, support, and meaningful service to the Church.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "christian-family-movement",
    name: "Christian Family Movement",
    category: "Fellowship",
    shortDescription:
      "A family-oriented movement that encourages faith, unity, and shared Christian life in everyday family living.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Christian Family Movement offers families a setting to grow together in faith, love, and Christian values through reflection, community, and service.",
      mission:
        "To nurture strong Christian families rooted in prayer, mutual support, and witness to the Gospel.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "catholic-association",
    name: "Catholic Association",
    category: "Fellowship",
    shortDescription:
      "A Catholic association dedicated to faith formation, fellowship, and active participation in parish life.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Catholic Association at St. Paul's Church helps members grow in faith while fostering a spirit of unity, service, and Christian witness.",
      mission:
        "To inspire committed Catholic living through prayer, formation, and community-building activities.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "our-lady-of-good-health-welfare-social-service-association",
    name: "Our Lady of Good Health Welfare/Social Service Association",
    category: "Service",
    shortDescription:
      "A social service ministry focused on welfare outreach, support, and compassionate care for the needy.",
    coverImage: "/images/church-interior.jpg",
    about: {
      introduction:
        "This association serves the needy and underprivileged through practical care, support, and outreach inspired by the compassion of Our Lady of Good Health.",
      mission:
        "To bring hope, care, and material support to families and individuals in need through acts of charity and service.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "saint-veronica-womens-commission",
    name: "Saint Veronica Women's Commission",
    category: "Prayer",
    shortDescription:
      "A women's prayer and service commission that empowers women to live out faith through prayer, fellowship, and action.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Saint Veronica Women's Commission is a faith community for women who seek to grow in holiness, serve the Church, and support one another in prayer.",
      mission:
        "To strengthen women in faith, encourage prayerful living, and empower service in the parish community.",
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
      "A ministry that supports the parish community through sacred music, singing, and joyful participation in worship.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Choir leads the congregation in sung prayer during Sunday Masses and special liturgical celebrations.",
      mission:
        "To praise God through the beauty of music and to lead the faithful in joyful worship.",
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
      "A ministry dedicated to helping children and young people grow in Christian faith, knowledge, and love.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Catechism ministry provides formal religious education for children, preparing them for the sacraments and a lifelong journey of faith.",
      mission:
        "To form children and young people as disciples of Jesus Christ by teaching the Catholic faith.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "altar-services",
    name: "Altar Services",
    category: "Liturgy",
    shortDescription:
      "A liturgical ministry assisting in the celebration of the Holy Mass and reverent parish worship.",
    coverImage: "/images/church-interior.jpg",
    motto: "Faithful in service",
    about: {
      introduction:
        "The Altar Services ministry is dedicated to assisting the priest during the celebration of the Holy Mass and other liturgical services.",
      mission:
        "To serve at the altar with reverence, faith, and dedication, helping the congregation enter more deeply into worship.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "youth-commission",
    name: "Youth Commission",
    category: "Youth",
    shortDescription:
      "A ministry that energizes and supports young parishioners through faith, leadership, and holistic formation.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Youth Commission helps young people remain active in the life of the parish through faith formation, social engagement, and service.",
      mission:
        "To form young Catholics into joyful disciples who live their faith with confidence and responsibility.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "secular-franciscan-order",
    name: "Secular Franciscan Order",
    category: "Prayer",
    shortDescription:
      "A prayerful Franciscan fraternity living the Gospel through simplicity, peace, and service to others.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Secular Franciscan Order is a Franciscan spiritual family that seeks to live the Gospel in everyday life through prayer, fraternity, and service.",
      mission:
        "To follow the example of Saint Francis by living in simplicity, justice, and love for all creation.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "st-sebastian-association",
    name: "St. Sebastian Association",
    category: "Service",
    shortDescription:
      "A ministry dedicated to caring for the sick, the elderly, and those in need with compassion and support.",
    coverImage: "/images/church-interior.jpg",
    about: {
      introduction:
        "The St. Sebastian Association supports the sick and vulnerable through prayer, care, and acts of Christian hospitality.",
      mission:
        "To serve the suffering with compassion, encouragement, and practical help rooted in Christ's love.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "legion-of-mary-mirror-of-justice",
    name: "Legion of Mary - Mirror of Justice",
    category: "Prayer",
    shortDescription:
      "A Marian prayer ministry devoted to evangelization, visitation, and spiritual service in the parish and beyond.",
    coverImage: "/images/church-banner.jpg",
    about: {
      introduction:
        "The Legion of Mary - Mirror of Justice is a prayer and apostolic group committed to evangelization and service in the spirit of Mary.",
      mission:
        "To spread devotion to Mary and support the Church through prayer, works of charity, and outreach.",
    },
    leadership: {},
    activities: [],
    schedule: {},
  },
  {
    id: "legion-of-mary-mother-of-the-church",
    name: "Legion of Mary - Mother of the Church",
    category: "Prayer",
    shortDescription:
      "A Marian prayer group centered on communion, spiritual growth, and faithful service to the parish community.",
    coverImage: "/images/church-front.png",
    about: {
      introduction:
        "The Legion of Mary - Mother of the Church calls members to deeper prayer, apostolic activity, and service inspired by the love of Mary.",
      mission:
        "To foster holiness and evangelization through prayerful devotion to Mary and active participation in parish life.",
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
