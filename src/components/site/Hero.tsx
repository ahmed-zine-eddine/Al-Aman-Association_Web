import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Play } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section id="home" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-background">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="أطفال يحملون شتلات صغيرة، رمز الأمل والنمو في سوقر"
          className="h-full w-full object-cover"
          width={1600}
          height={1200}
        />
      </motion.div>
      <motion.div style={{ opacity: overlay }} className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-between pt-32 pb-14">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-background/70">
          <span className="h-px w-10 bg-background/40" />
          منذ 2009 · سوقر، تيارت
        </div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.05]"
          >
            نزرع الأمان <br />
            <span className="italic font-normal text-gold">في قلب كل يتيم</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-background/80"
          >
            جمعية الأمان لرعاية وتربية الأيتام جمعيةٌ خيريّة جزائرية مقرّها سوقر،
            ترعى الأيتام تعليميًا وصحيًّا واجتماعيًّا منذ خمسة عشر عامًا،
            وتؤمن بأن كرامة الطفل أساسُ نهضة المجتمع.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton to="/donate" variant="gold" icon={<ArrowLeft className="h-4 w-4" />}>
              ساهم في الرعاية
            </MagneticButton>
            <MagneticButton to="/about" variant="ghost" icon={<Play className="h-3.5 w-3.5 fill-current" />} className="text-background border-background/30 hover:border-background/70">
              قصّتنا
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-4 md:gap-x-14 border-t border-background/15 pt-10"
        >
          {[
            { k: "+١٥", v: "سنة من العطاء" },
            { k: "+٤٢٠", v: "يتيمًا تحت الرعاية" },
            { k: "+٨٠", v: "متطوّعًا نشطًا" },
            { k: "+٣٥", v: "برنامجًا سنويًّا" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-3xl md:text-4xl font-semibold text-gold">{s.k}</div>
              <div className="mt-1 text-xs md:text-sm text-background/65">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-background/50"
      >
        مرّر للأسفل
      </motion.div>
    </section>
  );
}
