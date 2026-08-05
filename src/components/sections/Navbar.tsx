import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Monogram } from "@/components/brand/Monogram";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#resultados", label: "Resultados" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <Monogram />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm text-cream sm:text-base">
              Letícia Cavalcante
            </span>
            <span className="eyebrow block text-gold/80">Social Media</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light text-cream/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="press-deep rounded-full bg-gradient-gold px-6 py-2.5 text-xs font-semibold tracking-wide text-ink uppercase"
          >
            Orçamento
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/20 text-cream lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-rise border-t border-cream/10 bg-ink/95 px-5 pb-8 pt-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-2xl text-cream/85 transition-colors hover:bg-plum/60 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="press-deep mt-3 rounded-full bg-gradient-gold px-6 py-3 text-center text-xs font-semibold tracking-widest text-ink uppercase"
            >
              Solicitar Orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
