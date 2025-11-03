// src/features/analytics/components/SubscriberGrowthChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartData {
  date: string;
  subscribers: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-gray-700 bg-gray-800 p-3 shadow-lg">
        <p className="font-bold text-white">{`Data: ${label}`}</p>
        <p className="text-sm text-green-400">{`Novos Inscritos: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export function SubscriberGrowthChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
        <YAxis stroke="#9ca3af" fontSize={12} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#4b5563" }}/>
        <Legend />
        <Line
          type="monotone"
          dataKey="subscribers"
          name="Novos Inscritos"
          stroke="#4ade80" // green-400
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}