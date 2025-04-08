import { useState, useEffect } from 'react'
import { Event, EventFormData, EventFilters } from '../types/Event'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<EventFilters>({})
  const { user } = useAuth()
  const limit = 10

  const loadEvents = async (page = currentPage, newFilters?: EventFilters) => {
    setIsLoading(true)
    try {
      let query = supabase.from('events').select('*', { count: 'exact' })

      // Aplicar filtros
      if (newFilters?.status || filters.status) {
        query = query.eq('status', newFilters?.status || filters.status)
      }

      if (newFilters?.search || filters.search) {
        const searchTerm = newFilters?.search || filters.search
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      if (newFilters?.startDate || filters.startDate) {
        query = query.gte('created_at', newFilters?.startDate || filters.startDate)
      }

      if (newFilters?.endDate || filters.endDate) {
        query = query.lte('created_at', newFilters?.endDate || filters.endDate)
      }

      // Aplicar paginação
      const start = (page - 1) * limit
      query = query.range(start, start + limit - 1).order('created_at', { ascending: false })

      const { data, error, count } = await query

      if (error) throw error

      setEvents(data || [])
      setTotalCount(count || 0)
      setCurrentPage(page)
      if (newFilters) setFilters(newFilters)
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
      toast.error('Erro ao carregar eventos. Tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  const createEvent = async (data: EventFormData) => {
    try {
      // Validar data/hora
      const eventDate = new Date(`${data.date}T${data.time}`)
      if (eventDate < new Date()) {
        throw new Error('A data e hora do evento não podem estar no passado')
      }

      const { data: newEvent, error } = await supabase
        .from('events')
        .insert([
          {
            ...data,
            status: 'active',
            registered_count: 0,
          },
        ])
        .select()
        .single()

      if (error) throw error

      setEvents(prev => [newEvent as Event, ...prev])
      toast.success('Evento criado com sucesso!')
      return newEvent as Event
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar evento. Tente novamente.'
      toast.error(message)
      throw error
    }
  }

  const updateEvent = async (id: string, data: Partial<EventFormData>) => {
    try {
      // Validar data/hora se estiverem sendo atualizadas
      if (data.date && data.time) {
        const eventDate = new Date(`${data.date}T${data.time}`)
        if (eventDate < new Date()) {
          throw new Error('A data e hora do evento não podem estar no passado')
        }
      }

      const { data: updatedEvent, error } = await supabase
        .from('events')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setEvents(prev => prev.map(event => (event.id === id ? updatedEvent : event)))
      toast.success('Evento atualizado com sucesso!')
      return updatedEvent
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar evento. Tente novamente.'
      toast.error(message)
      throw error
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id)

      if (error) throw error

      setEvents(prev => prev.filter(event => event.id !== id))
      toast.success('Evento excluído com sucesso!')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao excluir evento. Tente novamente.'
      toast.error(message)
      throw error
    }
  }

  const registerForEvent = async (eventId: string) => {
    if (!user) {
      toast.error('Você precisa estar logado para se inscrever em um evento.')
      return
    }

    try {
      // Verificar se já está inscrito
      const { data: existingReg, error: regCheckError } = await supabase
        .from('event_registrations')
        .select()
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .single()

      if (regCheckError && regCheckError.code !== 'PGRST116') throw regCheckError

      if (existingReg) {
        toast.info('Você já está inscrito neste evento.')
        return
      }

      // Verificar vagas disponíveis
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select()
        .eq('id', eventId)
        .single()

      if (eventError) throw eventError

      if (!event || event.registered_count >= event.capacity) {
        toast.error('Não há vagas disponíveis para este evento.')
        return
      }

      // Criar inscrição e atualizar contador em uma transação
      const { error: transactionError } = await supabase.rpc('register_for_event', {
        p_event_id: eventId,
        p_user_id: user.id,
      })

      if (transactionError) throw transactionError

      // Atualizar lista local
      setEvents(prev =>
        prev.map(e => (e.id === eventId ? { ...e, registered_count: e.registered_count + 1 } : e))
      )

      toast.success('Inscrição realizada com sucesso!')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao realizar inscrição. Tente novamente.'
      toast.error(message)
      throw error
    }
  }

  // Carregar eventos ao montar o componente
  useEffect(() => {
    loadEvents()
  }, [])

  return {
    events,
    totalCount,
    isLoading,
    currentPage,
    filters,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
  }
}
