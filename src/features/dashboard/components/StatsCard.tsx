// src/features/dashboard/components/StatsCard.tsx
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode; // Permite passar um componente de ícone (ex: <Users />)
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-800 p-5 shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
