import React from 'react'
import { events } from '../data/events'

const EventsSection: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>

      {/* Banner principal */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/assets/images/todos-eventos.jpeg"
          alt="Todos os eventos"
          className="w-full h-auto"
        />
      </div>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.location}</p>
              <p className="text-gray-500 text-sm mb-1">{event.address}</p>
              <p className="text-gray-500 text-sm mb-1">{event.time}</p>
              {event.info && <p className="text-gray-500 text-sm">{event.info}</p>}
              {event.theme && <p className="mt-2 text-sm text-gray-700">{event.theme}</p>}
              {event.partners && event.partners.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500">Parceiros:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.partners.map((partner, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {event.isFree && (
                <span className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Gratuito
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsSection
