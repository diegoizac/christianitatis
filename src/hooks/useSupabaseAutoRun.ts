import { useState, useEffect } from 'react'
import { supabaseAutoRun } from '@/lib/supabaseAutoRun'

export function useSupabaseAutoRun() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [autoResponse, setAutoResponse] = useState<string | null>(null)

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        await supabaseAutoRun.initialize()
        setIsInitialized(true)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      }
    }

    initializeSupabase()
  }, [])

  const getAutoResponse = async (eventId: string) => {
    try {
      const response = await supabaseAutoRun.getAutoResponse(eventId)
      setAutoResponse(response)
      return response
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao obter resposta automática'))
      return null
    }
  }

  return {
    isInitialized,
    error,
    autoResponse,
    getAutoResponse,
  }
}
