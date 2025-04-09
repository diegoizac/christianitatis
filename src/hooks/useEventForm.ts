import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { uploadService } from '@/services/uploadService'
import { EventMedia as EventMediaType, CreateEventDTO } from '@/types/Event'

// Tipo para arquivos de mídia com preview
interface MediaFile extends File {
  preview?: string
}

// Tipo para o formulário de eventos
type EventFormData = CreateEventDTO
// Tipo para arquivos de mídia com preview

export function useEventForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [media, setMedia] = useState<{ images: MediaFile[], videos: MediaFile[] }>({ images: [], videos: [] })

  const uploadMedia = async (
    files: MediaFile[],
    type: 'images' | 'videos'
  ): Promise<EventMediaType[]> => {
    try {
      // Usar o serviço de upload existente
      const result = type === 'images'
        ? await uploadService.uploadMultipleImages(files)
        : await uploadService.uploadMultipleVideos(files);
      
      if (result.failed.length > 0) {
        // Lançar erro com o primeiro problema encontrado
        throw new Error(`Falha ao enviar ${result.failed[0].file.name}: ${result.failed[0].error}`);
      }
      
      return result.successful;
    } catch (error) {
      console.error('Erro ao fazer upload de mídia:', error);
      throw error;
    }
  }

  const createEvent = async (formData: EventFormData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Upload de mídia
      const uploadedImages = await uploadMedia(media.images, 'images')
      const uploadedVideos = await uploadMedia(media.videos, 'videos')

      // Extrair URLs para o formato esperado pelo serviço de eventos
      const media_urls = [
        ...uploadedImages.map(img => img.url),
        ...uploadedVideos.map(vid => vid.url)
      ];

      // Combinar os dados do formulário com as URLs de mídia
      const eventData = {
        ...formData,
        media_urls: [...(formData.media_urls || []), ...media_urls],
        status: formData.status || 'pendente',
      };

      // Criar evento com mídia usando o formato correto
      const { error: eventError } = await supabase.from('events').insert(eventData)

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

    const mediaFiles = Array.from(files).map(file => {
      const mediaFile = file as MediaFile;
      if (type === 'images') {
        mediaFile.preview = URL.createObjectURL(file);
      }
      return mediaFile;
    });

    setMedia(prev => ({
      ...prev,
      [type]: [...prev[type], ...mediaFiles],
    }))
  }

  const removeMedia = (index: number, type: 'images' | 'videos') => {
    setMedia(prev => {
      const mediaToRemove = prev[type][index] as MediaFile;
      
      // Limpar previews para evitar memory leaks
      if (type === 'images' && mediaToRemove.preview) {
        URL.revokeObjectURL(mediaToRemove.preview);
      }

      return {
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      };
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
