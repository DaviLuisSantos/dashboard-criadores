// src/app/(dashboard)/dashboard/page.tsx
import { Metadata } from "next";
import { Users, BarChart2, Clock, Video } from "lucide-react";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { VideoPerformanceListItem } from "@/features/dashboard/components/VideoPerformanceListItem";

export const metadata: Metadata = {
  title: "Dashboard",
};

// --- DADOS MOCADOS ---
// No futuro, estes dados virão da sua API backend.
const generalMetrics = [
  {
    title: "Inscritos",
    value: "125.430",
    icon: <Users className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Visualizações (Últimos 28 dias)",
    value: "1.2M",
    icon: <BarChart2 className="h-6 w-6 text-green-400" />,
  },
  {
    title: "Tempo de Exibição (horas)",
    value: "48.5k",
    icon: <Clock className="h-6 w-6 text-yellow-400" />,
  },
  {
    title: "Vídeos Publicados",
    value: "215",
    icon: <Video className="h-6 w-6 text-red-400" />,
  },
];

const topVideos = [
  {
    thumbnailUrl: "/placeholder-thumb.png", // Adicionaremos um placeholder
    title: "O Guia DEFINITIVO de Next.js 14 com App Router em 2025",
    views: 257890,
    likes: 18200,
    comments: 1300,
  },
  {
    thumbnailUrl: "/placeholder-thumb.png",
    title: "TypeScript e Zod: Validação de Dados Nível Sênior no Frontend",
    views: 189321,
    likes: 15600,
    comments: 987,
  },
  {
    thumbnailUrl: "/placeholder-thumb.png",
    title: "Tailwind CSS: 5 Truques que Vão Acelerar seu Workflow",
    views: 154780,
    likes: 12300,
    comments: 754,
  },
];
// --- FIM DOS DADOS MOCADOS ---

export default function DashboardPage() {
  return (
    <section>
      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {generalMetrics.map((metric) => (
          <StatsCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Seção de Vídeos com Melhor Performance */}
      <div className="mt-10 rounded-lg bg-gray-800 p-6">
        <h2 className="text-xl font-bold text-white">
          Vídeos com Melhor Performance
        </h2>
        <ul className="mt-4 space-y-2">
          {topVideos.map((video) => (
            <VideoPerformanceListItem
              key={video.title}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              views={video.views}
              likes={video.likes}
              comments={video.comments}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
