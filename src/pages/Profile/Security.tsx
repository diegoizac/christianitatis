import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/Button'
import { toast } from 'react-toastify'

interface FormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  newEmail: string
}

const Security = () => {
  const { signOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      // Implementar lógica de exclusão de conta
      await signOut()
      toast.success('Conta excluída com sucesso')
    } catch (error) {
      toast.error('Erro ao excluir conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Segurança</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Excluir Conta</h2>
        <p className="text-gray-600 mb-4">
          Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
        </p>
        <Button variant="danger" onClick={handleDeleteAccount} loading={loading}>
          Excluir minha conta
        </Button>
      </div>
    </div>
  )
}

export default Security
