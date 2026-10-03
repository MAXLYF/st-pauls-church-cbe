import React from "react";
import { CalendarX, Sparkles } from "lucide-react";

interface EmptyEventsStateProps {
  onResetFilter?: () => void;
}

export default function EmptyEventsState({ onResetFilter }: EmptyEventsStateProps) {
  return (
    <div className="mx-auto my-12 max-w-md rounded-3xl border border-[#e7dec8] bg-white p-10 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#faf7f2] border border-[#c59b27]/40 text-[#80142b] shadow-inner">
        <CalendarX className="h-8 w-8 text-[#80142b]" />
      </div>

      <h3 className="text-xl font-bold text-[#1f040b]">
        No Upcoming Events
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Please check back soon for parish celebrations, Masses and community activities.
      </p>

      {onResetFilter && (
        <button
          onClick={onResetFilter}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#80142b] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#9e1c36] transition-colors cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#f5d77f]" />
          <span>View All Events</span>
        </button>
      )}
    </div>
  );
}
