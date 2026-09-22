# Arquitetura — `src/lib/`

## Dados do projeto (conteúdo)

| Arquivo | Site | O que contém |
| --- | --- | --- |
| `content.ts` | `/` (portfólio + venda) | `HERO_DECK`/`ABOUT_IMAGE` — **fotos reais dela** (`public/assets/perfil/`, ver seção abaixo), `SERVICES` (9 itens, foco social media + casamento/parto), `PACKAGES` (Start/Pro/Premium, preço sempre `"R$ —"`), `METRICS` (4 números genéricos), `PHOTOS`/`VIDEOS` (ainda Unsplash placeholder), `WHATSAPP_NUMBER`/`WHATSAPP_LINK`/`EMAIL_ADDRESS`/`INSTAGRAM_HANDLE`/`CONTACTS` — **fonte única da verdade pros dados de contato**, usados também em `/portfolio`. |
| `portfolio-content.ts` | `/portfolio` (portfólio puro) | Reconstruído do zero numa sessão específica. Contém: `ABOUT_INDICATORS`, `WHAT_I_DO`, `CONTENT_PLANS` (array de `ContentPlan`, **7 clientes**: Ley Móveis, Ley Colchões, Haja Coco, B Império Pratas, Vitinarte, Mismec 4 Varas, Reserva Open Mall — "The Fitness" foi removido numa sessão seguinte a pedido de Letícia, só tinha vídeo, nenhuma foto de post. `category`/`description` de todos já preenchidos com uma explicação real e breve do negócio, extraída de PDF ou de fotos/vídeos reais — ver seção "Planejamentos" abaixo; `posts` já tem fotos reais pra 6 deles (Reserva Open Mall recebeu fotos numa sessão seguinte, antes só tinha vídeo); `pdf` já está ligado pra 4; `videos` (novo campo, dados prontos pra consumo futuro — ver seção "Supabase Storage" abaixo, ainda sem UI nenhuma renderizando); `calendar`/`captions`/`strategy`/`direction` continuam vazios em todos — modelo completo de planejamento pausado a pedido de Letícia), `PORTFOLIO_VIDEOS` (links de Reels/publicações enviados por Letícia, organizados por marca; usados em `PortfolioVideos.tsx` e sempre abertos no Instagram, sem upload ou player próprio), `EVENTS`/`EVENT_CATEGORIES` (**3 categorias reais já cadastradas — Aniversários/Revelações/Partos, com fotos que a própria Letícia separou em pastas — e já com `imageAuthorized: true`**, autorizado por ela explicitamente numa sessão seguinte — ver seção abaixo; `EVENT_CATEGORIES` não tem mais "Outros"), `RESULTS_PHOTOS` (`{ account, images: string[] }` — só 3 clientes têm print de métrica real hoje: Vitinarte, B Império Pratas, Mismec 4 Varas; deriva de `CONTENT_PLANS`; `PortfolioResults.tsx` só renderiza quem tem `images.length > 0`, a pedido de Letícia — quem não tem métrica real nem aparece, em vez do card vazio "Adicionar imagem" de antes). Ver `src/components/portfolio/ARCHITECTURE.md` para o detalhe de cada seção que consome esses dados e o histórico de versões anteriores descartadas (`CASES`, `PROJECTS`, `GALLERY_ITEMS`/`PORTFOLIO_HIGHLIGHTS`, `METRIC_FIELDS`, `INSTAGRAM_FEED`, `TOOLS`, `TESTIMONIALS`, `COPYWRITING_EXAMPLES`, `CREATIVE_PROCESS` e `BACKSTAGE` não existem mais neste arquivo). |

**Regra**: dados de contato (WhatsApp/e-mail/Instagram) sempre vêm de `content.ts`, mesmo dentro
de componentes de `/portfolio` — nunca duplicar esses valores em `portfolio-content.ts`.

**Vídeos do Instagram**: `PORTFOLIO_VIDEOS` reúne os links públicos fornecidos por Letícia. A
seção `PortfolioVideos.tsx` os abre no player incorporado `InstagramEmbedDialog.tsx` (endpoint
`/embed/`), sem hospedar arquivos nem redirecionar o visitante para o Instagram. O post/Reel
precisa continuar público e permitir incorporação para aparecer no player.

