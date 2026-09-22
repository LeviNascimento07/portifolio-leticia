# Letícia Cavalcante Sousa — site pessoal

## Visão geral

Site pessoal (personal brand website, não institucional) de **Letícia Cavalcante Sousa** —
Social Media, Content Creator, Videomaker, Fotografia, Copywriting e Estratégia Digital, baseada
em Fortaleza/CE. Todo o conteúdo é em português do Brasil (pt-BR).

**O projeto tem hoje dois sites públicos no mesmo app**, mais um terceiro planejado:

1. **`/`** — portfólio + venda. Objetivo: **gerar contato de clientes em potencial** (leads via
   WhatsApp/formulário) — pacotes com preço, formulário de contato, CTA de orçamento.
2. **`/portfolio`** — portfólio puro, sem foco em venda. Reconstruído para seguir o script
   "Planejamentos de Conteúdo" de Letícia (não mais o prompt longo original — ver
   [README.md](README.md) para esse prompt, hoje só histórico). Seção principal: **Planejamentos**
   — biblioteca de planejamentos de conteúdo por cliente (Ley Móveis, Ley Colchões, HCOCO, Bempele
   Pratas), cada um com sua própria página (`/portfolio/planejamentos/$slug`) detalhando
   estratégia, calendário, posts, legendas e direcionamento.
3. **`/admin`** — planejado, ainda não implementado. CRUD pra Letícia editar o conteúdo dos dois
   sites acima sem mexer em código (provavelmente Supabase — auth + Postgres + storage).

O prompt original em [README.md](README.md) **não reflete mais a estrutura atual de
`/portfolio`** — guarde-o só como histórico de como o projeto começou. A fonte de verdade do que
`/portfolio` é hoje está em `src/components/portfolio/ARCHITECTURE.md`. **Cada pasta em `src/` tem
um `ARCHITECTURE.md` com o estado atual e as decisões tomadas** — leia o da pasta relevante antes
de mexer nela, e **atualize-o ao final de qualquer sessão que mude algo estrutural** (nova seção,
dado novo, decisão de escopo, etc.). Ver a lista completa mais abaixo.

Para o sistema de design (cores, tipografia, componentes interativos) veja a skill
`.claude/skills/design-system/SKILL.md`. Para conteúdo, contatos, serviços e pacotes do site `/`
veja `.claude/skills/project-content/SKILL.md` (o conteúdo de `/portfolio` fica em
`src/lib/portfolio-content.ts`, documentado em `src/lib/ARCHITECTURE.md`).

## Documentação por pasta (`ARCHITECTURE.md`)

Além deste arquivo (regras gerais do projeto) e das skills (design e conteúdo do site `/`), cada
pasta de código em `src/` tem seu próprio `ARCHITECTURE.md` com o estado específico daquela área:

- [src/routes/ARCHITECTURE.md](src/routes/ARCHITECTURE.md) — rotas existentes e planejadas.
- [src/components/sections/ARCHITECTURE.md](src/components/sections/ARCHITECTURE.md) — seções do
  site `/`.
- [src/components/portfolio/ARCHITECTURE.md](src/components/portfolio/ARCHITECTURE.md) — seções
  do site `/portfolio`.
- [src/components/brand/ARCHITECTURE.md](src/components/brand/ARCHITECTURE.md) — componentes
  compartilhados entre os dois sites.
- [src/components/ui/ARCHITECTURE.md](src/components/ui/ARCHITECTURE.md) — primitives shadcn/ui.
- [src/lib/ARCHITECTURE.md](src/lib/ARCHITECTURE.md) — dados do projeto e infra.
- [src/hooks/ARCHITECTURE.md](src/hooks/ARCHITECTURE.md) — hooks customizados.

**Regra de manutenção**: sempre que uma sessão de trabalho terminar tendo mudado algo estrutural
numa dessas pastas (seção nova, dado novo, decisão de escopo revertida, etc.), atualize o
`ARCHITECTURE.md` correspondente antes de encerrar — não deixe pra próxima sessão descobrir por
`git log`.

## Stack real (ver [package.json](package.json))

- **Framework**: TanStack Start (`@tanstack/react-start`) + TanStack Router (roteamento por
  arquivo em `src/routes/`), sobre Vite 8 e Nitro (SSR/deploy).
