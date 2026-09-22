import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { WhatsAppFloat } from "@/components/brand/WhatsAppFloat";
import { CookieBanner } from "@/components/brand/CookieBanner";
import { BackToTop } from "@/components/brand/BackToTop";

// Layout route: compartilha navbar, WhatsApp flutuante, botão de voltar ao topo e banner de
// cookies entre /portfolio e /portfolio/planejamentos/$slug. O conteúdo de /portfolio em si
// (Hero, Sobre, Serviços, etc.) vive em portfolio.index.tsx, renderizado aqui via <Outlet />.
export const Route = createFileRoute("/portfolio")({
  component: PortfolioLayout,
});

function PortfolioLayout() {
  return (
    <>
      <PortfolioNavbar />
      <Outlet />
      <WhatsAppFloat />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
