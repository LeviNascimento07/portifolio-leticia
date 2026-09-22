import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PhotoCategory } from "@/lib/content";

type Photo = { src: string; category: PhotoCategory; alt: string };

const ICON_BUTTON =
  "press-deep grid size-11 place-items-center rounded-full border border-cream/25 bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  if (!photo) return null;

  const goPrev = () => onIndexChange((index - 1 + photos.length) % photos.length);
  const goNext = () => onIndexChange((index + 1) % photos.length);

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") goPrev();
            if (event.key === "ArrowRight") goNext();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 p-4 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">{photo.alt}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Foto {index + 1} de {photos.length}, categoria {photo.category}. Use as setas do teclado
            para navegar e Esc para fechar.
          </DialogPrimitive.Description>

          <DialogPrimitive.Close
            aria-label="Fechar visualizador de fotos"
            className={`absolute right-4 top-4 z-10 ${ICON_BUTTON}`}
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="pointer-events-none relative flex max-h-[75vh] w-full max-w-4xl items-center justify-center">
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="pointer-events-auto max-h-[75vh] w-auto max-w-full rounded-brand object-contain shadow-lift"
            />
          </div>

          <p className="text-xs tracking-[0.2em] text-cream/60 uppercase">
            {photo.category} — {index + 1} / {photos.length}
          </p>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Foto anterior"
                className={`absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 ${ICON_BUTTON}`}
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima foto"
                className={`absolute right-3 top-1/2 -translate-y-1/2 sm:right-6 ${ICON_BUTTON}`}
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
