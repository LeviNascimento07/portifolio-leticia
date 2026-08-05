import { useState } from "react";
import { ArrowUpRight, Hand } from "lucide-react";
import { HERO_DECK } from "@/lib/content";

export function Hero() {
  const [order, setOrder] = useState(() => HERO_DECK.map((_, i) => i));

  const flip = () => setOrder((prev) => prev.slice(1).concat(prev.slice(0, 1)));

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pb-24 pt-32 md:pb-32 md:pt-40"
      aria-label="Apresentação"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 size-[32rem] rounded-full bg-plum/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-gold/20 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="eyebrow text-gold">Personal Brand • Audiovisual</p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] text-cream">
            Letícia
            <br />
            Cavalcante
            <br />
            <span className="text-gradient-gold">Sousa</span>
          </h1>

          <p className="font-heading mt-7 text-[0.72rem] leading-relaxed text-cream/70 sm:text-sm [letter-spacing:0.3em]">
            Social Media • Storymaker • Filmmaker
          </p>

          <p className="mt-8 max-w-md font-display text-xl italic leading-relaxed text-cream/85 sm:text-2xl">
            “Transformar ideias em conteúdo. Conteúdo em conexão. Conexão em resultado.”
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="press-deep shadow-gold inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-xs font-semibold tracking-widest text-ink uppercase"
            >
              Solicitar Orçamento
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-xs font-semibold tracking-widest text-cream/80 uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Ver portfólio
            </a>
          </div>
        </div>

        <div className="perspective-deep relative mx-auto flex w-full max-w-md justify-center">
          <button
            type="button"
            onClick={flip}
            aria-label="Folhear as fotos do portfólio"
            className="relative block aspect-[4/5] w-full cursor-pointer preserve-3d"
          >
            {HERO_DECK.map((src, index) => {
              const position = order.indexOf(index);
              const rotate = [-1, 5, -7, 10][position] ?? 0;
              return (
                <img
                  key={src}
                  src={src}
                  alt="Trabalho autoral de Letícia Cavalcante Sousa"
                  loading={position === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 size-full rounded-brand-lg object-cover shadow-lift backface-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    zIndex: HERO_DECK.length - position,
                    transform: `translate3d(${position * 14}px, ${position * -10}px, ${position * -60}px) rotate(${rotate}deg) scale(${1 - position * 0.03})`,
                    opacity: position > 3 ? 0 : 1 - position * 0.12,
                    filter: position === 0 ? "none" : "saturate(0.75) brightness(0.8)",
                  }}
                />
              );
            })}
          </button>

          <span className="pointer-events-none absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[0.68rem] tracking-[0.3em] text-cream/50 uppercase">
            <Hand className="size-3.5" /> Clique para folhear
          </span>
        </div>
      </div>
    </section>
  );
}
