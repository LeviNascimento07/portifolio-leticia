import { SUPABASE_STORAGE_BASE } from "@/lib/supabase-storage";

// Fotos profissionais reais de Letícia (substituem os placeholders do Unsplash) — compartilhadas
// pelos dois sites, ver src/lib/ARCHITECTURE.md.
export const HERO_DECK = [
  `${SUPABASE_STORAGE_BASE}/assets/perfil/retrato.png`,
  `${SUPABASE_STORAGE_BASE}/assets/perfil/mesa-trabalho.png`,
];

export const ABOUT_IMAGE = `${SUPABASE_STORAGE_BASE}/assets/perfil/mesa-trabalho.png`;

export const SERVICES = [
  {
    title: "Gestão de Redes Sociais",
    desc: "Planejamento, calendário editorial e publicação estratégica.",
  },
  { title: "Criação de Conteúdo", desc: "Fotos, vídeos e copy alinhados à sua identidade." },
  { title: "Storymaker", desc: "Narrativas diárias que aproximam a sua marca do público." },
  { title: "Filmmaker", desc: "Direção, captação e edição audiovisual profissional." },
  { title: "Cobertura de Eventos", desc: "Registro completo com olhar autoral e ágil." },
  { title: "Cobertura de Casamento", desc: "Emoção e detalhes eternizados com sensibilidade." },
  { title: "Cobertura de Parto", desc: "Um dos momentos mais íntimos, documentado com respeito." },
  { title: "Stories em Tempo Real", desc: "Transmissão dos melhores momentos enquanto acontecem." },
  { title: "Produção de Reels", desc: "Vídeos curtos pensados para alcance e conversão." },
];

export const PACKAGES = [
  {
    name: "Start",
    price: "R$ —",
    tagline: "Para quem está começando com consistência.",
    items: [
      "8 publicações no feed por mês",
      "12 stories mensais",
      "1 reels por mês",
      "Planejamento de conteúdo",
      "Relatório mensal simplificado",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "R$ —",
    tagline: "Presença digital ativa e estratégica.",
    items: [
      "12 publicações no feed por mês",
      "20 stories mensais",
      "4 reels por mês",
      "Planejamento e linha editorial",
      "1 gravação presencial mensal",
      "Relatório de métricas completo",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "R$ —",
    tagline: "Gestão completa com produção audiovisual.",
    items: [
      "16 publicações no feed por mês",
      "Stories diários em tempo real",
      "8 reels por mês",
      "Estratégia e identidade visual",
      "2 gravações presenciais mensais",
      "Cobertura de 1 evento por mês",
      "Relatório completo + consultoria",
      "Atendimento prioritário no WhatsApp",
    ],
    featured: true,
  },
];

export const METRICS = [
  { value: 1250000, suffix: "", label: "Views geradas", format: "compact" as const },
  { value: 87, suffix: "%", label: "Aumento de atividade", format: "plain" as const },
  { value: 420000, suffix: "", label: "Contas alcançadas", format: "compact" as const },
  { value: 18400, suffix: "", label: "Cliques em links", format: "compact" as const },
];

export type PhotoCategory = "Casamento" | "Parto" | "Eventos";

export const PHOTOS: { src: string; category: PhotoCategory; alt: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    category: "Casamento",
    alt: "Noivos de mãos dadas durante a cerimônia",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    category: "Casamento",
    alt: "Detalhe das alianças sobre o buquê",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    category: "Casamento",
    alt: "Noiva com vestido longo em luz natural",
  },
  {
    src: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
    category: "Parto",
    alt: "Mãos de recém-nascido seguras pelos pais",
  },
  {
    src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    category: "Parto",
    alt: "Mãe abraçando o bebê recém-nascido",
  },
  {
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    category: "Parto",
    alt: "Detalhe dos pés do bebê em tecido claro",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    category: "Eventos",
    alt: "Celebração com confetes durante evento",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    category: "Eventos",
    alt: "Público reunido em evento corporativo",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80",
    category: "Eventos",
    alt: "Mesa decorada para recepção de evento",
  },
  {
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    category: "Eventos",
    alt: "Show ao vivo com iluminação cênica",
  },
];

export const VIDEOS = [
  {
    title: "Casamento — Ana & Rafael",
    kind: "Filmmaker",
    thumb:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Nascimento do Théo",
    kind: "Cobertura de parto",
    thumb:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Reels — Café Botânico",
    kind: "Produção de reels",
    thumb:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Summit Digital 2025",
    kind: "Cobertura de evento",
    thumb:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Campanha — Studio Aura",
    kind: "Direção audiovisual",
    thumb:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80",
  },
];

export const WHATSAPP_NUMBER = "5585999099175";
export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e quero saber mais sobre os pacotes de Social Media.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const EMAIL_ADDRESS = "leticiasousa1492@gmail.com";
export const INSTAGRAM_HANDLE = "@leticia_cavalcante_sousa";

export const CONTACTS = {
  instagram: "https://instagram.com/leticia_cavalcante_sousa",
  whatsapp: WHATSAPP_LINK,
  email: `mailto:${EMAIL_ADDRESS}`,
};
