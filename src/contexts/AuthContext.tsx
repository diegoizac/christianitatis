import React from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [session, setSession] = React.useState<Session | null>(null)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escutar mudanças de auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      console.error('Erro no login:', error)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) throw error

      toast.success('Cadastro realizado! Verifique seu email.')
      navigate('/login')
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.')
      console.error('Erro no cadastro:', error)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast.success('Logout realizado com sucesso!')
      navigate('/login')
    } catch (error) {
      toast.error('Erro ao fazer logout.')
      console.error('Erro no logout:', error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error

      toast.success('Email de recuperação enviado!')
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação.')
      console.error('Erro na recuperação de senha:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
