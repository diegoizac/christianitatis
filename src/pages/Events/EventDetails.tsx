import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { eventService } from '@/services/eventService'
import { Event } from '@/types/Event'
import { formatDate, formatDateTime } from '@/utils/date'
import { toast } from 'react-toastify'

export function EventDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  const loadEvent = useCallback(
    async (eventId: string): Promise<void> => {
      try {
        setLoading(true)
        const data = await eventService.getEvent(eventId)
        setEvent(data)
      } catch (error) {
        toast.error('Erro ao carregar evento')
        console.error(error)
        navigate('/events')
      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  useEffect(() => {
    if (id) {
      loadEvent(id)
    }
  }, [id, loadEvent])

  async function handleSubmitForReview(): Promise<void> {
    if (!event) return
    if (!confirm('Deseja enviar este evento para aprovação?')) return

    try {
      await eventService.submitForReview(event.id)
      toast.success('Evento enviado para aprovação')
      loadEvent(event.id)
    } catch (error) {
      toast.error('Erro ao enviar evento para aprovação')
      console.error(error)
    }
  }

  async function handleCancelEvent(): Promise<void> {
    if (!event) return
    if (!confirm('Tem certeza que deseja cancelar este evento?')) return

    try {
      await eventService.cancelEvent(event.id)
      toast.success('Evento cancelado com sucesso')
      loadEvent(event.id)
    } catch (error) {
      toast.error('Erro ao cancelar evento')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
          <button onClick={() => navigate('/events')} className="text-blue-500 hover:text-blue-600">
            Voltar para lista de eventos
          </button>
        </div>
      </div>
    )
  }

  const statusLabels = {
    draft: 'Rascunho',
    pending_review: 'Em Análise',
    published: 'Publicado',
    rejected: 'Rejeitado',
    cancelled: 'Cancelado',
  }

  const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    pending_review: 'bg-yellow-200 text-yellow-800',
    published: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
    cancelled: 'bg-red-200 text-red-800',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[event.status]}`}>
            {statusLabels[event.status]}
          </span>
        </div>

        {event.image?.url && (
          <div className="mb-8">
            <img
              src={event.image.url}
              alt={event.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Informações do Evento</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Data:</span> {formatDate(event.date)}
                </p>
                <p>
                  <span className="font-medium">Local:</span> {event.location}
                </p>
                <p>
                  <span className="font-medium">Capacidade:</span> {event.capacity} pessoas
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Detalhes Adicionais</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Criado em:</span> {formatDateTime(event.created_at)}
                </p>
                {event.approved_at && (
                  <p>
                    <span className="font-medium">Aprovado em:</span>{' '}
                    {formatDateTime(event.approved_at)}
                  </p>
                )}
                {event.rejection_reason && (
                  <div>
                    <span className="font-medium">Motivo da Rejeição:</span>
                    <p className="mt-1 text-red-600">{event.rejection_reason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => navigate('/events')} className="text-gray-600 hover:text-gray-900">
            Voltar para Lista
          </button>

          {event.user_id === user?.id && (
            <div className="space-x-4">
              {event.status === 'draft' && (
                <button
                  onClick={handleSubmitForReview}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Enviar para Aprovação
                </button>
              )}
              {event.status === 'published' && (
                <button
                  onClick={handleCancelEvent}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancelar Evento
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
