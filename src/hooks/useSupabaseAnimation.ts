import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import assetMapping from '@/data/assetMapping.json'

interface UseSupabaseAnimationProps {
  path: string
  fallback?: string
}

export function useSupabaseAnimation({ path, fallback = '/animations/placeholder.glb' }: UseSupabaseAnimationProps) {
  const [url, setUrl] = useState<string>(fallback)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setLoading(true)
        setError(null)

        // Se o path já é uma URL completa, use-a diretamente
        if (path.startsWith('http')) {
          setUrl(path)
          return
        }

        // Se o path é relativo, procure no mapeamento
        const relativePath = path.startsWith('/') ? path.slice(1) : path
        const mappedPath = Object.entries(assetMapping).find(([key]) => 
          key.endsWith(relativePath)
        )?.[1]

        if (!mappedPath) {
          throw new Error(`Animação não encontrada: ${path}`)
        }

        const { data: publicUrl } = supabase.storage
          .from('animations')
          .getPublicUrl(mappedPath.replace('animations/', ''))

        setUrl(publicUrl.publicUrl)
      } catch (error) {
        console.error('Erro ao carregar animação:', error)
        setError(error instanceof Error ? error.message : 'Erro ao carregar animação')
        setUrl(fallback)
      } finally {
        setLoading(false)
      }
    }

    loadAnimation()
  }, [path, fallback])

  return {
    url,
    error,
    loading,
    isSupabaseUrl: url !== fallback && !url.startsWith('http')
  }
} 