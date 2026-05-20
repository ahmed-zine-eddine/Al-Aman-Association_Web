import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  breadcrumbs,
  children,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: { label: string; to?: string }[];
  children?: ReactNode;
  align?: "start" | "center";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-charcoal text-background min-h-[78svh] flex items-end"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          width={1600}
          height={1100}
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/25" />
      <div className="absolute inset-0 -z-10 grain" />

      <div className={`container-page relative pt-40 pb-20 ${align === "center" ? "text-center mx-auto" : ""}`}>
        {breadcrumbs && (
          <motion.nav
            aria-label="مسار التنقّل"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-8 flex items-center gap-2 text-xs text-background/60 ${align === "center" ? "justify-center" : ""}`}
          >
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.to ? (
                  <Link to={b.to} className="hover:text-background transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-background/80">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronLeft className="h-3 w-3 opacity-50" />}
              </span>
            ))}
          </motion.nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-background/70 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-10 bg-background/40" />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-8 text-balance text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[1.05] max-w-4xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-background/80 ${align === "center" ? "mx-auto" : ""}`}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
