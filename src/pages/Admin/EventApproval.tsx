import React, { useEffect, useState } from 'react'
import { eventService } from '@/services/eventService'
import { userService } from '@/services/userService'
import { useAuth } from '@/contexts/AuthContext'
import { Event } from '@/types/Event'
import { User } from '@/types/User'
import { formatDate, formatDateTime } from '@/utils/date'
import { toast } from 'react-toastify'

interface EventWithOwner extends Event {
  owner?: User
}

export function EventApproval(): JSX.Element {
  const [events, setEvents] = useState<EventWithOwner[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    loadPendingEvents()
  }, [])

  async function loadPendingEvents() {
    try {
      setLoading(true)
      const data = await eventService.listEvents({ status: 'pending_review' })

      // Carregar dados dos usuários
      const eventsWithOwners = await Promise.all(
        data.map(async event => {
          try {
            const owner = await userService.getUserById(event.user_id)
            return { ...event, owner }
          } catch (error) {
            console.error(`Erro ao carregar usuário do evento ${event.id}:`, error)
            return event
          }
        })
      )

      setEvents(eventsWithOwners)
    } catch (error) {
      toast.error('Erro ao carregar eventos pendentes')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(event: EventWithOwner) {
    if (!user) {
      toast.error('Você precisa estar logado para aprovar eventos')
      return
    }

    try {
      await eventService.approveEvent(event.id, user.id)
      toast.success('Evento aprovado com sucesso')
      loadPendingEvents()
    } catch (error) {
      toast.error('Erro ao aprovar evento')
      console.error(error)
    }
  }

  async function handleReject(event: EventWithOwner, reason: string) {
    try {
      await eventService.rejectEvent(event.id, reason)
      toast.success('Evento rejeitado')
      loadPendingEvents()
    } catch (error) {
      toast.error('Erro ao rejeitar evento')
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Aprovação de Eventos</h1>

        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum evento pendente de aprovação</p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-6">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-xl font-semibold">{event.title}</h2>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Pendente
                      </span>
                    </div>

                    <div className="prose max-w-none mb-4">
                      <p className="text-gray-600">{event.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium">Data do Evento:</span>{' '}
                        {formatDate(event.date)}
                      </div>
                      <div>
                        <span className="font-medium">Local:</span> {event.location}
                      </div>
                      <div>
                        <span className="font-medium">Capacidade:</span> {event.capacity} pessoas
                      </div>
                      <div>
                        <span className="font-medium">Cadastrado em:</span>{' '}
                        {formatDateTime(event.created_at)}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="font-medium mb-2">Informações do Organizador</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Nome:</span>{' '}
                          {event.owner?.name || 'Não disponível'}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>{' '}
                          {event.owner?.email || 'Não disponível'}
                        </div>
                        {event.owner?.phone && (
                          <div>
                            <span className="font-medium">Telefone:</span> {event.owner.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {event.image?.url && (
                    <div className="flex-shrink-0">
                      <img
                        src={event.image.url}
                        alt={event.title}
                        className="w-40 h-40 object-cover rounded-lg shadow"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">{event.image.name}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      const reason = prompt('Por favor, informe o motivo da rejeição:')
                      if (reason) handleReject(event, reason)
                    }}
                    className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
                  >
                    Rejeitar
                  </button>
                  <button
                    onClick={() => handleApprove(event)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Aprovar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
