import { useState, useEffect } from 'react'
import { getImageUrl } from '@/lib/supabase'

interface UseSupabaseImageProps {
  path?: string
  fallback?: string
}

export function useSupabaseImage({ path, fallback = '/images/placeholder.svg' }: UseSupabaseImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(fallback)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!path) {
      setImageUrl(fallback)
      setLoading(false)
      return
    }

    try {
      // Se já for uma URL completa do Supabase, usa direto
      if (path.includes('storage.googleapis.com')) {
        setImageUrl(path)
        setLoading(false)
        return
      }

      // Se começar com /images/, considera como imagem local
      if (path.startsWith('/images/')) {
        setImageUrl(path)
        setLoading(false)
        return
      }

      // Caso contrário, busca do Supabase Storage
      const url = getImageUrl(path)
      setImageUrl(url)
      setLoading(false)
    } catch (err) {
      console.error('Erro ao carregar imagem:', err)
      setError(true)
      setImageUrl(fallback)
      setLoading(false)
    }
  }, [path, fallback])

  return {
    url: imageUrl,
    loading,
    error,
  }
}

 