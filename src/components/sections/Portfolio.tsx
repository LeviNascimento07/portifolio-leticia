import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PHOTOS, VIDEOS, type PhotoCategory } from "@/lib/content";
import { BlurImage } from "@/components/ui/blur-image";
import { PhotoLightbox } from "@/components/sections/PhotoLightbox";

const FILTERS: ("Todos" | PhotoCategory)[] = ["Todos", "Casamento", "Parto", "Eventos"];

export function Portfolio() {
  const [filter, setFilter] = useState<"Todos" | PhotoCategory>("Todos");
  const [active, setActive] = useState(2);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = filter === "Todos" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  const move = (dir: number) => setActive((prev) => (prev + dir + VIDEOS.length) % VIDEOS.length);

  return (
    <section
      id="portfolio"
      className="overflow-hidden bg-background py-24 md:py-36"
      aria-labelledby="port-title"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Portfólio</p>
          <h2
            id="port-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Fotos & vídeos
          </h2>
        </div>

        {/* FOTOS */}
        <div
          className="mt-12 flex flex-wrap gap-3"
          role="group"
          aria-label="Filtrar fotos por categoria"
        >
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setFilter(item);
                setLightboxIndex(null);
              }}
              aria-pressed={filter === item}
              className={`rounded-full px-6 py-2.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${
                filter === item
                  ? "bg-gradient-ink text-cream shadow-soft"
                  : "border border-border text-muted-foreground hover:border-gold hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Ampliar foto: ${photo.alt}`}
              className="group relative block w-full overflow-hidden rounded-brand break-inside-avoid shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              <BlurImage
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                containerClassName="w-full"
                className="w-full object-cover group-hover:scale-105"
                style={{ aspectRatio: ["3 / 4", "1 / 1", "4 / 5"][index % 3] }}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-left text-[0.65rem] tracking-[0.22em] text-cream uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {photo.category}
              </span>
            </button>
          ))}
        </div>

        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={photos}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}

        {/* VIDEOS — coverflow */}
        <div className="mt-28">
          <h3 className="font-heading text-center text-2xl text-foreground sm:text-3xl">
            Vídeos em destaque
          </h3>

          <div
            role="region"
            aria-label="Carrossel de vídeos em destaque, use as setas do teclado para navegar"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") move(-1);
              if (event.key === "ArrowRight") move(1);
            }}
            className="perspective-deep relative mt-14 h-[20rem] overflow-hidden rounded-brand-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 sm:h-[26rem]"
          >
            {VIDEOS.map((video, index) => {
              const offset = index - active;
              const abs = Math.abs(offset);
              return (
                <button
                  key={video.title}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Ver vídeo: ${video.title} (${video.kind})`}
                  className="absolute left-1/2 top-0 h-full w-[78%] max-w-xl overflow-hidden rounded-brand-lg shadow-lift transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 sm:w-[56%]"
                  style={{
                    transform: `translateX(calc(-50% + ${offset * 42}%)) translateZ(${-abs * 170}px) rotateY(${offset * -32}deg) scale(${1 - abs * 0.06})`,
                    zIndex: VIDEOS.length - abs,
                    opacity: abs > 2 ? 0 : 1 - abs * 0.25,
                    pointerEvents: abs > 2 ? "none" : "auto",
                  }}
                >
                  <BlurImage
                    src={video.thumb}
                    alt={`Miniatura do vídeo ${video.title}`}
                    loading="lazy"
                    containerClassName="size-full"
                    className="size-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold"
                  >
                    <Play className="size-6" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <span className="block text-[0.6rem] tracking-[0.28em] text-gold uppercase">
                      {video.kind}
                    </span>
                    <span className="mt-2 block font-display text-xl text-cream sm:text-2xl">
                      {video.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Vídeo anterior"
              className="press-deep grid size-12 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {VIDEOS.map((video, index) => (
                <span
                  key={video.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === active ? "w-8 bg-gradient-gold" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Próximo vídeo"
              className="press-deep grid size-12 place-items-center rounded-full border border-border text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
