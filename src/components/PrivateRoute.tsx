import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface PrivateRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps): JSX.Element {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Verificar se o usuário é admin quando necessário
  if (requireAdmin && !user.user_metadata?.isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
