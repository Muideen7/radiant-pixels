import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Testimonial } from "@/components/site/Testimonial";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "North&Co — Independent Design & Development Studio" },
      {
        name: "description",
        content:
          "An award-winning studio crafting brand systems, digital products and immersive web experiences for the world's most ambitious teams.",
      },
      { property: "og:title", content: "North&Co — Independent Design & Development Studio" },
      {
        property: "og:description",
        content: "Brand · Product · Web · Motion. Lisbon-based, globally engaged.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-paper text-ink overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Process />
      <Testimonial />
      <Footer />
    </main>
  );
}
