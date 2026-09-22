import { createFileRoute } from "@tanstack/react-router";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioAbout } from "@/components/portfolio/PortfolioAbout";
import { PortfolioServices } from "@/components/portfolio/PortfolioServices";
import { PortfolioBrands } from "@/components/portfolio/PortfolioBrands";
import { PortfolioPlanning } from "@/components/portfolio/PortfolioPlanning";
import { PortfolioEvents } from "@/components/portfolio/PortfolioEvents";
import { PortfolioResults } from "@/components/portfolio/PortfolioResults";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { EMAIL_ADDRESS, WHATSAPP_NUMBER } from "@/lib/content";

const TITLE = "Portfólio | Letícia Sousa";
const DESCRIPTION =
  "Portfólio de Letícia Sousa — Social Media, Content Creator e Videomaker. Planejamentos de conteúdo, estratégia, posts, legendas e resultados reais para marcas.";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Letícia Sousa",
          jobTitle: "Social Media, Content Creator e Videomaker",
          email: `mailto:${EMAIL_ADDRESS}`,
          telephone: `+${WHATSAPP_NUMBER}`,
          description: DESCRIPTION,
        }),
      },
    ],
  }),
  component: PortfolioIndexPage,
});

function PortfolioIndexPage() {
  return (
    <main className="bg-background">
      <PortfolioHero />
      <PortfolioAbout />
      <PortfolioServices />
      <PortfolioBrands />
      <PortfolioPlanning />
      <PortfolioEvents />
      <PortfolioResults />
      <PortfolioContact />
    </main>
  );
}
