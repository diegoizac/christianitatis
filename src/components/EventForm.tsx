import React, { useState } from 'react'
import { useEventForm } from '@/hooks/useEventForm'
import { CreateEventDTO } from '@/types/Event'
import { MediaUpload } from '@/components/MediaUpload'
import { toast } from 'react-toastify'

export function EventForm() {
  const { loading, error, success, createEvent, handleMediaChange } = useEventForm()

  // Dados do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    lat: undefined as number | undefined,
    lng: undefined as number | undefined,
  })

  const [capacity, setCapacity] = useState<number>(0)
  const [time, setTime] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Combinar data e hora
      const dateTime = time ? `${formData.date}T${time}:00` : formData.date

      // Combinar localização
      const fullLocation = `${address}, ${city}, ${state}`

      // Preparar dados para envio
      const eventData: CreateEventDTO = {
        title: formData.title,
        description: formData.description,
        date: dateTime,
        location: fullLocation,
        lat: formData.lat,
        lng: formData.lng,
        media_urls: [], // Será preenchido pelo hook
      }

      // Adicionar capacidade se for maior que zero
      if (capacity > 0) {
        eventData.capacity = capacity
      }

      await createEvent(eventData)

      if (success) {
        toast.success('Evento criado com sucesso!')
        // Resetar formulário
        setFormData({
          title: '',
          description: '',
          date: '',
          location: '',
          lat: undefined,
          lng: undefined,
        })
        setCapacity(0)
        setTime('')
        setAddress('')
        setCity('')
        setState('')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao criar evento')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">Evento criado com sucesso!</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hora</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Localização</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Endereço</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude (opcional)</label>
              <input
                type="number"
                name="lat"
                value={formData.lat || ''}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    lat: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                step="0.000001"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude (opcional)
              </label>
              <input
                type="number"
                name="lng"
                value={formData.lng || ''}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    lng: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                step="0.000001"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacidade</label>
            <input
              type="number"
              value={capacity}
              onChange={e => setCapacity(Number(e.target.value))}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Mídia</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagens e Vídeos</label>
            <MediaUpload
              type="image"
              onChange={files => {
                try {
                  if (files.length > 0) {
                    const fileList = new DataTransfer()
                    files.forEach(file => fileList.items.add(file))
                    handleMediaChange(fileList.files, 'images')
                  } else {
                    handleMediaChange(null, 'images')
                  }
                } catch (error) {
                  console.error('Erro ao processar arquivos de imagem:', error)
                  toast.error('Erro ao processar imagens. Tente novamente.')
                }
              }}
              multiple={true}
              maxFiles={5}
              className="mb-4"
            />

            <MediaUpload
              type="video"
              onChange={files => {
                try {
                  if (files.length > 0) {
                    const fileList = new DataTransfer()
                    files.forEach(file => fileList.items.add(file))
                    handleMediaChange(fileList.files, 'videos')
                  } else {
                    handleMediaChange(null, 'videos')
                  }
                } catch (error) {
                  console.error('Erro ao processar arquivos de vídeo:', error)
                  toast.error('Erro ao processar vídeos. Tente novamente.')
                }
              }}
              multiple={true}
              maxFiles={2}
              className="mb-4"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Criando evento...' : 'Criar Evento'}
        </button>
      </div>
    </form>
  )
}
