import { ABOUT_IMAGE } from "@/lib/content";
import { ABOUT_INDICATORS } from "@/lib/portfolio-content";
import { BlurImage } from "@/components/ui/blur-image";
import { useInView } from "@/hooks/use-in-view";

export function PortfolioAbout() {
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
          <BlurImage
            src={ABOUT_IMAGE}
            alt="Letícia Cavalcante Sousa em sessão de trabalho"
            containerClassName="relative aspect-[4/5] w-full rounded-brand-lg"
            className="size-full rounded-brand-lg object-cover shadow-soft"
          />
        </div>

        <div>
          <p className="eyebrow text-gold">Sobre mim</p>
          <h2
            id="sobre-title"
            className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-foreground"
          >
            Olá, eu sou <span className="text-gold">Letícia Sousa!</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sou Social Media, Content Creator e Videomaker, com experiência em gestão de redes
            sociais, criação de conteúdo, produção de vídeos, fotografia, copywriting e planejamento
            estratégico. Já atuei com marcas de diferentes segmentos, ajudando negócios a se
            posicionarem no digital de forma estratégica, criativa e autêntica.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {ABOUT_INDICATORS.map((item) => (
              <li
                key={item.title}
                className="rounded-brand border border-border bg-card px-5 py-4 shadow-soft"
              >
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
