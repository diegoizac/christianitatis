import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface AuthFormProps {
  onSuccess?: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, name)
      }
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro durante a autenticação')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

        {!isLogin && (
          <div>
            <label htmlFor="auth-name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="auth-name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required={!isLogin}
            />
          </div>
        )}

        <div>
          <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            type="email"
            id="auth-email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            id="auth-password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
