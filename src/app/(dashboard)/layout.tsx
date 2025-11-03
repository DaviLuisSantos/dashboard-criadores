// src/app/(dashboard)/layout.tsx
"use client"; // Necessário para usar hooks como useAuth e useRouter

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { ReactNode, useEffect } from "react";
import { Header } from "@/features/dashboard/components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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
      {/* Futuramente aqui entrará a Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="font-bold text-white">Menu</h2>
      </aside>

      <main className="flex-1 p-8">
        <Header />
        {children}
      </main>
    </div>
  );
}
