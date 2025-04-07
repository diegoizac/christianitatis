import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import Button from '../../components/Button'
import { toast } from 'react-toastify'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    avatar_url: user?.user_metadata?.avatar_url || '',
  })

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem para fazer upload')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${user?.id}/${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

      if (data) {
        setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }))
        toast.success('Avatar atualizado com sucesso!')
      }
    } catch (error) {
      toast.error('Erro ao fazer upload do avatar')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile(formData)
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Christianitatis - Configurações</title>
      </Helmet>

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
            <p className="mt-1 text-sm text-gray-500">
              Atualize suas informações pessoais e preferências.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 pt-8">
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Foto de Perfil
              </label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                  {formData.avatar_url ? (
                    <img
                      src={formData.avatar_url}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-xl">
                        {formData.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('avatar')?.click()}
                  disabled={loading}
                >
                  Alterar foto
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                id="full_name"
                value={formData.full_name}
                onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="pt-5">
              <Button type="submit" isLoading={loading}>
                Salvar alterações
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Settings
