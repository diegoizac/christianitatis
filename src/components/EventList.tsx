import React from 'react'
import { supabase } from '@/lib/supabase'
import type { Tables } from '@/lib/supabase'

type Event = Tables['events']['Row']

export function EventList() {
  const [events, setEvents] = React.useState<Event[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar eventos')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum evento encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
          {event.media?.images?.[0] && (
            <img
              src={event.media.images[0].url}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  event.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : event.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : event.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {event.status}
              </span>
            </div>

            <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {event.date} às {event.time}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location.city}, {event.location.state}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {event.registered_count} / {event.capacity}
              </div>

              {event.price > 0 && (
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  R$ {event.price.toFixed(2)}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  /* Implementar inscrição */
                }}
              >
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
