import Link from "next/link";

const items = [
  ["Mass Timings", "/mass-timings"],
  ["Our Pastors", "/about/pastors"],
  ["Sons of the Parish", "/about/sons-of-parish"],
  ["Prayer Resources", "/prayer"],
  ["Events", "/events"],
  ["Gallery", "/gallery"],
  ["Videos", "/videos"],
  ["Prayer Requests", "/prayer-request"],
  ["Ministries", "/ministries"],
  ["Sacraments", "/sacraments"],
  ["Contact Settings", "/contact"]
];

export default function Admin() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="rounded-3xl bg-[#10233f] p-8 text-white md:p-10">
          <div className="text-xs font-bold tracking-[.25em] text-[#d8bb73]">ADMIN</div>
          <h1 className="mt-2 text-4xl font-bold">Parish Content Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Starter dashboard UI. Firebase Authentication, Storage, and Firestore CRUD
            (including Pastors, Sons of the Parish &amp; Prayer Resources) should be connected before production use.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([name, href]) => (
            <Link
              href={href}
              key={name}
              className="rounded-2xl border border-[#e7dec8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#b18a3d] hover:shadow-md"
            >
              <div className="text-xs font-bold tracking-[.18em] text-[#b18a3d]">MANAGE</div>
              <h2 className="mt-2 font-bold text-[#10233f]">{name}</h2>
              <p className="mt-2 text-sm text-slate-500">
                {name === "Our Pastors"
                  ? "Manage parish priests, years of service, photos & order →"
                  : name === "Sons of the Parish"
                  ? "Manage vocations, ordination years & ministries →"
                  : name === "Prayer Resources"
                  ? "Manage Bible readings, reflection, prayers & hymns →"
                  : "Open section →"}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-900">
            <strong>Production note:</strong> Protect <code>/admin</code> with Firebase Authentication and
            enforce Firestore / Storage security rules.
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-xs leading-5 text-blue-950 font-mono">
            <div><strong>Firestore Collections:</strong></div>
            <div className="mt-1">• <code>pastors</code>: id, name, photoUrl, startYear, endYear, description, order, published, createdAt, updatedAt</div>
            <div className="mt-1">• <code>sonsOfParish</code>: id, name, title, photoUrl, vocation, ordinationYear, professionYear, congregation, diocese, ministry, currentService, description, order, published, createdAt, updatedAt</div>
            <div className="mt-1">• <code>prayerResources</code>: id, slug, type, title, description, content, coverImage, language, audioUrl, videoUrl, youtubeUrl, pdfUrl, published, createdAt, updatedAt</div>
          </div>
        </div>
      </div>
    </section>
  );
}
