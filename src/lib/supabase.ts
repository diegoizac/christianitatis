import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Configuração Supabase:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro de configuração:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  })
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
})

// Tipos para as tabelas do Supabase
export interface Tables {
  events: {
    Row: {
      id: string
      title: string
      description: string
      date: string
      time: string
      location: {
        address: string
        city: string
        state: string
        coordinates: {
          lat: number
          lng: number
        }
      }
      media: {
        images: Array<{
          url: string
          size: number
          format: string
          name: string
        }>
        videos: Array<{
          url: string
          size: number
          format: string
          name: string
        }>
      }
      capacity: number
      registered_count: number
      price: number | null
      contact: {
        name: string
        email: string
        phone: string
      }
      status: 'draft' | 'pending' | 'published' | 'cancelled'
      approvedBy: string | null
      created_at: string
      updated_at: string
    }
    Insert: Omit<
      Tables['events']['Row'],
      'id' | 'registered_count' | 'created_at' | 'updated_at' | 'approvedBy'
    >
    Update: Partial<Tables['events']['Insert']>
  }
  event_registrations: {
    Row: {
      id: string
      event_id: string
      user_id: string
      status: 'pending' | 'confirmed' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      payment_id: string | null
      created_at: string
    }
    Insert: Omit<Tables['event_registrations']['Row'], 'id' | 'created_at'>
    Update: Partial<Tables['event_registrations']['Insert']>
  }
  users: {
    Row: {
      id: string
      email: string
      name: string
      role: 'user' | 'admin'
      created_at: string
      updated_at: string
    }
  }
}

export type Database = {
  public: Tables
}

export type { User, Session } from '@supabase/supabase-js'

// Tipos para as tabelas do Supabase
export interface ContactMessage {
  id: number
  created_at: string
  email: string
  name?: string
  message?: string
  status: 'pending' | 'sent' | 'error'
}
