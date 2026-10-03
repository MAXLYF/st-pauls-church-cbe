import { ParishEvent } from "@/types";
import { db, firebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export const initialParishEvents: ParishEvent[] = [
  {
    id: "event-feast-2026",
    title: "Annual Parish Feast & Flag Hoisting Ceremony",
    category: "FEAST",
    date: "2026-10-11",
    time: "6:00 AM & 5:30 PM",
    location: "St. Paul's Church Sanctuary & Campus, Rathinapuri",
    description: "Join our annual parish feast day honoring our patron saint, St. Paul. Highlights include solemn Eucharistic celebrations, flag hoisting, car procession, and fellowship feast.",
    longDescription: "The annual feast of St. Paul's Church is the spiritual pinnacle of our parish calendar. Celebrations commence with the ceremonial flag hoisting, followed by nine days of novena masses leading up to the grand feast day. All parishioners, guests, and neighboring communities are cordially invited to participate in the solemn Holy Mass presided over by dignitaries from the diocese, followed by the colorful grand car procession around Rathinapuri.",
    image: "/images/events/feast-celebration.jpg",
    imageUrl: "/images/events/feast-celebration.jpg",
    featured: true,
    registrationUrl: "https://stpaulschurchcbe.org/events/register/feast",
    contactPerson: "Parish Office",
    contactPhone: "+91 422 252 0000",
    published: true
  },
  {
    id: "event-novena-mass",
    title: "Novena & Special Holy Mass for Divine Grace",
    category: "NOVENA",
    date: "2026-08-24",
    time: "5:45 PM Rosary & Novena | 6:30 PM Mass",
    location: "Main Church Altar, Rathinapuri",
    description: "Solemn Novena prayers to St. Paul accompanied by special intentions for sick parishioners, families, and student blessings.",
    longDescription: "A solemn evening of prayer, Eucharistic devotion, and intercessory Novena prayers. We invite all faithful to bring their intentions, family petitions, and thanksgiving prayers to the feet of the Lord.",
    image: "/images/events/novena-mass.jpg",
    imageUrl: "/images/events/novena-mass.jpg",
    featured: false,
    contactPerson: "Parish Priest",
    contactPhone: "+91 422 252 0000",
    published: true
  },
  {
    id: "event-youth-rally",
    title: "Youth Ministry Faith & Fellowship Night",
    category: "YOUTH",
    date: "2026-08-30",
    time: "4:00 PM - 7:30 PM",
    location: "St. Paul's Parish Community Hall",
    description: "An inspiring gathering for parish youth featuring praise & worship music, inspirational talks, career guidance, and fun team activities.",
    longDescription: "Organized by St. Paul's Youth Association, this gathering brings together young men and women of our parish for an uplifting evening of contemporary praise music, interactive workshops on navigating modern faith, and building strong parish friendships.",
    image: "/images/events/youth-ministry.jpg",
    imageUrl: "/images/events/youth-ministry.jpg",
    featured: false,
    registrationUrl: "https://stpaulschurchcbe.org/events/register/youth",
    contactPerson: "Youth Ministry Coordinator",
    published: true
  },
  {
    id: "event-catechism-orient",
    title: "Sunday Catechism & Sacrament Preparation Orientation",
    category: "CATECHISM",
    date: "2026-09-06",
    time: "9:00 AM - 10:30 AM",
    location: "Catechism Block & Parish Auditorium",
    description: "Orientation session for parents and children preparing for First Holy Communion and Confirmation in the upcoming academic year.",
    longDescription: "Faith formation is foundational at St. Paul's Church. This orientation introduces parents to the curriculum, sacrament preparation guidelines, and Sunday school teachers for the academic year.",
    image: "/images/church-interior.jpg",
    imageUrl: "/images/church-interior.jpg",
    featured: false,
    contactPerson: "Catechism Director",
    published: true
  },
  {
    id: "event-parish-council",
    title: "Parish Council & Anbiyam Leaders Tri-Monthly Gathering",
    category: "MINISTRIES",
    date: "2026-09-13",
    time: "11:00 AM - 1:00 PM",
    location: "Parish Council Meeting Room",
    description: "Quarterly coordination meeting for Anbiyam (Basic Christian Community) leaders, pastoral council members, and ministry heads.",
    longDescription: "Reviewing parish pastoral initiatives, upcoming outreach programs, Anbiyam prayer schedules, and parish development plans.",
    image: "/images/church-banner.jpg",
    imageUrl: "/images/church-banner.jpg",
    featured: false,
    contactPerson: "Parish Secretary",
    published: true
  },
  {
    id: "event-health-camp",
    title: "Parish Community Health & Medical Care Camp",
    category: "COMMUNITY",
    date: "2026-09-20",
    time: "8:30 AM - 1:30 PM",
    location: "St. Paul's Primary School Campus",
    description: "Free health checkups, eye tests, blood sugar screenings, and medical consultation organized by the St. Vincent de Paul Society.",
    longDescription: "In service of Christ and neighbor, our parish community partners with medical professionals to provide free medical consultations, diagnostic checks, and wellness counseling for senior parishioners and local families.",
    image: "/images/church-front.png",
    imageUrl: "/images/church-front.png",
    featured: false,
    registrationUrl: "https://stpaulschurchcbe.org/events/register/health",
    contactPerson: "St. Vincent de Paul Society",
    published: true
  },
  {
    id: "event-first-friday",
    title: "Solemn First Friday Mass & Eucharistic Adoration",
    category: "HOLY MASS",
    date: "2026-10-02",
    time: "6:00 AM & 6:00 PM",
    location: "Main Church Sanctuary",
    description: "Special devotions to the Sacred Heart of Jesus with extended silent Eucharistic adoration and Benediction.",
    longDescription: "Join us every First Friday for solemn Holy Mass and Eucharistic adoration dedicated to the Sacred Heart of Jesus. Reconciliation and confessions available prior to Mass.",
    image: "/images/carmel-matha.jpeg",
    imageUrl: "/images/carmel-matha.jpeg",
    featured: false,
    contactPerson: "Parish Office",
    published: true
  }
];

export async function fetchParishEvents(): Promise<ParishEvent[]> {
  if (!firebaseConfigured || !db) {
    return initialParishEvents;
  }
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("published", "==", true), orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return initialParishEvents;
    }
    const events: ParishEvent[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      events.push({
        id: docSnap.id,
        title: data.title || "Untitled Event",
        category: data.category || "COMMUNITY",
        date: data.date || "",
        time: data.time || "",
        location: data.location || "St. Paul's Church, Rathinapuri",
        description: data.description || "",
        longDescription: data.longDescription || data.description || "",
        image: data.image || data.imageUrl || "/images/events/feast-celebration.jpg",
        imageUrl: data.imageUrl || data.image || "/images/events/feast-celebration.jpg",
        featured: Boolean(data.featured),
        registrationUrl: data.registrationUrl || "",
        contactPerson: data.contactPerson || "",
        contactPhone: data.contactPhone || "",
        published: data.published !== false
      });
    });
    return events;
  } catch (error) {
    console.warn("Firestore events fetch error, falling back to local events:", error);
    return initialParishEvents;
  }
}
