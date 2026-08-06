import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { EMAIL_ADDRESS, WHATSAPP_LINK } from "@/lib/content";
import { Monogram } from "@/components/brand/Monogram";

const TITLE = "Política de Privacidade | Letícia Cavalcante Sousa";
const DESCRIPTION =
  "Como os dados enviados pelo formulário de contato do site de Letícia Cavalcante Sousa são coletados, usados e protegidos, conforme a LGPD.";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/privacidade" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: Privacidade,
});

const SECTIONS = [
  {
    title: "1. Quem é a responsável pelos dados",
    body: "Os dados coletados neste site são tratados por Letícia Cavalcante Sousa, prestadora de serviços de social media, storymaking e produção audiovisual. Contato para assuntos de privacidade: " +
      EMAIL_ADDRESS +
      ".",
  },
  {
    title: "2. Quais dados coletamos",
    body: "Coletamos apenas os dados que você informa voluntariamente no formulário de contato: nome, e-mail, telefone e a mensagem enviada. Também podemos registrar dados técnicos básicos de navegação, caso ferramentas de análise sejam ativadas futuramente, sempre com o seu consentimento por meio do banner de cookies.",
  },
  {
    title: "3. Para que usamos os seus dados",
    body: "Os dados são usados exclusivamente para responder ao seu contato, elaborar orçamentos e dar continuidade à negociação dos serviços. Não vendemos, alugamos nem compartilhamos os seus dados com terceiros para fins publicitários.",
  },
  {
    title: "4. Base legal (LGPD)",
    body: "O tratamento se baseia no seu consentimento (art. 7º, I da Lei nº 13.709/2018) ao enviar o formulário e, quando aplicável, na execução de contrato ou nos procedimentos preliminares relacionados a ele (art. 7º, V).",
  },
  {
    title: "5. Por quanto tempo guardamos",
    body: "As mensagens são mantidas pelo tempo necessário para o atendimento e, no caso de projetos contratados, pelo período exigido para cumprimento de obrigações legais e fiscais. Depois disso, os dados são eliminados.",
  },
  {
    title: "6. Cookies",
    body: "O site utiliza apenas cookies essenciais ao seu funcionamento e o armazenamento local da sua escolha no banner de consentimento. Cookies de análise ou marketing só serão utilizados após a sua aceitação e poderão ser recusados sem prejuízo à navegação.",
  },
  {
    title: "7. Seus direitos",
    body: "Você pode solicitar, a qualquer momento, confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o consentimento. Basta escrever para " +
      EMAIL_ADDRESS +
      " e responderemos no menor prazo possível.",
  },
  {
    title: "8. Segurança",
    body: "Adotamos medidas razoáveis para proteger as informações recebidas contra acesso não autorizado, perda ou uso indevido. Nenhum meio de transmissão é totalmente infalível, por isso pedimos que evite enviar dados sensíveis pelo formulário.",
  },
  {
    title: "9. Alterações desta política",
    body: "Esta política pode ser atualizada para refletir mudanças nos nossos serviços ou na legislação. A versão vigente estará sempre disponível nesta página.",
  },
];

function Privacidade() {
  return (
    <main className="min-h-screen bg-ink pb-24 pt-16">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-cream/60 uppercase transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-4" /> Voltar ao site
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <Monogram />
          <p className="eyebrow text-gold">Privacidade</p>
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1] text-cream">
          Política de <span className="text-gradient-gold">Privacidade</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-cream/70">
          Esta página explica, de forma simples, quais dados pessoais são coletados neste site, como
          eles são usados e quais são os seus direitos segundo a Lei Geral de Proteção de Dados
          (LGPD).
        </p>

        <div className="mt-14 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl text-cream">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-brand border border-cream/15 bg-cream/[0.06] p-8">
          <p className="text-sm leading-relaxed text-cream/70">
            Dúvidas sobre os seus dados? Fale direto comigo por{" "}
            <a href={`mailto:${EMAIL_ADDRESS}`} className="text-gold underline">
              e-mail
            </a>{" "}
            ou pelo{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="text-gold underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