**Regra**: nenhum dado real (cliente, métrica, depoimento, preço) é inventado. Onde não há
material real ainda, o array fica vazio (`[]`) e o componente mostra um estado vazio
("Em breve..." ou "Adicione sua métrica") — nunca um placeholder que pareça dado real.

## Infra (não é conteúdo do site)

| Arquivo | O que faz |
| --- | --- |
| `utils.ts` | `cn()` — helper padrão shadcn (`clsx` + `tailwind-merge`). |
| `supabase-storage.ts` | Exporta `SUPABASE_STORAGE_BASE` — a URL base do Supabase Storage onde as fotos/vídeos reais estão hospedados. Ver seção "Supabase Storage" abaixo. |
| `error-capture.ts` | Captura o erro original fora de banda para `server.ts` conseguir recuperar o stack trace quando o h3 (servidor) já reduziu o throw a uma Response 500 genérica. Infra de SSR, não relacionado a conteúdo/produto. |
| `error-page.ts` | Página de erro (provavelmente renderização de fallback SSR). |
| `lovable-error-reporting.ts` | Integração de report de erro específica do ambiente Lovable. |

Estes três últimos arquivos são scaffolding gerado pelo Lovable/TanStack Start — evitar mexer
neles sem necessidade concreta (bug de erro/SSR), não são parte do "produto" (site da Letícia).

## Supabase Storage (hospedagem real das fotos/vídeos)

Numa sessão seguinte, Letícia pediu explicitamente pra usar o Supabase (já conectado via
conector/MCP nesse ambiente) pra hospedar o material real — principalmente vídeos, mas também
fotos se fizesse sentido. Isso resolveu um problema que já existia silenciosamente: `public/assets/`
é gitignored (ver seção abaixo), então **o build de produção nunca teve esses arquivos** — as fotos
já estavam quebradas em qualquer deploy real, só funcionavam local. Migrar pro Supabase Storage
corrige isso de vez.

- **Projeto**: `portifolio-leticia` (ref `fpwlrcbuqfcevtlyugnq`), org `qolxypsusyfsvkeckjpu`
  ("LeviNascimento07's Org"), região `sa-east-1`, **plano Free ($0/mês)**. URL:
  `https://fpwlrcbuqfcevtlyugnq.supabase.co`. Acessível via MCP do Supabase (`list_projects` etc.)
  em sessões futuras.
- **Bucket `assets`** — público (leitura sem autenticação), `file_size_limit` de 50MB (o teto do
  plano Free — não dá pra aumentar sem upgrade). Estrutura interna do bucket espelha
  `public/assets/` (ex.: objeto `portfolio/planejamentos/ley-moveis/fotos/post-01.png`).
- **`SUPABASE_STORAGE_BASE`** (`supabase-storage.ts`) = `".../storage/v1/object/public"` **sem** o
  nome do bucket no final, de propósito — os literais em `content.ts`/`portfolio-content.ts` que
  usam essa constante continuam começando com `/assets/...` (mesma convenção herdada do path local
  antigo), e como o bucket também se chama `assets`, a concatenação bate certinho. Todo campo de
  imagem/PDF que antes era `"/assets/..."` virou `` `${SUPABASE_STORAGE_BASE}/assets/...` ``.
- **O que foi migrado** (só o que já estava classificado e ligado a `CONTENT_PLANS`/`EVENTS`/
  `RESULTS_PHOTOS` — nada de `_pendente-confirmacao/`): as 48 fotos de clientes/eventos/métricas +
  2 fotos de perfil (todas, ~40MB no total, tranquilo no limite de 1GB do Free) e **8 vídeos que já
  estavam abaixo de 50MB** (~190MB). Total no bucket: 58 objetos, ~272MB.
- **5 vídeos ficaram de fora** por passarem de 50MB — só sobem com upgrade pro plano Pro (US$25/mês
  + uso, decisão que precisa ser tomada por Letícia, não decidida sozinha): `b-imperio-pratas`
  (75MB), `haja-coco` (62MB), `mismec-4-varas` (76MB e 99MB), `vitinarte` (63MB). Arquivos
  continuam intactos em `public/assets/portfolio/planejamentos/<slug>/videos/` (local, não subiu).
