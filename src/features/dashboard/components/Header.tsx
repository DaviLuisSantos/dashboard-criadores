// src/features/dashboard/components/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/auth-provider";
import { LogOut } from "lucide-react";

export function Header() {
  const { user } = useAuth(); // Pegamos os dados do usuário do nosso contexto
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Após o logout, o onAuthStateChanged no nosso AuthProvider
      // vai atualizar o estado. O layout do dashboard nos redirecionará.
      // Mas podemos forçar o redirecionamento para uma experiência mais rápida.
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Adicionar um feedback de erro aqui se necessário
    }
  };

  // Não renderiza nada se não houver usuário (proteção extra)
  if (!user) {
    return null;
  }

  // Pega o primeiro nome do usuário para uma saudação amigável
  const firstName = user.displayName?.split(" ")[0] || "Criador";

  return (
    <header className="mb-8 flex w-full items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Olá, {firstName}!</h1>
        <p className="text-gray-400">Aqui está o resumo do seu canal.</p>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <LogOut size={16} />
        Sair
      </button>
    </header>
  );
}
