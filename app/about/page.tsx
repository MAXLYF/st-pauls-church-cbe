import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import {
  Church,
  Calendar,
  Cross,
  Users,
  MapPin,
  Heart,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  School,
  Landmark
} from "lucide-react";

export const metadata: Metadata = {
  title: "History & About St. Paul's Church Rathinapuri | Our Parish Heritage",
  description:
    "Explore the 50-year history, foundation, patron saint, clergy milestones, and vibrant Catholic community of St. Paul's Church, Rathinapuri, Coimbatore.",
  keywords: [
    "About St Paul's Church",
    "St Paul's Church Rathinapuri History",
    "History of Rathinapuri Church",
    "Catholic Church Coimbatore",
    "Rathinapuri Parish History",
    "Sanganur Pallam",
    "St Dominic Chapel Karunanithi Nagar"
  ]
};

const parishStats = [
  {
    label: "Parish Foundation",
    value: "March 6, 1983",
    subtext: "Erected by Bishop Ambrose",
    icon: Calendar
  },
  {
    label: "Total Catholic Families",
    value: "1,350",
    subtext: "Main Station & Sub-Station",
    icon: Users
  },
  {
    label: "Main Station Community",
    value: "6,000+",
    subtext: "1,300 Catholic Families",
    icon: Heart
  },
  {
    label: "Distance from Cathedral",
    value: "5 K.Ms.",
    subtext: "St. Michael's Cathedral",
    icon: MapPin
  }
];

