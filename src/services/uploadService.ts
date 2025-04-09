/**
 * Serviço para gerenciamento de upload de mídia para eventos
 * Centraliza todas as operações relacionadas a upload de arquivos
 */
import { supabase, createBucket } from '@/lib/supabase'
import { EventMedia } from '@/types/Event'
import { toast } from 'react-toastify'

// Configurações de buckets no Supabase Storage
const BUCKET_IMAGES = 'eventos_midia'
const BUCKET_VIDEOS = 'eventos_midia'

// Configurações de tamanho máximo
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB

// Tipos de arquivos permitidos
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm']

/**
 * Interface para resultado de upload múltiplo
 */
interface UploadResult {
  successful: EventMedia[]
  failed: Array<{
    file: File
    error: string
  }>
}

/**
 * Inicializa os buckets necessários para o upload de mídia
 */
export async function initializeMediaBuckets(): Promise<void> {
  try {
    // Criar bucket para imagens e vídeos
    await createBucket(BUCKET_IMAGES, true)
    
    // Configurar permissões do bucket
    console.log('Buckets inicializados com sucesso')
    toast.success('Sistema de mídia inicializado com sucesso')
  } catch (error) {
    console.error('Erro ao inicializar buckets:', error)
    toast.error('Erro ao inicializar sistema de mídia')
  }
}

/**
 * Serviço para gerenciamento de upload de mídia
 */
class UploadService {
  /**
   * Faz upload de um único arquivo
   * @param file Arquivo a ser enviado
   * @param bucket Nome do bucket no Supabase Storage
   * @param onProgress Callback para progresso do upload
   * @returns Informações da mídia enviada
   */
  private async uploadFile(
    file: File,
    bucket: string,
    onProgress?: (progress: number) => void
  ): Promise<EventMedia> {
    try {
      // Gerar nome único para o arquivo
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

      // Fazer upload do arquivo
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
      
      // Nota: onUploadProgress não está disponível na versão atual do Supabase
      // Simulamos o progresso como 100% após o upload
      if (onProgress) {
        onProgress(100)
      }

      if (error) {
        console.error('Erro ao fazer upload:', error)
        throw new Error(`Falha ao fazer upload do arquivo: ${error.message}`)
      }

      // Obter URL pública do arquivo
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      return {
        url: publicUrl,
        size: file.size,
        format: file.type,
        name: fileName,
      }
    } catch (error) {
      console.error('Erro no upload de arquivo:', error)
      throw error instanceof Error ? error : new Error('Erro desconhecido no upload')
    }
  }

