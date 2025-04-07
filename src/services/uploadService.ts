import { supabase } from '@/lib/supabase'
import { EventMedia } from '@/types/Event'

const BUCKET_IMAGES = 'event-images'
const BUCKET_VIDEOS = 'event-videos'

interface UploadProgress {
  loaded: number
  total: number
}

class UploadService {
  private async uploadFile(
    file: File,
    bucket: string,
    onProgress?: (progress: number) => void
  ): Promise<EventMedia> {
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      onUploadProgress: (progress: UploadProgress) => {
        if (onProgress) {
          const percentage = (progress.loaded / progress.total) * 100
          onProgress(percentage)
        }
      },
    })

    if (error) {
      console.error('Erro ao fazer upload:', error)
      throw new Error('Falha ao fazer upload do arquivo')
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return {
      url: publicUrl,
      size: file.size,
      format: file.type,
      name: fileName,
    }
  }

  async uploadEventImage(file: File, onProgress?: (progress: number) => void): Promise<EventMedia> {
    if (!file.type.startsWith('image/')) {
      throw new Error('Arquivo deve ser uma imagem')
    }

    const maxSize = 1024 * 1024 // 1MB
    if (file.size > maxSize) {
      throw new Error('Imagem deve ter no máximo 1MB')
    }

    return this.uploadFile(file, BUCKET_IMAGES, onProgress)
  }

  async uploadEventVideo(file: File, onProgress?: (progress: number) => void): Promise<EventMedia> {
    if (!file.type.startsWith('video/')) {
      throw new Error('Arquivo deve ser um vídeo')
    }

    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      throw new Error('Vídeo deve ter no máximo 100MB')
    }

    return this.uploadFile(file, BUCKET_VIDEOS, onProgress)
  }

  async deleteEventMedia(media: EventMedia, isVideo: boolean = false) {
    const bucket = isVideo ? BUCKET_VIDEOS : BUCKET_IMAGES
    const { error } = await supabase.storage.from(bucket).remove([media.name])

    if (error) {
      console.error('Erro ao deletar mídia:', error)
      throw new Error('Falha ao deletar arquivo')
    }
  }
}

export const uploadService = new UploadService()