- **Vídeos renomeados** pra `video-01.mp4`/`video-02.mov`/etc. antes do upload — os nomes originais
  tinham emoji/acentos que o `curl` (usado pro upload) não processava direito em paths.
- **`ContentPlan` ganhou o campo `videos: string[]`** (mesmo padrão que `EVENTS.videos` já tinha) —
  guarda a URL dos vídeos já hospedados, mas **ainda não tem player/UI nenhuma consumindo isso**.
  Letícia pediu pra implementar aos poucos ("de pouco em pouco vamos implementando os vídeos"), não
  de uma vez — não construir uma seção de vídeo sem pedido explícito de continuar.
- **Upload feito via `curl` direto na Storage API**, autenticado com a chave `service_role` (que
  Letícia colou no chat e foi salva só em `.env.local`, nunca commitada — `.gitignore` já protege
  `*.local`/`.env`/`.env.local`). O MCP do Supabase não expõe a `service_role` nem tem uma tool de
  upload de arquivo — só dá pra criar bucket/policy via SQL (e criar uma policy de escrita pública,
  mesmo temporária, foi bloqueado pelo classificador de segurança do modo automático, o que é
  correto: abrir escrita pública é um risco real). A `service_role` bypassa RLS e é o jeito certo
  pra isso — não ficou nenhuma policy de escrita pública no projeto.
- **Nenhuma policy de INSERT foi criada no bucket** — só existe leitura pública (`public: true` no
  bucket já libera isso sem precisar de policy). Se um dia for preciso permitir upload direto do
  navegador (ex.: painel `/admin` futuro), aí sim vai precisar de uma policy de INSERT bem
  específica (por usuário autenticado, não `anon`), desenhada com calma na hora do `/admin`.

## Material bruto (fotos/vídeos/PDFs) — `public/assets/`

Letícia mandou uma pasta com o material real de vários clientes/eventos (Downloads →
`Portifolio leticia/`, 12 subpastas). Numa sessão específica, cada subpasta foi separada em
foto/vídeo/PDF (por extensão) e copiada — sem apagar o original — para `public/assets/`, assim:

**Desde a migração pro Supabase Storage (seção acima), `public/assets/` deixou de ser a fonte que o
site lê em produção** — os componentes já apontam pra `SUPABASE_STORAGE_BASE`. Esta pasta continua
existindo como cópia local/backup (e como staging de qualquer material novo antes de subir), mas
não precisa mais estar sincronizada em tempo real com o que está no ar.

- `public/assets/portfolio/planejamentos/<slug>/{fotos,videos,pdf}/` — **um por cliente de
  `CONTENT_PLANS`, os 7**: `ley-moveis`, `ley-colchoes`, `haja-coco` (pasta original "Aja coco" —
  nome real confirmado por Letícia é "Haja Coco"), `b-imperio-pratas` (pasta original "B império" —
  confirmado por Letícia que é o mesmo cliente que uma sessão anterior tinha registrado como
  "Bempele Pratas", provavelmente erro de transcrição por voz; nome corrigido no código),
  `vitinarte`, `mismec-4-varas`, `reserva-open-mall` (esses 3 últimos são dos antigos "Cases
  principais" que Letícia pediu pra trazer de volta depois de mandar o material real — um 4º,
  "The Fitness", chegou a voltar mas foi removido numa sessão seguinte a pedido dela, só tinha
  vídeo). Arquivos renomeados pra `post-01.png`/`post-02.jpg`/etc. (nomes originais eram
  hash/espaço, ruim pra referenciar em código) e **já ligados em `CONTENT_PLANS`**:
  `category`/`description` de todos descrevem o negócio (não mais o formato do planejamento),
  `posts` tem fotos reais pra quem tinha foto (Ley Móveis, Ley Colchões, Haja Coco, B Império
  Pratas, Mismec 4 Varas, Reserva Open Mall — esta última recebeu fotos numa sessão seguinte,
  antes só tinha vídeo; só Vitinarte segue sem foto solta), `pdf` está ligado pra quem tinha PDF
  real (Ley Móveis, Ley Colchões, Haja Coco, Reserva Open Mall). `calendar`/`captions`/`strategy`/
  `direction` continuam vazios em todos — ver "Decisões" em
  `src/components/portfolio/ARCHITECTURE.md` pro porquê.
