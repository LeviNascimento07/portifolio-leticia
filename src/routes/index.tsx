import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFloat } from "@/components/brand/WhatsAppFloat";
import { CookieBanner } from "@/components/brand/CookieBanner";
import { BackToTop } from "@/components/brand/BackToTop";
import { CONTACTS, EMAIL_ADDRESS, SERVICES, WHATSAPP_NUMBER } from "@/lib/content";

const TITLE = "Letícia Cavalcante Sousa | Social Media & Filmmaker";
const DESCRIPTION =
  "Estratégia digital, criação de conteúdo e produção audiovisual. Gestão de redes sociais, reels e cobertura de eventos, casamentos e partos em Fortaleza.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&h=630&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "social media, gestão de redes sociais, filmmaker, storymaker, cobertura de casamento, cobertura de parto, reels, Fortaleza",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:site_name", content: "Letícia Cavalcante Sousa" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Letícia Cavalcante Sousa — Social Media, Storymaker e Filmmaker",
      },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: "Letícia Cavalcante Sousa",
              jobTitle: "Social Media, Storymaker e Filmmaker",
              email: `mailto:${EMAIL_ADDRESS}`,
              telephone: `+${WHATSAPP_NUMBER}`,
              image: OG_IMAGE,
              sameAs: [CONTACTS.instagram],
              description: DESCRIPTION,
            },
            {
              "@type": "LocalBusiness",
              name: "Letícia Cavalcante Sousa — Social Media & Audiovisual",
              description: DESCRIPTION,
              image: OG_IMAGE,
              email: EMAIL_ADDRESS,
              telephone: `+${WHATSAPP_NUMBER}`,
              priceRange: "$$",
              areaServed: { "@type": "Place", name: "Brasil" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fortaleza",
                addressRegion: "CE",
                addressCountry: "BR",
              },
              sameAs: [CONTACTS.instagram],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Serviços",
                itemListElement: SERVICES.map((service) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: service.title },
                })),
              },
            },
          ],
        }),
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
      <WhatsAppFloat />
      <BackToTop />
      <CookieBanner />
    </main>
  );
}
