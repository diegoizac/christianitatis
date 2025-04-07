import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
        <p className="text-lg text-gray-600 mb-8">
          Você não tem permissão para acessar esta página.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para a página inicial
          </button>
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato com o administrador.
          </p>
        </div>
      </div>
    </div>
  )
}
