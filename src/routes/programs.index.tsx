import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/components/site/CTA";
import { cn } from "@/lib/utils";
import { programs as allPrograms, type ProgramCategory } from "@/data/programs";
import pageProgramsImg from "@/assets/page-programs.jpg";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "برامجنا · جمعية الأمان" },
      { name: "description", content: "ستّة برامج متكاملة: كفالة اليتيم، الدعم المدرسي، المنح، الرعاية الصحية، تمكين الأمّهات، ونوادي الصيف." },
      { property: "og:title", content: "برامجنا · جمعية الأمان" },
      { property: "og:description", content: "ستّة مسارات، هدفٌ واحد: أن يكبر الطفل واقفًا." },
    ],
  }),
  component: ProgramsIndex,
});

const filters: ("الكل" | ProgramCategory)[] = ["الكل", "كفالة", "تعليم", "صحة", "تمكين"];

function ProgramsIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("الكل");
  const list = filter === "الكل" ? allPrograms : allPrograms.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="برامجنا"
        title={<>ستّةُ مساراتٍ، <br /><span className="italic font-normal text-gold">هدفٌ واحد.</span></>}
        subtitle="من الكفالة الشهرية إلى نوادي الصيف، نُغطّي حلقات حياة الطفل اليتيم كاملةً: تعليمًا، صحّةً، رعايةً، وتمكينًا لأمّه."
        image={pageProgramsImg}
        imageAlt="أطفال يقرؤون داخل قاعة درس"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "برامجنا" }]}
      />

      <section className="py-24 md:py-32 bg-background">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm transition-all duration-300 hairline ring-focus",
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-14 space-y-px">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => {
                const reverse = i % 2 === 1;
                return (
                  <motion.article
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="group border-t border-foreground/10 first:border-t-0"
                  >
                    <Link
                      to="/programs/$slug"
                      params={{ slug: p.slug }}
                      className={cn(
                        "grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 md:py-16 items-center ring-focus",
                      )}
                    >
                      <div className={cn("lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3]", reverse && "lg:order-2")}>
                        <img
                          src={p.cover}
                          alt={p.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                        <div className="absolute top-4 right-4 rounded-full bg-background/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                          {p.category}
                        </div>
                      </div>
                      <div className={cn("lg:col-span-7", reverse ? "lg:order-1 lg:pl-12" : "lg:pr-12")}>
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-primary-soft">
                          <p.icon className="h-4 w-4 text-primary" />
                          {p.stat}
                        </div>
                        <h3 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] text-balance">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-base italic text-foreground/55">{p.tagline}</p>
                        <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground/70">{p.shortDesc}</p>
                        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          اعرف أكثر <span aria-hidden>←</span>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}
