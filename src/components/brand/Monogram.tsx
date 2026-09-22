export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative grid size-11 shrink-0 place-items-center rounded-full bg-gradient-ink shadow-soft ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-[3px] rounded-full hairline-gold" />
      <span className="font-display text-base leading-none text-cream">
        L<span className="text-gold">C</span>
      </span>
    </span>
  );
}
