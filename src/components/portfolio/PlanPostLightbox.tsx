import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PlanPost } from "@/lib/portfolio-content";

const ICON_BUTTON =
  "press-deep grid size-11 place-items-center rounded-full border border-cream/25 bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

export function PlanPostLightbox({
  posts,
  index,
  onIndexChange,
  onClose,
}: {
  posts: PlanPost[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const post = posts[index];
  if (!post) return null;

  const goPrev = () => onIndexChange((index - 1 + posts.length) % posts.length);
  const goNext = () => onIndexChange((index + 1) % posts.length);

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
          <DialogPrimitive.Title className="sr-only">
            {post.theme || post.format}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Post {index + 1} de {posts.length}. Use as setas do teclado para navegar e Esc para
            fechar.
          </DialogPrimitive.Description>

          <DialogPrimitive.Close
            aria-label="Fechar visualizador de posts"
            className={`absolute right-4 top-4 z-10 ${ICON_BUTTON}`}
          >
            <X className="size-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          <div className="pointer-events-none relative flex max-h-[65vh] w-full max-w-3xl items-center justify-center">
            {post.image && (
              <img
                key={post.image}
                src={post.image}
                alt={post.theme || post.format}
                className="pointer-events-auto max-h-[65vh] w-auto max-w-full rounded-brand object-contain shadow-lift"
              />
            )}
          </div>

          {posts.length > 1 && (
            <p className="text-xs tracking-[0.15em] text-cream/50 uppercase">
              {index + 1} de {posts.length}
            </p>
          )}

          {posts.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Post anterior"
                className={`absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 ${ICON_BUTTON}`}
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo post"
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
