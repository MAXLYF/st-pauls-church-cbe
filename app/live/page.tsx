import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Live Mass | St. Paul's Catholic Church, Rathinapuri",
  description:
    "Watch live Mass and liturgical celebrations online from St. Paul's Catholic Church, Rathinapuri, Coimbatore.",
};

export default function Live() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionTitle
          eyebrow="LIVE"
          title="Live Mass"
          description="Watch live Mass and liturgical services online from St. Paul's Catholic Church, Rathinapuri."
        />
        <div className="overflow-hidden rounded-3xl bg-[#1b0308] border border-[#c59b27]/30 shadow-2xl">
          <div className="aspect-video flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl text-[#f5d77f]">▶</div>
              <p className="mt-4 text-slate-300">YouTube Live player placeholder</p>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-[#e7dec8] bg-white p-6 shadow-sm">
          <h3 className="font-bold text-[#1f040b]">When there is no live stream</h3>
          <p className="mt-2 text-slate-600">Show the next scheduled livestream or the parish YouTube channel here.</p>
        </div>
      </div>
    </section>
  );
}
