import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
    tipo_membro: 'participante' as 'participante' | 'coordenador' | 'admin',
    interesses: [] as string[],
    newsletter: false,
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await register(formData)
      toast.success('Cadastro realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: inputValue }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar nova conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="newsletter" className="flex items-center">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                <span className="ml-2 block text-sm text-gray-900">
                  Desejo receber novidades por email
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Já tem uma conta? Entre aqui
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
