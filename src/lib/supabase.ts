import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key são obrigatórios");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas do Supabase
export interface ContactMessage {
  id: number;
  created_at: string;
  email: string;
  name?: string;
  message?: string;
  status: "pending" | "sent" | "error";
}
