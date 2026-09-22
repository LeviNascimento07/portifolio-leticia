import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTACTS, EMAIL_ADDRESS, INSTAGRAM_HANDLE } from "@/lib/content";
import { Monogram } from "@/components/brand/Monogram";
import { ContactForm } from "@/components/sections/ContactForm";

const LINKS = [
  { href: CONTACTS.instagram, label: "Instagram", icon: Instagram, hint: INSTAGRAM_HANDLE },
  { href: CONTACTS.whatsapp, label: "WhatsApp", icon: MessageCircle, hint: "(85) 99909-9175" },
  { href: CONTACTS.email, label: "E-mail", icon: Mail, hint: EMAIL_ADDRESS },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-ink-soft py-24 md:py-36"
      aria-labelledby="contato-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="animate-blob absolute -left-20 top-0 size-[28rem] rounded-full bg-gold/30 blur-[120px]" />
        <span
          className="animate-blob absolute right-0 top-1/3 size-[24rem] rounded-full bg-nude/40 blur-[110px]"
          style={{ animationDelay: "-7s" }}
        />
        <span
          className="animate-blob absolute bottom-0 left-1/3 size-[30rem] rounded-full bg-gold-soft/20 blur-[140px]"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <p className="eyebrow text-gold-soft">Contato</p>
        <h2
          id="contato-title"
          className="mt-6 font-display text-[clamp(2.25rem,7vw,4.5rem)] leading-[1] text-cream"
        >
          Vamos transformar a sua <span className="text-gradient-gold">presença digital.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70">
          Conte sobre o seu projeto e eu retorno com uma proposta feita sob medida para a sua marca.
        </p>

        <a
          href={CONTACTS.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="press-deep shadow-gold mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-10 py-5 text-xs font-semibold tracking-[0.22em] text-ink uppercase"
        >
          Solicitar Orçamento no WhatsApp
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>

        <ContactForm />

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group rounded-brand border border-cream/15 bg-cream/[0.06] px-6 py-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-gold/50 hover:bg-cream/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
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
            Social Media • Storymaker • Filmmaker
          </p>
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
