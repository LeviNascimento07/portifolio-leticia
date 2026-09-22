import { ABOUT_IMAGE } from "@/lib/content";
import { useInView } from "@/hooks/use-in-view";

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="sobre" className="bg-background py-24 md:py-36" aria-labelledby="sobre-title">
      <div
        ref={ref}
        className={`mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-24 ${
          inView ? "animate-rise" : "opacity-0"
        }`}
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 hidden h-full w-full rounded-brand-lg border border-gold/40 sm:block"
          />
          <img
            src={ABOUT_IMAGE}
            alt="Letícia Cavalcante Sousa em sessão de trabalho"
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-brand-lg object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 right-4 rounded-brand bg-gradient-ink px-6 py-4 shadow-lift sm:right-8">
            <p className="font-display text-3xl text-gold-soft">+6</p>
            <p className="text-[0.65rem] tracking-[0.25em] text-cream/70 uppercase">
              anos de estrada
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-gold">Sobre mim</p>
          <h2
            id="sobre-title"
            className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-foreground"
          >
            Estratégia com <span className="text-gold">sensibilidade</span> e olhar autoral
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eu ajudo negócios a fortalecer sua presença digital através de estratégia, criação de
            conteúdo e produção audiovisual profissional. Também ofereço cobertura de eventos,
            casamentos e partos com criatividade, sensibilidade e profissionalismo.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {["Estratégia digital", "Direção criativa", "Produção audiovisual", "Storytelling"].map(
              (item) => (
                <li
                  key={item}
                  className="rounded-brand border border-border bg-card px-5 py-4 text-sm font-medium text-foreground shadow-soft"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
