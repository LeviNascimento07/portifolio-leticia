import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { HERO_DECK } from "@/lib/content";
import { BlurImage } from "@/components/ui/blur-image";

const TAGS = ["conteúdo", "estratégia", "criatividade", "resultados"];
const AUTO_ADVANCE_MS = 5000;

export function PortfolioHero() {
  const [index, setIndex] = useState(0);
  const hasCarousel = HERO_DECK.length > 1;

  // Autoplay do carrossel de foto do Hero — reinicia sempre que o índice muda (inclusive por
  // clique manual), pra não trocar de novo logo em seguida de um clique.
  useEffect(() => {
    if (!hasCarousel) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % HERO_DECK.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [hasCarousel, index]);

  const advance = () => {
    if (!hasCarousel) return;
    setIndex((current) => (current + 1) % HERO_DECK.length);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink pb-24 pt-32 md:pb-32 md:pt-40"
      aria-label="Apresentação"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 size-[32rem] rounded-full bg-gold/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-nude/10 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <p className="eyebrow text-gold">Estratégia + Conteúdo + Resultados</p>
          <h1 className="mt-6 font-heading text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.95] text-cream">
            Marcas reais,
            <br />
            <span className="text-gradient-gold">resultados reais.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-cream/70 sm:text-lg">
            Social Media, Content Creator e Videomaker, especializada em transformar ideias em
            presença digital que conecta, engaja e vende.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/30 px-4 py-1.5 text-[0.65rem] tracking-[0.2em] text-gold uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#planejamentos"
              className="press-deep shadow-gold inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-xs font-semibold tracking-widest text-ink uppercase"
            >
              Conheça meu trabalho
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-8 py-4 text-xs font-semibold tracking-widest text-cream/80 uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Vamos conversar
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 hidden h-full w-full rounded-brand-lg border border-gold/30 sm:block"
          />
          <button
            type="button"
            onClick={advance}
            disabled={!hasCarousel}
            aria-label={hasCarousel ? "Ver próxima foto" : undefined}
            className={`relative block w-full ${hasCarousel ? "cursor-pointer" : "cursor-default"}`}
          >
            {HERO_DECK.map((src, i) => (
              <BlurImage
                key={src}
                src={src}
                alt="Letícia Cavalcante Sousa"
                containerClassName={`aspect-[4/5] w-full rounded-brand-lg transition-opacity duration-700 ease-out ${
                  i === index ? "relative opacity-100" : "absolute inset-0 opacity-0"
                }`}
                className="size-full rounded-brand-lg object-cover shadow-lift"
              />
            ))}
          </button>
          {hasCarousel && (
            <div
              aria-hidden="true"
              className="absolute bottom-4 right-4 flex gap-1.5 rounded-full bg-ink/40 px-2.5 py-1.5 backdrop-blur-sm"
            >
              {HERO_DECK.map((src, i) => (
                <span
                  key={src}
                  className={`size-1.5 rounded-full transition-colors ${
                    i === index ? "bg-gold" : "bg-cream/40"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="absolute -bottom-6 left-4 rounded-brand bg-gradient-ink px-6 py-4 shadow-lift sm:left-8">
            <p className="font-display text-lg italic text-gold-soft">
              "Mais que posts. Conexões reais."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
