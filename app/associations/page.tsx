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
import {
  parishAssociations,
  ParishAssociation,
  SubAssociation
} from "@/lib/data/associations";
import { AssociationImageArea } from "@/components/AssociationImageArea";

export const metadata: Metadata = {
  title: "Parish Associations | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Explore the 13 parish associations of St. Paul's Catholic Church, Rathinapuri uniting our faithful community in prayer, fellowship, service, and charity.",
  keywords: [
    "St. Paul's Church Associations",
    "Parish Associations Rathinapuri",
    "Catholic Associations Coimbatore",
    "Society of Saint Vincent de Paul",
    "Choir Rathinapuri",
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
  "st-pauls-youth-mission": Compass,
  "secular-franciscan-order": Cross,
  "st-sebastian-association": Shield,
  "legion-of-mary": Crown,
  // Sub-associations
  "senior-choir": Music,
  "youth-choir": Music,
  "children-choir": Music,
  "mirror-of-justice": Crown,
  "mother-of-the-church": Crown,
  Music: Music,
  Crown: Crown
};

function SubAssociationCard({ sub }: { sub: SubAssociation }) {
  const IconComponent =
    iconMap[sub.id] || (sub.iconName ? iconMap[sub.iconName] : null) || Church;

  return (
    <div className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#ece4d5] bg-[#fdfbf7] p-3 sm:p-4 transition-all hover:border-[#c59b27]/60 hover:bg-white hover:shadow-xs">
      {/* Sub-association reserved image placeholder */}
      <AssociationImageArea
        src={sub.image}
        alt={`${sub.name} logo or photo`}
        imageType={sub.imageType}
        size="sub"
      />

      {/* Sub-association Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <IconComponent className="h-3.5 w-3.5 text-[#80142b]/80 shrink-0" />
          <h4 className="text-sm sm:text-base font-bold text-[#1f040b] tracking-tight leading-snug break-words">
            {sub.name}
          </h4>
        </div>

        <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
          {sub.description || "Details will be updated soon."}
        </p>
      </div>
    </div>
  );
}

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
    <article className="group rounded-2xl sm:rounded-3xl border border-[#e5dcce] bg-white p-4 sm:p-6 md:p-7 shadow-xs hover:border-[#c59b27]/60 hover:shadow-md transition-all duration-200">
      {/* Main Card Header with Image Placeholder and Details */}
      <div className="flex items-start gap-3.5 sm:gap-5 md:gap-6">
        {/* Main Association Reserved Image Placeholder */}
        <AssociationImageArea
          src={association.image}
          alt={`${association.name} logo or photo`}
          imageType={association.imageType}
          size="main"
        />

        {/* Association Heading & Update Notice */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#781226]/10 to-[#4e0917]/10 border border-[#d4af37]/35 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#80142b] uppercase tracking-wider">
              <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#80142b]" />
              Association #{index + 1}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1f040b] tracking-tight leading-snug break-words">
            {association.name}
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            {association.description || "Details will be updated soon."}
          </p>
        </div>
      </div>

      {/* Sub-Associations Section (Nested cards inside parent card) */}
      {association.subAssociations && association.subAssociations.length > 0 && (
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-[#f0e8db]">
          <div className="mb-3 sm:mb-3.5 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-[#80142b] uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#c59b27]" />
              Sub-Associations ({association.subAssociations.length})
            </h3>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {association.subAssociations.map((sub) => (
              <SubAssociationCard key={sub.id} sub={sub} />
            ))}
          </div>
        </div>
      )}
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
