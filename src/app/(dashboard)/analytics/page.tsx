// src/app/(dashboard)/analytics/page.tsx
import { Metadata } from "next";
import { Users, BarChart, HeartHandshake, Eye } from "lucide-react";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { PerformanceByTypeChart } from "@/features/analytics/components/PerformanceByTypeChart";
import { SubscriberGrowthChart } from "@/features/analytics/components/SubscriberGrowthChart";
import { ViewSourceChart } from "@/features/analytics/components/ViewSourceChart";

export const metadata: Metadata = {
  title: "Análise de Desempenho",
};

// --- DADOS MOCADOS ---
const kpiMetrics = [
  {
    title: "Novos Inscritos (30d)",
    value: "+ 1.250",
    icon: <Users className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Visualizações (30d)",
    value: "245.7k",
    icon: <Eye className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Taxa de Engajamento",
    value: "8.2%",
    icon: <HeartHandshake className="h-6 w-6 text-pink-400" />,
  },
];

const performanceData = [
  { category: "Tutoriais", views: 120000, likes: 9500 },
  { category: "Reviews", views: 98000, likes: 11000 },
  { category: "Vlogs", views: 75000, likes: 8200 },
  { category: "Entrevistas", views: 45000, likes: 4100 },
  { category: "Lives", views: 89000, likes: 7600 },
];

const subscriberData = [
  { date: "01/10", subscribers: 150 },
  { date: "08/10", subscribers: 210 },
  { date: "15/10", subscribers: 180 },
  { date: "22/10", subscribers: 250 },
  { date: "29/10", subscribers: 310 },
];

const viewSourceData = [
  { name: "Busca do YouTube", value: 45 },
  { name: "Vídeos Sugeridos", value: 30 },
  { name: "Fontes Externas", value: 15 },
  { name: "Páginas do Canal", value: 5 },
  { name: "Outros", value: 5 },
];
// --- FIM DOS DADOS MOCADOS ---

export default function AnalyticsPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Página de Análise</h1>

      {/* Seção de KPIs */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {kpiMetrics.map((metric) => (
          <StatsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Seção do Gráfico Principal */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">Desempenho por Tipo de Vídeo</h2>
        <div className="h-[400px] w-full">
          <PerformanceByTypeChart data={performanceData} />
        </div>
      </div>

      {/* Seção com Gráficos Secundários */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold">
            Crescimento de Inscritos (Mês)
          </h2>
          <div className="h-[400px] w-full">
            <SubscriberGrowthChart data={subscriberData} />
          </div>
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-xl font-bold">Origem das Visualizações</h2>
          <div className="h-[400px] w-full">
            <ViewSourceChart data={viewSourceData} />
          </div>
        </div>
      </div>
    </section>
  );
}
