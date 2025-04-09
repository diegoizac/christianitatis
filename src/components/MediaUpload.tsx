import React, { useState, useCallback, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import { uploadService } from '@/services/uploadService'
import { EventMedia } from '@/types/Event'
import { toast } from 'react-toastify'

/**
 * Props para o componente MediaUpload
 */
interface MediaUploadProps {
  type: 'image' | 'video'
  onChange: (files: File[]) => void
  onMediaChange?: (media: EventMedia[]) => void
  onProgress?: (progress: number) => void
  maxSizeMB?: number
  accept?: string
  className?: string
  multiple?: boolean
  maxFiles?: number
  value?: File[] | EventMedia[]
}

/**
 * Componente para upload de mídia (imagens ou vídeos)
 */
export function MediaUpload({
  type,
  onChange,
  onMediaChange,
  onProgress,
  maxSizeMB = type === 'image' ? 5 : 100,
  accept = type === 'image' ? 'image/jpeg,image/png,image/webp' : 'video/mp4,video/webm',
  className = '',
  multiple = true,
  maxFiles = 5,
  value = [],
}: MediaUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [media, setMedia] = useState<EventMedia[]>([])

  // Inicializar com valor fornecido
  useEffect(() => {
    if (value.length > 0 && files.length === 0) {
      if (value[0] instanceof File) {
        setFiles(value as File[])
      } else {
        // Se for EventMedia, apenas configurar previews
        const mediaItems = value as EventMedia[]
        setPreviews(mediaItems.map(item => item.url))
        setMedia(mediaItems)
      }
    }
  }, [value, files.length])

  /**
   * Comprime e processa um arquivo de imagem
   */
  const compressImage = useCallback(
    async (file: File): Promise<File> => {
      try {
        const options = {
          maxSizeMB,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (p: number) => {
            const progressValue = p * 100
            setProgress(progressValue)
            onProgress?.(progressValue)
          },
        }

        return await imageCompression(file, options)
      } catch (error) {
        console.error('Erro ao comprimir imagem:', error)
        throw error
      }
    },
    [maxSizeMB, onProgress]
  )

  /**
   * Processa e faz upload de arquivos
   */
  const processFiles = useCallback(
    async (newFiles: File[]) => {
      try {
        setUploading(true)
        setProgress(0)

        // Limitar número de arquivos
        const filesToProcess = newFiles.slice(0, maxFiles)

        // Processar arquivos (comprimir imagens)
        const processedFiles: File[] = []

        for (let i = 0; i < filesToProcess.length; i++) {
          const file = filesToProcess[i]
          let processedFile = file

          if (type === 'image') {
            processedFile = await compressImage(file)
          }

          processedFiles.push(processedFile)

          // Atualizar progresso
          setProgress(((i + 1) / filesToProcess.length) * 100)
        }

        // Atualizar estado
        setFiles(prev => [...prev, ...processedFiles])
        onChange([...files, ...processedFiles])

        // Gerar previews
        const newPreviews = await Promise.all(
          processedFiles.map(file => {
            return new Promise<string>(resolve => {
              const reader = new FileReader()
              reader.onloadend = () => {
                resolve(reader.result as string)
              }
              reader.readAsDataURL(file)
            })
          })
        )

        setPreviews(prev => [...prev, ...newPreviews])

        // Fazer upload se onMediaChange for fornecido
        if (onMediaChange) {
          let uploadResult

          if (type === 'image') {
            uploadResult = await uploadService.uploadMultipleImages(processedFiles, onProgress)
          } else {
            uploadResult = await uploadService.uploadMultipleVideos(processedFiles, onProgress)
          }

          if (uploadResult.failed.length > 0) {
            uploadResult.failed.forEach(failure => {
              toast.error(`Falha ao enviar ${failure.file.name}: ${failure.error}`)
            })
          }

          if (uploadResult.successful.length > 0) {
            const newMedia = [...media, ...uploadResult.successful]
            setMedia(newMedia)
            onMediaChange(newMedia)
          }
        }

        setProgress(100)
      } catch (error) {
        console.error('Erro ao processar arquivos:', error)
        toast.error('Erro ao processar arquivos. Tente novamente.')
      } finally {
        setUploading(false)
      }
    },
    [type, files, media, maxFiles, onChange, onMediaChange, onProgress, compressImage]
  )

  /**
   * Manipula a seleção de arquivos
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles = Array.from(selectedFiles)
    processFiles(newFiles)
  }

  /**
   * Remove um arquivo da lista
   */
  const handleRemove = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev]
      newFiles.splice(index, 1)
      onChange(newFiles)
      return newFiles
    })

    setPreviews(prev => {
      const newPreviews = [...prev]
      newPreviews.splice(index, 1)
      return newPreviews
    })

    if (onMediaChange && media.length > index) {
      setMedia(prev => {
        const newMedia = [...prev]
        newMedia.splice(index, 1)
        onMediaChange(newMedia)
        return newMedia
      })
    }
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={uploading}
        multiple={multiple}
        className="w-full border rounded-md p-2"
      />

      {uploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% concluído</p>
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              {type === 'image' ? (
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-24 w-full object-cover rounded"
                />
              ) : (
                <video
                  src={preview}
                  className="h-24 w-full object-cover rounded"
                  controls={false}
                />
              )}

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remover"
              >
                ×
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                {files[index]?.name || `Arquivo ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {previews.length > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          {previews.length} {previews.length === 1 ? 'arquivo' : 'arquivos'} selecionado
          {previews.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
