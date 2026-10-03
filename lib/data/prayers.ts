import {
  DailyReflection,
  PrayerResource,
  PrayerResourceType,
  RosaryMystery
} from "@/types";

export interface ResourceCategoryMeta {
  id: PrayerResourceType;
  name: string;
  subtitle: string;
  description: string;
  iconName: "Calendar" | "BookOpen" | "Heart" | "Music" | "CircleDot" | "Sparkles";
  badgeText: string;
  sectionId: string;
}

export const resourceCategories: ResourceCategoryMeta[] = [
  {
    id: "novena",
    name: "NOVENA",
    subtitle: "9 Days of Devotion",
    description: "Novena prayers, feast day petitions, and parish devotional novenas.",
    iconName: "Calendar",
    badgeText: "Devotions",
    sectionId: "novena-section"
  },
  {
    id: "bible",
    name: "BIBLE",
    subtitle: "The Word of God",
    description: "Daily scripture readings, Gospel reflections, and biblical studies.",
    iconName: "BookOpen",
    badgeText: "Scripture",
    sectionId: "bible-section"
  },
  {
    id: "prayer",
    name: "PRAYERS",
    subtitle: "Daily & Occasional",
    description: "Traditional Catholic prayers for morning, evening, family, and healing.",
    iconName: "Heart",
    badgeText: "Prayers",
    sectionId: "prayers-section"
  },
  {
    id: "hymn",
    name: "HYMNS & SONGS",
    subtitle: "Liturgical Chants",
    description: "Parish choir hymns, Tamil and English worship songs, and audio tracks.",
    iconName: "Music",
    badgeText: "Choir & Music",
    sectionId: "hymns-section"
  },
  {
    id: "rosary",
    name: "ROSARY",
    subtitle: "The Holy Rosary",
    description: "Meditations on the Joyful, Sorrowful, Glorious, and Luminous Mysteries.",
    iconName: "CircleDot",
    badgeText: "Marian Devotion",
    sectionId: "rosary-section"
  },
  {
    id: "devotional",
    name: "DEVOTIONALS",
    subtitle: "Spiritual Growth",
    description: "Stations of the Cross, Eucharistic adoration, and saint guides.",
    iconName: "Sparkles",
    badgeText: "Spiritual Life",
    sectionId: "devotionals-section"
  }
];

export const prayerCategoriesList = [
  { id: "morning", name: "Morning Prayer", tamilName: "காலை ஜெபம்", icon: "Sun", count: 0 },
  { id: "evening", name: "Evening Prayer", tamilName: "மாலை ஜெபம்", icon: "Moon", count: 0 },
  { id: "family", name: "Family Prayer", tamilName: "குடும்ப ஜெபம்", icon: "Users", count: 0 },
  { id: "sick", name: "Prayer for the Sick", tamilName: "நோயாளிகளுக்கான ஜெபம்", icon: "Cross", count: 0 },
  { id: "peace", name: "Prayer for Peace", tamilName: "அமைதிக்கான ஜெபம்", icon: "Shield", count: 0 },
  { id: "before-mass", name: "Prayer Before Mass", tamilName: "திருப்பலிக்கு முன்", icon: "Book", count: 0 },
  { id: "after-mass", name: "Prayer After Mass", tamilName: "திருப்பலிக்கு பின்", icon: "Sparkles", count: 0 },
  { id: "special", name: "Special Intentions", tamilName: "சிறப்பு மன்றாட்டுகள்", icon: "Heart", count: 0 }
];

