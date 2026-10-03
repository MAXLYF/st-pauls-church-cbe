export default function SectionTitle({
  eyebrow,
  title,
  description,
  dark = false
}: { eyebrow?: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <div className={`text-xs font-bold tracking-[.25em] ${dark ? "text-[#f1cf7a]" : "text-[#80142b]"}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`mt-2 text-3xl font-bold tracking-tight md:text-4xl ${dark ? "text-white" : "text-[#1f040b]"}`}>
        {title}
      </h2>
      <div className="gold-line" />
      {description && (
        <p className={`mt-5 leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
