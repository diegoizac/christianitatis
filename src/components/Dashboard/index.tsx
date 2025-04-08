import { useAuth } from '../../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bem-vindo, {user?.user_metadata?.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div data-testid="profile-card" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>
          <p className="text-gray-600 mb-4">{user?.email}</p>
          <button className="text-blue-600 hover:text-blue-800">Editar Perfil</button>
        </div>

        <div data-testid="events-card" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Meus Eventos</h2>
          <p className="text-gray-600 mb-4">Nenhum evento encontrado</p>
          <button className="text-blue-600 hover:text-blue-800">Ver Eventos</button>
        </div>

        <div data-testid="support-card" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Suporte</h2>
          <p className="text-gray-600 mb-4">Precisa de ajuda? Entre em contato conosco</p>
          <button className="text-blue-600 hover:text-blue-800">Contato</button>
        </div>
      </div>
    </div>
  )
}
