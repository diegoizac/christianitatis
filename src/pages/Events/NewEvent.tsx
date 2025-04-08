import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { eventService } from '@/services/eventService'
import { uploadService } from '@/services/uploadService'
import { formatDateForInput } from '@/utils/date'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { MediaUpload } from '@/components/MediaUpload'

export function NewEvent() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: formatDateForInput(new Date()),
    time: '19:00',
    location: '',
    capacity: 100,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleImageChange(file: File) {
    setImageFile(file)
  }

  function handleVideoChange(file: File) {
    setVideoFile(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    try {
      setLoading(true)

      let image = null
      let video = null

      if (imageFile) {
        image = await uploadService.uploadEventImage(imageFile)
      }

      if (videoFile) {
        video = await uploadService.uploadEventVideo(videoFile)
      }

      const eventDate = new Date(formData.date + 'T' + formData.time)

      const event = {
        title: formData.title,
        description: formData.description,
        date: eventDate.toISOString(),
        location: formData.location,
        capacity: Number(formData.capacity),
        image,
        video,
        status: 'draft' as const,
        user_id: user.id,
      }

      await eventService.createEvent(event)
      toast.success('Evento criado com sucesso')
      navigate('/events')
    } catch (error) {
      toast.error('Erro ao criar evento')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Novo Evento | Christianitatis</title>
        <meta name="description" content="Criar um novo evento na plataforma Christianitatis" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Novo Evento</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Nome do evento"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md p-2"
                placeholder="Descreva o evento"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Local
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Endereço do evento"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacidade
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Imagem do Evento (opcional)
              </label>
              <MediaUpload type="image" onChange={handleImageChange} maxSizeMB={1} />
            </div>

            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                Vídeo do Evento (opcional)
              </label>
              <MediaUpload type="video" onChange={handleVideoChange} maxSizeMB={100} />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${
                  loading ? 'cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Criando...' : 'Criar Evento'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
