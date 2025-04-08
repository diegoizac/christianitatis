import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Página não encontrada | Christianitatis</title>
        <meta name="description" content="A página que você está procurando não foi encontrada" />
      </Helmet>

      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Página não encontrada</h2>
          <p className="mt-2 text-sm text-gray-600">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
