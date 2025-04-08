import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import assetMapping from '@/data/assetMapping.json'

interface UseSupabaseAssetProps {
  path: string
  bucket?: 'images' | 'animations'
  fallback?: string
}

export function useSupabaseAsset({ path, bucket = 'images', fallback = '/images/placeholder.svg' }: UseSupabaseAssetProps) {
  const [url, setUrl] = useState<string>(fallback)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAsset = async () => {
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
          throw new Error(`Asset não encontrado: ${path}`)
        }

        const { data: publicUrl } = supabase.storage
          .from(bucket)
          .getPublicUrl(mappedPath.replace(`${bucket}/`, ''))

        setUrl(publicUrl.publicUrl)
      } catch (error) {
        console.error('Erro ao carregar asset:', error)
        setError(error instanceof Error ? error.message : 'Erro ao carregar asset')
        setUrl(fallback)
      } finally {
        setLoading(false)
      }
    }

    loadAsset()
  }, [path, bucket, fallback])

  return {
    url,
    error,
    loading,
    isSupabaseUrl: url !== fallback && !url.startsWith('http')
  }
} 