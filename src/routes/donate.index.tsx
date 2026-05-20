import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, Building2, HandHeart, HeartHandshake, Landmark, Mail, Plus, Minus, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Stats } from "@/components/site/Stats";
import pageDonate from "@/assets/page-donate.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/donate/")({
  head: () => ({
    meta: [
      { title: "ساهم معنا · جمعية الأمان" },
      { name: "description", content: "طُرق دعم جمعية الأمان: الحساب البنكي، الحساب البريدي، الكفالة، والتطوّع." },
      { property: "og:title", content: "ساهم معنا · جمعية الأمان" },
    ],
  }),
  component: DonatePage,
});

const ways = [
  { icon: HeartHandshake, title: "كفالة شهرية", body: "تكفّل بطفلٍ معيّن بمبلغٍ شهري ثابت، مع تقارير ربع سنوية ومتابعة شخصية." },
  { icon: Banknote, title: "تبرّع لمرّة", body: "ساهم في حملةٍ موسمية أو في برنامجٍ محدّد عبر تحويلٍ بنكي أو بريدي." },
  { icon: HandHeart, title: "تطوّع", body: "انضمّ إلى فريقٍ من ٨٠ متطوّعًا، في الميدان، التعليم، الصحة، أو الإدارة." },
  { icon: Building2, title: "شراكة مؤسّسات", body: "اربط مؤسّستك بالجمعية عبر اتّفاقية شراكة سنوية مع تقارير أثر." },
];

const ladder = [
  { amount: "١٠٠٠ دج", impact: "وجبة شهرية لطفل" },
  { amount: "٣٠٠٠ دج", impact: "حقيبة وأدوات مدرسية" },
  { amount: "٥٠٠٠ دج", impact: "كسوة عيد كاملة" },
  { amount: "١٠٠٠٠ دج", impact: "كفالة شهر كامل" },
  { amount: "٢٥٠٠٠ دج", impact: "شهر من حصص الدعم لخمسة أطفال" },
  { amount: "٥٠٠٠٠ دج", impact: "تجهيز ورشة أمّ بكامل عُدّتها" },
];

const faqs = [
  { q: "كيف أتأكّد أنّ تبرّعي وصل إلى المستحقّين؟", a: "نُرسل لكلّ متبرّع وصل استلامٍ خلال ٤٨ ساعة، ولكلّ كافل تقريرًا ربع سنويًّا يحتوي على صور، تقرير دراسي، وتقرير صحي عن الطفل المكفول." },
  { q: "هل يمكنني اختيار البرنامج الذي يذهب إليه تبرّعي؟", a: "نعم. يمكنك تحديد البرنامج (كفالة، تعليم، صحة، تمكين) في خانة 'موضوع التحويل'، وسنخصّصه له بالكامل." },
  { q: "هل الجمعية معتمدة ومرخّصة؟", a: "نعم، الجمعية مرخّصة منذ ٢٠٠٩ بقرارٍ من والي تيارت تحت رقم ٢٣/٢٠٠٩، وتخضع لتدقيقٍ مالي سنوي." },
  { q: "هل يمكنني التطوّع وأنا خارج سوقر؟", a: "بكلّ تأكيد. لدينا متطوّعون عن بُعد في الترجمة، التصميم، إدارة الشبكات الاجتماعية، والتأطير الأكاديمي عبر الإنترنت." },
  { q: "هل تستقبلون التبرّعات العينية؟", a: "نعم، خصوصًا الكتب المدرسية، الألبسة الجديدة، الأجهزة الإلكترونية. يُرجى التواصل مسبقًا لتنسيق الاستلام." },
];

