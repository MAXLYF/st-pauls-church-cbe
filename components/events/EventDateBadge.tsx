import { parseEventDate } from "@/lib/calendar-utils";

interface EventDateBadgeProps {
  date: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function EventDateBadge({ date, size = "md", className = "" }: EventDateBadgeProps) {
  const { month, day, weekday, year } = parseEventDate(date);

  if (size === "lg") {
    return (
      <div className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#faf7f2] to-[#f4eee4] border border-[#e7dec8] p-4 text-center shadow-md border-t-4 border-t-[#80142b] min-w-[90px] ${className}`}>
        <span className="text-xs font-bold tracking-[0.2em] text-[#80142b] uppercase">{month}</span>
        <span className="my-0.5 text-3xl font-extrabold text-[#1f040b] leading-none tracking-tight">{day}</span>
        <span className="text-[11px] font-bold tracking-wider text-[#c59b27] uppercase">{weekday}</span>
        {year && <span className="mt-1 text-[10px] font-semibold text-slate-400">{year}</span>}
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className={`flex flex-col items-center justify-center rounded-xl bg-white border border-[#e7dec8] px-2.5 py-1.5 text-center shadow-2xs border-t-2 border-t-[#80142b] min-w-[54px] ${className}`}>
        <span className="text-[9px] font-bold tracking-widest text-[#80142b] uppercase leading-none">{month}</span>
        <span className="my-0.5 text-base font-extrabold text-[#1f040b] leading-none">{day}</span>
        <span className="text-[9px] font-semibold text-[#c59b27] uppercase leading-none">{weekday}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#ffffff] to-[#faf7f2] border border-[#e7dec8] px-3.5 py-2.5 text-center shadow-sm border-t-3 border-t-[#80142b] min-w-[68px] ${className}`}>
      <span className="text-[10px] font-bold tracking-[0.18em] text-[#80142b] uppercase leading-tight">{month}</span>
      <span className="my-0.5 text-2xl font-black text-[#1f040b] leading-none">{day}</span>
      <span className="text-[10px] font-bold tracking-wider text-[#c59b27] uppercase leading-tight">{weekday}</span>
    </div>
  );
}
