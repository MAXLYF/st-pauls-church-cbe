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
  title: "History & About St. Paul's Catholic Church, Rathinapuri | Our Parish Heritage",
  description:
    "Explore the 50-year history, foundation, patron saint, clergy milestones, and vibrant Catholic community of St. Paul's Catholic Church, Rathinapuri, Coimbatore.",
  keywords: [
    "About St. Paul's Catholic Church",
    "St. Paul's Catholic Church Rathinapuri History",
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
    period: "Circa 1970s",
    era: "Era 1: Foundation & Early Beginnings",
    title: "A Wild Stream, A Planted Cross & A Makeshift Shed",
    summary:
      "Catholics crossing the Sanganur Pallam rivulet gathered under a temporary palm-leaf shed, courageously planting a Cross on the very site where the Main Sanctuary stands today.",
    description:
      "About 50 years ago, the land north of the Sanganur Pallam rivulet was a rural expanse of fields and scattered dwellings that turned into impassable slush during monsoon torrents. As Coimbatore industrialised, migrant Catholic families—including traditional weavers from Kannuvakkarai, Gobichettipalayam, and Vellalas from Madurai—settled in Rathinapuri. Before a permanent bridge spanned the unpredictable stream (colloquially called 'Ellennai Pallam'), reaching Gandhipuram for Sunday Mass was hazardous. Bishop Savarimuthu, assisted by community elders including Mr. Paul Raj, acquired land and built a 50 ft × 20 ft temporary shed. When municipal authorities surveyed the eastern plot for potential acquisition, faithful parishioners courageously planted a holy Cross and erected a shed right where the Main Altar stands today, establishing open-air Calvary devotions under the Capuchin Fathers of Gandhipuram.",
    tags: ["Early Settlers", "Sanganur Pallam", "Capuchin Fathers", "First Cross Planted"]
  },
  {
    period: "Pre-1983",
    era: "Era 2: Choosing Our Patron Saint",
    title: "From St. Sebastian to St. Paul the Apostle",
    summary:
      "While local youth fervently celebrated St. Sebastian, Bishop Savarimuthu guided the fledgling community to dedicate the church to St. Paul the Apostle—the first in the diocese.",
    description:
      "The spirited young men of Rathinapuri had originally established an active youth association dedicated to St. Sebastian and celebrated his annual feast with great devotion. When the community petitioned for the formal naming of their church, St. Sebastian was the natural popular choice. However, the Most Rev. Bishop Savarimuthu gently advised the elders that throughout the entire Roman Catholic Diocese of Coimbatore, not a single church had been dedicated to St. Paul, the great Apostle to the Nations. Graciously accepting the Bishop's pastoral vision, the parish adopted St. Paul as its patron saint, drawing enduring inspiration from his missionary zeal.",
    tags: ["Patron Saint", "Bishop Savarimuthu", "St. Sebastian Association", "Missionary Calling"]
  },
  {
    period: "March 6, 1983",
    era: "Era 3: Canonical Erection of the Parish",
    title: "Official Canonical Erection & First Parish Priest",
    summary:
      "Most Rev. Bishop Ambrose canonically erected St. Paul's Parish; renowned Tamil scholar Fr. John Xavier was appointed first parish priest.",
    description:
      "On March 6, 1983, Most Rev. Bishop Ambrose formally decreed the establishment of St. Paul's Church as an independent parish, carving its boundaries between Sanganur Pallam to the south, the railway line to the west, Sathyamangalam Road to the east, and Sanganur-Ganapathy Road to the north. Fr. John Xavier (affectionately known as 'Illango' for his exceptional Tamil literary eloquence) took charge as the first Parish Priest. Operating selflessly from a rented house in the neighborhood, he completed the first thorough parish census and vigorously defended the ecclesiastical title to the parish grounds.",
    tags: ["March 6, 1983", "Bishop Ambrose", "Fr. John Xavier (Illango)", "Canonical Decree"]
  },
  {
    period: "1983 – 1989",
    era: "Era 4: Establishment & Community Growth",
    title: "Fr. D. Arokiaswamy ('Fr. Mani') & English Medium School",
    summary:
      "Beloved pastor Fr. Mani nurtured deep community harmony and inaugurated an English Medium Nursery School within the temporary church shed.",
    description:
      "Fr. D. Arokiaswamy, warmly remembered across Rathinapuri as 'Fr. Mani', served as parish priest from 1983 to 1989. Known for his compassionate approachability, he unified the diverse families of the parish. Responding to the urgent need for quality education among local children, Fr. Mani initiated an English Medium Nursery School directly inside the temporary shed. Continuing to reside in modest rented quarters, he laid the pedagogical and spiritual foundations for future parish institutions.",
    tags: ["Fr. Mani (1983–1989)", "Nursery School Founded", "Community Fellowship"]
  },
  {
    period: "1989 – 1996",
    era: "Era 5: Monumental Sanctuary & Consecration",
    title: "Construction of the Main Church & Underground Crypt Chapel",
    summary:
      "Fr. M. Aruldas spearheaded legal victories, fundraising, and the construction of the landmark sanctuary, solemnly consecrated on February 16, 1996.",
    description:
      "The tenure of Fr. M. Aruldas (1989–1997) was marked by transformative monumental development. Accompanied by Fr. A. Manthara as Socius, Fr. Aruldas made multiple journeys to Madras to secure crucial legal confirmations for the church land and traveled extensively as far as Bombay to mobilize funds. On August 11, 1992, the foundation stone was blessed and laid for a spacious, modern church. Uniquely in the diocese, the architectural plan incorporated an underground Crypt Chapel beneath the main altar for perpetual Eucharistic adoration and silent prayer. On February 16, 1996, Most Rev. Bishop Ambrose solemnly consecrated the magnificent completed sanctuary before thousands of joyful faithful.",
    tags: ["Foundation Aug 11, 1992", "Consecration Feb 16, 1996", "Fr. M. Aruldas", "Crypt Chapel"]
  },
  {
    period: "1996 – 1998",
    era: "Era 6: Presbytery & Underground Parish Hall",
    title: "Priests' Residence & Multipurpose Underground Hall",
    summary:
      "On May 31, 1996, foundation was laid for the presbytery with an underground hall, completely blessed on June 29, 1998 on the Feast of Saints Peter & Paul.",
    description:
      "To provide permanent residence for resident priests and adequate meeting space for parish associations, the foundation stone for the two-storey presbytery was laid on May 31, 1996. Architecturally innovative, the complex included a subterranean multipurpose Parish Hall. The first floor was blessed on December 7, 1996, and the entire residential and community complex was solemnly blessed on June 29, 1998, coinciding with the Solemnity of Saints Peter and Paul.",
    tags: ["Presbytery", "Underground Parish Hall", "Blessed June 29, 1998"]
  },
  {
    period: "1998 – 2003",
    era: "Era 7: School Campus Expansion & Sacred Grottos",
    title: "Educational Buildings, Acoustic Sound & Rosary Grotto",
    summary:
      "Subsequent pastors expanded the school to two storeys, installed advanced church acoustics, and erected the wayside Velankanni Grotto and Rosary Grotto.",
    description:
      "Fr. B. Ephrem (1997–1999) constructed the ground floor of the new St. Paul's Nursery and Primary School building, blessed on June 29, 1998. Assistant Priest Fr. Paul Antony modernised the church interior with a comprehensive sound system. Fr. Kulandai Raj (1999–2002) completed the school's second floor in 2003 to accommodate growing student enrollment. To commemorate the universal Year of the Rosary proclaimed by Pope John Paul II, Fr. Amulraj (2002–2007) constructed the serene Rosary Grotto, solemnly blessed by Most Rev. Bishop Thomas Aquinas on March 25, 2003.",
    tags: ["School Expansion", "Bishop Thomas Aquinas", "Rosary Grotto (2003)", "Sound System"]
  },
  {
    period: "2007 – 2021",
    era: "Era 8: Faithful Shepherding Through the Decades",
    title: "Pastoral Continuity & Spiritual Renewal",
    summary:
      "Successive parish priests enriched liturgical life, youth ministry, and community outreach through dedicated tenures.",
    description:
      "The spiritual journey of St. Paul's Church continued to flourish under the pastoral guidance of Fr. Irudaya Raj (2007–2009), Fr. Rayappan (2009–2014), Fr. Johnpaul Vincent (2014–2016), Fr. Joseph Sagayam (2016–2021), and Fr. Joseph Dhanaraj (2021). Each shepherd enriched parish life through devout liturgical celebrations, Eucharistic adorations, youth animation, family counseling, and benevolent outreach to the poor and marginalized across the Coimbatore suburbs.",
    tags: ["Pastoral Lineage", "Spiritual Renewal", "Decades of Devotion"]
  },
  {
    period: "Present Day",
    era: "Era 9: Modern Parish Life & Sub-Station Ministry",
    title: "A Thriving Community of 1,300+ Families & St. Dominic Sub-Station",
    summary:
      "Under Parish Priest Fr. J. Antony Vinodh and Assistant Priest Fr. Naveen Rosario, the parish unites over 6,000 parishioners and coordinates pastoral care at St. Dominic Chapel.",
    description:
      "Today, St. Paul's Catholic Church stands as a dynamic hub of Catholic faith and social charity. Led by Parish Priest Fr. J. Antony Vinodh and Assistant Priest Fr. Naveen Rosario, the parish serves over 1,300 registered Catholic families (more than 6,000 faithful) organized into 16 active Basic Christian Communities (Anbiyams). The parish oversees Sunday Catechesis, vibrant liturgical choirs, Legion of Mary, Vincent de Paul Society, youth ministry, and faithful spiritual care at its historic sub-station, St. Dominic Chapel in Karunanithi Nagar.",
    tags: ["Fr. J. Antony Vinodh", "Fr. Naveen Rosario", "1,300+ Families", "16 Anbiyams"]
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#1f040b]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-20 md:py-28 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-96 w-96 rounded-full bg-[#c59b27]/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#781226]/25 blur-2xl" />

        <div className="container-site relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] backdrop-blur">
              <Cross className="h-3.5 w-3.5 text-[#f5d77f]" />
              OUR PARISH &amp; HERITAGE
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
              About St. Paul&apos;s Catholic Church, Rathinapuri
            </h1>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-transparent" />
            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-300">
              Over 50 years of providential faith, communal sacrifice, and spiritual growth in the heart of Rathinapuri, Coimbatore.
            </p>
          </div>
        </div>
      </section>

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

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
            <div className="relative h-[380px] sm:h-[460px] w-full">
              <Image
                src="/images/church-front.png"
                alt="St. Paul's Catholic Church, Rathinapuri"
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
              description="St. Paul's Catholic Church, Rathinapuri is a Roman Catholic parish serving the faithful of Rathinapuri and Tatabad under the Coimbatore Diocese. Located just 5 kilometres from the Cathedral, our parish family is shaped by faith, service, and community."
            />

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed text-base">
              <p>
                From humble beginnings in a temporary 50 × 20 ft shed to a magnificent architectural landmark featuring an underground crypt chapel and vibrant community ministries, St. Paul&apos;s Catholic Church has grown into a spiritual home for generations of faithful families.
              </p>
              <p>
                Our parish is home to over <strong>1,300 Catholic families</strong> in the main station (with over <strong>6,000 faithful</strong>) alongside our devoted sub-station at Karunanithi Nagar, where the love of Christ is nurtured in prayer, charity, and service.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link href="/about/pastors" className="group flex items-center justify-between rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-white to-[#faf6ee] p-4 shadow-xs transition-all hover:border-[#80142b] hover:shadow-md">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#80142b]">Historical Timeline</div>
                  <div className="text-sm font-bold text-[#1f040b] group-hover:text-[#80142b]">Our Priests Through the Years</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#80142b] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/about/sons-of-the-soil" className="group flex items-center justify-between rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-white to-[#faf6ee] p-4 shadow-xs transition-all hover:border-[#80142b] hover:shadow-md">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#80142b]">Vocations</div>
                  <div className="text-sm font-bold text-[#1f040b] group-hover:text-[#80142b]">Sons of the soil</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#80142b] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones & Chronological Timeline */}
      <section id="history" className="relative overflow-hidden bg-gradient-to-b from-[#f4efe5] via-[#faf7f2] to-[#f4efe5] py-20 md:py-28 scroll-mt-20">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#781226]/10 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#80142b] uppercase">
              <Landmark className="h-3.5 w-3.5 text-[#80142b]" />
              PARISH CHRONICLES
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1f040b] md:text-5xl">
              History of St. Paul&apos;s Catholic Church, Rathinapuri
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-transparent" />
            <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
              The providential 50-year journey of the Rathinapuri Catholic community — from a humble temporary shed beside Sanganur Pallam to an architectural landmark with an underground crypt chapel and 1,300+ thriving families.
            </p>
          </div>

          {/* Chronological Vertical Timeline with Milestone Connectors */}
          <div className="mt-16 max-w-4xl mx-auto relative">
            {/* Desktop Center/Left Line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#c59b27] via-[#80142b]/40 to-[#c59b27]"
            />

            <div className="space-y-10 md:space-y-12">
              {timelineMilestones.map((milestone, idx) => (
                <div
                  key={milestone.period + idx}
                  className="relative md:pl-24 transition-all"
                >
                  {/* Timeline Badge for Desktop */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute left-4 top-6 -translate-x-1/2 h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#80142b] to-[#4e0917] text-[#f5d77f] font-black text-xs border-2 border-[#d4af37] shadow-md z-10"
                  >
                    {idx + 1}
                  </div>

                  <article className="rounded-3xl border border-[#e5dcce] bg-white p-7 md:p-9 shadow-md transition-all hover:border-[#c59b27] hover:shadow-xl">
                    {/* Header Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e8db] pb-4 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#781226]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#80142b]">
                          <Sparkles className="h-3.5 w-3.5 text-[#c59b27]" />
                          {milestone.period}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {milestone.era}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        Chapter {idx + 1} of {timelineMilestones.length}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#1f040b] tracking-tight">
                      {milestone.title}
                    </h3>

                    {/* Short Summary Highlight */}
                    <p className="mt-2 text-sm font-semibold text-[#80142b] bg-[#faf6ee] border-l-4 border-[#80142b] px-3.5 py-2 rounded-r-lg">
                      {milestone.summary}
                    </p>

                    {/* Detailed Description */}
                    <p className="mt-4 text-slate-700 leading-relaxed text-sm md:text-base">
                      {milestone.description}
                    </p>

                    {/* Topic Tags */}
                    {milestone.tags && milestone.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#f2ece1]">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-[#faf7f2] border border-[#e8dfcb] px-2.5 py-1 text-[11px] font-bold text-slate-700"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#c59b27]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Station Card */}
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
              Karunanithi Nagar is situated in a unique geographic location between the railway line to Mettupalayam and the railway line to Erode, bounded by Sanganur Pallam to the south. With no parish of its own, the families there continue to be spiritually connected to St. Paul&apos;s as a flourishing sub-station.
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed text-sm md:text-base">
              Serving our beloved Catholic families in this neighborhood, a small plot of land was initially purchased where a temporary shed was erected in honour of St. Dominic. Through the devotion and generosity of the faithful, the chapel became a place of prayer and pastoral care for the community.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-[#e2d7c5] text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-[#80142b]" /> Patron: St. Dominic</div>
              <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#80142b]" /> Sub-Station of Rathinapuri Parish</div>
              <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-[#80142b]" /> 50+ Local Catholic Families</div>
            </div>
          </div>
        </div>
      </section>

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
                <Image src="/images/parish-priest.png" alt="Parish priest of St. Paul's Catholic Church, Rathinapuri" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain p-2" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1f040b]">Parish Priest</h3>
              <p className="mt-3 text-lg font-bold text-[#80142b]">Fr. J. Antony Vinodh</p>
              <p className="mt-1 text-xs font-bold text-[#80142b] uppercase tracking-widest">
                St. Paul&apos;s Catholic Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Guiding the spiritual life, Holy Masses, spiritual counseling, and administration of the parish community.
              </p>
            </div>

            <div className="rounded-3xl bg-[#faf7f2] p-7 text-center shadow-md border border-[#e7dec8] transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-2xl bg-white border border-[#e2d7c5]">
                <Image src="/images/assistant-priest.png" alt="Assistant priest of St. Paul's Catholic Church, Rathinapuri" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain p-2" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#1f040b]">Assistant Priest</h3>
              <p className="mt-3 text-lg font-bold text-[#80142b]">Fr. Naveen Rosario</p>
              <p className="mt-1 text-xs font-bold text-[#80142b] uppercase tracking-widest">
                St. Paul&apos;s Catholic Church, Rathinapuri
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Fostering youth animation, catechism formation, sacramental preparation, and choir ministry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] text-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full bg-[#781226]/50 px-4 py-1.5 text-xs font-bold tracking-[.2em] text-[#f5d77f] border border-[#d4af37]/35 uppercase">
              PARISH HERITAGE
            </div>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl text-white">Discover Our Priests &amp; Vocations</h2>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
              Learn about the devoted priests who guided our parish through the decades, and the young men from Rathinapuri who answered God&apos;s call to the priesthood.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Link href="/about/pastors" className="group rounded-3xl border border-[#d4af37]/30 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10 hover:border-[#f5d77f] hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#781226] text-[#f5d77f] border border-[#d4af37]/40 shadow-md">
                  <Calendar className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#f5d77f] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">Our Priests Through the Years</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Explore the chronological history, biographies, and tenures of every parish priest who served St. Paul&apos;s Catholic Church, Rathinapuri from 1983 to the present.
              </p>
            </Link>

            <Link href="/about/sons-of-the-soil" className="group rounded-3xl border border-[#d4af37]/30 bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10 hover:border-[#f5d77f] hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#781226] text-[#f5d77f] border border-[#d4af37]/40 shadow-md">
                  <Users className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#f5d77f] group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#f5d77f] transition-colors">Sons of the soil</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Meet the holy priests and religious vocations nurtured within St. Paul&apos;s Catholic Church, Rathinapuri parish community now serving across various dioceses and congregations.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fbf8f1]">
        <div className="container-site">
          <div className="rounded-3xl bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div aria-hidden="true" className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-[#c59b27]/10 blur-2xl" />
            <div className="relative z-10 grid gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">OUR MISSION</div>
                <h3 className="mt-2 text-2xl font-bold">Proclaiming the Gospel</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To proclaim the Good News of Jesus Christ through sacred liturgy, devout prayer, active catechesis, and compassionate outreach to those in need throughout our neighborhood.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold tracking-[.2em] text-[#f5d77f] uppercase">OUR VISION</div>
                <h3 className="mt-2 text-2xl font-bold">A United Christian Family</h3>
                <p className="mt-4 text-slate-300 leading-relaxed text-sm md:text-base">
                  To be an ever-welcoming spiritual haven where families grow together in holiness, youth are inspired to serve, and the love of God is reflected in every act of fellowship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
