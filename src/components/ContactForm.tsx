import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../lib/supabase'

interface ContactFormProps {
  onClose: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Inserir a mensagem na tabela de contatos
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'new',
        },
      ])

      if (error) throw error

      // Enviar email usando o Edge Function do Supabase
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: JSON.stringify({
          to: 'inteligencia.christianitatis@gmail.com',
          subject: `Novo contato via site: ${formData.subject}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (emailError) throw emailError

      toast.success('Mensagem enviada com sucesso!')
      onClose()
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
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
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          required
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
