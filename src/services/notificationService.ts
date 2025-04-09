import { supabase } from '@/lib/supabase'

/**
 * Interface para notificações
 */
export interface Notification {
  id: string
  user_id: string
  type: 'event_pending' | 'event_approved' | 'event_rejected'
  title: string
  message: string
  read: boolean
  event_id?: string
  created_at: string
  updated_at: string
}

class NotificationService {
  async listNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Notification[]
  }

  async getUnreadCount() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return 0

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) throw error
    return count || 0
  }

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true, updated_at: new Date().toISOString() })
      .eq('id', notificationId)

    if (error) throw error
  }

  async markAllAsRead() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { error } = await supabase
      .from('notifications')
      .update({ read: true, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) throw error
  }

  /**
   * Cria uma notificação para administradores sobre um evento pendente
   * @param eventId ID do evento
   * @param adminId ID do administrador
   */
  async createEventPendingNotification(eventId: string, adminId: string): Promise<void> {
    try {
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('title')
        .eq('id', eventId)
        .single()

      if (eventError) throw eventError

      const { error } = await supabase.from('notifications').insert({
        user_id: adminId,
        type: 'event_pending',
        title: 'Novo evento para aprovação',
        message: `O evento "${event.title}" está aguardando sua aprovação.`,
        event_id: eventId,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (error) throw error
    } catch (error) {
      console.error('Erro ao criar notificação de evento pendente:', error)
      throw error
    }
  }

  /**
   * Cria uma notificação para o criador do evento quando ele é aprovado
   * @param eventId ID do evento
   * @param userId ID do usuário criador
   */
  async createEventApprovedNotification(eventId: string, userId: string): Promise<void> {
    try {
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('title')
        .eq('id', eventId)
        .single()

      if (eventError) throw eventError

      const { error } = await supabase.from('notifications').insert({
        user_id: userId,
        type: 'event_approved',
        title: 'Evento aprovado!',
        message: `Seu evento "${event.title}" foi aprovado e está publicado.`,
        event_id: eventId,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (error) throw error
    } catch (error) {
      console.error('Erro ao criar notificação de evento aprovado:', error)
      throw error
    }
  }

  /**
   * Cria uma notificação para o criador do evento quando ele é rejeitado
   * @param eventId ID do evento
   * @param userId ID do usuário criador
   * @param justificativa Motivo da rejeição
   */
  async createEventRejectedNotification(eventId: string, userId: string, justificativa: string): Promise<void> {
    try {
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('title')
        .eq('id', eventId)
        .single()

      if (eventError) throw eventError

      const { error } = await supabase.from('notifications').insert({
        user_id: userId,
        type: 'event_rejected',
        title: 'Evento rejeitado',
        message: `Seu evento "${event.title}" foi rejeitado. Motivo: ${justificativa}`,
        event_id: eventId,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (error) throw error
    } catch (error) {
      console.error('Erro ao criar notificação de evento rejeitado:', error)
      throw error
    }
  }
}

export const notificationService = new NotificationService()
