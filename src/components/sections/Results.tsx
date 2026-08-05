import { useEffect, useState } from "react";
import { METRICS } from "@/lib/content";
import { useInView } from "@/hooks/use-in-view";

function formatValue(value: number, format: "compact" | "plain") {
  if (format === "plain") return Math.round(value).toString();
  const rounded = Math.round(value);
  if (rounded >= 1_000_000) return `${(rounded / 1_000_000).toFixed(1).replace(".", ",")}M`;
  if (rounded >= 1_000) return `${Math.round(rounded / 1_000)}K`;
  return rounded.toString();
}

function Counter({
  target,
  format,
  active,
}: {
  target: number;
  format: "compact" | "plain";
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return <>{formatValue(value, format)}</>;
}

export function Results() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section
      id="resultados"
      className="relative overflow-hidden bg-ink py-24 md:py-36"
      aria-labelledby="resultados-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-gradient-plum opacity-25 blur-[120px]"
      />
      <div ref={ref} className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Resultados</p>
          <h2
            id="resultados-title"
            className="font-heading mt-5 text-[clamp(2rem,5.5vw,3.75rem)] leading-[0.95] text-cream"
          >
            Números que contam histórias
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={`rounded-brand-lg border border-cream/10 bg-cream/[0.04] px-7 py-10 text-center ${
                inView ? "animate-odometer" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 130}ms` }}
            >
              <p className="font-display text-[clamp(2.75rem,7vw,4rem)] leading-none text-gradient-gold">
                <Counter target={metric.value} format={metric.format} active={inView} />
                {metric.suffix}
              </p>
              <p className="mt-5 text-[0.68rem] tracking-[0.28em] text-cream/60 uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
