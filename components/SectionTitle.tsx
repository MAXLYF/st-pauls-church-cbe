export default function SectionTitle({
  eyebrow,
  title,
  description
}: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <div className="text-xs font-bold tracking-[.25em] text-[#b18a3d]">{eyebrow}</div>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#10233f] md:text-4xl">{title}</h2>
      <div className="gold-line" />
      {description && <p className="mt-5 leading-7 text-slate-600">{description}</p>}
    </div>
  );
}
