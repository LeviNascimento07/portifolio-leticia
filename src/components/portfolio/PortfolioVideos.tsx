import { useState } from "react";
import { ArrowUpRight, Clapperboard, Images, Play } from "lucide-react";
import { PORTFOLIO_VIDEOS } from "@/lib/portfolio-content";
import { InstagramEmbedDialog } from "@/components/portfolio/InstagramEmbedDialog";

export function PortfolioVideos() {
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section id="videos" className="bg-background py-24 md:py-36" aria-labelledby="videos-title">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Portfólio em vídeo</p>
          <h2
            id="videos-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Vídeos que já criei para marcas reais.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Uma seleção de Reels e publicações disponíveis no Instagram. Cada conteúdo é exibido
            aqui mesmo, sem redirecionar quem visita o site.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {PORTFOLIO_VIDEOS.map((brand) => (
            <article
              key={brand.slug}
              className="group rounded-brand-lg border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift"
            >
              <p className="eyebrow text-gold">Conteúdos no Instagram</p>
              <h3 className="mt-4 font-display text-2xl text-foreground">{brand.client}</h3>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {brand.items.map((item, index) => {
                  const isReel = item.type === "Reel";
                  const Icon = isReel ? Clapperboard : Images;

                  return (
                    <button
                      key={item.url}
                      type="button"
                      onClick={() =>
                        setSelectedVideo({
                          url: item.url,
                          title: `${item.type} ${index + 1} — ${brand.client}`,
                        })
                      }
                      aria-label={`Reproduzir ${item.type.toLowerCase()} ${index + 1} de ${brand.client}`}
                      className="press-deep group/item relative min-h-44 overflow-hidden rounded-brand bg-gradient-luxe p-4 text-left text-cream"
                    >
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 px-2.5 py-1 text-[0.6rem] font-semibold tracking-[0.14em] uppercase">
                        <Icon className="size-3" aria-hidden="true" />
                        {item.type}
                      </span>
                      <span className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100" />
                      <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-gold text-ink transition-transform duration-500 group-hover/item:scale-110">
                        {isReel ? (
                          <Play className="size-5 fill-current" aria-hidden="true" />
                        ) : (
                          <ArrowUpRight className="size-5" aria-hidden="true" />
                        )}
                      </span>
                      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold tracking-[0.14em] text-gold-soft uppercase">
                        {isReel ? "Assistir" : "Abrir"}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        {selectedVideo && (
          <InstagramEmbedDialog
            url={selectedVideo.url}
            title={selectedVideo.title}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </section>
  );
}
