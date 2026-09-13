export default function MediaCard({
  src, title, label = "Parish"
}: { src: string; title: string; label?: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={src} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="text-xs font-bold uppercase tracking-[.18em] text-[#b18a3d]">{label}</div>
        <h3 className="mt-2 font-semibold text-[#10233f]">{title}</h3>
      </div>
    </div>
  );
}
