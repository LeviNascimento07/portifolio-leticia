import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTACTS, EMAIL_ADDRESS, INSTAGRAM_HANDLE } from "@/lib/content";
import { Monogram } from "@/components/brand/Monogram";

const LINKS = [
  { href: CONTACTS.instagram, label: "Instagram", icon: Instagram, hint: INSTAGRAM_HANDLE },
  { href: CONTACTS.whatsapp, label: "WhatsApp", icon: MessageCircle, hint: "(85) 99909-9175" },
  { href: CONTACTS.email, label: "E-mail", icon: Mail, hint: EMAIL_ADDRESS },
  {
    href: "https://maps.google.com/?q=Fortaleza,CE",
    label: "Localização",
    icon: MapPin,
    hint: "Fortaleza — CE",
  },
];

export function PortfolioContact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-ink-soft py-24 md:py-36"
      aria-labelledby="contato-title"
    >
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <p className="eyebrow text-gold-soft">Contato</p>
        <h2
          id="contato-title"
          className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[1] text-cream"
        >
          Sua marca também pode <span className="text-gradient-gold">ir mais longe.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70">
          Entre em contato e vamos criar grandes resultados juntos.
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-brand border border-cream/15 bg-cream/[0.06] px-6 py-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-gold/50 hover:bg-cream/[0.1]"
            >
              <link.icon
                aria-hidden="true"
                className="mx-auto size-5 text-gold transition-transform duration-500 group-hover:scale-110"
              />
              <p className="mt-4 text-sm font-medium text-cream">{link.label}</p>
              <p className="mt-1 break-words text-xs text-cream/50">{link.hint}</p>
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-cream/10 pt-10">
          <Monogram />
          <p className="font-display text-lg text-cream/80">Letícia Cavalcante Sousa</p>
          <p className="text-[0.62rem] tracking-[0.28em] text-cream/40 uppercase">
            Social Media • Content Creator • Videomaker
          </p>

          <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              { href: "#top", label: "Início" },
              { href: "#sobre", label: "Sobre mim" },
              { href: "#servicos", label: "Serviços" },
              { href: "#marcas", label: "Marcas atendidas" },
              { href: "#planejamentos", label: "Posts" },
              { href: "#videos", label: "Vídeos" },
              { href: "#eventos", label: "Eventos" },
              { href: "#resultados", label: "Resultados" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-cream/50 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            to="/privacidade"
            className="text-xs text-cream/50 underline transition-colors hover:text-gold"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </section>
  );
}
