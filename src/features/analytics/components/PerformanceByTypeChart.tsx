// src/features/analytics/components/PerformanceByTypeChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Interface para os dados do gráfico
interface ChartData {
  category: string;
  views: number;
  likes: number;
}

interface PerformanceByTypeChartProps {
  data: ChartData[];
}

// Componente customizado para o Tooltip (dica de hover)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-gray-700 bg-gray-800 p-3 shadow-lg">
        <p className="font-bold text-white">{`${label}`}</p>
        <p className="text-sm text-cyan-400">{`Visualizações: ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-sm text-pink-400">{`Curtidas: ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export function PerformanceByTypeChart({ data }: PerformanceByTypeChartProps) {
  return (
    // O ResponsiveContainer é essencial para o gráfico se adaptar
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 10,
          bottom: 5,
        }}
      >
        {/* Grid de fundo para melhor legibilidade */}
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

        {/* Eixo X (categorias) */}
        <XAxis dataKey="category" stroke="#9ca3af" fontSize={12} />

        {/* Eixo Y (valores) */}
        <YAxis
          stroke="#9ca3af"
          fontSize={12}
          tickFormatter={(value) => `${value / 1000}k`}
        />

        {/* Tooltip customizado para o tema escuro */}
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "#374151", opacity: 0.5 }}
        />

        {/* Legenda do gráfico */}
        <Legend />

        {/* Barras de dados */}
        <Bar
          dataKey="views"
          name="Visualizações"
          fill="#22d3ee"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="likes"
          name="Curtidas"
          fill="#f472b6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
