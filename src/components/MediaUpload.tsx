import React, { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'

interface MediaUploadProps {
  type: 'image' | 'video'
  onChange: (file: File) => void
  onProgress?: (progress: number) => void
  maxSizeMB?: number
  accept?: string
  className?: string
}

export function MediaUpload({
  type,
  onChange,
  onProgress,
  maxSizeMB = type === 'image' ? 1 : 100,
  accept = type === 'image' ? 'image/jpeg,image/png,image/webp' : 'video/mp4,video/webm',
  className = '',
}: MediaUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleCompressAndUpload = useCallback(
    async (file: File) => {
      try {
        setUploading(true)
        setProgress(0)

        let processedFile = file

        if (type === 'image') {
          const options = {
            maxSizeMB,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            onProgress: (p: number) => {
              setProgress(p * 100)
              onProgress?.(p * 100)
            },
          }

          processedFile = await imageCompression(file, options)
        }

        setProgress(100)
        onChange(processedFile)

        // Gerar preview
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(processedFile)
      } catch (error) {
        console.error('Erro ao processar arquivo:', error)
        throw error
      } finally {
        setUploading(false)
      }
    },
    [type, maxSizeMB, onChange, onProgress]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    handleCompressAndUpload(file)
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={uploading}
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

      {preview && (
        <div className="mt-2">
          {type === 'image' ? (
            <img src={preview} alt="Preview" className="max-h-48 rounded" />
          ) : (
            <video src={preview} controls className="max-h-48 rounded" />
          )}
        </div>
      )}
    </div>
  )
}
