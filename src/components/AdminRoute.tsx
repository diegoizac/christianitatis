import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function AdminRoute() {
  const { user, loading } = useAuth()

  // Aguardar carregamento do usuário
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Verificar se o usuário está autenticado e é admin
  if (!user || user.email !== 'contato@2dlcompany.com.br') {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
