import { SUPABASE_STORAGE_BASE } from "@/lib/supabase-storage";

// Conteúdo exclusivo da área /portfolio (portfólio puro, sem foco em venda de pacotes).
//
// Reconstruído do zero numa sessão específica para seguir o script "Planejamentos de Conteúdo"
// que Letícia escreveu — ver src/components/portfolio/ARCHITECTURE.md para o histórico completo
// (inclui duas rodadas de simplificação anteriores a esta reconstrução).
//
// CONTENT_PLANS hoje tem 7 clientes: os 4 do script original de Letícia (Ley Móveis, Ley
// Colchões, Haja Coco, B Império Pratas — este chamado "Bempele Pratas" numa sessão anterior por
// erro de transcrição, corrigido depois que ela mandou o material real) + 3 dos 4 "Cases
// principais" antigos que ela pediu pra trazer de volta (Vitinarte, Mismec 4 Varas, Reserva Open
// Mall — "The Fitness" foi removido numa sessão seguinte, a pedido dela, por só ter vídeo sem
// nenhuma foto de post). "Marcas atendidas" e "Resultados" derivam desta mesma lista, para não
// duplicar nomes de cliente em arrays diferentes.
//
// Regra de sempre: nada de cliente/métrica/depoimento inventado.
//
// category/description dos clientes foram reescritos numa sessão seguinte: o modelo de
// planejamento completo (calendário/legendas/estratégia/direcionamento) ficou "pra depois" a
// pedido de Letícia — por ora cada card só mostra o que a empresa faz, em texto curto extraído de
// verdade dos PDFs de cronograma (quando existem) ou do conteúdo das fotos/vídeos organizados
// (quando não existem). `posts` já tem fotos reais para quem tinha foto disponível (Ley Móveis,
// Ley Colchões, Haja Coco, B Império Pratas, Mismec 4 Varas, Reserva Open Mall — esta última
// recebeu fotos numa sessão seguinte, antes só tinha vídeo); Vitinarte só tem vídeo no material
// recebido, então `posts` continua vazio pra ela — sem inventar imagem que não existe.
// calendar/captions/strategy/direction/pdf continuam vazios em todos (exceto o `pdf` de quem já
// tem o PDF real organizado, a ligar depois).

export const ABOUT_INDICATORS = [
  { title: "Social Media", desc: "Gestão de redes sociais" },
  { title: "Content Creator", desc: "Criação de conteúdo" },
  { title: "Videomaker", desc: "Captação e edição" },
  { title: "Fotografia", desc: "Registro e composição visual" },
  { title: "Copywriting", desc: "Textos e roteiros" },
  { title: "Estratégia", desc: "Planejamento e posicionamento" },
];

export const WHAT_I_DO = [
  {
    title: "Gestão de Redes Sociais",
    desc: "Planejamento, calendário editorial, publicação e acompanhamento.",
  },
  {
    title: "Criação de Conteúdo",
    desc: "Posts, carrosséis, reels, campanhas e conteúdos estratégicos.",
  },
  { title: "Videomaker", desc: "Roteiro, captação, direção e edição." },
  {
    title: "Fotografia",
    desc: "Registro de produtos, marcas, eventos e momentos especiais.",
  },
  {
    title: "Copywriting",
    desc: "Legendas, roteiros, ganchos, CTAs e textos comerciais.",
  },
  { title: "Estratégia", desc: "Planejamento, posicionamento e comunicação digital." },
  {
    title: "Métricas",
    desc: "Análise de alcance, visualizações, engajamento e crescimento.",
  },
];

// Planejamentos de Conteúdo — o coração do /portfolio. Cada cliente tem uma página própria
// (/portfolio/planejamentos/$slug) com 5 blocos: Estratégia, Calendário, Posts Prontos,
// Legendas, Direcionamento Estratégico — além de um PDF opcional do planejamento completo.
export type CalendarEntry = {
  day: string;
  format: string;
  theme: string;
  objective: string;
  status: string | null;
};

export type PlanPost = {
  image: string | null;
  format: string;
  theme: string;
  objective: string;
};

export type PlanCaption = {
  text: string;
  cta: string;
  hashtags: string[];
};

