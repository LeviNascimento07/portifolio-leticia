import { useState } from "react";
import { RESULTS_PHOTOS } from "@/lib/portfolio-content";
import { BlurImage } from "@/components/ui/blur-image";
import { PlanPostLightbox } from "@/components/portfolio/PlanPostLightbox";
import { EmptyState } from "@/components/portfolio/EmptyState";

export function PortfolioResults() {
  // Só mostra marca que já tem print de resultado real — Letícia pediu pra tirar quem não tem
  // (em vez do card vazio "Adicionar imagem" de antes). Quem tem mais de 1 print mostra uma
  // mini-grade clicável (mesmo padrão do lightbox usado em "Posts por marca").
  const accounts = RESULTS_PHOTOS.filter((p) => p.images.length > 0);
  const [lightbox, setLightbox] = useState<{ account: string; index: number } | null>(null);
  const openAccount = accounts.find((p) => p.account === lightbox?.account);
  const lightboxPosts = openAccount?.images.map((image) => ({
    image,
    format: "Print",
    theme: openAccount.account,
    objective: "",
  }));

  return (
    <section
      id="resultados"
      className="bg-background py-24 md:py-36"
      aria-labelledby="resultados-title"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Resultados</p>
          <h2
            id="resultados-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Números que comprovam
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Prints reais de alcance e crescimento retirados do Instagram Insights e do Meta Business
            Suite de cada marca.
          </p>
        </div>

        {accounts.length === 0 ? (
          <div className="mt-10">
            <EmptyState label="Prints de resultado (Instagram Insights / Meta Business Suite)" />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {accounts.map((item) => (
              <div key={item.account} className="overflow-hidden rounded-brand-lg shadow-soft">
                <div
                  className={`grid gap-0.5 ${item.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
                >
                  {item.images.slice(0, 4).map((image, i) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setLightbox({ account: item.account, index: i })}
                      aria-label={`Ver print ${i + 1} de ${item.account} em tamanho maior`}
                      className="press-deep"
                    >
                      <BlurImage
                        src={image}
                        alt={`Resultados de ${item.account}`}
                        containerClassName="aspect-[4/3] w-full"
                        className="size-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div className="bg-card px-5 py-3">
                  <p className="text-sm font-semibold text-foreground">{item.account}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {lightboxPosts && lightbox && (
          <PlanPostLightbox
            posts={lightboxPosts}
            index={lightbox.index}
            onIndexChange={(index) => setLightbox({ account: lightbox.account, index })}
            onClose={() => setLightbox(null)}
          />
        )}
      </div>
    </section>
  );
}
