import { useState } from "react";
import { ArrowUpRight, Folder, Plus } from "lucide-react";
import { CONTENT_PLANS } from "@/lib/portfolio-content";
import { BlurImage } from "@/components/ui/blur-image";
import { PlanPostLightbox } from "@/components/portfolio/PlanPostLightbox";

export function PortfolioPlanning() {
  // Cada card já mostra a explicação da empresa + as fotos direto, sem precisar clicar em nada
  // pra ver — a pedido de Letícia (o modelo antigo de "Ver planejamento" levava pra uma página à
  // parte com seções tipo Estratégia/Calendário que ela achou confuso). O lightbox aqui é só um
  // zoom opcional na foto, não uma página nova.
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null);
  const openPlan = CONTENT_PLANS.find((p) => p.slug === lightbox?.slug);

  return (
    <section
      id="planejamentos"
      className="bg-background py-24 md:py-36"
      aria-labelledby="planejamentos-title"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Apresentação de Posts</p>
          <h2
            id="planejamentos-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Posts que já criei para marcas reais.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Uma amostra dos posts que já desenvolvi para diferentes marcas — o conteúdo pronto que
            fica no feed de cada uma delas.
          </p>
        </div>

        <div className="mt-20">
          <p className="eyebrow text-gold">Posts por marca</p>
          <p className="mt-3 text-sm text-muted-foreground">Veja alguns exemplos por marca.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENT_PLANS.map((plan) => (
              <article
                key={plan.slug}
                className="flex flex-col rounded-brand-lg border border-border bg-card p-7 shadow-soft transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift"
              >
                <Folder className="size-8 text-gold" aria-hidden="true" />
                <p className="mt-5 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
                  {plan.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-foreground">{plan.client}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                {plan.posts.length > 0 && (
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {plan.posts.slice(0, 3).map((post, i) => (
                      <button
                        key={post.image}
                        type="button"
                        onClick={() => setLightbox({ slug: plan.slug, index: i })}
                        aria-label={`Ver foto ${i + 1} de ${plan.client} em tamanho maior`}
                        className="press-deep overflow-hidden rounded-brand"
                      >
                        <BlurImage
                          src={post.image ?? ""}
                          alt={`Post de ${plan.client}`}
                          containerClassName="aspect-square w-full"
                          className="size-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}

            <div className="flex flex-col items-center justify-center gap-3 rounded-brand-lg border border-dashed border-border p-7 text-center text-muted-foreground">
              <Plus className="size-6" aria-hidden="true" />
              <span className="text-xs tracking-wide uppercase">Nova marca em breve</span>
            </div>
          </div>
        </div>

        {openPlan && lightbox && (
          <PlanPostLightbox
            posts={openPlan.posts}
            index={lightbox.index}
            onIndexChange={(index) => setLightbox({ slug: openPlan.slug, index })}
            onClose={() => setLightbox(null)}
          />
        )}

        <div className="mt-24 rounded-brand-lg bg-gradient-luxe p-10 text-center shadow-lift sm:p-14">
          <p className="font-display text-2xl italic text-cream sm:text-3xl">
            "Cada conteúdo começa com uma estratégia."
          </p>
          <a
            href="#contato"
            className="press-deep mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-xs font-semibold tracking-widest text-ink uppercase"
          >
            Quero criar meu conteúdo
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