export type ContentPlan = {
  slug: string;
  client: string;
  category: string;
  description: string;
  strategy: {
    objective: string | null;
    period: string | null;
    communicationGoal: string | null;
    audience: string | null;
    pillars: string[];
    themes: string[];
  };
  calendar: CalendarEntry[];
  posts: PlanPost[];
  // Vídeos reais já hospedados no Supabase Storage — ainda sem player/UI na página (implementação
  // vai entrar aos poucos, a pedido de Letícia); por ora só disponíveis pra consumo futuro. Mesmo
  // padrão do campo `videos` que já existe em EVENTS.
  videos: string[];
  captions: PlanCaption[];
  direction: {
    objective: string | null;
    audience: string | null;
    tone: string | null;
    cta: string | null;
    pillar: string | null;
  };
  pdf: { label: string; url: string } | null;
};

function emptyPlan(
  slug: string,
  client: string,
  category: string,
  description: string,
): ContentPlan {
  return {
    slug,
    client,
    category,
    description,
    strategy: {
      objective: null,
      period: null,
      communicationGoal: null,
      audience: null,
      pillars: [],
      themes: [],
    },
    calendar: [],
    posts: [],
    videos: [],
    captions: [],
    direction: { objective: null, audience: null, tone: null, cta: null, pillar: null },
    pdf: null,
  };
}

// Post pronto com foto real, mas sem classificação de formato/tema/objetivo ainda — esse nível de
// detalhe faz parte do "modelo de planejamento" (calendário/legendas/direcionamento) que ficou
// para depois; por ora só as fotos que já temos organizadas em public/assets/.
function photoPost(image: string): PlanPost {
  return {
    image,
    format: "Imagem",
    theme: "A definir com Letícia.",
    objective: "A definir com Letícia.",
  };
}

// category/description abaixo descrevem o que cada empresa faz (não mais o formato do
// planejamento — "quinzenal", "mensal" etc. — que era o padrão antigo). Vieram da leitura real dos
// PDFs de cronograma em public/assets/portfolio/planejamentos/<slug>/pdf/ (Ley Móveis, Ley
// Colchões, Haja Coco, Reserva Open Mall) ou do conteúdo das fotos/vídeos organizados (os outros
// 4, que não têm PDF) — nunca invenção. Ver src/lib/ARCHITECTURE.md.
export const CONTENT_PLANS: ContentPlan[] = [
  {
    ...emptyPlan(
      "ley-moveis",
      "Ley Móveis",
      "Loja de móveis e organização",
      "Móveis funcionais e produtos de organização para casa, com foco em praticidade no dia a dia.",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-moveis/fotos/post-01.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-moveis/fotos/post-02.png`,
      ),
    ],
    videos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-moveis/videos/video-01.mp4`,
    ],
    pdf: {
      label: "Cronograma de conteúdo — Ley Móveis",
      url: `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-moveis/pdf/cronograma-ley-moveis.pdf`,
    },
  },
  {
    ...emptyPlan(
      "ley-colchoes",
      "Ley Colchões",
      "Colchões — fábrica e atacado",
      "Fábrica de colchões que vende direto para lojistas (atacado/revenda), com foco em conforto e qualidade de sono.",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/fotos/post-01.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/fotos/post-02.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/fotos/post-03.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/fotos/post-04.png`,
      ),
    ],
    videos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/videos/video-01.mp4`,
    ],
    pdf: {
      label: "Cronograma de conteúdo — Ley Colchões",
      url: `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/ley-colchoes/pdf/cronograma-ley-colchoes.pdf`,
    },
  },
  {
    ...emptyPlan(
      "haja-coco",
      "Haja Coco",
      "Água de coco",
      "Água de coco integral e pasteurizada, pensada pra acompanhar a rotina em qualquer momento do dia (não só praia).",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/haja-coco/fotos/post-01.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/haja-coco/fotos/post-02.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/haja-coco/fotos/post-03.png`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/haja-coco/fotos/post-04.png`,
      ),
    ],
    pdf: {
      label: "Apresentação — Haja Coco",
      url: `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/haja-coco/pdf/apresentacao-haja-coco.pdf`,
    },
  },
  {
    ...emptyPlan(
      "b-imperio-pratas",
      "B Império Pratas",
      "Semijoias — atacado de prata 925",
      "Loja de semijoias de prata 925 com venda no atacado — preparo e envio de pedidos direto do estoque.",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-01.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-02.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-03.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-04.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-05.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/fotos/post-06.jpg`,
      ),
    ],
    videos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/b-imperio-pratas/videos/video-01.mp4`,
    ],
  },
  {
    ...emptyPlan(
      "vitinarte",
      "Vitinarte",
      "Customização de roupas",
      "Estúdio de customização de roupas (estampas e peças personalizadas), incluindo produções temáticas como a Copa do Mundo.",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/vitinarte/fotos/post-01.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/vitinarte/fotos/post-02.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/vitinarte/fotos/post-03.jpg`,
      ),
    ],
    videos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/vitinarte/videos/video-02.mp4`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/vitinarte/videos/video-03.mp4`,
    ],
  },
  {
    ...emptyPlan(
      "mismec-4-varas",
      "Mismec 4 Varas",
      "Espaço comunitário de bem-estar",
      'Comunidade de cuidado no bairro Quatro Varas, com terapias como massagem e ventosaterapia — "cuidar de pessoas transforma vidas".',
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/mismec-4-varas/fotos/post-01.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/mismec-4-varas/fotos/post-02.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/mismec-4-varas/fotos/post-03.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/mismec-4-varas/fotos/post-04.jpg`,
      ),
    ],
  },
  {
    ...emptyPlan(
      "reserva-open-mall",
      "Reserva Open Mall",
      "Shopping — marketing multilojas",
      "Conteúdo do Shopping Reserva Open Mall, cobrindo diferentes lojistas do shopping (ex.: Ottobom colchões/enxovais, CVC viagens).",
    ),
    posts: [
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/fotos/post-01.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/fotos/post-02.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/fotos/post-03.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/fotos/post-04.jpg`,
      ),
      photoPost(
        `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/fotos/post-05.jpg`,
      ),
    ],
    videos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/videos/video-01.mov`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/videos/video-02.mov`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/videos/video-03.mov`,
    ],
    pdf: {
      label: "Cronograma de conteúdo — Reserva Open Mall",
      url: `${SUPABASE_STORAGE_BASE}/assets/portfolio/planejamentos/reserva-open-mall/pdf/cronograma-reserva-open-mall.pdf`,
    },
  },
];

