import React from 'react'
import { EventForm } from '@/components/EventForm'
import { EventList } from '@/components/EventList'

export function Events() {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Voltar para Lista' : 'Novo Evento'}
        </button>
      </div>

      {showForm ? (
        <div className="mb-8">
          <EventForm />
        </div>
      ) : (
        <EventList />
      )}
    </div>
  )
}

export default Events
