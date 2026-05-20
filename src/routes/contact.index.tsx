import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { MagneticButton } from "@/components/site/MagneticButton";
import pageContact from "@/assets/page-contact.jpg";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      { title: "تواصل · جمعية الأمان" },
      { name: "description", content: "تواصل مع جمعية الأمان لرعاية وتربية الأيتام في سوقر، ولاية تيارت. هاتف، بريد، وعنوان." },
      { property: "og:title", content: "تواصل · جمعية الأمان" },
    ],
  }),
  component: ContactPage,
});

const cards = [
  { icon: MapPin, label: "العنوان", lines: ["شارع الأمير عبد القادر", "بلدية سوقر، ولاية تيارت ١٤٠٠٠", "الجمهورية الجزائرية"] },
  { icon: Phone, label: "اتّصل بنا", lines: ["‎+213 ٥٥٠ ٠٠ ٠٠ ٠٠‎", "‎+213 ٤٦ ٧٨ ٩٠ ١٢‎ (المقرّ)"] },
  { icon: Mail, label: "البريد", lines: ["contact@alaman-souguer.dz", "كفالة: kafala@alaman-souguer.dz", "تطوّع: volunteer@alaman-souguer.dz"] },
  { icon: Clock, label: "أوقات العمل", lines: ["الأحد — الخميس", "٩:٠٠ صباحًا — ١٧:٠٠ مساءً", "السبت: ٩:٠٠ — ١٣:٠٠"] },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <PageHero
        eyebrow="تواصل"
        title={<>بابُنا مفتوحٌ <br /><span className="italic font-normal text-gold">لكلّ نيّةٍ صادقة.</span></>}
        subtitle="اكتب لنا، اتّصل بنا، أو زرنا في مقرّنا بسوقر. نردّ على كلّ رسالة خلال ٤٨ ساعة عمل."
        image={pageContact}
        imageAlt="مكتب الجمعية وأوراقها"
        breadcrumbs={[{ label: "الرئيسية", to: "/" }, { label: "تواصل" }]}
      />

      <section className="py-24 md:py-32 bg-background">
        <div className="container-page">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {cards.map((c) => (
              <StaggerItem key={c.label} className="bg-card p-8">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-primary-soft">{c.label}</div>
                <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-foreground/75">
                  {c.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-surface">
        <div className="container-page grid grid-cols-12 gap-y-14 gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">رسالة</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1]">
                اكتب لنا، نقرأ كلّ كلمة.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
                سواء كنت ترغب في الكفالة، التطوّع، الشراكة، أو الاستفسار، نردّ على رسالتك شخصيًّا خلال ٤٨ ساعة عمل.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-10 flex items-center gap-3">
                <a aria-label="فيسبوك" href="#" className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-foreground/5"><Facebook className="h-4 w-4" /></a>
                <a aria-label="إنستغرام" href="#" className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-foreground/5"><Instagram className="h-4 w-4" /></a>
                <a aria-label="واتساب" href="#" className="grid h-11 w-11 place-items-center rounded-full hairline hover:bg-foreground/5"><MessageCircle className="h-4 w-4" /></a>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <form onSubmit={handle} className="rounded-2xl bg-card p-8 md:p-10 hairline space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="الاسم الكامل" id="name" type="text" required />
                  <Field label="البريد الإلكتروني" id="email" type="email" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="رقم الهاتف" id="phone" type="tel" />
                  <Field label="الموضوع" id="subject" type="text" required />
                </div>
                <div>
                  <label htmlFor="msg" className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">رسالتك</label>
                  <textarea
                    id="msg"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">{sent ? "✓ تمّ استلام رسالتك، سنعود إليك قريبًا." : "نلتزم بسرّية كاملة لمعلوماتك."}</span>
                  <MagneticButton variant="primary" icon={<Send className="h-4 w-4" />}>إرسال</MagneticButton>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20">
          <div className="mb-10">
            <Reveal><span className="text-[11px] uppercase tracking-[0.3em] text-primary-soft">الموقع</span></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-6 text-[clamp(1.85rem,3.5vw,2.5rem)] font-semibold">تجدنا في قلب سوقر.</h2>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
              <iframe
                title="موقع جمعية الأمان على الخريطة"
                src="https://www.openstreetmap.org/export/embed.html?bbox=1.4500%2C35.1700%2C1.5300%2C35.2100&layer=mapnik&marker=35.1898%2C1.4889"
                className="absolute inset-0 h-full w-full grayscale-[0.2] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