// Conteúdos publicados no Instagram e fornecidos diretamente por Letícia. A página não hospeda
// esses arquivos: cada card abre o post/reel em um player incorporado na própria página.
export const PORTFOLIO_VIDEOS = [
  {
    slug: "reserva-open-mall",
    client: "Reserva Open Mall",
    items: [
      { type: "Reel", url: "https://www.instagram.com/reel/DcttHI1RrEW/?stkn=MW90dm5nOWRrbWp2cg==" },
      { type: "Reel", url: "https://www.instagram.com/reel/Dcywe--RJDd/?stkn=emhmMjV3aHl3bWxw" },
      { type: "Publicação", url: "https://www.instagram.com/p/Da6FcaRkaY9/?img_index=2&stkn=MWR6bmR4anN5cjVqNA==" },
    ],
  },
  {
    slug: "b-imperio-pratas",
    client: "B Império Pratas",
    items: [
      { type: "Reel", url: "https://www.instagram.com/reel/Dc8wMZ5O2oX/?stkn=MWFrem83OWp3dTRraw==" },
      { type: "Reel", url: "https://www.instagram.com/reel/DbyLaEYOtSJ/?stkn=MXFnaHNwbmNkbmd3NA==" },
      { type: "Publicação", url: "https://www.instagram.com/p/DbyB96HFqvw/?stkn=MWUwemo4eXg3eGoy" },
    ],
  },
  {
    slug: "ley-colchoes",
    client: "Ley Colchões",
    items: [
      { type: "Publicação", url: "https://www.instagram.com/p/DcvuD4PIALs/?stkn=MTcyNnM4djA5aTRxMw==" },
      { type: "Reel", url: "https://www.instagram.com/reel/DaRBmCnxKKC/?stkn=Mm1rdGR0NzYxZzZq" },
    ],
  },
  {
    slug: "ley-moveis",
    client: "Ley Móveis",
    items: [
      { type: "Publicação", url: "https://www.instagram.com/p/DcgRRVzoJYi/?img_index=2&stkn=MXB4M3hvam9wYXRpaQ==" },
      { type: "Reel", url: "https://www.instagram.com/reel/DbnuctORZh7/?stkn=bjV2OHFpcW9oeTdp" },
      { type: "Publicação", url: "https://www.instagram.com/p/DcOyAkpicM_/?stkn=b2hkcHVnNTc5eDYw" },
    ],
  },
  {
    slug: "vitinarte",
    client: "Vitinarte",
    items: [
      { type: "Reel", url: "https://www.instagram.com/reel/DZ-QMzLu4J0/?stkn=MjN2emRvdHN3OHp3" },
      { type: "Reel", url: "https://www.instagram.com/reel/DZYagzKJNWx/?stkn=MXQzczdzajAwMGV1bA==" },
    ],
  },
  {
    slug: "mismec-4-varas",
    client: "Mismec 4 Varas",
    items: [
      { type: "Reel", url: "https://www.instagram.com/reel/DdHXicaRN8w/?stkn=NnZuYTNjcWF2aGkw" },
      { type: "Publicação", url: "https://www.instagram.com/p/DdWo1salgYC/?stkn=cXhieDNyOHcwbXpj" },
    ],
  },
] as const;

