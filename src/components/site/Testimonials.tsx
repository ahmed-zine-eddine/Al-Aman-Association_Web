import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const list = [
  {
    quote:
      "نشأتُ في كنف الجمعية منذ سنّ السابعة. وجدتُ هنا الأمان والعائلة وفرصة التعلّم. اليوم أدرس الطبّ بفضلهم.",
    name: "ياسمين قادري",
    role: "خرّيجة ٢٠٢٠ · طالبة طبّ",
  },
  {
    quote:
      "ورشة الخياطة التي افتتحتها الجمعية غيّرت حياتي. صرتُ قادرةً على إعالة أبنائي بكرامة دون أن أمدّ يدي لأحد.",
    name: "أمّ عبد الرحمن",
    role: "أمّ مستفيدة من برنامج التمكين",
  },
  {
    quote:
      "تطوّعتُ هنا منذ خمس سنوات، ورأيتُ بعينَيّ كيف تتحوّل البسمة على وجه طفل إلى مشروعٍ حياتيّ ناجح.",
    name: "د. عبد الحقّ مزياني",
    role: "طبيب متطوّع",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % list.length);
  const prev = () => setI((p) => (p - 1 + list.length) % list.length);

  return (
    <section className="py-32 md:py-44 bg-background">
      <div className="container-page grid grid-cols-12 gap-y-12 gap-x-10">
        <div className="col-span-12 md:col-span-4">
          <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">شهادات</span></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
              أصواتٌ تحكي عنّا، أصدق ممّا نقول.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 flex items-center gap-3">
              <button onClick={prev} aria-label="السابق" className="grid h-12 w-12 place-items-center rounded-full hairline hover:bg-foreground/5 ring-focus">
                <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={next} aria-label="التالي" className="grid h-12 w-12 place-items-center rounded-full hairline hover:bg-foreground/5 ring-focus">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="ml-4 text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}</span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-8 relative min-h-[320px]">
          <Quote className="absolute -top-2 right-0 h-24 w-24 text-primary/10" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <blockquote className="text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.45] font-medium text-foreground/90 text-balance">
                «{list[i].quote}»
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-soft" />
                <div>
                  <div className="text-sm font-semibold">{list[i].name}</div>
                  <div className="text-xs text-muted-foreground">{list[i].role}</div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