- **Os PDFs de cronograma são grandes demais pra abrir direto** (23–51MB, o limite de leitura é
  20MB) — foram lidos com `pdftotext -layout -enc UTF-8 <arquivo> -` (disponível no
  `mingw64/bin` deste ambiente) pra extrair o texto das legendas e daí escrever
  `category`/`description` de cada cliente com base no que a empresa realmente vende/faz. Achado
  nessa leitura: o PDF de **Reserva Open Mall** cobre múltiplos lojistas do shopping (Ottobom
  colchões/enxovais, CVC viagens), não uma loja só — e o PDF órfão **"CRONOGRAMA BEST MUSIC"** (em
  `_pendente-confirmacao/`) é de um cliente de verdade (conteúdo de lançamentos musicais) que
  simplesmente não tem nenhuma pasta de foto/vídeo correspondente — não é lixo, só não foi pedido
  pra virar o 9º cliente ainda.
- `public/assets/perfil/` — as 2 fotos profissionais reais dela (pasta original "Fotos
  profissionais"), usadas em `HERO_DECK`/`ABOUT_IMAGE` de `content.ts` (`retrato.png` no Hero,
  `mesa-trabalho.png` no Hero + About — o nome do arquivo já indica qual é qual). Sem problema de
  privacidade aqui: é ela mesma, foto profissional própria.
