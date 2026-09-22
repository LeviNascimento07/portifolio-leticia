# Arquitetura — `src/components/portfolio/`

> Seções da rota `/portfolio` (site **portfólio puro**, sem foco em venda). **Reconstruído do
> zero** numa sessão específica para seguir o script "Planejamentos de Conteúdo" que Letícia
> escreveu — não é mais baseado no prompt original longo (esse prompt gerou duas versões
> anteriores, ambas descartadas; ver "Histórico" no fim deste arquivo se precisar entender como
> chegamos até aqui). Para o site portfólio+venda (`/`), ver
> `src/components/sections/ARCHITECTURE.md`.

## Estrutura de rotas

`/portfolio` agora é um **layout route** com filhos — não uma página única:

- **`src/routes/portfolio.tsx`** — layout: renderiza `PortfolioNavbar` + `<Outlet />` +
  `WhatsAppFloat` + `BackToTop` + `CookieBanner`. Não tem conteúdo de página próprio.
- **`src/routes/portfolio.index.tsx`** — a página `/portfolio` em si (Hero → Contato), renderizada
  dentro do Outlet do layout acima.
- **`src/routes/portfolio.planejamentos.$slug.tsx`** — página de detalhe de um planejamento
  (`/portfolio/planejamentos/ley-moveis`, etc.), também renderizada dentro do mesmo Outlet — por
  isso ela **não** precisa (e não deve) renderizar sua própria Navbar/WhatsApp/CookieBanner, já
  vêm do layout. **Órfã desde uma sessão seguinte**: nada na UI linka mais pra cá (o card de
  Planejamentos não tem mais botão "Ver planejamento") — a rota e o `PlanDetail.tsx` continuam no
  código, funcionam se acessados direto pela URL, mas ver "Decisões" abaixo pro porquê disso não
  estar mais no fluxo normal.

**Isso importa**: se criar uma nova rota `portfolio.<algo>.tsx`, ela automaticamente vira filha
desse layout (dot-notation do TanStack Router nesta convenção flat implica isso sempre que o
prefixo bate com um arquivo de rota existente) — não precisa (nem deve) duplicar
Navbar/WhatsAppFloat/BackToTop/CookieBanner nela.

## Ordem das seções em `/portfolio` (ver `portfolio.index.tsx`)

`PortfolioHero` → `PortfolioAbout` → `PortfolioServices` → `PortfolioBrands` →
`PortfolioPlanning` → `PortfolioVideos` → `PortfolioEvents` → `PortfolioResults` → `PortfolioContact`.

## O que cada componente faz

