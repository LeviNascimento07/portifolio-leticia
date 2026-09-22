import { useState } from "react";
import { Check, Crown, RotateCcw } from "lucide-react";
import { PACKAGES } from "@/lib/content";

function PackageFlipCard({ pkg }: { pkg: (typeof PACKAGES)[number] }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);

  return (
    <article className="perspective-deep group h-[30rem]">
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Voltar à frente do plano ${pkg.name}`
            : `Ver tudo o que está incluso no plano ${pkg.name}`
        }
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        }}
        className={`preserve-3d relative size-full cursor-pointer transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* frente */}
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-brand-lg border border-border bg-card p-9 shadow-soft">
          <h3 className="font-heading text-3xl text-ink">{pkg.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{pkg.tagline}</p>
          <p className="mt-8 font-display text-5xl text-foreground">{pkg.price}</p>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">por mês</p>

          <ul className="mt-8 space-y-3">
            {pkg.items.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <span className="mt-auto flex items-center gap-2 text-[0.65rem] tracking-[0.24em] text-gold uppercase">
            <RotateCcw className="size-3.5" aria-hidden="true" /> Ver tudo incluso
          </span>
        </div>

        {/* verso */}
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-brand-lg bg-gradient-ink p-9 shadow-lift [transform:rotateY(180deg)]">
          <h3 className="font-heading text-2xl text-gold-soft">{pkg.name} — incluso</h3>
          <ul className="mt-6 space-y-3">
            {pkg.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream/85">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className="press-deep mt-auto block rounded-full border border-gold/60 py-3.5 text-center text-xs font-semibold tracking-widest text-gold-soft uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </article>
  );
}

export function Packages() {
  return (
    <section id="pacotes" className="bg-background py-24 md:py-36" aria-labelledby="pacotes-title">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Investimento</p>
          <h2
            id="pacotes-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-foreground"
          >
            Pacotes de social media
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Escolha o nível de presença digital que a sua marca precisa. Toque ou passe o mouse nos
            planos Start e Pro para ver tudo o que está incluso.
          </p>
        </div>

        <div className="mt-20 grid items-center gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) =>
            pkg.featured ? (
              <article
                key={pkg.name}
                className="relative order-first rounded-brand-lg bg-gradient-luxe p-8 shadow-lift lg:order-none lg:-my-8 lg:scale-[1.06] lg:p-10"
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-5 py-2 text-[0.62rem] font-semibold tracking-[0.22em] text-ink uppercase shadow-gold">
                  Mais popular
                </span>
                <Crown className="size-7 text-gold-soft" aria-hidden="true" />
                <h3 className="font-heading mt-6 text-3xl text-cream">{pkg.name}</h3>
                <p className="mt-2 text-sm text-cream/65">{pkg.tagline}</p>
                <p className="mt-6 font-display text-5xl text-gold-soft">{pkg.price}</p>
                <p className="text-xs tracking-[0.2em] text-cream/50 uppercase">por mês</p>

                <ul className="mt-8 space-y-3">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className="press-deep mt-10 block rounded-full bg-gradient-gold py-4 text-center text-xs font-semibold tracking-widest text-ink uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
                >
                  Quero o Premium
                </a>
              </article>
            ) : (
              <PackageFlipCard key={pkg.name} pkg={pkg} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
