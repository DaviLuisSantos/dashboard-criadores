// src/app/(auth)/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";
import { useAuth } from "@/contexts/auth-provider";
import { Chrome } from "lucide-react"; // Ícone para o botão

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth(); // Nosso hook de autenticação
  const [isSigningIn, setIsSigningIn] = useState(false); // Estado de loading para o botão

  // Efeito para redirecionar o usuário se ele já estiver logado
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // O redirecionamento será tratado pelo useEffect acima
      // ou pelo onAuthStateChanged do nosso AuthProvider.
      // Não precisamos fazer nada aqui após o sucesso.
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Aqui você pode adicionar um feedback para o usuário (ex: um toast de erro)
    } finally {
      setIsSigningIn(false);
    }
  };

  // Se o estado global ainda estiver carregando ou se o usuário já existe,
  // não renderizamos o botão para evitar um piscar na tela.
  if (isLoading || user) {
    return null; // Ou um componente de loading de página inteira
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 p-8">
      <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-gray-900 p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-white">Bem-vindo(a)</h1>
        <p className="mb-8 text-center text-gray-400">
          Faça login para acessar seu dashboard de criador.
        </p>

        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningIn ? (
            "Entrando..."
          ) : (
            <>
              <Chrome size={20} />
              Entrar com o Google
            </>
          )}
        </button>
      </div>
    </main>
  );
}