| Componente | Seção (nav) | Estado atual |
| --- | --- | --- |
| `PortfolioNavbar.tsx` | Header | Menu com 9 itens: Início/Sobre mim/Serviços/Marcas atendidas/**Posts**/**Vídeos**/Eventos/Resultados/Contato (o item Posts era "Planejamentos", renomeado numa sessão seguinte — ver "Decisões" abaixo; o `href`/`id` internos continuam `#planejamentos`, só o texto visível mudou). Destaca Posts em dourado quando a rota atual é `/portfolio/planejamentos/*`. Nav desktop só aparece em `xl:` (menu é longo); hambúrguer cobre até `xl`. Link "Ver pacotes" → `/`. |
| `PortfolioHero.tsx` | Início | Título "Marcas reais, resultados reais", tags douradas (conteúdo/estratégia/criatividade/resultados). Foto principal é um **carrossel** sobre `HERO_DECK` (`content.ts`) — clique na foto avança manualmente, e troca sozinho a cada 5s (`AUTO_ADVANCE_MS`); com 1 foto só, vira estático automaticamente (`hasCarousel`). Pontinhos indicam a posição atual. CTA "Conheça meu trabalho" → `#planejamentos`. |
| `PortfolioAbout.tsx` | Sobre mim | 6 indicadores (Social Media/Content Creator/Videomaker/Fotografia/Copywriting/Estratégia). |
| `PortfolioServices.tsx` | Serviços | 7 cards, incluindo "Métricas" (o site `/` tem 9 serviços diferentes, focados em casamento/parto — não confundir). |
| `PortfolioBrands.tsx` | Marcas atendidas | Grid simples com o nome dos 7 clientes de `CONTENT_PLANS` (sem logo real ainda). Deriva da mesma lista usada em Planejamentos — não duplicar nomes em outro array. |
| `PortfolioPlanning.tsx` | Posts (nav) / `id="planejamentos"` (interno) | **A seção principal do site.** Eyebrow "Apresentação de Posts", título "Posts que já criei para marcas reais.". Grid de cards estilo "pasta" — um por cliente de `CONTENT_PLANS`, com categoria + descrição **e as fotos já visíveis direto no card** (até 3 miniaturas de `plan.posts`, sem card com fotos se `posts` estiver vazio) — clicar numa miniatura abre `PlanPostLightbox.tsx` só pra zoom, sem navegar de página. **Não tem mais botão "Ver planejamento"** (ver "Decisões" abaixo). + card tracejado "Nova marca em breve" (preparado pra ela adicionar mais depois). |
| `PortfolioVideos.tsx` | Vídeos / `id="videos"` | Seção logo após Posts. Agrupa os links fornecidos por Letícia em cards por marca (Reserva Open Mall, B Império Pratas, Ley Colchões, Ley Móveis, Vitinarte e Mismec 4 Varas), **um abaixo do outro**. Não hospeda arquivos próprios: ao tocar/clicar, abre o Reel ou publicação em um player incorporado na própria página (`InstagramEmbedDialog.tsx`), sem redirecionar o visitante ao Instagram. |
| `InstagramEmbedDialog.tsx` | (usado por `PortfolioVideos.tsx`) | Modal de player para conteúdo do Instagram. Converte a URL pública de Reel/publicação para o endpoint `/embed/` e a exibe num `iframe`; fecha por Esc ou botão de fechar. O conteúdo continua dependendo de o post estar público e permitir incorporação pelo Instagram. |
| `PortfolioEvents.tsx` | Eventos | Categorias: Aniversários/Revelações/Partos/Eventos/Bastidores (**"Outros" foi removido** — redundante com o filtro "Todos"). Só mostra publicamente item com `imageAuthorized: true` — crítico para conteúdo de parto/família. `EVENTS` tem 3 entradas reais, uma por categoria já organizada por Letícia (Aniversários, Revelações, Partos), **e já com `imageAuthorized: true`** — ela autorizou a exibição pública explicitamente numa sessão seguinte (ver `src/lib/ARCHITECTURE.md`). As fotos têm hover sutil e abrem em lightbox ao toque/clique. Categoria nova só entra com `true` depois de nova confirmação dela. |
| `PortfolioResults.tsx` | Resultados | Prints reais de Instagram Insights/Meta Business Suite — `RESULTS_PHOTOS` é `{ account, images: string[] }`, **1+ print por cliente**. Só renderiza cliente com `images.length > 0` (hoje: Vitinarte, B Império Pratas, Mismec 4 Varas) — quem não tem print real **não aparece**, a pedido de Letícia (antes mostrava um card vazio "Adicionar imagem" pra cada cliente sem print; ela achou melhor esconder). Se nenhum cliente tivesse print, mostraria `EmptyState`. Card mostra mini-grade clicável (até 4 miniaturas) que abre `PlanPostLightbox.tsx` reaproveitado com posts "falsos" (`{ image, format: "Print", theme: account, objective: "" }`) — mesmo padrão de zoom usado em Posts por marca. (Renomeado de `PortfolioMetrics.tsx`.) Os cards também têm hover/press sutil. |
| `PortfolioContact.tsx` | Contato + Rodapé | Inclui Localização (Fortaleza-CE) além de Instagram/WhatsApp/E-mail. Rodapé com links de navegação por âncora, sincronizados com o menu do `PortfolioNavbar`. |
| `PlanDetail.tsx` | (página `/portfolio/planejamentos/$slug`) | As 5 seções do planejamento por cliente: **01 Estratégia** (objetivo/período/objetivo da comunicação/público/pilares/temas), **02 Calendário de Publicações** (tabela Data/Formato/Tema/Objetivo/Status), **03 Posts Prontos** (galeria com lightbox — ver `PlanPostLightbox.tsx`), **04 Legendas** (cards com botão "Copiar legenda" via `navigator.clipboard`), **05 Direcionamento Estratégico** (objetivo/público/tom/CTA/pilar) + card de PDF do planejamento completo (mostra "Adicionar PDF" se `plan.pdf` for `null`). Todo campo vazio mostra "A definir com Letícia." em vez de inventar. |
| `PlanPostLightbox.tsx` | (usado por `PortfolioPlanning.tsx` e, se acessada direto, por `PlanDetail.tsx`) | Modal fullscreen sobre `@radix-ui/react-dialog` direto, mesmo padrão do `PhotoLightbox.tsx` do site `/` — setas do teclado, fechar por Esc/clique fora, foco preso no modal. **Não mostra mais Formato/Tema/Objetivo** (removido numa sessão seguinte — era sempre "A definir com Letícia.", jargão confuso sem valor pra ela); só a foto e um contador "N de M" quando há mais de uma. |
| `EmptyState.tsx` | (utilitário compartilhado) | Card com borda tracejada + "Em breve — aguardando material de Letícia." Usado em toda seção sem conteúdo real ainda. |

