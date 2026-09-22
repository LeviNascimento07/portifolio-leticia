# Arquitetura — `src/hooks/`

| Hook | O que faz | Usado em |
| --- | --- | --- |
| `use-in-view.ts` (`useInView`) | `IntersectionObserver` simples — retorna `{ ref, inView }`, dispara `inView = true` uma vez quando o elemento entra na viewport (não volta a `false`). Usado pra disparar animações de entrada/contadores só quando a seção fica visível. | `About.tsx`, `PortfolioAbout.tsx`, `Results.tsx` (contador tipo odômetro). |
| `use-mobile.tsx` | Hook padrão gerado pelo shadcn/ui pra detectar viewport mobile (usado internamente por componentes como `sidebar.tsx`). Não é usado diretamente pelas seções do site — é dependência de componentes `ui/`. | Componentes `ui/` que precisam saber se estão em mobile. |

## Pendências

- Nenhuma no momento.
