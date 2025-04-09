import React, { useState, useEffect } from 'react'
import { eventService } from '@/services/eventService'
import { Event } from '@/types/Event'
import EventCard from '@/components/EventCard/index'
import { Link } from 'react-router-dom'

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const upcomingEvents = await eventService.findUpcomingEvents(6)
        setEvents(upcomingEvents)
      } catch (err) {
        console.error('Erro ao carregar eventos:', err)
        setError('Não foi possível carregar os eventos. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Próximos Eventos</h2>
        <Link
          to="/events"
          className="text-primary hover:text-primary-dark font-medium flex items-center"
        >
          Ver todos
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Banner principal */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img src="/images/todos-eventos.jpeg" alt="Todos os eventos" className="w-full h-auto" />
      </div>

      {/* Grid de eventos */}
      {events.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Nenhum evento programado no momento.</p>
          <p className="text-gray-500 mt-2">Fique atento para novidades!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              href={`/events/${event.id}`}
              compact={true}
              showStatus={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsSection
