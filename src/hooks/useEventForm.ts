import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Tables } from '@/lib/supabase'

type EventFormData = Tables['events']['Insert']
type EventMedia = {
  images: File[]
  videos: File[]
}

export function useEventForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [media, setMedia] = useState<EventMedia>({ images: [], videos: [] })

  const uploadMedia = async (
    files: MediaFile[],
    type: 'images' | 'videos'
  ): Promise<
    Array<{
      url: string
      size: number
      format: string
      name: string
    }>
  > => {
    const bucket = type === 'images' ? 'event-images' : 'event-videos'
    const maxSize = type === 'images' ? 5 * 1024 * 1024 : 100 * 1024 * 1024 // 5MB ou 100MB
    const allowedTypes =
      type === 'images' ? ['image/jpeg', 'image/png', 'image/webp'] : ['video/mp4', 'video/webm']

    const uploads = files.map(async file => {
      if (file.size > maxSize) {
        throw new Error(`Arquivo ${file.name} excede o tamanho máximo permitido`)
      }

      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Tipo de arquivo não permitido: ${file.type}`)
      }

      const fileName = `${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      return {
        url: publicUrl,
        size: file.size,
        format: file.type,
        name: file.name,
      }
    })

    return Promise.all(uploads)
  }

  const createEvent = async (formData: EventFormData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Upload de mídia
      const uploadedImages = await uploadMedia(media.images, 'images')
      const uploadedVideos = await uploadMedia(media.videos, 'videos')

      // Criar evento com mídia
      const { error: eventError } = await supabase.from('events').insert({
        ...formData,
        media: {
          images: uploadedImages,
          videos: uploadedVideos,
        },
        status: 'draft',
      })

      if (eventError) throw eventError

      setSuccess(true)
      setMedia({ images: [], videos: [] })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar evento')
    } finally {
      setLoading(false)
    }
  }

  const handleMediaChange = (files: FileList | null, type: 'images' | 'videos') => {
    if (!files) return

    const mediaFiles = Array.from(files).map(file => ({
      ...file,
      preview: type === 'images' ? URL.createObjectURL(file) : undefined,
    })) as MediaFile[]

    setMedia(prev => ({
      ...prev,
      [type]: [...prev[type], ...mediaFiles],
    }))
  }

  const removeMedia = (index: number, type: 'images' | 'videos') => {
    setMedia(prev => {
      const newMedia = {
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }

      // Limpar previews para evitar memory leaks
      if (type === 'images') {
        prev[type][index].preview && URL.revokeObjectURL(prev[type][index].preview)
      }

      return newMedia
    })
  }

  return {
    loading,
    error,
    success,
    media,
    createEvent,
    handleMediaChange,
    removeMedia,
  }
}
