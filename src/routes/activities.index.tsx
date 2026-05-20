import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Timeline } from "@/components/site/Timeline";
import { CTA } from "@/components/site/CTA";
import { cn } from "@/lib/utils";
import { activities, type ActivityCategory } from "@/data/activities";
import pageActivities from "@/assets/page-activities.jpg";

export const Route = createFileRoute("/activities/")({
  head: () => ({
    meta: [
      { title: "أنشطتنا · جمعية الأمان" },
      { name: "description", content: "أحدث الحملات والفعاليات: طرود رمضان، العودة المدرسية، مخيّمات الصيف، وأكثر." },
      { property: "og:title", content: "أنشطتنا · جمعية الأمان" },
      { property: "og:description", content: "ميدانٌ متواصل من الحملات، الورشات، والمخيّمات." },
    ],
  }),
  component: ActivitiesIndex,
});

const filters: ("الكل" | ActivityCategory)[] = ["الكل", "موسمية", "ميدان", "تطوّع", "ثقافة"];

function ActivitiesIndex() {
  const [f, setF] = useState<(typeof filters)[number]>("الكل");
  const list = f === "الكل" ? activities : activities.filter((a) => a.category === f);
  const [hero, ...rest] = list;

  return (
    <>
      <PageHero
        eyebrow="أنشطتنا"
        title={<>الميدانُ يكتب <br /><span className="italic font-normal text-gold">قصّتنا الحقيقية.</span></>}
        subtitle="حملاتٌ موسمية، ورشات تكوين، رحلات للأطفال، ولقاءات تطوّع. كلّ نشاطٍ هو سطرٌ جديد في سجلّ خمسة عشر عامًا من العطاء."
        image={pageActivities}
        imageAlt="حشد يستلم طرودًا في مساء رمضاني"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "أنشطتنا" }]}
      />

      <section className="py-24 md:py-32 bg-background">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {filters.map((x) => (
                <button
                  key={x}
                  onClick={() => setF(x)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm transition-all duration-300 hairline ring-focus",
                    f === x
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {x}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {hero && (
              <motion.div
                key={hero.slug + f}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14"
              >
                <Link to="/activities/$slug" params={{ slug: hero.slug }} className="group grid grid-cols-12 gap-8 items-end ring-focus">
                  <div className="col-span-12 lg:col-span-8 relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <img src={hero.cover} alt={hero.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 text-background">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-gold">مميَّز · {hero.date}</div>
                      <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] max-w-xl text-balance">{hero.title}</h3>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">{hero.category}</div>
                    <p className="mt-4 text-base leading-relaxed text-foreground/75">{hero.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      اقرأ القصّة <span aria-hidden>←</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            <AnimatePresence mode="popLayout">
              {rest.map((a, i) => (
                <motion.article
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-card hover:bg-background transition-colors"
                >
                  <Link to="/activities/$slug" params={{ slug: a.slug }} className="block ring-focus">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={a.cover} alt={a.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        <span>{a.category}</span>
                        <span>{a.date}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold leading-tight">{a.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/65">{a.excerpt}</p>
                      <span className="mt-6 inline-block text-sm text-primary group-hover:underline">اقرأ المزيد ←</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Timeline />
      <CTA />
    </>
  );
}
