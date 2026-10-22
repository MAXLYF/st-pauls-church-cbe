import type { Metadata } from "next";
import {
  Users,
  Cross,
  HeartHandshake,
  Sun,
  Church,
  Heart,
  UsersRound,
  Music,
  BookOpen,
  Flame,
  Compass,
  Shield,
  Crown
} from "lucide-react";
import { parishAssociations, ParishAssociation } from "@/lib/data/associations";

export const metadata: Metadata = {
  title: "Parish Associations | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Explore the 14 parish associations of St. Paul's Catholic Church, Rathinapuri uniting our faithful community in prayer, fellowship, service, and charity.",
  keywords: [
    "St. Paul's Church Associations",
    "Parish Associations Rathinapuri",
    "Catholic Associations Coimbatore",
    "Society of Saint Vincent de Paul",
    "Legion of Mary Rathinapuri",
    "Altar Servers Rathinapuri"
  ]
};

// Map each association ID to a corresponding Lucide icon component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "society-saint-vincent-de-paul": HeartHandshake,
  "st-pauls-resurrection-club": Sun,
  "christian-family-movement": Users,
  "catholic-association": Church,
  "our-lady-of-good-health-welfare": Heart,
  "saint-veronica-womens-commission": UsersRound,
  choir: Music,
  catechism: BookOpen,
  "altar-servers": Flame,
  "youth-mission": Compass,
  "secular-franciscan-order": Cross,
  "st-sebastian-association": Shield,
  "legion-of-mary-mirror-of-justice": Crown,
  "legion-of-mary-mother-of-the-church": Crown
};

function AssociationCard({
  association,
  index,
  total
}: {
  association: ParishAssociation;
  index: number;
  total: number;
}) {
  const IconComponent = iconMap[association.id] || Church;

  return (
    <article className="group rounded-2xl sm:rounded-3xl border border-[#e5dcce] bg-white p-5 sm:p-7 shadow-xs hover:border-[#c59b27]/60 hover:shadow-md transition-all duration-200">
      <div className="flex items-start sm:items-center gap-4 sm:gap-5">
        {/* Association Icon Badge */}
        <div
          aria-hidden="true"
          className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#781226]/10 to-[#4e0917]/10 text-[#80142b] border border-[#d4af37]/35 shadow-xs transition-colors group-hover:bg-[#80142b] group-hover:text-[#f5d77f]"
        >
          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        {/* Association Heading & Update Notice */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold text-[#80142b] uppercase tracking-wider">
              Association #{index + 1}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1f040b] tracking-tight leading-snug break-words">
            {association.name}
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            Details will be updated soon.
          </p>
        </div>
      </div>
    </article>
  );
}

export default function AssociationsPage() {
  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* Hero Header Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] py-16 md:py-24 text-white text-center"
        aria-label="Associations header"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-[#c59b27]/10 blur-3xl"
        />

        <div className="container-site relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#781226]/40 px-4 py-1.5 text-xs font-bold tracking-[.25em] text-[#f5d77f] uppercase shadow-sm backdrop-blur">
              <Cross className="h-3.5 w-3.5 text-[#f5d77f]" />
              PARISH ASSOCIATIONS
            </div>

            {/* Main Page Title */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              PARISH ASSOCIATIONS
            </h1>

            {/* Gold Divider Line */}
            <div className="mx-auto mt-4 h-1 w-20 bg-[#c59b27] rounded-full" />

            {/* Introductory Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
              Our parish associations bring together faithful members of the community through prayer, fellowship, service, faith formation, and charitable activities. Explore the various associations of St. Paul’s Church, Rathinapuri.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Card List Section (Single Column Layout) */}
      <section className="py-12 sm:py-16 md:py-20" aria-label="Parish Associations List">
        <div className="container-site">
          {/* Centered single vertical column container */}
          <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
            {parishAssociations.map((association, index) => (
              <AssociationCard
                key={association.id}
                association={association}
                index={index}
                total={parishAssociations.length}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
