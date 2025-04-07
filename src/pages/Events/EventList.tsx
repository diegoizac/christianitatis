import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { eventService } from '@/services/eventService'
import { Event, EventStatus } from '@/types/Event'
import { formatDate } from '@/utils/date'
import { toast } from 'react-toastify'

export function EventList() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<EventStatus | ''>('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadEvents()
  }, [statusFilter, searchTerm])

  async function loadEvents() {
    try {
      setLoading(true)
      const filters = {
        status: statusFilter || undefined,
        search: searchTerm || undefined,
      }
      const data = await eventService.listEvents(filters)
      setEvents(data)
    } catch (error) {
      toast.error('Erro ao carregar eventos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitForReview(id: string) {
    if (!confirm('Deseja enviar este evento para aprovação?')) return

    try {
      await eventService.submitForReview(id)
      toast.success('Evento enviado para aprovação')
      loadEvents()
    } catch (error) {
      toast.error('Erro ao enviar evento para aprovação')
      console.error(error)
    }
  }

  async function handleCancelEvent(id: string) {
    if (!confirm('Tem certeza que deseja cancelar este evento?')) return

    try {
      await eventService.cancelEvent(id)
      toast.success('Evento cancelado com sucesso')
      loadEvents()
    } catch (error) {
      toast.error('Erro ao cancelar evento')
      console.error(error)
    }
  }

  const statusBadgeLabels: Record<EventStatus, string> = {
    draft: 'Rascunho',
    pending_review: 'Em Análise',
    published: 'Publicado',
    rejected: 'Rejeitado',
    cancelled: 'Cancelado',
  }

  const badges: Record<EventStatus, string> = {
    draft: 'bg-gray-200 text-gray-800',
    pending_review: 'bg-yellow-200 text-yellow-800',
    published: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
    cancelled: 'bg-red-200 text-red-800',
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Eventos</h1>
        {user && (
          <Link
            to="/events/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Novo Evento
          </Link>
        )}
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="border p-2 rounded flex-1"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as EventStatus | '')}
        >
          <option value="">Todos os status</option>
          {Object.entries(statusBadgeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum evento encontrado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {event.image?.url && (
                <img src={event.image.url} alt={event.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <span className={`px-2 py-1 rounded text-sm ${badges[event.status]}`}>
                    {statusBadgeLabels[event.status]}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>Data: {formatDate(event.date)}</p>
                  <p>Local: {event.location}</p>
                  <p>Capacidade: {event.capacity} pessoas</p>
                </div>
                <div className="flex justify-end gap-2">
                  {event.user_id === user?.id && event.status === 'draft' && (
                    <button
                      onClick={() => handleSubmitForReview(event.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Enviar para Aprovação
                    </button>
                  )}
                  {event.user_id === user?.id && event.status === 'published' && (
                    <button
                      onClick={() => handleCancelEvent(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  )}
                  <Link
                    to={`/events/${event.id}`}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
