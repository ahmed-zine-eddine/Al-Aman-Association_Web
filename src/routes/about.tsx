import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { About } from "@/components/site/About";
import { Timeline } from "@/components/site/Timeline";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import pageAbout from "@/assets/page-about.jpg";
import { Compass, Eye, HandHeart, ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن · جمعية الأمان" },
      { name: "description", content: "قصّة جمعية الأمان لرعاية وتربية الأيتام في سوقر: الرسالة، الرؤية، القيم، والقيادة منذ ٢٠٠٩." },
      { property: "og:title", content: "من نحن · جمعية الأمان" },
      { property: "og:description", content: "خمسة عشر عامًا من العطاء في قلب سوقر." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Compass, title: "الرسالة", body: "تأمين بيئة كريمة، آمنة، ومحفّزة لكلّ يتيم في الجهة الغربية للجزائر، عبر برامج التعليم، الصحة، الكفالة، والتمكين." },
  { icon: Eye, title: "الرؤية", body: "أن يصبح كلّ يتيم رعيناه فردًا واقفًا، مستقلًّا، ومُساهمًا في بناء بلده، حاملًا لقيم الكرامة والمسؤولية." },
  { icon: ShieldCheck, title: "القيم", body: "الشفافية، الاحترام، الاستمرارية، والعمل الجماعي بنيّةٍ صادقة. لا نعد بأكثر ممّا نقدر عليه، ونوفّي بكلّ ما نَعد." },
  { icon: HandHeart, title: "الفلسفة", body: "لا نتعامل مع اليتيم كحالة مساعدة، بل كإنسانٍ كامل الحقوق. نمشي معه من الطفولة حتى التخرّج." },
  { icon: Users, title: "الحوكمة", body: "مجلس إدارة منتخب كلّ ثلاث سنوات، تقارير مالية سنوية معتمدة، وانفتاحٌ كامل على المتبرّعين والشركاء." },
  { icon: Sparkles, title: "الأثر", body: "أكثر من ٤٢٠ يتيمًا تحت الرعاية، ٢١ خرّيجًا جامعيًّا، و١٢٠ أمًّا مستقلّة ماليًّا منذ التأسيس." },
];

const team = [
  { name: "الحاج محمّد بوعلام", role: "الرئيس المؤسّس", bio: "أحد مؤسّسي الجمعية عام ٢٠٠٩، أستاذ متقاعد من التعليم الثانوي." },
  { name: "د. خديجة بن صالح", role: "نائبة الرئيس", bio: "طبيبة أطفال، تشرف على البرنامج الصحي منذ ٢٠١٥." },
  { name: "الأستاذ كريم زيتوني", role: "أمين المال", bio: "محاسب معتمد، يضمن شفافية الحسابات أمام الجمعية العامّة." },
  { name: "السيّدة آسيا مزياني", role: "مديرة البرامج", bio: "متخصّصة في علم النفس الاجتماعي، تنسّق برامج الكفالة والدعم." },
];

const numbers = [
  ["+١٥", "سنة عطاء"],
  ["٤٢٠", "يتيم مكفول"],
  ["+٨٠", "متطوّع نشط"],
  ["+١٢", "خرّيج جامعي"],
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title={<>قصّةٌ بدأت بنيّة، <br /><span className="italic font-normal text-gold">وكبرت بقلوب أهل سوقر.</span></>}
        subtitle="منذ عام ٢٠٠٩، تكتب جمعية الأمان فصلًا جديدًا كلّ يوم في حياة الأيتام والأمّهات الأرامل، بصبرٍ، بشفافية، وبإيمانٍ راسخ بأنّ كرامة الطفل أساسُ نهضة المجتمع."
        image={pageAbout}
        imageAlt="ضوء يدخل من نافذة على وجه طفل في مقرّ الجمعية"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "من نحن" }]}
      />

      <About />

      <section className="bg-surface py-32 md:py-40">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">ركائزنا</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">
                ستّ ركائز نبني عليها كلّ قرار.
              </h2>
            </Reveal>
          </div>

          <StaggerGroup className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {pillars.map((p) => (
              <StaggerItem key={p.title} className="bg-card p-10 transition-colors duration-500 hover:bg-background">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{p.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Timeline />

      <Stats />

      <section className="py-32 md:py-40 bg-background">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">
              <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">القيادة</span></Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
                  أربعةُ وجوهٍ تحمل الأمانة.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/65">
                مجلسٌ إداريّ منتخب من أبناء سوقر، يجتمع شهريًّا ويقدّم تقريرًا سنويًّا للجمعية العامّة.
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {team.map((m) => (
              <StaggerItem key={m.name} className="bg-card p-8">
                <div className="aspect-[4/5] w-full rounded-xl bg-gradient-to-br from-primary/15 via-sand to-gold/30 mb-6" />
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary-soft">{m.role}</div>
                <h3 className="mt-3 text-lg font-semibold">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{m.bio}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 border-t border-foreground/10 pt-12">
            {numbers.map(([k, v]) => (
              <Reveal key={v}>
                <div className="text-[clamp(2.5rem,4.5vw,4rem)] font-semibold text-primary leading-none">{k}</div>
                <div className="mt-3 text-sm text-foreground/65">{v}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
