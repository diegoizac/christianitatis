import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'

export function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Não Autorizado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página. Esta área é restrita a administradores.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  )
}
