import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "lcs-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-3xl rounded-brand border border-cream/15 bg-ink/95 p-6 backdrop-blur-xl md:bottom-8 md:left-8 md:right-auto md:max-w-md"
    >
      <p className="text-sm leading-relaxed text-cream/80">
        Usamos cookies para melhorar a sua experiência e entender como o site é usado. Você pode
        aceitar ou recusar os cookies opcionais. Saiba mais na{" "}
        <Link to="/privacidade" className="text-gold underline">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="press-deep rounded-full bg-gradient-gold px-6 py-3 text-xs font-semibold tracking-widest text-ink uppercase"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => decide("rejected")}
          className="rounded-full border border-cream/25 px-6 py-3 text-xs font-semibold tracking-widest text-cream/80 uppercase transition-colors hover:border-gold hover:text-gold"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
