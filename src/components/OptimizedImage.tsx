import React from 'react'
import { useSupabaseAsset } from '@/hooks/useSupabaseAsset'
import { Spinner } from './Spinner'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
}

export function OptimizedImage({ src, alt, className = '', ...props }: OptimizedImageProps) {
  const { url, loading, error } = useSupabaseAsset({
    path: src,
    bucket: 'images',
    fallback: '/images/placeholder.svg',
  })

  if (loading) {
    return <Spinner className={className} />
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-red-500">Erro ao carregar imagem</span>
      </div>
    )
  }

  return <img src={url} alt={alt} className={className} {...props} />
}
