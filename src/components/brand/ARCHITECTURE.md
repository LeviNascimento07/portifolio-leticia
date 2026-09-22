# Arquitetura — `src/components/brand/`

> Componentes de marca **compartilhados** entre `/` e `/portfolio` (e qualquer rota futura).
> Diferente de `sections/` e `portfolio/`, que são exclusivos de cada site.

## Arquivos

| Componente | O que faz | Usado em |
| --- | --- | --- |
| `Monogram.tsx` | Logo "LC" em círculo — monograma da marca. | Navbar dos dois sites, rodapé dos dois sites, `privacidade.tsx`. |
| `WhatsAppFloat.tsx` | Botão flutuante fixo (canto inferior direito) que abre o WhatsApp. | `/` e `/portfolio`. |
| `BackToTop.tsx` | Botão flutuante fixo (canto inferior **esquerdo** — o direito é do WhatsApp) que aparece após `scrollY > 600` e volta pro topo (`#top`). | `/` e `/portfolio`. |
| `CookieBanner.tsx` | Banner de consentimento de cookies (LGPD), aceitar/recusar. | `/` e `/portfolio`. |

## Decisões

- Qualquer componente aqui precisa fazer sentido nos **dois** sites. Se um componente é
  específico de só um site, ele vai em `sections/` ou `portfolio/`, não aqui.
- Cores/paleta seguem o mesmo design system dos dois sites (preto `#0B0D0F` + dourado champagne
  `#D6B36A`/`#F1D79A`) — ver `.claude/skills/design-system/SKILL.md`.

## Pendências

- Nenhuma no momento.
