import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setMessages(data || [])
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err)
      setError('Erro ao carregar mensagens. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mensagens de Contato</h1>

      {messages.length === 0 ? (
        <p className="text-gray-600 text-center">Nenhuma mensagem encontrada.</p>
      ) : (
        <div className="grid gap-6">
          {messages.map(message => (
            <div key={message.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{message.subject}</h3>
                  <p className="text-sm text-gray-600">
                    De: {message.name} ({message.email})
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(message.created_at), "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages
