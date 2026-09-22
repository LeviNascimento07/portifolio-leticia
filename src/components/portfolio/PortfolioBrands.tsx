import { CONTENT_PLANS } from "@/lib/portfolio-content";

export function PortfolioBrands() {
  return (
    <section id="marcas" className="bg-background py-24 md:py-36" aria-labelledby="marcas-title">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-gold">Marcas atendidas</p>
        <h2
          id="marcas-title"
          className="font-heading mt-5 text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] text-foreground"
        >
          Marcas com as quais já trabalhei
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CONTENT_PLANS.map((plan) => (
            <div
              key={plan.slug}
              className="group grid aspect-[3/2] place-items-center rounded-brand border border-border bg-card px-4 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-gold/[0.04] hover:shadow-lift"
            >
              <p className="text-center text-sm font-medium text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                {plan.client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
