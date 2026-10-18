import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import MediaCard from "@/components/MediaCard";

export const metadata: Metadata = {
  title: "Parish Gallery | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Photo and media gallery capturing worship, community life, celebrations, and events at St. Paul's Catholic Church, Rathinapuri, Coimbatore.",
};

export default function Gallery() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionTitle
          eyebrow="MEDIA"
          title="Parish Gallery"
          description="Photo and media archives from liturgical celebrations, festivals, and community life at St. Paul's Catholic Church, Rathinapuri."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <MediaCard src="/images/church-front.png" title="Church Exterior" label="Church" />
          <MediaCard src="/images/church-interior.jpg" title="Church Interior" label="Worship" />
          <MediaCard src="/images/church-banner.jpg" title="Parish Banner" label="Parish" />
          <MediaCard src="/images/parish-priest.png" title="Parish Priest" label="Clergy" />
          <MediaCard src="/images/assistant-priest.png" title="Assistant Priest" label="Clergy" />
        </div>
      </div>
    </section>
  );
}