- `public/assets/portfolio/eventos/<categoria>/` — **numa sessão seguinte, Letícia separou ela
  mesma** a pasta local "Eventos extras" em subpastas por categoria (`aniversario/`, `partos/`,
  `revelações/`), substituindo a classificação anterior por evento individual (que existia porque
  antes só dava pra separar por conteúdo visível, sem uma categoria confiável). A pasta virou
  `aniversarios/` (4 fotos, novas — não existiam antes), `revelacoes/` (7 fotos — junta o que
  antes eram dois eventos separados, "Chá revelação" com decoração "Oh Baby"/fumaça rosa e "Ensaio
  gestante" de casal externo; na categorização dela os dois caem em Revelações) e `partos/` (5
  fotos — parto em ambiente hospitalar, mesmo material de antes). `Eventos`/`Bastidores` ainda não
  têm pasta — ela vai organizar depois. Já estão referenciadas em `EVENTS` (`portfolio-content.ts`)
  com **`imageAuthorized: true` nas 3** — Letícia autorizou explicitamente a exibição pública numa
  sessão seguinte (perguntado direto, depois que ela reclamou que "Outros eventos" não mostrava
  nada), então `PortfolioEvents.tsx` já mostra essas fotos pro público. São fotos reais e
  identificáveis (rostos, recém-nascido) de famílias/clientes — **qualquer categoria nova que
  entrar aqui sem confirmação explícita dela começa com `imageAuthorized: false`**, não é uma
  decisão técnica, é LGPD/consentimento real; o `true` das 3 atuais não é uma liberação geral pra
  sempre. Os títulos de cada `EVENTS` ficaram no nível da categoria (ex. "Partos", não mais "Parto
  — Bernardo Elias") pra não guardar nome próprio de bebê/família no código à toa.
- `EVENT_CATEGORIES` perdeu a opção **"Outros"** — a pedido de Letícia, já que o filtro tem "Todos"
  cobrindo o mesmo caso (duas opções pro mesmo significado).
- `public/assets/portfolio/metricas/<slug>/` — pasta nova (Letícia só tem print de resultado de
  **3 empresas**: `vitinarte/` (1 print — as outras 3 fotos da pasta original eram `.heic`, foram
  copiadas sem conversão pra `_pendente-confirmacao/metricas-vitinarte-heic/`, mesmo tratamento
  dado a `.heic` em outro lugar deste arquivo), `b-imperio-pratas/` (3 prints) e `mismec-4-varas/`
  (3 prints) — todos prints reais de Instagram Insights/Meta Business Suite. Ligados em
  `RESULTS_PHOTOS` (`portfolio-content.ts`), que virou `{ account, images: string[] }` (antes era
  `image: string | null`, um só por conta) pra suportar múltiplos prints por cliente;
  `PortfolioResults.tsx` só renderiza cliente com `images.length > 0` — quem não tem print real
  **não aparece na seção**, a pedido de Letícia. Os outros 4 clientes ficam com `images: []` até
  ela ter/mandar mais.
- Ficaram 4 arquivos `.heic`/`.heif` de "Eventos extras" **não classificados** em
  `public/assets/_pendente-confirmacao/eventos-extras/fotos/` — esse formato não é lido pelas
  ferramentas usadas pra inspecionar as fotos (nem abre em todo navegador), então não foi possível
  ver o conteúdo pra categorizar com segurança. Precisam ser convertidos pra `.jpg`/`.webp`
  primeiro, depois olhados e encaixados numa das categorias acima. O mesmo vale pros 3 `.heic` de
  métrica da Vitinarte, em `_pendente-confirmacao/metricas-vitinarte-heic/`.
- `public/assets/_pendente-confirmacao/` (o resto): `feira/` (não bate com nenhum cliente/evento
  atual) e `apresentacao-de-post/pdf/CRONOGRAMA BEST MUSIC.pdf` (PDF órfão, sem pasta de mídia
  correspondente). **Não mover pra `CONTENT_PLANS`/`EVENTS` sem confirmação de Letícia.**
- **`public/assets/` está no `.gitignore`** — o material todo passa de 1GB (só em vídeos), não dá
  pra commitar no git compartilhado com o Lovable. **A hospedagem real já existe** (Supabase
  Storage, ver seção acima) — o que está aqui em `public/assets/` é backup local, não precisa mais
  ser a fonte do site em produção.

## Pendências

- Quando o `/admin` existir, o conteúdo hoje hard-coded nestes dois arquivos (`content.ts` e
  `portfolio-content.ts`) provavelmente migra pra vir de um banco (Supabase) — mas a estrutura de
  tipos definida aqui deve servir de referência pro schema, inclusive o gate `imageAuthorized`.
- Letícia já autorizou a exibição pública dos 3 eventos em `EVENTS` (Aniversários/Revelações/
  Partos, `imageAuthorized: true`) numa sessão seguinte — já visível em "Outros eventos". **Se uma
  categoria nova entrar aqui (Eventos/Bastidores), confirmar autorização de novo antes de virar
  `true`** — a autorização foi dada categoria por categoria, não em bloco pra sempre.
- Letícia já fez a separação por categoria (`aniversario/partos/revelações`) e pediu pra colocar as
  fotos — feito. **Faltam ainda as categorias `Eventos` e `Bastidores`**, que ela vai organizar e
  mandar depois — não inventar conteúdo pra elas enquanto isso.
- Converter os 4 `.heic`/`.heif` pendentes de Eventos e os 3 de métrica da Vitinarte, e decidir
  onde encaixá-los.
- Confirmar com Letícia o mapeamento do que sobrou em `_pendente-confirmacao/` (`feira`) antes de
  usar; e perguntar se "Best Music" (PDF órfão) vira um 9º cliente em `CONTENT_PLANS` ou fica de
  fora — hoje não tem pasta de foto/vídeo, só o PDF.
- Retomar o modelo completo de planejamento (calendário/legendas/estratégia/direcionamento/
  classificação de cada post) quando Letícia pedir — hoje está deliberadamente pausado, só
  category/description/posts/pdf estão preenchidos.
- **Decidir se vale fazer upgrade pro plano Pro do Supabase** pra caber os 5 vídeos que passam de
  50MB (b-imperio-pratas, haja-coco, mismec-4-varas ×2, vitinarte) — custo real (US$25/mês+uso),
  não fazer sem Letícia confirmar explicitamente que quer pagar por isso.
- **Implementar aos poucos a UI de vídeo** em `/portfolio` — os vídeos elegíveis já estão
  hospedados e em `ContentPlan.videos`, mas nenhum componente ainda renderiza player nenhum.
  Retomar quando Letícia pedir o próximo passo, não construir de uma vez.
- Novo material que Letícia mandar (fotos/vídeos) também precisa subir pro Supabase Storage pra
  aparecer em produção — não basta só colocar em `public/assets/` local como antes.
