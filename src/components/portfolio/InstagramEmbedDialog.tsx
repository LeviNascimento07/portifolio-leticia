import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

function getEmbedUrl(url: string) {
  const instagramUrl = new URL(url);
  const path = instagramUrl.pathname.replace(/\/$/, "");
  return `https://www.instagram.com${path}/embed/`;
}

export function InstagramEmbedDialog({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Conteúdo do Instagram incorporado. Pressione Esc para fechar.
          </DialogPrimitive.Description>

          <DialogPrimitive.Close
            aria-label="Fechar vídeo"
            className="press-deep absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-cream/25 bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="h-[min(82vh,680px)] w-full max-w-[540px] overflow-hidden rounded-brand bg-card shadow-lift">
            <iframe
              key={url}
              src={getEmbedUrl(url)}
              title={title}
              className="size-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
