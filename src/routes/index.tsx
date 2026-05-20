import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Programs } from "@/components/site/Programs";
import { Timeline } from "@/components/site/Timeline";
import { Stats } from "@/components/site/Stats";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "جمعية الأمان لرعاية وتربية الأيتام · سوقر، الجزائر" },
      { name: "description", content: "خمسة عشر عامًا من العطاء: كفالة، تعليم، صحة، وتمكين للأمّهات والأطفال في سوقر، ولاية تيارت." },
      { property: "og:title", content: "جمعية الأمان · سوقر، الجزائر" },
      { property: "og:description", content: "نزرع الأمان في قلب كلّ يتيم." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Timeline />
      <Stats />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