- **UI**: React 19, Tailwind CSS v4 (`@tailwindcss/vite`, sem `tailwind.config.js` — tudo via
  `@theme` em [src/styles.css](src/styles.css)), shadcn/ui (componentes gerados em
  `src/components/ui/`, configurado via [components.json](components.json)), Radix UI como base
  dos primitives, `lucide-react` para ícones.
- **Formulários/validação**: `react-hook-form` + `zod` (o formulário de contato usa `zod` direto,
  sem `react-hook-form`).
- **Outros**: `embla-carousel-react`, `recharts`, `sonner` (toasts), `date-fns`.
- **Lint/format**: ESLint 9 (flat config) + Prettier.
- **Gerenciador de pacotes**: o repo tem `bun.lock` e `package-lock.json` simultaneamente —
  confirme com o usuário qual é o oficial antes de instalar dependências novas.

## Identidade de marca

- **Cores** (paleta oficial, definida pelo prompt original de Letícia — não usar cor fora dela):
  preto profundo `#0B0D0F` (fundo principal, predominante), dourado champagne `#D6B36A` (botões,
  ícones, bordas, destaques), dourado claro `#F1D79A` (brilhos, hover, detalhes), off-white
  `#F7F3EA` (texto, fundos claros, cards), cinza elegante `#A7A7A3` (texto secundário), nude
  rosado `#C9A99A` (pequenos detalhes femininos). O preto deve ser predominante; o dourado aparece
  como detalhe de luxo, sem exagero.
- **Tipografia**: serifa elegante estilo Italiana (nome/citações), condensada bold caixa-alta
  estilo Anton (títulos de seção), Inter (corpo de texto).
- **Logo**: monograma "LC" em círculo preto com detalhe dourado ([Monogram.tsx](src/components/brand/Monogram.tsx)), usado na navbar e no rodapé dos dois sites.
- **Estética**: luxo moderno, minimalista, cantos bem arredondados (24–32px), gradientes suaves,
  bastante espaço em branco, mobile-first.

Detalhes completos, incluindo os componentes interativos já implementados e o que foi testado e
descartado, estão em `.claude/skills/design-system/SKILL.md`.

## Regras de negócio que não podem ser quebradas

1. **O formulário de contato nunca envia e-mail diretamente.** Ele monta uma mensagem
   pré-preenchida e redireciona o usuário para o WhatsApp (`wa.me`), mostrando a confirmação
   "Solicitação enviada" — ver `.claude/skills/project-content/SKILL.md`. Não reintroduzir
   `mailto:` como caminho principal de envio.
2. **Preços dos pacotes são placeholder** (`"R$ —"`) até serem fornecidos por Letícia. Não
   inventar valores.
3. **Fotos/vídeos são placeholders do Unsplash** até o recebimento dos arquivos reais dela — não
   tratar como conteúdo final, e não é preciso otimizar/hospedar essas imagens como se fossem
   definitivas.
4. **Idioma é sempre pt-BR** em todo o conteúdo voltado ao usuário.
5. **Tom de voz**: texto deve soar real e artesanal, nunca com cara de copy genérica gerada por
   IA — ver a diretriz completa em `.claude/skills/project-content/SKILL.md`.
6. **Conformidade LGPD**: existe página de Política de Privacidade
   ([src/routes/privacidade.tsx](src/routes/privacidade.tsx)) e banner de cookies
   ([CookieBanner.tsx](src/components/brand/CookieBanner.tsx)) — mudanças que envolvam coleta de
   dados (formulário, analytics, cookies) precisam manter essas duas peças coerentes com o que
   realmente é coletado.
7. **Histórico do Git é compartilhado com o Lovable** (ver [AGENTS.md](AGENTS.md)): não fazer
   force push, nem rebase/amend/squash de commits já publicados na branch conectada — isso quebra
   a sincronização do lado do Lovable.

## Status atual / pendências

- Preços reais dos pacotes Start/Pro/Premium (site `/`) ainda não foram definidos.
- Fotos e vídeos são placeholders do Unsplash em `/` — aguardando material real de Letícia.
- `/portfolio` foi reconstruído do zero seguindo o script "Planejamentos de Conteúdo" — está
  estruturalmente completo (todas as seções + a página de detalhe por cliente em
  `/portfolio/planejamentos/$slug`), mas quase todo o conteúdo real de cada planejamento
  (estratégia, calendário, posts, legendas, direcionamento, PDF, prints de resultados) ainda
  depende de material que Letícia vai enviar — hoje aparece como estado vazio ("Em breve..." /
  "A definir com Letícia").
