import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar no WhatsApp"
      className="press-deep shadow-gold fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-gradient-gold px-5 py-4 text-xs font-semibold tracking-widest text-ink uppercase md:bottom-8 md:right-8"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
