import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../contexts/AuthContext'

export const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Dashboard - Christianitatis</title>
        <meta name="description" content="Área do membro Christianitatis" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user.profile?.name || 'Membro'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Aqui você pode gerenciar sua participação nos eventos e acompanhar suas atividades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de Eventos */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meus Eventos</h2>
            <p className="text-gray-600">Você ainda não está inscrito em nenhum evento.</p>
            <button
              onClick={() => navigate('/events')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Ver Eventos
            </button>
          </div>

          {/* Card de Perfil */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meu Perfil</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Nome:</span> {user.profile?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Editar Perfil
            </button>
          </div>

          {/* Card de Suporte */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suporte</h2>
            <p className="text-gray-600">
              Precisa de ajuda? Entre em contato com nossa equipe de suporte.
            </p>
            <button
              onClick={() => navigate('/support')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Contatar Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
