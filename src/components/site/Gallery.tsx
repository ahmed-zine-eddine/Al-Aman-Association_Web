import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import about from "@/assets/about.jpg";
import { Reveal } from "./Reveal";

const items = [
  { src: g1, caption: "توزيع طرود رمضان", span: "md:row-span-2" },
  { src: g2, caption: "أيادٍ تحتضن الأمل", span: "" },
  { src: g3, caption: "ضحكات الفناء المدرسي", span: "md:col-span-2" },
  { src: g4, caption: "إفطار جماعي", span: "md:row-span-2" },
  { src: about, caption: "حصص الدعم اليومية", span: "" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-surface-muted py-32 md:py-44">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">المعرض</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">
                لقطاتٌ من الميدان.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/65">
              صورٌ توثّق أنشطتنا الأسبوعية، حملاتنا الموسمية، وكواليس عملنا
              اليومي مع الأطفال والأسر في سوقر والقرى المجاورة.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4">
          {items.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-xl bg-foreground/5 ring-focus ${it.span}`}
            >
              <img
                src={it.src}
                alt={it.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute bottom-0 inset-x-0 p-5 text-right text-background">
                <div className="overflow-hidden">
                  <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-background/70">صورة {i + 1}</span>
                    <div className="mt-1 text-base font-medium">{it.caption}</div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-charcoal/85 backdrop-blur-md p-4 md:p-10"
          >
            <button
              aria-label="إغلاق"
              onClick={() => setActive(null)}
              className="absolute top-6 left-6 grid h-12 w-12 place-items-center rounded-full bg-background/10 text-background hover:bg-background/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={items[active].src}
              alt={items[active].caption}
              className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-8 right-8 text-background/80 text-sm">{items[active].caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
