// src/app/(dashboard)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { ReactNode, useEffect } from "react";
import { Header } from "@/features/dashboard/components/Header";
import {
  LayoutDashboard,
  Columns,
  CalendarClock,
  LineChart,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Apenas executa a verificação quando o carregamento inicial termina
    if (!isLoading && !user) {
      // Se não há usuário, redireciona para a página de login
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Enquanto carrega ou se não há usuário, não renderiza o conteúdo do dashboard
  // para evitar que apareça brevemente para usuários não autorizados.
  if (isLoading || !user) {
    return null; // Ou um componente de loading
  }

  // Se o usuário está logado, renderiza o layout do dashboard e suas páginas filhas
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="mb-8 text-xl font-bold text-white">CreatorDash</h2>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            href="/pipeline"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/pipeline"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <Columns size={20} />
            Pipeline
          </Link>
          <Link
            href="/history"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/history"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <CalendarClock size={20} />
            Histórico
          </Link>
          <Link
            href="/analytics"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/analytics"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <LineChart size={20} />
            Análise
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-900 p-8">
        <Header />
        {children}
      </main>
    </div>
  );
}
