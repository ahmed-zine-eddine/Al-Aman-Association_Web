import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="container-page py-20 grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" />
              </svg>
            </span>
            <div>
              <div className="text-sm font-semibold">جمعية الأمان</div>
              <div className="text-[11px] text-muted-foreground">لرعاية وتربية الأيتام</div>
            </div>
          </Link>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground/65">
            جمعيّة خيريّة مستقلّة، مقرّها بلدية سوقر، ولاية تيارت، الجمهورية
            الجزائرية الديمقراطية الشعبية. مرخّصة منذ ٢٠٠٩.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">روابط</div>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              ["من نحن", "/about"],
              ["برامجنا", "/programs"],
              ["أنشطتنا", "/activities"],
              ["المعرض", "/gallery"],
              ["تبرّع", "/donate"],
              ["تواصل", "/contact"],
            ].map(([l, h]) => (
              <li key={h}><Link to={h} className="text-foreground/70 hover:text-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">تواصل</div>
          <ul className="mt-6 space-y-3 text-sm text-foreground/70">
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> سوقر، ولاية تيارت ١٤٠٠٠</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> ‎+213 ٥٥٠ ٠٠ ٠٠ ٠٠‎</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> contact@alaman-souguer.dz</li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <a aria-label="فيسبوك" href="#" className="grid h-10 w-10 place-items-center rounded-full hairline hover:bg-foreground/5"><Facebook className="h-4 w-4" /></a>
            <a aria-label="إنستغرام" href="#" className="grid h-10 w-10 place-items-center rounded-full hairline hover:bg-foreground/5"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} جمعية الأمان لرعاية وتربية الأيتام. جميع الحقوق محفوظة.</span>
          <span>صُمّم وبُني بعناية في سوقر.</span>
        </div>
      </div>
    </footer>
  );
}
