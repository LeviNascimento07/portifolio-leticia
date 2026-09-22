import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function BlurImage({
  src,
  alt,
  className,
  containerClassName,
  loading = "lazy",
  style,
  onLoad,
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
  style?: React.CSSProperties;
  onLoad?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Uma imagem servida do cache/disco local pode terminar de carregar antes do React grudar o
  // listener de onLoad (a imagem "complete" já chega true no primeiro render) — sem isso, ela
  // fica com opacity-0 pra sempre. Com fotos do Unsplash isso não aparecia (rede nunca é
  // instantânea); com assets locais, aparece sempre.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
      onLoad?.();
    }
  }, [src, onLoad]);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)} style={style}>
      {!loaded && (
        // "animate-pulse" some-que-nunca-some: a keyframe do Tailwind oscila a opacidade sozinha
        // (1 → 0.5 → 1) por cima de qualquer classe opacity-*, então só some de verdade
        // desmontando o elemento — não dava pra confiar em "loaded ? opacity-0 : opacity-100".
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream/10 via-cream/5 to-cream/10"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        className={cn(
          "size-full transition-all duration-700 ease-out",
          loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
          className,
        )}
      />
    </div>
  );
}
