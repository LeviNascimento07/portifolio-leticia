import { createFileRoute, notFound } from "@tanstack/react-router";
import { PlanDetail } from "@/components/portfolio/PlanDetail";
import { CONTENT_PLANS } from "@/lib/portfolio-content";

export const Route = createFileRoute("/portfolio/planejamentos/$slug")({
  loader: ({ params }) => {
    const plan = CONTENT_PLANS.find((p) => p.slug === params.slug);
    if (!plan) throw notFound();
    return plan;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `Planejamento — ${loaderData.client} | Letícia Sousa`
      : "Planejamento | Letícia Sousa";
    const description = loaderData?.description ?? "Planejamento de conteúdo de Letícia Sousa.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PlanRoute,
});

function PlanRoute() {
  const plan = Route.useLoaderData();
  return <PlanDetail plan={plan} />;
}
