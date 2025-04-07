import React from 'react'
import { useEventForm } from '@/hooks/useEventForm'

export function EventForm() {
  const { loading, error, success, media, createEvent, handleMediaChange, removeMedia } =
    useEventForm()
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: {
      address: '',
      city: '',
      state: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    capacity: 0,
    price: 0,
    contact: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createEvent(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
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
              value={formData.time}
              onChange={handleChange}
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
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                required
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
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Contato</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="contact.name"
              value={formData.contact.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Mídia</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagens</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={e => handleMediaChange(e.target.files, 'images')}
              className="mt-1 block w-full"
            />
            {media.images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {media.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-24 w-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(index, 'images')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vídeos</label>
            <input
              type="file"
              accept="video/mp4,video/webm"
              multiple
              onChange={e => handleMediaChange(e.target.files, 'videos')}
              className="mt-1 block w-full"
            />
            {media.videos.length > 0 && (
              <div className="mt-2">
                {media.videos.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded"
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMedia(index, 'videos')}
                      className="text-red-500"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
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
