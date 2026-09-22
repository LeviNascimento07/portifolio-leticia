# Arquitetura — `src/components/sections/`

> Seções da rota `/` (site **portfólio + venda**). Para o site portfólio puro (`/portfolio`),
> ver `src/components/portfolio/ARCHITECTURE.md` — são pastas e componentes separados,
> não compartilham JSX (mas alguns compartilham dados-base ou padrões visuais).

## Arquivos

| Componente | Seção no site | Observações |
| --- | --- | --- |
| `Navbar.tsx` | Header fixo | Menu desktop + hambúrguer mobile. Tem link cruzado para `/portfolio` ("Portfólio completo"). |
| `Hero.tsx` | Abertura | Pilha de fotos em leque interativa (efeito "folhear"), usa `HERO_DECK` de `content.ts` — hoje 2 fotos profissionais reais dela (`public/assets/perfil/`). Ver design-system skill. |
| `About.tsx` | Sobre mim | Foto (`ABOUT_IMAGE`, mesma pasta `perfil/`) + bio curta + 4 tags de especialidade. |
| `Services.tsx` | O que eu faço | 9 cards de serviço com flip 3D no ícone (hover). |
| `Packages.tsx` | Pacotes | Start/Pro/Premium. Preço é sempre placeholder `"R$ —"` — **nunca inventar valor real**. |
| `Results.tsx` | Resultados | 4 métricas genéricas com contador tipo odômetro. |
| `Portfolio.tsx` | Portfólio | Galeria de fotos (masonry, filtro por categoria Casamento/Parto/Eventos) + carrossel coverflow de vídeos. |
| `PhotoLightbox.tsx` | (usado por `Portfolio.tsx`) | Modal fullscreen sobre `@radix-ui/react-dialog` direto (não o wrapper genérico). |
| `Contact.tsx` | Contato + rodapé | Blobs animados de fundo, links de contato, rodapé com monograma. |
| `ContactForm.tsx` | (usado por `Contact.tsx`) | Validação com `zod`. **Nunca envia e-mail** — monta mensagem e redireciona pro WhatsApp (`wa.me`). Regra de negócio fixa, não reintroduzir `mailto:` como caminho principal. |

## Dados

Todo o conteúdo (serviços, pacotes, fotos, vídeos, contatos) vem de `src/lib/content.ts`.
Não hard-codar texto duplicado aqui — editar lá.

## Convenções visuais

Ver `.claude/skills/design-system/SKILL.md` para paleta, tipografia, animações e componentes
interativos já testados (e os que foram testados e descartados — não reintroduzir sem pedido novo).

## Pendências

- Preços dos pacotes ainda placeholder (`"R$ —"`). Fotos/vídeos de `Portfolio.tsx`/`PHOTOS`/
  `VIDEOS` ainda são Unsplash — só `HERO_DECK`/`ABOUT_IMAGE` (Hero/About) já usam fotos reais
  dela, o resto aguarda material.
- `Hero.tsx` tem seu próprio state de "imagem carregada" (não usa `BlurImage`) — teve o mesmo bug
  de race condition corrigido numa sessão específica (ver `src/components/ui/ARCHITECTURE.md`).
  Se mexer nesse componente, atenção pra não reintroduzir o bug.