function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="ساهم معنا"
        title={<>تبرّعٌ واحد <br /><span className="italic font-normal text-gold">يُعيد لطفلٍ ابتسامته.</span></>}
        subtitle="هذه صفحةٌ إعلامية. الجمعية لا تستقبل المدفوعات عبر الموقع، بل عبر الحساب البنكي والبريدي مباشرةً، حرصًا على الشفافية الكاملة."
        image={pageDonate}
        imageAlt="أيادٍ تضع تبرّعات في صندوق خشبي"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "ساهم معنا" }]}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton to="/contact" variant="gold">تواصل لكفالة طفل</MagneticButton>
          <MagneticButton to="/about" variant="ghost" className="text-background border-background/30 hover:border-background/70">من نحن</MagneticButton>
        </div>
      </PageHero>

      <section className="py-28 md:py-36 bg-background">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">طرق الدعم</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.1]">
                أربعةُ طرقٍ للوقوف معنا.
              </h2>
            </Reveal>
          </div>

          <StaggerGroup className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {ways.map((w) => (
              <StaggerItem key={w.title} className="bg-card p-8 transition-colors hover:bg-background">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{w.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-surface">
        <div className="container-page grid grid-cols-12 gap-y-12 gap-x-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">المعلومات البنكية</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
                ثلاث طرقٍ للتحويل.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
                يُرجى إرفاق وصل التحويل مع اسمك الكامل ورقم هاتفك إلى بريد الجمعية، لإصدار وصل استلامٍ رسمي.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7 space-y-4">
            <AccountCard
              icon={Landmark}
              title="الحساب البنكي · بنك الفلاحة والتنمية الريفية (BADR)"
              rib="٠٠٣ ٠٠٣٢٣ ١٤٠٠٠ ٠٠٠ ٢٠/١٤"
              name="جمعية الأمان لرعاية وتربية الأيتام"
              swift="BADRDZAL"
            />
            <AccountCard
              icon={Mail}
              title="الحساب البريدي · بريد الجزائر (CCP)"
              rib="٢٠١٤٠٠٠ ٠٠ مفتاح ١٤"
              name="جمعية الأمان · سوقر"
            />
            <AccountCard
              icon={Banknote}
              title="الدفع المباشر · بمقرّ الجمعية"
              rib="شارع الأمير عبد القادر، سوقر"
              name="من الأحد إلى الخميس · ٩:٠٠ — ١٧:٠٠"
            />
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-background">
        <div className="container-page">
          <div className="max-w-2xl">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">سُلَّم الأثر</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
                ماذا يُحدث تبرّعك؟
              </h2>
            </Reveal>
          </div>
          <StaggerGroup className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
            {ladder.map((l) => (
              <StaggerItem key={l.amount}>
                <div className="grid grid-cols-12 items-center gap-6 py-8">
                  <div className="col-span-5 md:col-span-3 text-2xl md:text-3xl font-semibold text-primary">{l.amount}</div>
                  <div className="col-span-7 md:col-span-8 text-foreground/75 text-base md:text-lg">{l.impact}</div>
                  <div className="hidden md:flex col-span-1 justify-end text-gold"><Sparkles className="h-5 w-5" /></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Stats />

      <section className="py-28 md:py-36 bg-surface">
        <div className="container-page grid grid-cols-12 gap-y-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">أسئلة شائعة</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(1.85rem,3.5vw,2.5rem)] font-semibold leading-[1.1]">
                كلّ ما يدور في خاطرك.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}

function AccountCard({ icon: Icon, title, rib, name, swift }: { icon: typeof Landmark; title: string; rib: string; name: string; swift?: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl bg-card p-7 hairline">
        <div className="flex items-start gap-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold">{title}</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="sm:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">رقم الحساب</div>
                <div className="mt-1.5 font-mono text-foreground/85">{rib}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">باسم</div>
                <div className="mt-1.5 text-foreground/85">{name}</div>
              </div>
              {swift && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">SWIFT</div>
                  <div className="mt-1.5 font-mono text-foreground/85">{swift}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-foreground/10 border-y border-foreground/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-right ring-focus"
            >
              <span className="text-base md:text-lg font-medium text-foreground">{it.q}</span>
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full hairline transition-colors", isOpen && "bg-primary text-primary-foreground")}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-foreground/70 max-w-2xl">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
