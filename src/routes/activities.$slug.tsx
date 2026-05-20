import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/components/site/CTA";
import { getActivity, activities } from "@/data/activities";

export const Route = createFileRoute("/activities/$slug")({
  loader: ({ params }) => {
    const activity = getActivity(params.slug);
    if (!activity) throw notFound();
    return { activity };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.activity.title} · أنشطة الأمان` },
          { name: "description", content: loaderData.activity.excerpt },
          { property: "og:title", content: loaderData.activity.title },
          { property: "og:description", content: loaderData.activity.excerpt },
          { property: "og:image", content: loaderData.activity.cover },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: ActivityDetail,
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center text-center px-6 pt-32">
      <div>
        <h1 className="text-3xl font-semibold">النشاط غير موجود</h1>
        <Link to="/activities" className="mt-6 inline-block text-primary underline">العودة إلى الأنشطة</Link>
      </div>
    </div>
  ),
});

function ActivityDetail() {
  const { activity } = Route.useLoaderData() as { activity: import("@/data/activities").Activity };
  const related = activities.filter((a) => a.slug !== activity.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${activity.category} · ${activity.date}`}
        title={activity.title}
        subtitle={activity.excerpt}
        image={activity.cover}
        imageAlt={activity.title}
        breadcrumbs={[
          { label: "الرئيسية", to: "/" },
          { label: "أنشطتنا", to: "/activities" },
          { label: activity.title },
        ]}
      />

      <section className="py-28 md:py-36 bg-background">
        <div className="container-page grid grid-cols-12 gap-y-14 gap-x-10">
          <article className="col-span-12 lg:col-span-7 space-y-7">
            {activity.body.map((p, i) => (
              <Reveal key={i}>
                <p className="text-lg leading-loose text-foreground/80 text-pretty first:text-xl first:font-medium first:text-foreground">
                  {p}
                </p>
              </Reveal>
            ))}
          </article>

          <aside className="col-span-12 lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-foreground/10 p-8 bg-surface">
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">أبرز الأرقام</div>
              <ul className="mt-6 divide-y divide-foreground/10">
                {activity.highlights.map((h) => (
                  <li key={h} className="py-4 text-sm text-foreground/80">• {h}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24 bg-surface-muted">
        <div className="container-page">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold">من ألبوم النشاط</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {activity.gallery.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-xl ${i === 1 ? "md:col-span-2" : ""}`}
              >
                <img src={g} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold">أنشطةٌ أخرى</h2>
            <Link to="/activities" className="text-sm text-primary">كلّ الأنشطة ←</Link>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link key={a.slug} to="/activities/$slug" params={{ slug: a.slug }} className="group ring-focus rounded-xl overflow-hidden hairline bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={a.cover} alt={a.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{a.date}</div>
                  <h3 className="mt-3 text-base font-semibold">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
