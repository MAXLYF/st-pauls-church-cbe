import { ParishEvent } from "@/types";

export function getGoogleCalendarUrl(event: ParishEvent): string {
  const title = encodeURIComponent(event.title);
  const description = encodeURIComponent(event.description || event.longDescription || "");
  const location = encodeURIComponent(event.location || "St. Paul's Church, Rathinapuri, Coimbatore");

  // Format date YYYYMMDD
  const rawDate = event.date.replace(/-/g, "");
  const startDate = `${rawDate}T090000Z`;
  const endDate = `${rawDate}T110000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${startDate}/${endDate}`;
}

export function downloadIcsFile(event: ParishEvent) {
  const rawDate = event.date.replace(/-/g, "");
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//St. Paul's Church Rathinapuri//Events//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || "").replace(/\n/g, " ")}`,
    `LOCATION:${event.location || "St. Paul's Church, Rathinapuri"}`,
    `DTSTART:${rawDate}T090000Z`,
    `DTEND:${rawDate}T110000Z`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function parseEventDate(dateStr: string) {
  if (!dateStr) {
    return { month: "OCT", day: "11", weekday: "SUN", year: "2026", full: "" };
  }

  let y: number, m: number, d: number;
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-").map((p) => parseInt(p, 10));
    y = parts[0];
    m = parts[1] - 1;
    d = parts[2];
  } else {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) {
      return { month: "OCT", day: "11", weekday: "SUN", year: "2026", full: dateStr };
    }
    y = dateObj.getFullYear();
    m = dateObj.getMonth();
    d = dateObj.getDate();
  }

  const dateObj = new Date(y, m, d);
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return {
    month: monthNames[dateObj.getMonth()] || "AUG",
    day: String(dateObj.getDate()).padStart(2, "0"),
    weekday: dayNames[dateObj.getDay()] || "SAT",
    year: String(dateObj.getFullYear()),
    full: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  };
}
