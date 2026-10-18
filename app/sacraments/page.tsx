import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Sacraments",
  description: "Learn about the Holy Sacraments celebrated at St. Paul's Catholic Church, Rathinapuri.",
};

const items = [
  "Baptism",
  "First Holy Communion",
  "Confirmation",
  "Reconciliation",
  "Marriage",
  "Anointing of the Sick"
];

export default function Sacraments() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionTitle
          eyebrow="SACRAMENTS"
          title="Sacramental Life"
          description="Parish guidance, sacramental preparation, requirements, documents, and enquiry contacts at St. Paul's Catholic Church, Rathinapuri."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <article key={x} className="rounded-2xl border bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold text-[#1f040b]">{x}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Requirements, preparation information, office procedure and contact details can be added here.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
