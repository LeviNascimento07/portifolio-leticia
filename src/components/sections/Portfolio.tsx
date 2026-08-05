import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PHOTOS, VIDEOS, type PhotoCategory } from "@/lib/content";

const FILTERS: ("Todos" | PhotoCategory)[] = ["Todos", "Casamento", "Parto", "Eventos"];

export function Portfolio() {
  const [filter, setFilter] = useState<"Todos" | PhotoCategory>("Todos");
  const [active, setActive] = useState(2);

  const photos = filter === "Todos" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  const move = (dir: number) =>
    setActive((prev) => (prev + dir + VIDEOS.length) % VIDEOS.length);

  return (
    <section id="portfolio" className="overflow-hidden bg-background py-24 md:py-36" aria-labelledby="port-title">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-plum-soft">Portfólio</p>
          <h2
            id="port-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Fotos & vídeos
          </h2>
        </div>

        {/* FOTOS */}
        <div className="mt-12 flex flex-wrap gap-3">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-6 py-2.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-all ${
                filter === item
                  ? "bg-gradient-plum text-cream shadow-soft"
                  : "border border-border text-muted-foreground hover:border-plum-soft hover:text-plum"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="group relative overflow-hidden rounded-brand break-inside-avoid shadow-soft"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 text-[0.65rem] tracking-[0.22em] text-cream uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {photo.category}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* VIDEOS — coverflow */}
        <div className="mt-28">
          <h3 className="font-heading text-center text-2xl text-foreground sm:text-3xl">
            Vídeos em destaque
          </h3>

          <div className="perspective-deep relative mt-14 h-[20rem] overflow-hidden sm:h-[26rem]">
            {VIDEOS.map((video, index) => {
              const offset = index - active;
              const abs = Math.abs(offset);
              return (
                <button
                  key={video.title}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Ver ${video.title}`}
                  className="absolute left-1/2 top-0 h-full w-[78%] max-w-xl overflow-hidden rounded-brand-lg shadow-lift transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[56%]"
                  style={{
                    transform: `translateX(calc(-50% + ${offset * 42}%)) translateZ(${-abs * 170}px) rotateY(${offset * -32}deg) scale(${1 - abs * 0.06})`,
                    zIndex: VIDEOS.length - abs,
                    opacity: abs > 2 ? 0 : 1 - abs * 0.25,
                    pointerEvents: abs > 2 ? "none" : "auto",
                  }}
                >
                  <img
                    src={video.thumb}
                    alt={video.title}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-gold text-ink shadow-gold">
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
              className="press-deep grid size-12 place-items-center rounded-full border border-border text-plum transition-colors hover:border-plum hover:bg-plum hover:text-cream"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
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
              className="press-deep grid size-12 place-items-center rounded-full border border-border text-plum transition-colors hover:border-plum hover:bg-plum hover:text-cream"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