export const rosaryMysteriesList: RosaryMystery[] = [
  {
    id: "joyful",
    name: "Joyful Mysteries",
    tamilName: "மகிழ்ச்சி மறை உண்மைகள்",
    day: "Mondays & Saturdays",
    description: "Meditating on the Annunciation, Visitation, Nativity, Presentation, and Finding in the Temple.",
    mysteries: [
      { number: 1, title: "The Annunciation to Mary", scriptureRef: "Luke 1:26-38", fruitOfMystery: "Humility" },
      { number: 2, title: "The Visitation of Mary to Elizabeth", scriptureRef: "Luke 1:39-56", fruitOfMystery: "Love of Neighbor" },
      { number: 3, title: "The Nativity of Jesus in Bethlehem", scriptureRef: "Luke 2:1-20", fruitOfMystery: "Poverty of Spirit" },
      { number: 4, title: "The Presentation of Jesus in the Temple", scriptureRef: "Luke 2:22-38", fruitOfMystery: "Obedience" },
      { number: 5, title: "The Finding of the Child Jesus in the Temple", scriptureRef: "Luke 2:41-52", fruitOfMystery: "Joy in finding Jesus" }
    ]
  },
  {
    id: "sorrowful",
    name: "Sorrowful Mysteries",
    tamilName: "துயர மறை உண்மைகள்",
    day: "Tuesdays & Fridays",
    description: "Contemplating the Agony in the Garden, Scourging, Crowning with Thorns, Carrying of the Cross, and Crucifixion.",
    mysteries: [
      { number: 1, title: "The Agony in the Garden", scriptureRef: "Matthew 26:36-46", fruitOfMystery: "Sorrow for Sin" },
      { number: 2, title: "The Scourging at the Pillar", scriptureRef: "Matthew 27:26", fruitOfMystery: "Purity & Mortification" },
      { number: 3, title: "The Crowning with Thorns", scriptureRef: "Matthew 27:27-31", fruitOfMystery: "Moral Courage" },
      { number: 4, title: "The Carrying of the Cross", scriptureRef: "Luke 23:26-32", fruitOfMystery: "Patience" },
      { number: 5, title: "The Crucifixion and Death of Our Lord", scriptureRef: "Luke 23:33-46", fruitOfMystery: "Perseverance & Salvation" }
    ]
  },
  {
    id: "glorious",
    name: "Glorious Mysteries",
    tamilName: "மகிமை மறை உண்மைகள்",
    day: "Wednesdays & Sundays",
    description: "Rejoicing in the Resurrection, Ascension, Descent of the Holy Spirit, Assumption, and Coronation of Mary.",
    mysteries: [
      { number: 1, title: "The Resurrection of Jesus Christ", scriptureRef: "Mark 16:1-8", fruitOfMystery: "Faith" },
      { number: 2, title: "The Ascension of Jesus into Heaven", scriptureRef: "Acts 1:9-11", fruitOfMystery: "Hope" },
      { number: 3, title: "The Descent of the Holy Spirit upon the Apostles", scriptureRef: "Acts 2:1-4", fruitOfMystery: "Love of God" },
      { number: 4, title: "The Assumption of the Blessed Virgin Mary", scriptureRef: "Revelation 12:1", fruitOfMystery: "Grace of a Holy Death" },
      { number: 5, title: "The Coronation of Mary as Queen of Heaven and Earth", scriptureRef: "Revelation 12:1", fruitOfMystery: "Trust in Mary's Intercession" }
    ]
  },
  {
    id: "luminous",
    name: "Luminous Mysteries",
    tamilName: "ஒளி மறை உண்மைகள்",
    day: "Thursdays",
    description: "Reflecting on the Baptism in the Jordan, Wedding at Cana, Proclamation of the Kingdom, Transfiguration, and Institution of the Eucharist.",
    mysteries: [
      { number: 1, title: "The Baptism of Jesus in the Jordan", scriptureRef: "Matthew 3:13-17", fruitOfMystery: "Openness to the Holy Spirit" },
      { number: 2, title: "The Wedding at Cana", scriptureRef: "John 2:1-12", fruitOfMystery: "To Jesus through Mary" },
      { number: 3, title: "The Proclamation of the Kingdom of God", scriptureRef: "Mark 1:14-15", fruitOfMystery: "Repentance & Trust in God" },
      { number: 4, title: "The Transfiguration", scriptureRef: "Matthew 17:1-8", fruitOfMystery: "Desire for Holiness" },
      { number: 5, title: "The Institution of the Holy Eucharist", scriptureRef: "Matthew 26:26-29", fruitOfMystery: "Eucharistic Adoration" }
    ]
  }
];

export const devotionalTopics = [
  {
    id: "stations-of-cross",
    title: "Way of the Cross",
    tamilTitle: "சிலுவைப் பாதை",
    description: "The 14 traditional stations commemorating the Passion of Jesus Christ.",
    icon: "Cross"
  },
  {
    id: "eucharistic-adoration",
    title: "Eucharistic Adoration",
    tamilTitle: "நற்கருணை ஆராதனை",
    description: "Devotional guides and litanies for silent prayer before the Blessed Sacrament.",
    icon: "Sun"
  },
  {
    id: "saints-feast-days",
    title: "Saints & Feast Day Prayers",
    tamilTitle: "புனிதர்களின் திருநாள் ஜெபங்கள்",
    description: "Patronal feast prayers and intercessions of St. Paul and the holy saints.",
    icon: "Sparkles"
  },
  {
    id: "catholic-teachings",
    title: "Catholic Faith & Catechism",
    tamilTitle: "கத்தோலிக்க மறைக்கல்வி",
    description: "Foundational teachings, creeds, commandments, and sacraments guidance.",
    icon: "BookOpen"
  }
];

// Initial placeholder reflection (empty by default as requested)
export const initialDailyReflection: DailyReflection = {
  title: "",
  content: "",
  reference: "",
  date: ""
};

// Initial empty resources list - to be populated via admin dashboard / Firestore
export const initialPrayerResources: PrayerResource[] = [];
