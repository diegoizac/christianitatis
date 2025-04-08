import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import * as eventService from '@/services/eventService'
import { Event } from '@/types/Event'
import { formatDate, formatDateTime } from '@/utils/date'
import { toast } from 'react-toastify'

export function ApprovalList() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectionReason, setRejectionReason] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    try {
      setLoading(true)
      const data = await eventService.listEvents({ status: 'pending_review' })
      setEvents(data)
    } catch (error) {
      toast.error('Erro ao carregar eventos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(event: Event) {
    if (!user) return
    if (!confirm('Confirma a aprovação deste evento?')) return

    try {
      await eventService.approveEvent(event.id, user.id)
      toast.success('Evento aprovado com sucesso')
      loadEvents()
      setSelectedEvent(null)
    } catch (error) {
      toast.error('Erro ao aprovar evento')
      console.error(error)
    }
  }

  async function handleReject(event: Event) {
    if (!rejectionReason.trim()) {
      toast.error('Informe o motivo da rejeição')
      return
    }

    try {
      await eventService.rejectEvent(event.id, rejectionReason)
      toast.success('Evento rejeitado com sucesso')
      loadEvents()
      setSelectedEvent(null)
      setRejectionReason('')
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

  if (events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Aprovação de Eventos</h1>
        <p className="text-center text-gray-500">Nenhum evento pendente de aprovação</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Aprovação de Eventos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedEvent?.id === event.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">Criado em: {formatDateTime(event.created_at)}</p>
              <p className="text-sm text-gray-500">Clique para ver mais detalhes</p>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
            <p className="text-gray-600">{selectedEvent.description}</p>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Data:</span> {formatDate(selectedEvent.date)}
              </p>
              <p>
                <span className="font-semibold">Local:</span> {selectedEvent.location}
              </p>
              <p>
                <span className="font-semibold">Capacidade:</span> {selectedEvent.capacity} pessoas
              </p>
            </div>

            {selectedEvent.image_url && (
              <div>
                <h3 className="font-semibold mb-2">Imagem do Evento</h3>
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  className="w-full max-w-lg rounded-lg"
                />
              </div>
            )}

            <div className="pt-4 border-t space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(selectedEvent)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => {
                    if (!rejectionReason.trim()) {
                      document.getElementById('rejection-reason')?.focus()
                      return
                    }
                    handleReject(selectedEvent)
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Rejeitar
                </button>
              </div>

              <div>
                <label
                  htmlFor="rejection-reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Motivo da Rejeição
                </label>
                <textarea
                  id="rejection-reason"
                  rows={3}
                  className="w-full border rounded-md p-2"
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder="Informe o motivo da rejeição..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
