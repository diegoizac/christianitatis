import { supabase } from '@/lib/supabase'

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

  async createEventPendingNotification(eventId: string, adminId: string) {
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
    })

    if (error) throw error
  }

  async createEventApprovedNotification(eventId: string, userId: string) {
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
    })

    if (error) throw error
  }

  async createEventRejectedNotification(eventId: string, userId: string, reason: string) {
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
      message: `Seu evento "${event.title}" foi rejeitado. Motivo: ${reason}`,
      event_id: eventId,
    })

    if (error) throw error
  }
}

export const notificationService = new NotificationService()
