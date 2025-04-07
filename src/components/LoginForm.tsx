import React, { useState } from 'react'

interface LoginFormProps {
  onSwitchToRegister: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt with:', { email, password, rememberMe })

    // For demo purposes, simulate a successful login
    alert('Login bem-sucedido!')

    // Reset form
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <div className="login-form-container">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-form-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="login-form-email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
            placeholder="********"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary-color focus:ring-primary-color border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Lembrar-me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="text-primary-color hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" className="w-full btn btn-primary">
            Entrar
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary-color hover:underline font-medium"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