  /**
   * Valida um arquivo de imagem
   * @param file Arquivo a ser validado
   * @throws Error se o arquivo for inválido
   */
  private validateImageFile(file: File): void {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error(
        `Tipo de arquivo não permitido. Tipos permitidos: ${ALLOWED_IMAGE_TYPES.join(', ')}`
      )
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error(`Imagem deve ter no máximo ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`)
    }
  }

  /**
   * Valida um arquivo de vídeo
   * @param file Arquivo a ser validado
   * @throws Error se o arquivo for inválido
   */
  private validateVideoFile(file: File): void {
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      throw new Error(
        `Tipo de arquivo não permitido. Tipos permitidos: ${ALLOWED_VIDEO_TYPES.join(', ')}`
      )
    }

    if (file.size > MAX_VIDEO_SIZE) {
      throw new Error(`Vídeo deve ter no máximo ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`)
    }
  }

  /**
   * Faz upload de uma imagem para um evento
   * @param file Arquivo de imagem
   * @param onProgress Callback para progresso do upload
   * @returns Informações da imagem enviada
   */
  async uploadEventImage(file: File, onProgress?: (progress: number) => void): Promise<EventMedia> {
    this.validateImageFile(file)
    return this.uploadFile(file, BUCKET_IMAGES, onProgress)
  }

  /**
   * Faz upload de um vídeo para um evento
   * @param file Arquivo de vídeo
   * @param onProgress Callback para progresso do upload
   * @returns Informações do vídeo enviado
   */
  async uploadEventVideo(file: File, onProgress?: (progress: number) => void): Promise<EventMedia> {
    this.validateVideoFile(file)
    return this.uploadFile(file, BUCKET_VIDEOS, onProgress)
  }

  /**
   * Faz upload de múltiplas imagens para um evento
   * @param files Lista de arquivos de imagem
   * @param onProgress Callback para progresso do upload
   * @returns Resultado do upload com arquivos bem-sucedidos e falhas
   */
  async uploadMultipleImages(
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    const result: UploadResult = {
      successful: [],
      failed: [],
    }

    // Processar cada arquivo
    for (const file of files) {
      try {
        this.validateImageFile(file)
        const media = await this.uploadFile(file, BUCKET_IMAGES, onProgress)
        result.successful.push(media)
      } catch (error) {
        result.failed.push({
          file,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        })
      }
    }

    return result
  }

  /**
   * Faz upload de múltiplos vídeos para um evento
   * @param files Lista de arquivos de vídeo
   * @param onProgress Callback para progresso do upload
   * @returns Resultado do upload com arquivos bem-sucedidos e falhas
   */
  async uploadMultipleVideos(
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<UploadResult> {
    const result: UploadResult = {
      successful: [],
      failed: [],
    }

    // Processar cada arquivo
    for (const file of files) {
      try {
        this.validateVideoFile(file)
        const media = await this.uploadFile(file, BUCKET_VIDEOS, onProgress)
        result.successful.push(media)
      } catch (error) {
        result.failed.push({
          file,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
        })
      }
    }

    return result
  }

  /**
   * Deleta uma mídia de evento
   * @param media Informações da mídia a ser deletada
   * @param isVideo Indica se é um vídeo (true) ou imagem (false)
   */
  async deleteEventMedia(media: EventMedia, isVideo: boolean = false): Promise<void> {
    try {
      const bucket = isVideo ? BUCKET_VIDEOS : BUCKET_IMAGES
      const { error } = await supabase.storage.from(bucket).remove([media.name])

      if (error) {
        console.error('Erro ao deletar mídia:', error)
        throw new Error(`Falha ao deletar arquivo: ${error.message}`)
      }
    } catch (error) {
      console.error('Erro ao deletar mídia:', error)
      throw error instanceof Error ? error : new Error('Erro desconhecido ao deletar mídia')
    }
  }

  /**
   * Deleta múltiplas mídias de evento
   * @param medias Lista de informações das mídias a serem deletadas
   * @param isVideo Indica se são vídeos (true) ou imagens (false)
   */
  async deleteMultipleEventMedia(medias: EventMedia[], isVideo: boolean = false): Promise<void> {
    try {
      const bucket = isVideo ? BUCKET_VIDEOS : BUCKET_IMAGES
      const fileNames = medias.map(media => media.name)
      
      const { error } = await supabase.storage.from(bucket).remove(fileNames)

      if (error) {
        console.error('Erro ao deletar mídias:', error)
        throw new Error(`Falha ao deletar arquivos: ${error.message}`)
      }
    } catch (error) {
      console.error('Erro ao deletar mídias:', error)
      throw error instanceof Error ? error : new Error('Erro desconhecido ao deletar mídias')
    }
  }

  /**
   * Converte URLs de mídia para objetos EventMedia
   * Útil quando se tem apenas as URLs e precisa dos objetos completos
   * @param urls Lista de URLs de mídia
   * @returns Lista de objetos EventMedia
   */
  convertUrlsToEventMedia(urls: string[]): EventMedia[] {
    return urls.map(url => {
      const name = url.split('/').pop() || ''
      const format = name.split('.').pop()?.toLowerCase() || ''
      
      return {
        url,
        name,
        format: format === 'jpg' || format === 'jpeg' ? 'image/jpeg' :
                format === 'png' ? 'image/png' :
                format === 'webp' ? 'image/webp' :
                format === 'mp4' ? 'video/mp4' :
                format === 'webm' ? 'video/webm' :
                'application/octet-stream',
        size: 0, // Tamanho desconhecido
      }
    })
  }
}

export const uploadService = new UploadService()
