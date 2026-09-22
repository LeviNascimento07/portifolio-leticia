# Arquitetura — `src/components/ui/`

Componentes gerados pelo **shadcn/ui** (configurado via `components.json` na raiz), sobre
Radix UI + `class-variance-authority` + `tailwind-merge`. A maioria destes arquivos **não foi
escrita à mão** para este projeto — foram adicionados via CLI do shadcn e customizados
minimamente quando necessário.

## Uso real neste projeto

A maior parte do site (`/` e `/portfolio`) usa componentes escritos à mão em `sections/` e
`portfolio/` (não estes primitives) — os componentes shadcn aqui existem principalmente como
base disponível para telas mais "utilitárias" (formulários, futura área `/admin`), não para as
seções visuais principais, que têm identidade visual própria demais (flips 3D, coverflow, blobs
animados) para caber nos primitives genéricos.

Exceção notável: `blur-image.tsx` (`BlurImage`) — **este sim é específico do projeto** (não é
shadcn padrão), usado nas galerias de foto/vídeo dos dois sites para o efeito blur-up/skeleton.
Ver `.claude/skills/design-system/SKILL.md` → "Estados de carregamento".

**Dois bugs corrigidos numa sessão específica** (ambos só apareceram depois que o site passou a
servir fotos reais de `public/assets/` em vez de Unsplash — arquivo local carrega rápido/cacheado
demais pros bugs de timing abaixo não aparecerem):

1. `BlurImage` só marcava a imagem como carregada no evento `onLoad` do `<img>`. Com imagens do
   Unsplash (sempre via rede) isso nunca dava problema, mas com arquivo local o `<img>` às vezes já
   chegava com `complete: true` antes do React terminar de grudar o listener — a imagem ficava com
   `opacity-0` pra sempre, invisível. Corrigido com um `useEffect` que checa
   `imgRef.current?.complete` no mount. O mesmo padrão de bug existia independentemente em
   `src/components/sections/Hero.tsx` (seu próprio state de loading, não usa `BlurImage`) —
   corrigido lá também, com um `ref` callback equivalente.
2. O esqueleto de loading (`<span animate-pulse>`) usava `loaded ? "opacity-0" : "opacity-100"`
   pra sumir depois de carregado — mas a keyframe do Tailwind `animate-pulse` (`opacity: 1 → .5 →
   1` em loop) **sobrescreve continuamente** qualquer classe `opacity-*` estática, então o
   esqueleto nunca sumia de verdade, só ficava piscando por cima da imagem pra sempre (mais visível
   em miniaturas pequenas, tipo as fotos de post em `PortfolioPlanning.tsx`, que ficavam
   esbranquiçadas). Corrigido desmontando o `<span>` inteiro (`{!loaded && <span .../>}`) em vez de
   tentar esconder via opacity.

Se algum componente novo implementar seu próprio estado de "imagem carregada" do zero (em vez de
usar `BlurImage`), ele tem esse mesmo risco de timing — preferir sempre `BlurImage`.

## Convenções

- Ao adicionar um novo componente shadcn, usar o CLI (`npx shadcn add <nome>`) em vez de copiar
  código manualmente, para manter a versão/config consistente com `components.json`.
- Evitar editar estes arquivos além do necessário — divergir do padrão shadcn dificulta futuras
  atualizações via CLI.

## Pendências

- Quando `/admin` for desenhado, provavelmente vai apoiar bastante nestes primitives
  (`form.tsx`, `dialog.tsx`, `table.tsx`, `select.tsx`, etc.) para CRUD.
