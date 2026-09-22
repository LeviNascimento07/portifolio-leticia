// URL base do bucket público "assets" no Supabase Storage — onde ficam as fotos/vídeos reais de
// Letícia (public/assets/ é gitignored por tamanho, então o build de produção não tem esses
// arquivos localmente; sem isso as imagens quebrariam no site publicado). Ver
// src/lib/ARCHITECTURE.md para o projeto/bucket e o que foi migrado pra cá.
// Sem o nome do bucket no final de propósito — os literais que usam esta constante já começam
// com "/assets/..." (convenção herdada do antigo caminho local em public/assets/), e o bucket no
// Supabase Storage também se chama "assets", então a concatenação bate certinho.
export const SUPABASE_STORAGE_BASE =
  "https://fpwlrcbuqfcevtlyugnq.supabase.co/storage/v1/object/public";
