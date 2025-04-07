import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../Button'
import Modal from '../Modal'

export interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView: 'login' | 'register'
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView }) => {
  const navigate = useNavigate()
  const { signIn, signUp, resetPassword } = useAuth()
  const [view, setView] = useState<'login' | 'register' | 'reset-password'>(initialView)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (view === 'login') {
        await signIn(formData.email, formData.password)
        toast.success('Login realizado com sucesso!')
        onClose()
        navigate('/dashboard')
      } else if (view === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem')
        }
        await signUp(formData.email, formData.password, formData.name)
        toast.success('Conta criada com sucesso! Por favor, verifique seu email.')
        onClose()
        setView('login')
      } else if (view === 'reset-password') {
        await resetPassword(formData.email)
        toast.success('Email de recuperação enviado! Verifique sua caixa de entrada.')
        onClose()
        setView('login')
      }
    } catch (error) {
      console.error('Erro:', error)
      const message = error instanceof Error ? error.message : 'Ocorreu um erro inesperado'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const renderForm = (): JSX.Element => {
    switch (view) {
      case 'login':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="modal-auth-email"
                name="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300"
                placeholder="seu@email.com"
                required
                data-testid="email-input"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
                data-testid="password-input"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" isLoading={loading}>
                Entrar
              </Button>
              <div className="flex flex-col space-y-2 text-sm">
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Não tem uma conta? Cadastre-se
                </button>
                <button
                  type="button"
                  onClick={() => setView('reset-password')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </div>
          </>
        )

      case 'register':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                id="name"
                data-testid="name-input"
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="modal-auth-email"
                data-testid="email-input"
                name="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                data-testid="password-input"
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                data-testid="confirm-password-input"
                type="password"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" isLoading={loading}>
                Criar Conta
              </Button>
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Já tem uma conta? Entre
              </button>
            </div>
          </>
        )

      case 'reset-password':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="modal-reset-email"
                name="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300"
                placeholder="seu@email.com"
                required
                data-testid="email-input"
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" isLoading={loading}>
                Recuperar Senha
              </Button>
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Voltar para o login
              </button>
            </div>
          </>
        )
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      id="auth-modal"
      title={view === 'login' ? 'Entrar' : view === 'register' ? 'Criar Conta' : 'Recuperar Senha'}
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
            <div className="mt-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderForm()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AuthModal
