import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { programs as allPrograms, type ProgramCategory } from "@/data/programs";

const filters: ("الكل" | ProgramCategory)[] = ["الكل", "تعليم", "صحة", "كفالة", "تمكين"];
type Filter = (typeof filters)[number];

export function Programs() {
  const [filter, setFilter] = useState<Filter>("الكل");
  const filtered = filter === "الكل" ? allPrograms : allPrograms.filter((p) => p.category === filter);

  return (
    <section id="programs" className="relative bg-surface py-32 md:py-44">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">برامجنا</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">
                ستّة مسارات، هدفٌ واحد: <br /> أن يكبر الطفل واقفًا.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2} className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm transition-all duration-300 hairline ring-focus",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
                    : "bg-card text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-card transition-colors duration-500 hover:bg-background"
              >
                <Link to="/programs/$slug" params={{ slug: p.slug }} className="block p-8 md:p-10 h-full ring-focus">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-6deg]">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{p.category}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.shortDesc}</p>
                  <div className="mt-10 flex items-center justify-between pt-6 border-t border-foreground/10">
                    <span className="text-sm font-semibold text-primary">{p.stat}</span>
                    <span className="text-sm text-foreground/50 group-hover:text-foreground transition-colors">اعرف أكثر ←</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
