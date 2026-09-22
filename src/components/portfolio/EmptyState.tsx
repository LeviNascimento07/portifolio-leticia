export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-brand-lg border border-dashed border-border px-8 py-14 text-center">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        Em breve — aguardando material de Letícia.
      </p>
    </div>
  );
}