const timelineMilestones = [
  {
    year: "Early Origins (~50 Years Ago)",
    title: "A Stream, A Cross & A Temporary Shed",
    description:
      "About 50 years ago, the area north of the Sanganur Pallam rivulet was a rural expanse of farms and scattered dwellings that turned into impassable slush during monsoon rains. Old Coimbatore was expanding rapidly, drawing families seeking livelihood from surrounding villages. Catholics from the Cathedral Parish (including weavers of ancient Kannuvakkarai, Gobichettipalayam, and Vellalas from Madurai) formed the major Catholic population. Until a bridge crossed the wild mountain rivulet (colloquially called 'Ellennai Pallam — Mountain Stream of 7 Buffaloes' after a legendary flood), faithful struggled to reach Gandhipuram parish for sacraments. Community elders approached Bishop Savarimuthu, who with Mr. Paul Raj and others purchased land and erected a 50 ft × 20 ft temporary shed for Sunday Mass. Facing municipal acquisition attempts on the eastern plot, Catholics courageously planted a Cross and a shed right where the Main Altar stands today, launching the Calvary devotions under the Capuchin Fathers of Gandhipuram."
  },
  {
    year: "Choosing Our Patron",
    title: "From St. Sebastian to St. Paul the Apostle",
    description:
      "The young men who settled in Rathinapuri formed an active Association dedicated to St. Sebastian and celebrated his annual feast with high devotion. When time came to choose the parish patron, St. Sebastian was the popular expectation. However, Bishop Savarimuthu gently persuaded the community to dedicate the church to St. Paul the Apostle, noting that there was not a single church dedicated in his honour across the entire Diocese of Coimbatore. Thus, St. Paul became the patron saint and spiritual exemplar of our parish."
  },
  {
    year: "March 6, 1983",
    title: "Canonical Erection of St. Paul's Parish",
    description:
      "Bishop Ambrose officially erected the territory between Sanganur Pallam (south), the railway line (west), Sathyamangalam Road (east), and Sanganur-Ganapathy Road (north) as an independent parish. Fr. John Xavier (popularly known as 'Illango' for his Tamil poetic brilliance) was appointed the first Parish Priest. Working from a humble rented house, he took on the monumental task of completing the parish census and tirelessly defended the church land."
  },
  {
    year: "Community Growth & Nursery School",
    title: "Fr. D. Arokiaswamy ('Fr. Mani')",
    description:
      "Beloved by all parishioners, Fr. Mani fostered deep unity and communion across families. Heeding the community's yearning for education, he initiated an English Medium Nursery School right within the temporary shed, continuing his residence as parish priest in the rented house."
  },
  {
    year: "1992 – 1996",
    title: "A Monumental Church with Innovative Crypt Chapel",
    description:
      "The dynamic Fr. M. Aruldas expanded the shed with two modest rooms for his living quarters and built compound walls and pilgrim shelters. Supported by Fr. A. Manthara as Socius, he made repeated journeys to Madras to win crucial legal battles for the site. He traveled as far as Bombay to mobilize funds. On August 11, 1992, the foundation stone was laid for the grand new church, architecturally distinguished by an underground Crypt Chapel for quiet adoration. The magnificent new sanctuary was solemnly consecrated by Bishop Ambrose on February 16, 1996."
  },
  {
    year: "1996 – 1998",
    title: "Presbytery & Unique Underground Parish Hall",
    description:
      "On May 31, 1996, the foundation was laid for a two-floor presbytery featuring a unique underground Parish Hall. The first floor was blessed on December 7, 1996, and the complete complex was blessed on June 29, 1998."
  },
  {
    year: "1998 – 2003",
    title: "School Buildings, Modern Sound & Sacred Grottos",
    description:
      "Fr. B. Ephraem (1997–1999) constructed the ground floor of the new school building, blessed on June 29, 1998. Assistant Parish Priest Fr. Paul Antony tirelessly installed a modern sound system throughout the church. Earlier, Fr. Aruldas built the wayside Grotto of Our Lady of Velankanni at the school campus. In 2003, Fr. Kulandai Raj completed the school's first floor. To commemorate the Year of the Holy Rosary, Fr. Amalraj erected the Rosary Grotto, solemnly blessed by Bishop Thomas Aquinas on March 25, 2003."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#1f040b]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-20 md:py-28 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-96 w-96 rounded-full bg-[#c59b27]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#781226]/25 blur-2xl"
        />

        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] backdrop-blur">
              <Cross className="h-3.5 w-3.5 text-[#f5d77f]" />
              OUR PARISH &amp; HERITAGE
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
              About St. Paul&apos;s Church
            </h1>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-transparent" />
            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-300">
              Over 50 years of providential faith, communal sacrifice, and spiritual growth in the heart of Rathinapuri, Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Statistics Banner */}
      <section className="relative -mt-10 z-20 container-site">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-[#d4af37]/30 bg-white p-6 shadow-xl">
          {parishStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4 p-3 rounded-2xl bg-[#faf6ee] border border-[#e8dfcb]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#781226] to-[#4e0917] text-[#f5d77f] shadow-xs">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-[#1f040b]">{stat.value}</div>
                  <div className="text-xs font-bold text-[#80142b] uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[11px] text-slate-500">{stat.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who We Are & Overview */}
      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <div className="relative h-[380px] sm:h-[460px] w-full">
              <Image
                src="/images/church-front.png"
                alt="St. Paul's Church, Rathinapuri"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1b0308]/95 via-[#3d0813]/70 to-transparent p-6 text-white">
              <div className="text-xs font-bold tracking-widest text-[#f5d77f] uppercase">
                Catholic Diocese of Coimbatore
              </div>
              <p className="text-sm font-medium text-slate-200 mt-1">
                Nehru Street, Tatabad – Rathinapuri, Coimbatore, Tamil Nadu
              </p>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow="WHO WE ARE"
              title="A Vibrant Catholic Parish Community"
              description="St. Paul's Church is a Roman Catholic parish serving the faithful of Rathinapuri and Tatabad under the Coimbatore Diocese. Located just 5 kilometers from St. Michael's Cathedral, it stands as a sanctuary of prayer, sacramental life, and charitable fellowship."
            />

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed text-base">
              <p>
                From humble beginnings in a temporary 50 × 20 ft shed to a magnificent architectural landmark featuring an underground crypt chapel and vibrant community ministries, St. Paul&apos;s Church has nurtured thousands of Catholic families over five decades.
              </p>
              <p>
                Our parish is home to over <strong>1,300 Catholic families</strong> in the main station (with over <strong>6,000 faithful</strong>) alongside our devoted sub-station at Karunanithi Nagar, actively engaged in Eucharistic adoration, Anbiyam neighborhood units, youth animation, and catechism.
              </p>
            </div>

            {/* Quick Explore Subpages Links */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/about/pastors"
                className="group flex items-center justify-between rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-white to-[#faf6ee] p-4 shadow-xs transition-all hover:border-[#80142b] hover:shadow-md"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#80142b]">Historical Timeline</div>
                  <div className="text-sm font-bold text-[#1f040b] group-hover:text-[#80142b]">Our Priests Through the Years</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#80142b] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about/sons-of-parish"
                className="group flex items-center justify-between rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-white to-[#faf6ee] p-4 shadow-xs transition-all hover:border-[#80142b] hover:shadow-md"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#80142b]">Vocations</div>
                  <div className="text-sm font-bold text-[#1f040b] group-hover:text-[#80142b]">Sons of the Parish</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#80142b] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE PARISH HISTORY */}
      <section id="history" className="relative overflow-hidden bg-gradient-to-b from-[#f2eee5] via-[#faf7f2] to-[#f2eee5] py-24 scroll-mt-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/10 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
              <Landmark className="h-3.5 w-3.5 text-[#80142b]" />
              PARISH CHRONICLES
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1f040b] md:text-5xl">
              History of St. Paul&apos;s Church
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <p className="mt-5 text-base md:text-lg leading-7 text-slate-600">
              The providential journey of Rathinapuri Catholic community — from a wild mountain rivulet to a magnificent house of God.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="mt-16 space-y-8 max-w-4xl mx-auto">
            {timelineMilestones.map((milestone, idx) => (
              <div
                key={milestone.year}
                className="relative rounded-3xl border border-[#e5dcce] bg-white p-7 md:p-9 shadow-md transition-all hover:border-[#c59b27] hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0e8db] pb-4 mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#80142b] bg-[#781226]/10 px-3.5 py-1 rounded-full w-fit">
                    <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" />
                    {milestone.year}
                  </div>
                  <span className="text-xs font-bold text-slate-400">Milestone {idx + 1}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#1f040b]">
                  {milestone.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sub-Station Spotlight */}
          <div className="mt-16 max-w-4xl mx-auto rounded-3xl border-2 border-[#d4af37]/40 bg-gradient-to-br from-white via-[#faf6ee] to-[#f6f0e2] p-8 md:p-10 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#781226] to-[#4e0917] text-[#f5d77f] shadow-md">
                <Church className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest text-[#80142b] uppercase">Sub-Station</div>
                <h3 className="text-2xl font-extrabold text-[#1f040b]">St. Dominic Chapel, Karunanithi Nagar</h3>
              </div>
            </div>

            <p className="mt-5 text-slate-700 leading-relaxed text-sm md:text-base">
              Karunanithi Nagar is situated in a unique geographic location between the railway line to Mettupalayam and the railway line to Erode, bounded by Sanganur Pallam to the south. With no direct approach road except through the western part of Gandhipuram Parish, its location north of the Pallam established it as a dedicated sub-station of Rathinapuri.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed text-sm md:text-base">
              Serving our beloved Catholic families in this neighborhood, a small plot of land was initially purchased where a temporary shed was erected in honour of St. Dominic. Through the devotion of the faithful, this sanctuary was subsequently developed into a permanent chapel where Mass and neighborhood prayers are celebrated.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-[#e2d7c5] text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#80142b]" /> Patron: St. Dominic
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#80142b]" /> Sub-Station of Rathinapuri Parish
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-[#80142b]" /> 50+ Local Catholic Families
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parish Leadership / Clergy */}
      <section className="bg-white section-pad border-t border-[#e8dfcb]">
        <div className="container-site">
          <SectionTitle
            eyebrow="PARISH CLERGY"
            title="Parish Leadership &amp; Clergy"
            description="Our resident priests ministering to the spiritual and sacramental needs of the faithful."
          />
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mt-12">
            <div className="rounded-3xl bg-[#faf7f2] p-7 text-center shadow-md border border-[#e7dec8] transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-2xl bg-white border border-[#e2d7c5]">
                <Image
                  src="/images/parish-priest.png"
                  alt="Parish priest of St. Paul's Church"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1f040b]">Parish Priest</h3>
              <p className="mt-1 text-xs font-bold text-[#80142b] uppercase tracking-widest">
                St. Paul&apos;s Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Guiding the spiritual life, Holy Masses, spiritual counseling, and administration of the parish community.
              </p>
            </div>

            <div className="rounded-3xl bg-[#faf7f2] p-7 text-center shadow-md border border-[#e7dec8] transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-2xl bg-white border border-[#e2d7c5]">
                <Image
                  src="/images/assistant-priest.png"
                  alt="Assistant priest of St. Paul's Church"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1f040b]">Assistant Priest</h3>
              <p className="mt-1 text-xs font-bold text-[#80142b] uppercase tracking-widest">
                St. Paul&apos;s Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Fostering youth animation, catechism formation, sacramental preparation, and choir ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Historical Priests & Sons of Parish CTA */}
      <section className="section-pad bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] text-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full bg-[#781226]/50 px-4 py-1.5 text-xs font-bold tracking-[.2em] text-[#f5d77f] border border-[#d4af37]/35 uppercase">
              PARISH HERITAGE
            </div>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl text-white">
              Discover Our Priests &amp; Vocations
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
              Learn about the devoted priests who guided our parish through the decades, and the young men from Rathinapuri who answered God&apos;s call to the priesthood.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Link
              href="/about/pastors"
              className="group rounded-3xl border border-[#d4af37]/30 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10 hover:border-[#f5d77f] hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#781226] text-[#f5d77f] border border-[#d4af37]/40 shadow-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#f5d77f] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">
                Our Priests Through the Years
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Explore the chronological history, biographies, and tenures of every parish priest who served St. Paul&apos;s from 1983 to the present.
              </p>
            </Link>

            <Link
              href="/about/sons-of-parish"
              className="group rounded-3xl border border-[#d4af37]/30 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10 hover:border-[#f5d77f] hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#781226] text-[#f5d77f] border border-[#d4af37]/40 shadow-md">
                  <Users className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#f5d77f] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">
                Sons of the Parish
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Meet the holy priests and religious vocations nurtured within St. Paul&apos;s parish community now serving across various dioceses and congregations.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section-pad bg-[#fbf8f1]">
        <div className="container-site">
          <div className="rounded-3xl bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#c59b27]/10 blur-2xl"
            />
            <div className="relative z-10 grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">
                  OUR MISSION
                </div>
                <h3 className="mt-2 text-2xl font-bold">Proclaiming the Gospel</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To proclaim the Good News of Jesus Christ through sacred liturgy, devout prayer,
                  active catechesis, and compassionate outreach to those in need throughout our
                  neighborhood.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">
                  OUR VISION
                </div>
                <h3 className="mt-2 text-2xl font-bold">A United Christian Family</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To be an ever-welcoming spiritual haven where families grow together in holiness,
                  youth are inspired to serve, and the love of God is reflected in every act of
                  fellowship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
