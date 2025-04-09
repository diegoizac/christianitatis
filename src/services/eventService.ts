import { supabase } from '@/lib/supabase'
import {
  Event,
  EventFilters,
  PaginationParams,
  CreateEventDTO,
  UpdateEventDTO,
  fromSupabaseEvent,
  toSupabaseEvent
} from '@/types/Event'
import { notificationService } from './notificationService'

/**
 * Serviço para gerenciamento de eventos
 * Centraliza todas as operações relacionadas a eventos
 */
class EventService {
  /**
   * Lista eventos com base nos filtros fornecidos
   * @param filters Filtros para a listagem
   * @param pagination Parâmetros de paginação
   * @returns Lista de eventos e contagem total
   */
  async listEvents(
    filters?: EventFilters,
    pagination?: PaginationParams
  ): Promise<{ data: Event[]; count: number }> {
    try {
      let query = supabase.from('events').select('*', { count: 'exact' })

      // Se não estiver logado, mostrar apenas eventos aprovados
      const {
        data: { user },
      } = await supabase.auth.getUser()
      
      if (!user) {
        query = query.eq('status', 'aprovado')
      } else {
        // Se estiver logado, aplicar filtros de status
        if (filters?.status) {
          query = query.eq('status', filters.status)
        } else {
          // Mostrar eventos aprovados + próprios eventos
          query = query.or(`status.eq.aprovado,user_id.eq.${user.id}`)
        }
      }

      // Aplicar filtros de busca
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      // Aplicar filtros de data
      if (filters?.startDate) {
        query = query.gte('date', filters.startDate)
      }

      if (filters?.endDate) {
        query = query.lte('date', filters.endDate)
      }

      // Aplicar filtro de proximidade
      if (filters?.proximity) {
        const { lat, lng, radius } = filters.proximity
        
        // Implementar filtro de proximidade usando fórmula de Haversine
        // Esta é uma implementação simplificada, pode ser necessário ajustar
        // dependendo da estrutura do banco de dados
        const earthRadius = 6371 // raio da Terra em km
        
        // Converter o raio para graus (aproximadamente)
        const latDegrees = radius / earthRadius * (180 / Math.PI)
        const lngDegrees = radius / (earthRadius * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI)
        
        query = query
          .gte('lat', lat - latDegrees)
          .lte('lat', lat + latDegrees)
          .gte('lng', lng - lngDegrees)
          .lte('lng', lng + lngDegrees)
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

      // Converter dados do Supabase para o formato da aplicação
      const events = data.map(event => fromSupabaseEvent(event))

      return { data: events, count: count || 0 }
    } catch (error) {
      console.error('Erro ao listar eventos:', error)
      throw error
    }
  }

  /**
   * Cria um novo evento
   * @param eventData Dados do evento a ser criado
   * @returns O evento criado
   */
  async createEvent(eventData: CreateEventDTO): Promise<Event> {
    try {
      // Validar dados de entrada
      this.validateEventData(eventData)

      // Obter usuário atual
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Usuário não autenticado')

      // Converter para formato do Supabase
      const supabaseData = toSupabaseEvent({
        ...eventData,
        user_id: user.id,
        status: 'pendente', // Todos os eventos começam como pendentes
      })

      const { data, error } = await supabase
        .from('events')
        .insert([supabaseData])
        .select()
        .single()

      if (error) throw error

      // Notificar administradores sobre novo evento pendente
      await this.notifyAdminsAboutPendingEvent(data.id)

      // Converter de volta para o formato da aplicação
      return fromSupabaseEvent(data)
    } catch (error) {
      console.error('Erro ao criar evento:', error)
      throw error
    }
  }

  /**
   * Obtém um evento pelo ID
   * @param id ID do evento
   * @returns O evento encontrado
   */
  async getEvent(id: string): Promise<Event> {
    try {
      const { data, error } = await supabase.from('events').select('*').eq('id', id).single()

      if (error) throw error

      return fromSupabaseEvent(data)
    } catch (error) {
      console.error('Erro ao buscar evento:', error)
      throw error
    }
  }

  /**
   * Atualiza um evento existente
   * @param id ID do evento
   * @param eventData Dados a serem atualizados
   * @returns O evento atualizado
   */
  async updateEvent(id: string, eventData: UpdateEventDTO): Promise<Event> {
    try {
      // Converter para formato do Supabase
      const supabaseData = toSupabaseEvent(eventData)

      const { data, error } = await supabase
        .from('events')
        .update(supabaseData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return fromSupabaseEvent(data)
    } catch (error) {
      console.error('Erro ao atualizar evento:', error)
      throw error
    }
  }

  /**
   * Envia um evento para revisão
   * @param id ID do evento
   */
  async submitForReview(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'pendente' })
        .eq('id', id)

      if (error) throw error

      // Notificar administradores
      await this.notifyAdminsAboutPendingEvent(id)
    } catch (error) {
      console.error('Erro ao enviar evento para análise:', error)
      throw error
    }
  }

  /**
   * Aprova um evento
   * @param id ID do evento
   * @param approvedBy ID do usuário que aprovou
   * @returns O evento aprovado
   */
  async approveEvent(id: string, approvedBy: string): Promise<Event> {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          status: 'aprovado',
          approved_by: approvedBy,
          approved_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Notificar criador do evento
      await notificationService.createEventApprovedNotification(id, data.user_id)

      return fromSupabaseEvent(data)
    } catch (error) {
      console.error('Erro ao aprovar evento:', error)
      throw error
    }
  }

  /**
   * Rejeita um evento
   * @param id ID do evento
   * @param justificativa Motivo da rejeição
   * @returns O evento rejeitado
   */
  async rejectEvent(id: string, justificativa: string): Promise<Event> {
    try {
      if (!justificativa || justificativa.trim() === '') {
        throw new Error('É necessário fornecer um motivo para a rejeição')
      }

      const { data, error } = await supabase
        .from('events')
        .update({
          status: 'reprovado',
          rejection_reason: justificativa,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Notificar criador do evento
      await notificationService.createEventRejectedNotification(id, data.user_id, justificativa)

      return fromSupabaseEvent(data)
    } catch (error) {
      console.error('Erro ao rejeitar evento:', error)
      throw error
    }
  }

  /**
   * Notifica administradores sobre um evento pendente
   * @param eventId ID do evento
   */
  private async notifyAdminsAboutPendingEvent(eventId: string): Promise<void> {
    try {
      const { data: admins } = await supabase.from('profiles').select('id').eq('role', 'admin')

      if (admins && admins.length > 0) {
        await Promise.all(
          admins.map(admin => notificationService.createEventPendingNotification(eventId, admin.id))
        )
      }
    } catch (error) {
      console.error('Erro ao notificar administradores:', error)
      // Não lançar erro para não interromper o fluxo principal
    }
  }

  /**
   * Valida os dados de um evento
   * @param eventData Dados do evento
   * @throws Error se os dados forem inválidos
   */
  private validateEventData(eventData: CreateEventDTO): void {
    // Validar campos obrigatórios
    if (!eventData.title || eventData.title.trim() === '') {
      throw new Error('O título do evento é obrigatório')
    }

    if (!eventData.description || eventData.description.trim() === '') {
      throw new Error('A descrição do evento é obrigatória')
    }

    if (!eventData.date) {
      throw new Error('A data do evento é obrigatória')
    }

    if (!eventData.location || eventData.location.trim() === '') {
      throw new Error('O local do evento é obrigatório')
    }

    // Validar mídia
    if (!eventData.media_urls || eventData.media_urls.length === 0) {
      throw new Error('É necessário fornecer pelo menos uma mídia para o evento')
    }

    // Validar data (não pode ser no passado)
    const eventDate = new Date(eventData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (eventDate < today) {
      throw new Error('A data do evento não pode ser no passado')
    }
  }

  /**
   * Busca eventos próximos a uma localização
   * @param lat Latitude
   * @param lng Longitude
   * @param radius Raio em km
   * @param limit Limite de resultados
   * @returns Lista de eventos próximos
   */
  async findNearbyEvents(
    lat: number,
    lng: number,
    radius: number = 50,
    limit: number = 10
  ): Promise<Event[]> {
    return this.listEvents(
      {
        status: 'aprovado',
        proximity: { lat, lng, radius }
      },
      { page: 1, limit }
    ).then(result => result.data)
  }

  /**
   * Busca eventos futuros
   * @param limit Limite de resultados
   * @returns Lista de eventos futuros
   */
  async findUpcomingEvents(limit: number = 10): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0]
    
    return this.listEvents(
      {
        status: 'aprovado',
        startDate: today
      },
      { page: 1, limit }
    ).then(result => result.data)
  }
}

export const eventService = new EventService()
