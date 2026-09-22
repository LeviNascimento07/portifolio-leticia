# Arquitetura — `src/routes/`

> Ver também `README.md` nesta pasta (convenções genéricas de roteamento do TanStack Start).
> Este arquivo documenta o estado **específico deste projeto**. Atualize-o sempre que uma
> rota for criada, removida ou mudar de propósito.

## Rotas existentes

| Rota | Arquivo | O que é |
| --- | --- | --- |
| `/` | `index.tsx` | Site **portfólio + venda**. Foco em gerar lead (WhatsApp) — hero, sobre, serviços, pacotes com preço, resultados, portfólio de fotos/vídeos, contato. Monta `<Navbar>` + seções de `src/components/sections/`. |
| `/portfolio` | `portfolio.tsx` (layout) | **Layout route**, não página — renderiza `PortfolioNavbar` + `<Outlet />` + `WhatsAppFloat` + `BackToTop` + `CookieBanner`, compartilhados pelos dois filhos abaixo. |
| `/portfolio` (index) | `portfolio.index.tsx` | A página `/portfolio` em si: site **portfólio puro** (sem foco em venda), reconstruído numa sessão específica para seguir o script "Planejamentos de Conteúdo" de Letícia — ver `src/components/portfolio/ARCHITECTURE.md` para a estrutura completa e o histórico de versões anteriores (baseadas num prompt mais antigo, já descartadas). |
| `/portfolio/planejamentos/$slug` | `portfolio.planejamentos.$slug.tsx` | Página de detalhe de um planejamento de conteúdo por cliente (ex.: `/portfolio/planejamentos/ley-moveis`). `loader` busca o plano em `CONTENT_PLANS` por slug e lança `notFound()` se não existir. Renderizada dentro do mesmo layout de `/portfolio` — **não** duplica Navbar/WhatsApp/CookieBanner. |
| `/privacidade` | `privacidade.tsx` | Política de Privacidade (LGPD), referenciada pelo `CookieBanner` e pelos rodapés dos dois sites. |

`routeTree.gen.ts` é gerado automaticamente pelo `@tanstack/router-plugin` a cada `vite dev`/`build` — nunca editar à mão, nunca revisar como se fosse código "real" em PR.

**Armadilha já sofrida nesta sessão**: qualquer arquivo `portfolio.<algo>.tsx` novo vira
automaticamente **filho** da rota `/portfolio` (a convenção flat do TanStack Router nesta
configuração nesteia por prefixo de nome de arquivo sempre que já existe um arquivo com esse
prefixo exato). Isso só funciona corretamente porque `portfolio.tsx` é um layout com `<Outlet />`
— se `portfolio.tsx` voltasse a ser uma página cheia sem Outlet, qualquer rota filha nova
renderizaria só o título (via `head()`) sem nunca aparecer o conteúdo, porque não haveria onde
montá-la. Se precisar adicionar outra sub-rota de `/portfolio` no futuro, ela deve renderizar
*só* seu próprio conteúdo (sem repetir Navbar/rodapé/WhatsApp/CookieBanner).

## Decisões importantes

- **Por que dois sites (`/` e `/portfolio`) em vez de um só?** Pedido explícito de Letícia: ela quer
  um site-portfólio puro (fiel ao prompt original que ela escreveu) e, separadamente, o site atual
  de portfólio+venda continua existindo. Os dois convivem no mesmo app, com link cruzado no menu
  (`/` tem "Portfólio completo" → `/portfolio`; `/portfolio` tem "Ver pacotes" → `/`).
- **Dados**: `/` usa `src/lib/content.ts`; `/portfolio` usa `src/lib/portfolio-content.ts`. São
  arquivos separados de propósito — não misturar (ver `src/lib/ARCHITECTURE.md`).
- **`/admin`**: planejado, ainda **não implementado**. Vai precisar de backend (provavelmente
  Supabase — auth + Postgres + storage, ver decisão em `src/lib/ARCHITECTURE.md`) para CRUD de
  cases, projetos, eventos, métricas, depoimentos, logos e fotos/vídeos das duas áreas públicas.
  Arquitetura ainda não desenhada em detalhe — combinado com Letícia que isso fica pra depois,
  sem pressa.

## Pendências

- Desenhar a arquitetura do `/admin` (schema do banco, auth, storage de mídia) quando Letícia
  pedir para avançar nisso.
- Nenhuma outra rota planejada até o momento.
