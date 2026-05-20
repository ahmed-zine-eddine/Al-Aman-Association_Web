import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { label: "الرئيسية", to: "/" },
  { label: "من نحن", to: "/about" },
  { label: "برامجنا", to: "/programs" },
  { label: "أنشطتنا", to: "/activities" },
  { label: "المعرض", to: "/gallery" },
  { label: "تواصل", to: "/contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["oklch(0.985 0.008 85 / 0)", "oklch(0.985 0.008 85 / 0.82)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const border = useTransform(scrollY, [0, 80], ["oklch(0 0 0 / 0)", "oklch(0.21 0.02 160 / 0.08)"]);
  const padY = useTransform(scrollY, [0, 80], ["1.25rem", "0.65rem"]);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(to + "/"));

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, backdropFilter: blur, WebkitBackdropFilter: blur, borderBottomColor: border, paddingTop: padY, paddingBottom: padY }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="container-page flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold tracking-tight">جمعية الأمان</span>
              <span className="text-[11px] text-muted-foreground">سوقر · الجزائر</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors group",
                  isActive(l.to) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-center bg-foreground/60 transition-transform duration-500",
                    isActive(l.to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton to="/donate" variant="primary">تبرّع الآن</MagneticButton>
          </div>

          <button
            aria-label="فتح القائمة"
            onClick={() => setOpen(true)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full hairline hover:bg-foreground/5"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-background flex flex-col"
            >
              <div className="container-page flex items-center justify-between py-5">
                <span className="text-sm font-semibold">القائمة</span>
                <button
                  aria-label="إغلاق"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-foreground/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="container-page flex flex-col gap-1 mt-6">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-foreground/10 py-5 text-2xl font-semibold tracking-tight"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="container-page mt-auto py-10">
                <MagneticButton to="/donate" variant="primary" className="w-full justify-center" onClick={() => setOpen(false)}>
                  تبرّع الآن
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
