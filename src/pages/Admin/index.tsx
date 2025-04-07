import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Messages from './Messages'

export function Admin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Painel Administrativo | Christianitatis</title>
        <meta name="description" content="Painel administrativo do Christianitatis" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/messages"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Mensagens</h3>
          <p className="text-gray-600 mb-4">Visualize as mensagens de contato</p>
        </Link>

        <Link
          to="/admin/events"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Eventos</h3>
          <p className="text-gray-600 mb-4">Gerencie os eventos do movimento</p>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Configurações</h3>
          <p className="text-gray-600 mb-4">Ajuste as configurações do sistema</p>
        </Link>
      </div>

      <Routes>
        <Route path="messages" element={<Messages />} />
        <Route path="events" element={<div>Gerenciamento de Eventos</div>} />
        <Route path="settings" element={<div>Configurações</div>} />
      </Routes>

      {/* Seção de Estatísticas */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total de Usuários</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Eventos Ativos</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Inscrições</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Coordenadores</h3>
            <p className="text-3xl font-bold text-indigo-600">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
