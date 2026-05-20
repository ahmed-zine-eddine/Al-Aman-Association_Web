import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
  { year: "٢٠٠٩", title: "تأسيس الجمعية", body: "افتتاح أوّل مقرٍّ للجمعية في سوقر برعاية عشرين متطوّعًا و٤٥ يتيمًا." },
  { year: "٢٠١٣", title: "إطلاق برنامج الكفالة", body: "تعميم نظام الكفالة الشهرية الشاملة على مستوى الولاية." },
  { year: "٢٠١٦", title: "افتتاح مركز الدعم المدرسي", body: "بناء قاعات تعليمية مجهّزة لخدمة أكثر من ٢٠٠ طفل سنويًّا." },
  { year: "٢٠١٩", title: "ورشات تمكين الأمّهات", body: "إنشاء ستّ ورشات حرفية للأمّهات لضمان دخلٍ مستدام." },
  { year: "٢٠٢٢", title: "العيادة المتنقّلة", body: "إطلاق وحدة صحية متنقّلة لتغطية القرى المحاذية لسوقر." },
  { year: "٢٠٢٥", title: "مركز الأمان الجديد", body: "تدشين مقرٍّ موسَّع يضمّ مكتبة، ملعبًا، وقاعات نفسية." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 md:py-44">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">أنشطتنا</span>
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">
            خمسة عشر عامًا، خطوةً خطوة.
          </h2>
        </div>

        <div ref={ref} className="relative mt-24 grid grid-cols-12">
          {/* Vertical line — centered on desktop, on the right on mobile (RTL) */}
          <div className="pointer-events-none absolute top-0 bottom-0 right-4 md:right-1/2 md:translate-x-1/2 w-px bg-foreground/10">
            <motion.div style={{ height: lineH }} className="w-full bg-primary origin-top" />
          </div>

          <ol className="col-span-12 space-y-20 md:space-y-28">
            {events.map((e, i) => {
              const right = i % 2 === 0;
              return (
                <motion.li
                  key={e.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-12 items-start gap-6"
                >
                  <div className="hidden md:block col-span-6">
                    {right && <Card e={e} align="end" />}
                  </div>
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 z-10">
                    <span className="block h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />
                  </div>
                  <div className="md:hidden absolute right-2 top-2 z-10">
                    <span className="h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background block" />
                  </div>
                  <div className="col-span-12 md:col-span-6 pr-10 md:pr-0">
                    {!right ? <Card e={e} align="start" /> : <div className="md:hidden"><Card e={e} align="start" /></div>}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Card({ e, align }: { e: { year: string; title: string; body: string }; align: "start" | "end" }) {
  return (
    <div className={align === "end" ? "md:text-left md:pl-12" : "md:pr-12"}>
      <div className="text-5xl md:text-6xl font-semibold text-primary/90 tracking-tight">{e.year}</div>
      <h3 className="mt-3 text-xl font-semibold">{e.title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/65">{e.body}</p>
    </div>
  );
}
