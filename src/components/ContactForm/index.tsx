import { useState, FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-toastify'

interface ContactFormProps {
  onClose: () => void
}

interface EdgeFunctionError {
  message?: string
  error?: {
    message?: string
  }
  debug?: {
    timestamp?: string
    errorType?: string
  }
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Todos os campos são obrigatórios')
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido')
      }

      // Salva a mensagem no Supabase
      const { error: dbError } = await supabase.from('contact_messages').insert([formData])

      if (dbError) {
        console.error('Erro ao salvar mensagem:', dbError)
        throw new Error('Erro ao salvar sua mensagem. Por favor, tente novamente.')
      }

      // Tenta enviar o email via Edge Function
      try {
        console.log('Enviando dados para Edge Function:', formData)

        const { data, error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: formData,
        })

        console.log('Resposta da Edge Function:', { data, error: emailError })

        if (emailError) {
          console.error('Erro ao enviar email:', emailError)
          // Não lança erro aqui para não impedir o fluxo
          toast.warning(
            'Sua mensagem foi salva, mas houve um erro ao enviar o email de notificação.'
          )
        } else {
          console.log('Email processado com sucesso:', data)
          toast.success('Mensagem enviada com sucesso!')
          onClose()
        }
      } catch (emailError) {
        console.error('Erro na Edge Function:', emailError)

        // Tenta extrair a mensagem de erro mais específica
        const error = emailError as EdgeFunctionError
        const errorMessage =
          error?.message || error?.error?.message || 'Erro ao enviar email de notificação'

        console.log('Mensagem de erro detalhada:', {
          message: errorMessage,
          debug: error?.debug,
        })

        // Não lança erro aqui para não impedir o fluxo
        toast.warning(
          `Sua mensagem foi salva, mas houve um erro ao enviar o email: ${errorMessage}`
        )
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={loading}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}
