import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      aria-label="Voltar ao topo da página"
      className="press-deep shadow-soft animate-rise fixed bottom-5 left-5 z-[60] grid size-12 place-items-center rounded-full border border-cream/20 bg-ink/80 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:bottom-8 md:left-8"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  );
}
