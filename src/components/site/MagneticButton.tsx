import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "gold";

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
  ghost:
    "bg-transparent text-foreground border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.03]",
  gold:
    "bg-gold text-charcoal hover:shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--gold)_60%,transparent)]",
};

export function MagneticButton({
  children,
  href,
  to,
  onClick,
  variant = "primary",
  className,
  icon,
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const iconX = useTransform(sx, (v) => v * 1.4);
  const iconY = useTransform(sy, (v) => v * 1.4);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    "group relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[box-shadow,background-color,color,border-color] duration-500 ring-focus";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.span style={{ x: iconX, y: iconY }} className="relative z-10 inline-flex">
          {icon}
        </motion.span>
      )}
    </>
  );

  const MotionLink = motion(Link);

  if (to) {
    return (
      <MotionLink
        ref={ref as React.RefObject<HTMLAnchorElement>}
        to={to}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={cn(base, styles[variant], className)}
      >
        {inner}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: sx, y: sy }}
        className={cn(base, styles[variant], className)}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(base, styles[variant], className)}
    >
      {inner}
    </motion.button>
  );
}
