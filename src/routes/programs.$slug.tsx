import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import { CTA } from "@/components/site/CTA";
import { getProgram, programs } from "@/data/programs";
import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.program.title} · برامج الأمان` },
          { name: "description", content: loaderData.program.shortDesc },
          { property: "og:title", content: loaderData.program.title },
          { property: "og:description", content: loaderData.program.tagline },
          { property: "og:image", content: loaderData.program.cover },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: ProgramDetail,
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center text-center px-6 pt-32">
      <div>
        <h1 className="text-3xl font-semibold">البرنامج غير موجود</h1>
        <Link to="/programs" className="mt-6 inline-block text-primary underline">العودة إلى البرامج</Link>
      </div>
    </div>
  ),
});

function ProgramDetail() {
  const { program } = Route.useLoaderData() as { program: import("@/data/programs").Program };
  const related = programs.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`برنامج · ${program.category}`}
        title={program.title}
        subtitle={program.tagline}
        image={program.cover}
        imageAlt={program.title}
        breadcrumbs={[
          { label: "الرئيسية", to: "/" },
          { label: "برامجنا", to: "/programs" },
          { label: program.title },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton to="/donate" variant="gold" icon={<ArrowLeft className="h-4 w-4" />}>
            ادعم هذا البرنامج
          </MagneticButton>
        </div>
      </PageHero>

      <section className="py-28 md:py-36 bg-background">
        <div className="container-page grid grid-cols-12 gap-y-16 gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">القصّة</span></Reveal>
            <Reveal delay={1}>
              <p className="mt-6 text-lg leading-loose text-foreground/80 text-pretty">{program.longDesc}</p>
            </Reveal>

            <Reveal delay={2}>
              <h3 className="mt-16 text-2xl font-semibold">أهدافنا في هذا البرنامج</h3>
            </Reveal>
            <StaggerGroup className="mt-8 space-y-4">
              {program.goals.map((g) => (
                <StaggerItem key={g} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground/80 leading-relaxed">{g}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={2}>
              <h3 className="mt-16 text-2xl font-semibold">أنشطة البرنامج</h3>
            </Reveal>
            <StaggerGroup className="mt-8 grid sm:grid-cols-2 gap-4">
              {program.activities.map((a) => (
                <StaggerItem key={a} className="rounded-xl bg-surface p-5 text-sm leading-relaxed text-foreground/75 hairline">
                  {a}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <div className="sticky top-28 space-y-px rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/10">
              {program.impact.map((s) => (
                <div key={s.v} className="bg-card p-6 flex items-baseline justify-between gap-4">
                  <div className="text-3xl md:text-4xl font-semibold text-primary">{s.k}</div>
                  <div className="text-sm text-foreground/65 text-left">{s.v}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-surface">
        <div className="container-page">
          <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">من الميدان</span></Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] max-w-2xl">
              لقطاتٌ من قلب البرنامج.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[260px]">
            {program.gallery.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img src={g} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="container-page grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 md:col-span-5">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">مسيرة البرنامج</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(1.85rem,3.5vw,2.5rem)] font-semibold leading-[1.1]">من البداية إلى اليوم.</h2>
            </Reveal>
          </div>
          <ol className="col-span-12 md:col-span-7 relative border-r border-foreground/10 pr-8 space-y-12">
            {program.timeline.map((t) => (
              <Reveal key={t.year}>
                <li className="relative">
                  <span className="absolute -right-[2.15rem] top-2 block h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  <div className="text-3xl font-semibold text-primary/90">{t.year}</div>
                  <h4 className="mt-2 text-lg font-semibold">{t.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65 max-w-lg">{t.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-charcoal text-background relative overflow-hidden grain">
        <div className="container-page relative">
          <Quote className="h-16 w-16 text-gold/30" />
          <Reveal delay={1}>
            <blockquote className="mt-8 text-[clamp(1.4rem,2.6vw,2.25rem)] leading-[1.4] font-medium max-w-3xl text-balance">
              «{program.testimonial.quote}»
            </blockquote>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-primary-soft" />
              <div>
                <div className="text-sm font-semibold">{program.testimonial.name}</div>
                <div className="text-xs text-background/65">{program.testimonial.role}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-surface">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold">برامجٌ ذات صلة</h2>
            </Reveal>
            <Reveal>
              <Link to="/programs" className="text-sm text-primary">كلّ البرامج ←</Link>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {related.map((p) => (
              <Link key={p.slug} to="/programs/$slug" params={{ slug: p.slug }} className="group bg-card p-8 transition-colors hover:bg-background ring-focus">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.shortDesc}</p>
                <span className="mt-6 inline-block text-sm text-primary">اعرف أكثر ←</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