## Dados

Tudo vem de `src/lib/portfolio-content.ts` (**não** `content.ts`, que é do site `/`). Ver
`src/lib/ARCHITECTURE.md` para o detalhe de cada constante exportada. A peça central é
`CONTENT_PLANS` (array de `ContentPlan`) — os 8 clientes documentados.

## Decisões / pontos sensíveis

- **`CONTENT_PLANS` hoje tem 7 clientes, não mais 4.** Uma sessão anterior decidiu que os 4
  clientes do script "Planejamentos de Conteúdo" (**Ley Móveis**, **Ley Colchões**, **Haja Coco**,
  **B Império Pratas**) substituiriam os 5 "Cases principais" antigos. Depois que Letícia mandou o
  material real (fotos/vídeos/PDFs, ver `src/lib/ARCHITECTURE.md`), ela pediu explicitamente pra
  trazer de volta 4 desses antigos — **Vitinarte**, **The Fitness**, **Mismec 4 Varas**, **Reserva
  Open Mall**. **"The Fitness" foi removido de novo numa sessão seguinte**, a pedido direto dela
  ("tire só a fitness") — só tinha vídeo no material, nunca teve foto de post nem print de
  resultado, então ela preferiu tirar em vez de deixar a seção "Posts" com um card sem conteúdo
  visual. Hoje ficam os outros 6 + os 4 originais = 7 clientes ao todo. (O 5º "Case antigo",
  Ley Colchões, já era o mesmo de Planejamentos, não duplicou.)
- **"Bempele Pratas" foi renomeado pra "B Império Pratas".** O nome "Bempele Pratas" (usado numa
  sessão anterior) era quase certamente um erro de transcrição por voz de "B Império Pratas" — a
  pasta de material real que Letícia mandou pra esse cliente (fotos/vídeo de prata 925,
  "atacado de prata") bate exatamente com a descrição que já estava no plano, só o nome mudou. A
  categoria/descrição desse plano foram mantidas (vieram do script original), só o `client` e o
  `slug` (`bempele-pratas` → `b-imperio-pratas`) mudaram.
- **HCOCO virou "Haja Coco"** (slug `hcoco` → `haja-coco`) — nome completo confirmado pelos
  arquivos reais que ela mandou (ex.: "HAJA COCO POST_2.mp4", PDF "APRESENTAÇÃO DE AJA COCO").
- **O modelo de planejamento completo (calendário/legendas/estratégia/direcionamento) foi
  deliberadamente pausado numa sessão seguinte** — Letícia pediu pra "deixar pra depois" e, por
  ora, cada card/página só mostra uma explicação breve do que a empresa faz. Por isso `category` e
  `description` de **todos os 8 clientes** foram reescritos nessa sessão pra descrever o negócio
  (não mais o formato do planejamento tipo "Planejamento quinzenal") — texto extraído de verdade
  dos PDFs de cronograma (Ley Móveis, Ley Colchões, Haja Coco, Reserva Open Mall — via
  `pdftotext`, já que os PDFs são grandes demais pra abrir direto) ou do conteúdo visível nas
  fotos/vídeos organizados (B Império Pratas, Vitinarte, Mismec 4 Varas — sem PDF).
  Nunca invenção — cada frase tem uma fonte real. Ver `src/lib/portfolio-content.ts` (comentário no
  topo do arquivo) e `src/lib/ARCHITECTURE.md`.
- **`posts` (03 Posts Prontos) já tem fotos reais** pra quem tinha foto disponível no material: Ley
  Móveis, Ley Colchões, Haja Coco, B Império Pratas, Mismec 4 Varas, e **Reserva Open Mall** (fotos
  chegaram numa sessão seguinte, antes só tinha vídeo). Só Vitinarte segue com `posts: []` (só
  vídeo no material, sem foto solta) — não inventar imagem que não existe. Cada post usa
  `format: "Imagem"` (real) e `theme`/`objective`: `"A definir com Letícia."` (esse nível de
  classificação é parte do modelo pausado acima).
