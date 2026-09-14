import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#10233f] text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src="/images/logo.jpg" alt="St. Paul's Church logo" className="h-12 w-12 rounded-full bg-white object-cover" />
            <div>
              <div className="font-semibold tracking-[.12em]">ST. PAUL&apos;S CHURCH</div>
              <div className="text-xs tracking-[.28em] text-slate-300">RATHINAPURI</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            A Catholic parish community in Coimbatore devoted to faith, fellowship, service and prayer.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <Link href="/about">About Parish</Link>
            <Link href="/about/pastors">Our Pastors</Link>
            <Link href="/about/sons-of-parish">Sons of Parish</Link>
            <Link href="/mass-timings">Mass Timings</Link>
            <Link href="/prayer">Prayer Resources</Link>
            <Link href="/prayer-request">Prayer Request</Link>
            <Link href="/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/ministries">Ministries</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Visit Us</h3>
          <p className="text-sm leading-7 text-slate-300">
            Nehru Street, Tatabad / Rathinapuri,<br />
            Coimbatore, Tamil Nadu, India
          </p>
          <p className="mt-4 text-sm text-slate-300">Coimbatore Diocese</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} St. Paul&apos;s Church, Rathinapuri. All rights reserved.
      </div>
    </footer>
  );
}
