import { type ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">{eyebrow}</span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-6 text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.1] text-balance">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className={`mt-6 text-foreground/70 leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
