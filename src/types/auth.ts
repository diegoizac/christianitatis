import { Session, User as SupabaseUser } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  username: string
  full_name: string
  avatar_url?: string
  diocese?: string
  paroquia?: string
  role: string
  created_at?: string
  updated_at?: string
}

export interface User extends SupabaseUser {
  profile?: UserProfile | null
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  session: Session | null
  emailConfirmationRequired?: boolean
}

export interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  clearError: () => void
}
