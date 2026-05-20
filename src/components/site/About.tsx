import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about.jpg";
import { Reveal } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);

  return (
    <section id="about" className="relative py-32 md:py-44">
      <div className="container-page grid grid-cols-12 gap-y-16 gap-x-10">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">من نحن</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.08] text-foreground">
              قصّة بدأت بنيّة، <br /> وكبرت بقلوب أهل سوقر.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-8 max-w-md text-pretty text-foreground/70 leading-loose">
              تأسّست الجمعية عام ٢٠٠٩ على يد مجموعةٍ من أبناء المدينة الذين
              آمنوا بأن لا طفل في سوقر يجب أن يكبر وحده. اليوم، نرعى مئات
              الأيتام عبر برامج التعليم، الكفالة، الصحة النفسية، والتمكين
              الحرفي للأمهات الأرامل.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-12 flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
              {[
                ["رسالتنا", "تأمين بيئة كريمة، آمنة، ومحفّزة لكل يتيم في الجهة الغربية للجزائر."],
                ["رؤيتنا", "أن يصبح كل يتيم رعيناه عضوًا فاعلًا، مستقلًّا، ومُساهمًا في مجتمعه."],
                ["قِيَمنا", "الشفافية، الاحترام، الاستمرارية، والعمل الجماعي بنيّة صادقة."],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-12 gap-4 py-5">
                  <div className="col-span-4 text-sm font-semibold text-primary">{k}</div>
                  <div className="col-span-8 text-sm leading-relaxed text-foreground/70">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="col-span-12 lg:col-span-7 lg:pr-10">
          <div className="relative">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-elev)]">
                <motion.img
                  style={{ y }}
                  src={aboutImg}
                  alt="معلّمة متطوّعة مع أطفال داخل فصل دافئ في سوقر"
                  className="absolute inset-0 h-[120%] w-full object-cover"
                  width={1200}
                  height={1400}
                  loading="lazy"
                />
              </div>
            </Reveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -left-4 md:-left-12 max-w-xs rounded-xl bg-card p-6 shadow-[var(--shadow-elev)] border border-foreground/5"
            >
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary-soft">شهادة</div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                «وجدتُ في الجمعية عائلتي الثانية، وصرتُ اليوم أُعلّم الأطفال
                الذين كنت يومًا مثلهم.»
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-soft" />
                <div>
                  <div className="text-xs font-semibold">أمين بن صالح</div>
                  <div className="text-[11px] text-muted-foreground">خرّيج ٢٠١٨</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