// Eventos & Audiovisual — fora do universo de marcas/empresas (aniversário, chá revelação, parto).
// "Outros" foi removido: o filtro já tem "Todos" cobrindo esse caso, não precisa de duas opções
// que significam a mesma coisa.
export const EVENT_CATEGORIES = [
  "Aniversários",
  "Revelações",
  "Partos",
  "Eventos",
  "Bastidores",
] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

// Letícia separou "Eventos extras" ela mesma em pastas por categoria (pasta local
// "Eventos extras/{aniversario,partos,revelações}") — é a fonte de verdade aqui, substituindo a
// classificação anterior por evento individual (que tinha "Chá revelação"/"Parto — Bernardo
// Elias"/"Ensaio gestante" como títulos próprios). Na nova separação dela, o que antes era "Chá
// revelação" e "Ensaio gestante" caiu junto em "Revelações". "Eventos" e "Bastidores" ainda não
// têm pasta — ela vai organizar depois.
//
// imageAuthorized: true nas 3 categorias abaixo (Aniversários/Revelações/Partos) — Letícia
// autorizou explicitamente a exibição pública numa sessão seguinte, depois de ela mesma separar
// as pastas por categoria. São fotos reais e identificáveis de famílias/bebês (recém-nascido, chá
// revelação, aniversário) — se uma categoria nova entrar aqui sem autorização confirmada, começar
// com `false` até ela confirmar de novo (mesmo critério de sempre, não mudou). Títulos ficam no
// nível da categoria (não citam nomes próprios de bebê/família) para não guardar mais PII no
// código do que o necessário.
export const EVENTS: {
  title: string;
  category: EventCategory;
  date: string | null;
  description: string;
  role: string | null;
  imageAuthorized: boolean;
  photos: string[];
  videos: string[];
}[] = [
  {
    title: "Aniversários",
    category: "Aniversários",
    date: null,
    description: "Registros de festas de aniversário acompanhadas por Letícia.",
    role: null,
    imageAuthorized: true,
    photos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/aniversarios/aniversario-01.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/aniversarios/aniversario-02.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/aniversarios/aniversario-03.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/aniversarios/aniversario-04.jpeg`,
    ],
    videos: [],
  },
  {
    title: "Revelações",
    category: "Revelações",
    date: null,
    description: "Registros de chás revelação e ensaios de casal em fase gestante.",
    role: null,
    imageAuthorized: true,
    photos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-01.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-02.png`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-03.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-04.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-05.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-06.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/revelacoes/revelacao-07.jpeg`,
    ],
    videos: [],
  },
  {
    title: "Partos",
    category: "Partos",
    date: null,
    description: "Registro de nascimento em ambiente hospitalar.",
    role: null,
    imageAuthorized: true,
    photos: [
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/partos/parto-01.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/partos/parto-02.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/partos/parto-03.jpeg`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/partos/parto-04.png`,
      `${SUPABASE_STORAGE_BASE}/assets/portfolio/eventos/partos/parto-05.jpeg`,
    ],
    videos: [],
  },
];

// Resultados — prints reais de Instagram Insights / Meta Business Suite, um ou mais por cliente.
// Letícia só tem métricas de 3 empresas hoje (Vitinarte, B Império Pratas, Mismec 4 Varas) — o
// resto fica com array vazio até ela ter/mandar mais. Deriva da lista de CONTENT_PLANS — mesmos
// clientes, um só lugar.
const RESULTS_IMAGES: Record<string, string[]> = {
  Vitinarte: [`${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/vitinarte/print-01.png`],
  "B Império Pratas": [
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/b-imperio-pratas/print-01.jpeg`,
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/b-imperio-pratas/print-02.jpeg`,
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/b-imperio-pratas/print-03.jpeg`,
  ],
  "Mismec 4 Varas": [
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/mismec-4-varas/print-01.jpeg`,
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/mismec-4-varas/print-02.jpeg`,
    `${SUPABASE_STORAGE_BASE}/assets/portfolio/metricas/mismec-4-varas/print-03.jpeg`,
  ],
};

export const RESULTS_PHOTOS: { account: string; images: string[] }[] = CONTENT_PLANS.map((p) => ({
  account: p.client,
  images: RESULTS_IMAGES[p.client] ?? [],
}));
