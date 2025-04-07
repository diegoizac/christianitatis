import React from 'react'
import { Event } from '../../types/Event'
import { Calendar, MapPin, Users, Clock, Edit, Trash2 } from 'lucide-react'
import { formatCurrency } from '../../utils/format'

interface EventListProps {
  events: Event[]
  onEdit?: (event: Event) => void
  onDelete?: (eventId: string) => void
  onRegister?: (eventId: string) => void
  isAdmin?: boolean
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEdit,
  onDelete,
  onRegister,
  isAdmin = false,
}) => {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'finished':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Event['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'cancelled':
        return 'Cancelado'
      case 'finished':
        return 'Finalizado'
      default:
        return status
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {event.image_url && (
            <div className="relative h-48">
              <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    event.status
                  )}`}
                >
                  {getStatusText(event.status)}
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>
                  {event.registered_count} / {event.capacity} participantes
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-red-500">
                {event.price === 0 ? 'Gratuito' : formatCurrency(event.price || 0)}
              </span>

              <div className="flex space-x-2">
                {!isAdmin && onRegister && (
                  <button
                    onClick={() => onRegister(event.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    disabled={event.registered_count >= event.capacity}
                  >
                    {event.registered_count >= event.capacity ? 'Lotado' : 'Inscrever-se'}
                  </button>
                )}

                {isAdmin && (
                  <>
                    <button
                      onClick={() => onEdit?.(event)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete?.(event.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventList
