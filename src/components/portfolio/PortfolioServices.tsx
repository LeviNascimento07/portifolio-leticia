import { WHAT_I_DO } from "@/lib/portfolio-content";

export function PortfolioServices() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-ink py-24 md:py-36"
      aria-labelledby="servicos-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">O que eu faço</p>
          <h2
            id="servicos-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,4rem)] leading-[0.95] text-cream"
          >
            Do planejamento ao resultado
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_I_DO.map((service) => (
            <article
              key={service.title}
              className="rounded-brand-lg border border-cream/10 bg-cream/[0.04] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-cream/[0.07]"
            >
              <h3 className="font-display text-xl leading-tight text-cream">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
