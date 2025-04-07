import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/Button'
import { Input } from '../../components/Input'
import { toast } from 'react-toastify'

export const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile({
        name: formData.name,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configurações do Perfil</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            disabled
            helpText="Para alterar seu email, acesse a página de Segurança"
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} isLoading={loading}>
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
