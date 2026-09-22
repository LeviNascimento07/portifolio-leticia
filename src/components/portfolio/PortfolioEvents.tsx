import { useState } from "react";
import { EVENT_CATEGORIES, EVENTS, type EventCategory } from "@/lib/portfolio-content";
import { EmptyState } from "@/components/portfolio/EmptyState";
import { BlurImage } from "@/components/ui/blur-image";

export function PortfolioEvents() {
  const [filter, setFilter] = useState<"Todos" | EventCategory>("Todos");

  const visible = EVENTS.filter((e) => e.imageAuthorized).filter(
    (e) => filter === "Todos" || e.category === filter,
  );

  return (
    <section
      id="eventos"
      className="relative overflow-hidden bg-ink py-24 md:py-36"
      aria-labelledby="eventos-title"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Além das redes sociais</p>
          <h2
            id="eventos-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-cream"
          >
            Outros eventos
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cream/60">
            Também transformo momentos reais em histórias através de fotos e vídeos — aniversários,
            chás revelação, partos e outras celebrações.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Filtrar por categoria">
          {(["Todos", ...EVENT_CATEGORIES] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`rounded-full px-6 py-2.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-all ${
                filter === item
                  ? "bg-gradient-gold text-ink shadow-gold"
                  : "border border-cream/20 text-cream/60 hover:border-gold hover:text-gold"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-10">
            <EmptyState label="Fotos e vídeos de eventos (com autorização de uso de imagem)" />
          </div>
        ) : (
          <div className="mt-10 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
            {visible.flatMap((event) =>
              event.photos.map((photo, i) => (
                <figure
                  key={`${event.title}-${i}`}
                  className="overflow-hidden rounded-brand break-inside-avoid shadow-lift"
                >
                  <BlurImage
                    src={photo}
                    alt={event.title}
                    containerClassName="w-full"
                    className="w-full object-cover"
                  />
                </figure>
              )),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
