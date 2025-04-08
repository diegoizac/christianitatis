import React from 'react'
import { Helmet } from 'react-helmet-async'

const Coordinator: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Painel do Coordenador | Christianitatis</title>
        <meta name="description" content="Painel do coordenador do Christianitatis" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Painel do Coordenador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Eventos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Meus Eventos</h2>
          <p className="text-gray-600 mb-4">Gerencie os eventos sob sua coordenação</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Gerenciar Eventos
          </button>
        </div>

        {/* Card de Participantes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Participantes</h2>
          <p className="text-gray-600 mb-4">Gerencie os participantes dos seus eventos</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Ver Participantes
          </button>
        </div>

        {/* Card de Relatórios */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Relatórios</h2>
          <p className="text-gray-600 mb-4">Acesse relatórios e estatísticas</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Ver Relatórios
          </button>
        </div>
      </div>

      {/* Seção de Próximos Eventos */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 mb-2">Nenhum evento programado</p>
          </div>
        </div>
      </div>

      {/* Seção de Estatísticas */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total de Eventos</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Participantes</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Eventos Ativos</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Eventos Concluídos</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Coordinator
