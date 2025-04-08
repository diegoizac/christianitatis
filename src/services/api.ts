import { supabase } from '../lib/supabase'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

export interface ContactFormData {
  email: string
  name: string
  message: string
  subject?: string
  phone?: string
}

export const contactService = {
  async submitForm(data: ContactFormData) {
    try {
      const { data: insertedData, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            ...data,
            status: 'pending',
          },
        ])
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      // Enviar notificação por email (opcional, pode ser feito via Edge Function)
      try {
        await fetch('/api/notify-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } catch (emailError) {
        console.error('Erro ao enviar notificação:', emailError)
        // Não falha o processo se a notificação falhar
      }

      return {
        success: true,
        message: 'Mensagem enviada com sucesso',
        data: insertedData,
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      throw new Error('Erro ao enviar mensagem. Tente novamente mais tarde.')
    }
  },
}