- **`pdf` já está ligado** pra Ley Móveis, Ley Colchões, Haja Coco e Reserva Open Mall (os 4 que
  tinham PDF de cronograma real organizado) — aponta pro arquivo em
  `public/assets/portfolio/planejamentos/<slug>/pdf/`. Os outros 4 continuam `pdf: null`.
- **A palavra "planejamento" foi tirada de toda a seção numa sessão seguinte** — Letícia achou
  confuso ("estratégia", "calendário", "planejamentos disponíveis") sem ter o modelo completo por
  trás. Eyebrow virou "Apresentação de Posts", título "Posts que já criei para marcas reais.",
  "Planejamentos disponíveis" virou "Posts por marca", "Novo planejamento" virou "Nova marca em
  breve", e o item de menu (`PortfolioNavbar`/`PortfolioContact`) virou "Posts". O trio de badges
  antigo (📅 Planejamento estratégico / ✏️ Posts e legendas / 📊 Organização de conteúdo) foi
  removido — nenhum dos três descrevia o que a seção realmente mostra agora. **O `href`/`id`
  internos continuam `#planejamentos`** (só o texto visível mudou, não a URL/âncora).
- **O botão "Ver planejamento" foi removido numa sessão seguinte**, a pedido direto de Letícia —
  ela achou estranho precisar clicar num botão pra ver algo que já podia estar visível, e também
  não entendia os rótulos "Estratégia"/"Calendário"/"Direcionamento" da página de detalhe antiga.
  Agora o card de `PortfolioPlanning.tsx` já mostra descrição + fotos direto, sem clique nenhum —
  só clicar numa foto pra dar zoom (lightbox), não pra navegar. A rota
  `/portfolio/planejamentos/$slug` e o `PlanDetail.tsx` (as 5 seções antigas) **continuam existindo
  no código**, só não tem mais link pra eles em lugar nenhum da UI — ficam prontos pra quando (e
  se) o modelo completo de planejamento for retomado. Não apagar esse código à toa.
- **Calendário/legendas/estratégia/direcionamento continuam vazios de propósito** em todos os 8 —
  fazem parte do modelo pausado (ver acima). O script original também continha exemplos
  ilustrativos (ex.: "SEGUNDA — CARROSSEL — Produto em destaque — Engajamento") explicitamente
  marcados como "Exemplo" — isso é o formato esperado, não dado real. Não preencher com esses
  exemplos como se fossem reais.
- **Instagram**: o handle usado em toda a área `/portfolio` é `@leticia_cavalcante_sousa` (de
  `content.ts`, dado já confirmado), não `@leticia.sc.digital` (mencionado em versões anteriores
  do prompt). Ainda não confirmado com Letícia qual é o correto.
- **Antes x Depois / Stories como seção**: continuam **não existindo** — decisão de uma sessão
  anterior que segue válida (o prompt original de Letícia as proibia explicitamente).
- **Instagram feed curado, Bastidores, Processo Criativo, Ferramentas, Depoimentos, Copywriting
  genérico**: todos removidos nesta reconstrução porque não fazem parte do menu do script
  "Planejamentos de Conteúdo" (Início/Sobre mim/Serviços/Marcas atendidas/Portfólio/
  Planejamentos/Eventos/Resultados/Contato). Se Letícia quiser algum de volta, é decisão nova, não
  restauração — o conceito de "legenda" por exemplo já existe dentro de cada planejamento (bloco
  04), então "Copywriting" genérico ficaria redundante de novo se recriado sem contexto.
- **A seção "Portfólio" (`PortfolioGallery.tsx`, vitrine avulsa de peças soltas) foi removida
  numa sessão seguinte**, a pedido direto de Letícia ("retire isso"). O menu do script previa
  "Portfólio" e "Planejamentos" como itens separados, mas na prática ela achou a vitrine avulsa
  desnecessária — `CONTENT_PLANS`/Planejamentos já cobre a demonstração de trabalho. `PORTFOLIO_
  HIGHLIGHTS` não existe mais em `portfolio-content.ts`. Não recriar essa seção sem pedido novo.
