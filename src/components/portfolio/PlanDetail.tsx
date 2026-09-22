import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, FileText, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ContentPlan } from "@/lib/portfolio-content";
import { EmptyState } from "@/components/portfolio/EmptyState";
import { PlanPostLightbox } from "@/components/portfolio/PlanPostLightbox";

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.22em] text-gold uppercase">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground">
        {value ?? <span className="text-muted-foreground">A definir com Letícia.</span>}
      </p>
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.22em] text-gold uppercase">{label}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">A definir com Letícia.</p>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CaptionCard({ caption }: { caption: ContentPlan["captions"][number] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const full = [caption.text, caption.cta, caption.hashtags.map((h) => `#${h}`).join(" ")]
      .filter(Boolean)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — ignora silenciosamente
    }
  };

  return (
    <div className="rounded-brand-lg border border-border bg-card p-6 shadow-soft">
      <p className="text-[0.6rem] tracking-[0.22em] text-gold uppercase">Legenda</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
        {caption.text}
      </p>
      {caption.cta && (
        <p className="mt-3 text-sm font-medium text-foreground">CTA: {caption.cta}</p>
      )}
      {caption.hashtags.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          {caption.hashtags.map((h) => `#${h}`).join(" ")}
        </p>
      )}
      <button
        type="button"
        onClick={copy}
        className="press-deep mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
      >
        {copied ? (
          <>
            <Check className="size-3.5" aria-hidden="true" /> Copiado
          </>
        ) : (
          <>
            <Copy className="size-3.5" aria-hidden="true" /> Copiar legenda
          </>
        )}
      </button>
    </div>
  );
}

export function PlanDetail({ plan }: { plan: ContentPlan }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="bg-background pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        <Link
          to="/portfolio"
          hash="planejamentos"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Voltar aos planejamentos
        </Link>

        <p className="eyebrow mt-8 text-gold">Planejamento de Conteúdo — {plan.category}</p>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] text-foreground">
          {plan.client}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {plan.description}
        </p>

        {/* 01 — Estratégia */}
        <section className="mt-16" aria-labelledby="estrategia-title">
          <h2 id="estrategia-title" className="font-heading text-2xl text-foreground">
            01 — Estratégia
          </h2>
          <div className="mt-6 grid gap-6 rounded-brand-lg border border-border bg-card p-7 shadow-soft sm:grid-cols-2 md:p-9">
            <Field label="Objetivo do planejamento" value={plan.strategy.objective} />
            <Field label="Período" value={plan.strategy.period} />
            <Field label="Objetivo da comunicação" value={plan.strategy.communicationGoal} />
            <Field label="Público-alvo" value={plan.strategy.audience} />
            <TagList label="Pilares de conteúdo" items={plan.strategy.pillars} />
            <TagList label="Temas trabalhados" items={plan.strategy.themes} />
          </div>
        </section>

        {/* 02 — Calendário de Publicações */}
        <section className="mt-16" aria-labelledby="calendario-title">
          <h2 id="calendario-title" className="font-heading text-2xl text-foreground">
            02 — Calendário de Publicações
          </h2>
          {plan.calendar.length === 0 ? (
            <div className="mt-6">
              <EmptyState label="Calendário de publicações (data, formato, tema, objetivo, status)" />
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-brand-lg border border-border shadow-soft">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-card text-[0.62rem] tracking-[0.18em] text-gold uppercase">
                    <th className="px-5 py-4">Data</th>
                    <th className="px-5 py-4">Formato</th>
                    <th className="px-5 py-4">Tema</th>
                    <th className="px-5 py-4">Objetivo</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.calendar.map((entry, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-5 py-4 font-medium text-foreground">{entry.day}</td>
                      <td className="px-5 py-4 text-muted-foreground">{entry.format}</td>
                      <td className="px-5 py-4 text-muted-foreground">{entry.theme}</td>
                      <td className="px-5 py-4 text-muted-foreground">{entry.objective}</td>
                      <td className="px-5 py-4 text-muted-foreground">{entry.status ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 03 — Posts Prontos */}
        <section className="mt-16" aria-labelledby="posts-title">
          <h2 id="posts-title" className="font-heading text-2xl text-foreground">
            03 — Posts Prontos
          </h2>
          {plan.posts.length === 0 ? (
            <div className="mt-6">
              <EmptyState label="Artes dos posts prontos" />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {plan.posts.map((post, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ampliar post: ${post.theme}`}
                  className="group overflow-hidden rounded-brand shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.theme}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
          {lightboxIndex !== null && (
            <PlanPostLightbox
              posts={plan.posts}
              index={lightboxIndex}
              onIndexChange={setLightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </section>

        {/* 04 — Legendas */}
        <section className="mt-16" aria-labelledby="legendas-title">
          <h2 id="legendas-title" className="font-heading text-2xl text-foreground">
            04 — Legendas
          </h2>
          {plan.captions.length === 0 ? (
            <div className="mt-6">
              <EmptyState label="Legendas correspondentes aos posts" />
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {plan.captions.map((caption, i) => (
                <CaptionCard key={i} caption={caption} />
              ))}
            </div>
          )}
        </section>

        {/* 05 — Direcionamento Estratégico */}
        <section className="mt-16" aria-labelledby="direcionamento-title">
          <h2 id="direcionamento-title" className="font-heading text-2xl text-foreground">
            05 — Direcionamento Estratégico
          </h2>
          <div className="mt-6 grid gap-6 rounded-brand-lg border border-border bg-card p-7 shadow-soft sm:grid-cols-2 lg:grid-cols-3 md:p-9">
            <Field label="Objetivo do conteúdo" value={plan.direction.objective} />
            <Field label="Público" value={plan.direction.audience} />
            <Field label="Tom de voz" value={plan.direction.tone} />
            <Field label="CTA" value={plan.direction.cta} />
            <Field label="Pilar de conteúdo" value={plan.direction.pillar} />
          </div>
        </section>

        {/* PDF do planejamento */}
        <section className="mt-16" aria-labelledby="pdf-title">
          <h2 id="pdf-title" className="sr-only">
            Arquivo do planejamento
          </h2>
          {plan.pdf ? (
            <a
              href={plan.pdf.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-4 rounded-brand-lg border border-border bg-card p-6 shadow-soft transition-colors hover:border-gold/50"
            >
              <FileText className="size-8 shrink-0 text-gold" aria-hidden="true" />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  {plan.pdf.label}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-gold">
                  Visualizar PDF
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </span>
              </span>
            </a>
          ) : (
            <div className="flex items-center gap-4 rounded-brand-lg border border-dashed border-border p-6 text-muted-foreground">
              <Plus className="size-6 shrink-0" aria-hidden="true" />
              <span className="text-sm">Adicionar PDF do planejamento completo</span>
            </div>
          )}
        </section>

        <div className="mt-20 text-center">
          <Link
            to="/portfolio"
            hash="contato"
            className="press-deep shadow-gold inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-4 text-xs font-semibold tracking-widest text-ink uppercase"
          >
            Quero criar meu conteúdo
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