- **Material real recebido e majoritariamente plugado.** `CONTENT_PLANS` tem **7 clientes** (Ley
  Móveis, Ley Colchões, Haja Coco, B Império Pratas, Vitinarte, Mismec 4 Varas, Reserva Open Mall —
  **"The Fitness" foi removido a pedido dela**, só tinha vídeo, nunca teve foto de post nem print)
  — cada um já com `category`/`description` real (o que a empresa faz, extraído de PDF ou de
  fotos/vídeos, nunca inventado) e foto em `posts` para os 6 que tinham foto disponível (só
  Vitinarte segue sem). O **modelo completo de planejamento**
  (calendário/legendas/estratégia/direcionamento) ficou deliberadamente pausado a pedido de
  Letícia — retomar só quando ela pedir. As fotos profissionais dela já estão em uso real
  (`HERO_DECK`/`ABOUT_IMAGE` em `content.ts`, nos dois sites — o Hero de `/portfolio` agora é um
  carrossel entre elas). **Eventos**: Letícia separou ela mesma a pasta "Eventos extras" em
  categorias (aniversário/partos/revelações) e `EVENTS` tem 3 entradas reais (Aniversários,
  Revelações, Partos — `EVENT_CATEGORIES` perdeu "Outros"), **já com `imageAuthorized: true`** —
  ela autorizou a exibição pública explicitamente, já visível em "Outros eventos". Categoria nova
  (Eventos/Bastidores) só entra com `true` depois de confirmação dela de novo, autorização é por
  categoria, não um flag geral. Categorias Eventos/Bastidores seguem sem material.
  **Resultados**: `RESULTS_PHOTOS` tem print real pra 3 clientes (Vitinarte, B Império Pratas,
  Mismec 4 Varas) — a seção **só mostra quem tem print real**, os outros nem aparecem (a pedido
  dela). `feira`, o PDF órfão "Best Music" (cliente real, sem pasta de mídia — pode virar um novo
  cliente se ela quiser) e alguns `.heic`/`.heif` (Eventos + 3 prints de métrica da Vitinarte)
  seguem sem mapeamento — ver `src/lib/ARCHITECTURE.md`.
- **Hospedagem real das fotos/vídeos resolvida via Supabase Storage** (projeto `portifolio-leticia`,
  ref `fpwlrcbuqfcevtlyugnq`, plano Free) — a pedido direto de Letícia. Isso corrigiu um problema
  que já existia: `public/assets/` é gitignored, então o build de produção nunca tinha essas fotos.
  Todas as fotos + PDFs + os vídeos que cabem no limite de 50MB do plano Free já estão no bucket
  público `assets` e o código (`content.ts`/`portfolio-content.ts`) já referencia essas URLs via
  `SUPABASE_STORAGE_BASE`. 5 vídeos maiores que 50MB não subiram (precisam de upgrade pro plano Pro,
  decisão de custo que só Letícia pode tomar). `ContentPlan` ganhou um campo `videos: string[]` com
  os vídeos já hospedados, mas **ainda sem player/UI** — ela pediu pra implementar aos poucos, não
  de uma vez. Ver `src/lib/ARCHITECTURE.md` (seção "Supabase Storage") para todos os detalhes.
- **Instagram**: o site usa `@leticia_cavalcante_sousa` (dado centralizado em `content.ts`), mas o
  prompt original menciona `@leticia.sc.digital` — ainda não confirmado com Letícia qual é o
  handle correto. Não trocar sem confirmação direta dela.
- `/admin` (CRUD) planejado mas **não iniciado** — o Supabase (banco/projeto) já existe agora por
  causa do storage acima, mas isso não significa que o `/admin` começou; schema/auth pro CRUD em si
  ainda é desenhado com calma quando Letícia pedir.
- Analytics/cookies opcionais mencionados na Política de Privacidade ainda não estão
  implementados (o banner de cookies existe, mas nenhuma ferramenta de análise está de fato
  conectada).
- Parallax de mouse no Hero e tilt 3D nos cards foram testados e descartados — não reintroduzir
  sem pedido explícito de Letícia/usuário (ver design-system skill).
