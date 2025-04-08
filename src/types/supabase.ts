export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          nome: string
          diocese: string | null
          paroquia: string | null
          telefone: string | null
          tipo_membro: 'participante' | 'coordenador' | 'admin'
          interesses: string[] | null
          newsletter: boolean
          ultima_participacao: string | null
          eventos_inscritos: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nome: string
          diocese?: string | null
          paroquia?: string | null
          telefone?: string | null
          tipo_membro?: 'participante' | 'coordenador' | 'admin'
          interesses?: string[] | null
          newsletter?: boolean
          ultima_participacao?: string | null
          eventos_inscritos?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nome?: string
          diocese?: string | null
          paroquia?: string | null
          telefone?: string | null
          tipo_membro?: 'participante' | 'coordenador' | 'admin'
          interesses?: string[] | null
          newsletter?: boolean
          ultima_participacao?: string | null
          eventos_inscritos?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          titulo: string
          descricao: string
          data: string
          local: string
          tipo: 'missa' | 'formacao' | 'retiro' | 'outro'
          vagas: number
          inscritos: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descricao: string
          data: string
          local: string
          tipo: 'missa' | 'formacao' | 'retiro' | 'outro'
          vagas: number
          inscritos?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descricao?: string
          data?: string
          local?: string
          tipo?: 'missa' | 'formacao' | 'retiro' | 'outro'
          vagas?: number
          inscritos?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
