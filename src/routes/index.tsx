import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";

const TITLE = "Letícia Cavalcante Sousa | Social Media & Filmmaker";
const DESCRIPTION =
  "Estratégia digital, criação de conteúdo e produção audiovisual. Cobertura de eventos, casamentos e partos com sensibilidade e profissionalismo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Packages />
      <Results />
      <Portfolio />
      <Contact />
    </main>
  );
}
