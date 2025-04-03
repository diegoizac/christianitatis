import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";
import { Profile } from "../types/supabase";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (data: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  }) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar o perfil do usuário
  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      toast.error("Erro ao carregar perfil do usuário");
    }
  };

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Login realizado com sucesso!");
      return { error: null };
    } catch (error) {
      toast.error("Erro ao fazer login: " + (error as AuthError).message);
      return { error: error as AuthError };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: userData,
        },
      });
      if (error) throw error;
      toast.success("Cadastro realizado! Verifique seu email.");
      return { error: null };
    } catch (error) {
      toast.error("Erro ao criar conta: " + (error as AuthError).message);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout: " + (error as AuthError).message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success("Email de recuperação enviado!");
      return { error: null };
    } catch (error) {
      toast.error("Erro ao enviar email: " + (error as AuthError).message);
      return { error: error as AuthError };
    }
  };

  const updateProfile = async (data: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  }) => {
    try {
      if (!user) throw new Error("Usuário não autenticado");

      // Atualizar perfil no Supabase
      const { error: profileError } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Atualizar dados do usuário no Auth
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          full_name: data.full_name,
          avatar_url: data.avatar_url,
        },
      });

      if (userError) throw userError;

      // Recarregar perfil
      await loadProfile(user.id);

      toast.success("Perfil atualizado com sucesso!");
      return { error: null };
    } catch (error) {
      toast.error("Erro ao atualizar perfil: " + (error as AuthError).message);
      return { error: error as AuthError };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
