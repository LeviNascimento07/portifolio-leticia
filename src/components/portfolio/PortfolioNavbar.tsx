import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Monogram } from "@/components/brand/Monogram";

const LINKS = [
  { href: "#top", label: "Início" },
  { href: "#sobre", label: "Sobre mim" },
  { href: "#servicos", label: "Serviços" },
  { href: "#marcas", label: "Marcas atendidas" },
  { href: "#planejamentos", label: "Posts" },
  { href: "#eventos", label: "Eventos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#contato", label: "Contato" },
];

export function PortfolioNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onPlanningPage = pathname.startsWith("/portfolio/planejamentos");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || onPlanningPage ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <Link to="/portfolio" hash="top" className="flex min-w-0 items-center gap-3">
          <Monogram />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm text-cream sm:text-base">
              Letícia Sousa
            </span>
            <span className="eyebrow block text-gold/80">
              Social Media · Content Creator · Videomaker
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {LINKS.map((link) => {
            const isPlanningLink = link.href === "#planejamentos";
            return (
              <a
                key={link.href}
                href={onPlanningPage ? `/portfolio${link.href}` : link.href}
                className={`text-xs font-light transition-colors hover:text-gold ${
                  isPlanningLink && onPlanningPage ? "text-gold" : "text-cream/70"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <Link
            to="/"
            className="press-deep shrink-0 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-semibold tracking-wide text-ink uppercase"
          >
            Ver pacotes
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/20 text-cream xl:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div className="animate-rise max-h-[75vh] overflow-y-auto border-t border-cream/10 bg-ink/95 px-5 pb-8 pt-4 backdrop-blur-xl xl:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const isPlanningLink = link.href === "#planejamentos";
              return (
                <a
                  key={link.href}
                  href={onPlanningPage ? `/portfolio${link.href}` : link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 font-display text-2xl transition-colors hover:bg-gold/10 hover:text-gold ${
                    isPlanningLink && onPlanningPage ? "text-gold" : "text-cream/85"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="press-deep mt-3 rounded-full bg-gradient-gold px-6 py-3 text-center text-xs font-semibold tracking-widest text-ink uppercase"
            >
              Ver pacotes e orçamento
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