- **`EVENTS` foi reorganizado por categoria numa sessão seguinte**, depois que Letícia separou ela
  mesma a pasta "Eventos extras" em subpastas (aniversario/partos/revelações) — instrução dela foi
  literalmente esperar essa separação antes de mexer (ver `src/lib/ARCHITECTURE.md`). As 3
  entradas viraram uma por categoria (Aniversários/Revelações/Partos) em vez de uma por ocasião
  nomeada — o que antes eram "Chá revelação" e "Ensaio gestante" caiu junto em "Revelações" na
  categorização dela.
- **`imageAuthorized` virou `true` nas 3 categorias**, numa sessão logo em seguida — Letícia
  perguntou por que "Outros eventos" não mostrava nada, expliquei a trava de privacidade e ela
  autorizou explicitamente a exibição pública das 3. Continua sendo autorização por categoria, não
  um flag geral — qualquer categoria nova (Eventos/Bastidores) começa com `false` até confirmação
  dela de novo.
- **`RESULTS_PHOTOS` virou `{ account, images: string[] }`** (antes `image: string | null`, um só
  por conta) — Letícia mandou mais de um print pra algumas marcas. Só 3 dos 7 clientes têm print
  hoje (Vitinarte, B Império Pratas, Mismec 4 Varas); os outros ficam com `images: []`.
  **`PortfolioResults.tsx` filtra pra só renderizar quem tem `images.length > 0`** — a pedido
  direto de Letícia ("deixa só as empresas na qual a gente tem fotos, as que não tiver pode
  retirar") numa sessão seguinte; antes mostrava um card vazio "Adicionar imagem" pra cada cliente
  sem print, ela preferiu esconder.
- **"The Fitness" foi removido de `CONTENT_PLANS` de novo**, numa sessão depois de ter voltado (ver
  bullet acima) — a pedido direto de Letícia. Nunca teve foto de post nem print de resultado, só
  vídeo no material recebido.
- **Reserva Open Mall recebeu fotos de post** numa sessão seguinte (5 fotos, pasta local
  atualizada por Letícia) — antes só tinha vídeo/PDF, `posts` era `[]`.

## Pendências

- Todo conteúdo real por cliente (estratégia, calendário, posts, legendas, direcionamento, PDF)
  depende de material que Letícia ainda vai enviar.
- Categorias `Eventos` e `Bastidores` de `EVENTS` ainda não têm material — Letícia vai organizar e
  mandar depois.
- Print de resultado dos outros 4 clientes (além de Vitinarte/B Império Pratas/Mismec 4 Varas)
  depende dela ter/mandar a métrica — enquanto não tiver, eles simplesmente não aparecem em
  "Números que comprovam" (comportamento esperado, não bug).
- `/admin` (CRUD) ainda não existe — quando for feito, `CONTENT_PLANS` é o maior candidato a virar
  dado de banco (ela quer poder adicionar planejamentos novos sem mexer em código — o card
  tracejado "Novo planejamento" no fim da seção já sinaliza isso visualmente).

## Histórico (não é preciso ler para trabalhar aqui — só se precisar entender o passado)

O `/portfolio` já passou por 3 versões: (1) uma cópia seção-a-seção do prompt original longo de
Letícia (Cases/Projetos/Eventos/Instagram/Bastidores/Métricas em 12 campos/Copywriting/Marcas/
Ferramentas/Depoimentos); (2) uma simplificação dessa versão depois que ela apontou várias
duplicações (removeu Vídeos/Reels separado, feed do Instagram, Bastidores, Marcas duplicadas,
Métricas virou foto única); (3) esta reconstrução total, a partir do zero, seguindo o script
"Planejamentos de Conteúdo". Nenhum **código** dessas versões anteriores sobrou (o componente
`PortfolioCases.tsx` e o array `CASES` continuam mortos) — mas **os nomes de cliente "VitinArte",
"The Fitness", "Mismec 4 Varas" e "Reserva Open Mall" voltaram** como planos de verdade em
`CONTENT_PLANS` numa sessão seguinte (ver "Decisões / pontos sensíveis" acima), a pedido direto de
Letícia depois que ela mandou o material real deles — **"The Fitness" saiu de novo numa sessão
posterior**, também a pedido dela, por nunca ter tido foto de post nem print de resultado, só
vídeo. Se encontrar referência a um componente antigo tipo `PortfolioCases`/`PortfolioProjects`,
aí sim é resíduo de código morto.
