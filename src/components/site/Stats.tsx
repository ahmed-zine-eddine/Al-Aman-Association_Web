import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const items = [
  { to: 420, suffix: "+", label: "يتيم تحت الرعاية" },
  { to: 15, suffix: "", label: "سنة من العطاء" },
  { to: 1200, suffix: "+", label: "أسرة مستفيدة" },
  { to: 80, suffix: "+", label: "متطوّع نشط" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden gradient-emerald text-background py-28 md:py-36 grain">
      <div className="container-page relative">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.3em] text-background/70">أثرنا حتى اليوم</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1] text-balance">
              أرقامٌ صادقة، وراء كلّ رقمٍ منها وجهٌ وحياة.
            </h2>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6 border-t border-background/15 pt-14">
          {items.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <div className="text-[clamp(2.75rem,5.5vw,4.75rem)] font-semibold leading-none text-gold">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-sm text-background/75 max-w-[14ch]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
