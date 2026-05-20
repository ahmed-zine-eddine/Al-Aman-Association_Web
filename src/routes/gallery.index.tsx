import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import about from "@/assets/about.jpg";
import pageActivities from "@/assets/page-activities.jpg";
import pagePrograms from "@/assets/page-programs.jpg";
import pageDonate from "@/assets/page-donate.jpg";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "المعرض · جمعية الأمان" },
      { name: "description", content: "ألبوم مصوّر يوثّق أنشطة جمعية الأمان: حملات موسمية، مخيّمات، ورشات، وحياة يومية." },
      { property: "og:title", content: "المعرض · جمعية الأمان" },
    ],
  }),
  component: GalleryPage,
});

type Item = { src: string; caption: string; category: "ميدان" | "أطفال" | "تكوين" | "حملات" };

const items: Item[] = [
  { src: g1, caption: "توزيع طرود رمضان ٢٠٢٥", category: "حملات" },
  { src: g2, caption: "أيادٍ تحتضن الأمل", category: "ميدان" },
  { src: g3, caption: "ضحكات الفناء المدرسي", category: "أطفال" },
  { src: g4, caption: "إفطار جماعي بالمقرّ", category: "حملات" },
  { src: about, caption: "حصص الدعم اليومية", category: "تكوين" },
  { src: g5, caption: "صداقات لا تُنسى", category: "أطفال" },
  { src: g6, caption: "ورشة الخياطة للأمّهات", category: "تكوين" },
  { src: pageActivities, caption: "أمسية رمضانية في الحيّ", category: "حملات" },
  { src: pagePrograms, caption: "قاعة الدعم المدرسي", category: "تكوين" },
  { src: pageDonate, caption: "أيادي العطاء", category: "ميدان" },
];

const cats: ("الكل" | Item["category"])[] = ["الكل", "ميدان", "أطفال", "تكوين", "حملات"];

function GalleryPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("الكل");
  const filtered = useMemo(() => (cat === "الكل" ? items : items.filter((i) => i.category === cat)), [cat]);
  const [active, setActive] = useState<number | null>(null);

  const next = () => setActive((p) => (p === null ? p : (p + 1) % filtered.length));
  const prev = () => setActive((p) => (p === null ? p : (p - 1 + filtered.length) % filtered.length));

  return (
    <>
      <PageHero
        eyebrow="المعرض"
        title={<>لحظاتٌ صغيرة، <br /><span className="italic font-normal text-gold">تكتبُ قصصًا كبيرة.</span></>}
        subtitle="ألبومٌ مصوّر يوثّق حياة الجمعية اليومية: من توزيع الطرود إلى صفّ الدرس، من ورشة الأمّهات إلى مخيّم الصيف."
        image={about}
        imageAlt="ألبوم مصوّر للجمعية"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "المعرض" }]}
      />

      <section className="py-24 md:py-32 bg-surface-muted">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm transition-all duration-300 hairline ring-focus",
                    cat === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            <AnimatePresence>
              {filtered.map((it, i) => (
                <motion.button
                  key={it.src + i}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive(i)}
                  className="group relative mb-4 block w-full overflow-hidden rounded-xl bg-foreground/5 ring-focus break-inside-avoid"
                >
                  <img
                    src={it.src}
                    alt={it.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-right text-background opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-background/70">{it.category}</span>
                    <div className="mt-1 text-sm font-medium">{it.caption}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/90 backdrop-blur-md p-4 md:p-10"
          >
            <button aria-label="إغلاق" onClick={() => setActive(null)} className="absolute top-6 left-6 grid h-12 w-12 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20">
              <X className="h-5 w-5" />
            </button>
            <button aria-label="السابق" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20">
              <ChevronRight className="h-5 w-5" />
            </button>
            <button aria-label="التالي" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={filtered[active].src}
              alt={filtered[active].caption}
              className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 right-8 text-background/80 text-sm">{filtered[active].caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
