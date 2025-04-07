import { supabase } from '@/lib/supabase'
import { Event, EventStatus, EventFilters, PaginationParams, CreateEventDTO } from '@/types/Event'
import { notificationService } from './notificationService'

interface ListEventsParams {
  status?: EventStatus
  search?: string
}

class EventService {
  async listEvents({ status, search }: ListEventsParams = {}) {
    let query = supabase.from('events').select('*').order('created_at', { ascending: false })

    // Se não estiver logado, mostrar apenas eventos publicados
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      query = query.eq('status', 'published')
    } else {
      // Se estiver logado, mostrar eventos publicados + próprios eventos
      if (status) {
        query = query.eq('status', status)
      } else {
        query = query.or(`status.eq.published,user_id.eq.${user.id}`)
      }
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao listar eventos:', error)
      throw error
    }

    return data as Event[]
  }

  async createEvent(eventData: CreateEventDTO) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            ...eventData,
            user_id: user.id,
            status: 'draft',
          },
        ])
        .select()
        .single()

      if (error) throw error

      return data as Event
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      throw error
    }
  }

  async getEvent(id: string) {
    try {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).single()

      if (error) throw error

      return data as Event
    } catch (error) {
      console.error('Erro ao buscar evento:', error)
      throw error
    }
  }

  async updateEvent(id: string, eventData: Partial<Event>) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return data as Event
    } catch (error) {
      console.error('Erro ao atualizar evento:', error)
      throw error
    }
  }

  async submitForReview(id: string) {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'pending_review' })
        .eq('id', id)

      if (error) throw error

      // Notificar admins
      const { data: admins } = await supabase.from('profiles').select('id').eq('role', 'admin')

      if (admins) {
        await Promise.all(
          admins.map(admin => notificationService.createEventPendingNotification(id, admin.id))
        )
      }
    } catch (error) {
      console.error('Erro ao enviar evento para análise:', error)
      throw error
    }
  }

  async approveEvent(id: string, approvedBy: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          status: 'published',
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Notificar criador do evento
      await notificationService.createEventApprovedNotification(id, data.user_id)

      return data as Event
    } catch (error) {
      console.error('Erro ao aprovar evento:', error)
      throw error
    }
  }

  async rejectEvent(id: string, reason: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          status: 'rejected',
          rejection_reason: reason,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Notificar criador do evento
      await notificationService.createEventRejectedNotification(id, data.user_id, reason)

      return data as Event
    } catch (error) {
      console.error('Erro ao rejeitar evento:', error)
      throw error
    }
  }

  async cancelEvent(id: string) {
    try {
      const { error } = await supabase.from('events').update({ status: 'cancelled' }).eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao cancelar evento:', error)
      throw error
    }
  }

  async list(
    filters?: EventFilters,
    pagination?: PaginationParams
  ): Promise<{ data: Event[]; count: number }> {
    try {
      let query = supabase.from('events').select('*', { count: 'exact' })

      // Aplicar filtros
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate)
      }

      if (filters?.endDate) {
        query = query.lte('date', filters.endDate)
      }

      // Aplicar paginação
      if (pagination) {
        const { page, limit } = pagination
        const start = (page - 1) * limit
        query = query.range(start, start + limit - 1)
      }

      // Ordenar por data
      query = query.order('date', { ascending: true })

      const { data, error, count } = await query

      if (error) throw error

      return { data: data as Event[], count: count || 0 }
    } catch (error) {
      console.error('Erro ao listar eventos:', error)
      throw error
    }
  }

  async getById(id: string): Promise<Event> {
    try {
      const { data: event, error } = await supabase.from('events').select('*').eq('id', id).single()

      if (error) throw error
      return event
    } catch (error) {
      console.error('Erro ao buscar evento:', error)
      throw error
    }
  }
}

export const eventService = new EventService()
