import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section id="donate" className="relative overflow-hidden bg-charcoal text-background py-32 md:py-44 grain">
      {/* Decorative arabesque rings */}
      <motion.div
        aria-hidden
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full border border-background/10"
      />
      <motion.div
        aria-hidden
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
        className="pointer-events-none absolute -right-40 -bottom-40 h-[640px] w-[640px] rounded-full border border-background/5"
      />

      <div className="container-page relative text-center">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">ساهم معنا</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-8 text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-4xl mx-auto">
            تبرّعٌ واحد <span className="italic text-gold font-normal">يُعيد لطفلٍ ابتسامته</span> ولأسرة كرامتها.
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-8 max-w-xl mx-auto text-pretty text-base text-background/70 leading-relaxed">
            كلّ مساهمةٍ، مهما كان حجمها، تُحدث فارقًا حقيقيًّا في حياة يتيمٍ
            في سوقر. تتبّع أثر تبرّعك خطوة بخطوة، وكُن جزءًا من قصصٍ ما تزال تُكتب.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton to="/donate" variant="gold" icon={<ArrowLeft className="h-4 w-4" />}>
              تبرّع شهري
            </MagneticButton>
            <MagneticButton
              to="/contact"
              variant="ghost"
              className="text-background border-background/30 hover:border-background/70"
            >
              كفالة يتيم
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 max-w-3xl mx-auto border-t border-background/15 pt-10 text-right">
            {[
              ["١٠٠٠ دج", "وجبة شهرية"],
              ["٣٠٠٠ دج", "أدوات مدرسية"],
              ["٥٠٠٠ دج", "كسوة العيد"],
              ["١٠٠٠٠ دج", "كفالة شهر كامل"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="text-2xl md:text-3xl font-semibold text-gold">{k}</div>
                <div className="mt-2 text-xs md:text-sm text-background/70">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
