import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#140207] text-white border-t-2 border-[#d4af37]/30">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <img src="/images/logo.jpg" alt="St. Paul's Church logo" className="h-12 w-12 rounded-full bg-white object-cover border-2 border-[#d4af37]/50 shadow-md" />
            <div>
              <div className="font-bold tracking-[.15em] text-[#f1cf7a]">ST. PAUL&apos;S CHURCH</div>
              <div className="text-xs tracking-[.3em] text-[#d4af37]/80">RATHINAPURI</div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            A Catholic parish community in Coimbatore devoted to faith, fellowship, service and prayer.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-[#f1cf7a] tracking-wide">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
            <Link href="/about" className="hover:text-[#f1cf7a] transition-colors">About Parish</Link>
            <Link href="/about/pastors" className="hover:text-[#f1cf7a] transition-colors">Our Priests</Link>
            <Link href="/about/sons-of-parish" className="hover:text-[#f1cf7a] transition-colors">Sons of Parish</Link>
            <Link href="/#mass-timings" className="hover:text-[#f1cf7a] transition-colors">Mass Timings</Link>
            <Link href="/prayer" className="hover:text-[#f1cf7a] transition-colors">Prayer Resources</Link>
            <Link href="/prayer-request" className="hover:text-[#f1cf7a] transition-colors">Prayer Request</Link>
            <Link href="/events" className="hover:text-[#f1cf7a] transition-colors">Events</Link>
            <Link href="/gallery" className="hover:text-[#f1cf7a] transition-colors">Gallery</Link>
            <Link href="/anbiyam" className="hover:text-[#f1cf7a] transition-colors">Anbiyam</Link>
            <Link href="/ministries" className="hover:text-[#f1cf7a] transition-colors">Ministries</Link>
            <Link href="/contact" className="hover:text-[#f1cf7a] transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-[#f1cf7a] tracking-wide">Visit Us</h3>
          <p className="text-sm leading-7 text-slate-300">
            Nehru Street, Tatabad / Rathinapuri,<br />
            Coimbatore, Tamil Nadu, India
          </p>
          <p className="mt-4 text-sm font-semibold text-[#f1cf7a]/90">Coimbatore Diocese</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} St. Paul&apos;s Church, Rathinapuri. All rights reserved.
      </div>
    </footer>
  );
}
