import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
import dotenv from 'dotenv'

// Carrega variáveis de ambiente do .env se não estiver no Vite
if (typeof import.meta === 'undefined') {
  dotenv.config()
}

// Tenta obter as variáveis do Vite ou do processo
const supabaseUrl = typeof import.meta !== 'undefined' 
  ? import.meta.env.VITE_SUPABASE_URL 
  : process.env.VITE_SUPABASE_URL

const supabaseAnonKey = typeof import.meta !== 'undefined'
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : process.env.VITE_SUPABASE_ANON_KEY

console.log('Configuração Supabase:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro de configuração:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  })
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Função para fazer upload de imagem
export async function uploadImage(file: File | Blob, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) throw error

    // Retorna a URL pública da imagem
    const { data: publicUrl } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw error
  }
}

// Função para fazer upload em lote
export async function uploadBatch(files: { file: File | Blob; path: string }[]) {
  try {
    const results = await Promise.allSettled(
      files.map(({ file, path }) => uploadImage(file, path))
    )

    const successful = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map(result => result.value)

    const failed = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => result.reason)

    return {
      successful,
      failed,
      total: results.length,
      successCount: successful.length,
      failureCount: failed.length
    }
  } catch (error) {
    console.error('Erro no upload em lote:', error)
    throw error
  }
}

// Função para obter URL pública de uma imagem
export function getImageUrl(path: string) {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path)
  
  return data.publicUrl
}

// Função para deletar uma imagem
export async function deleteImage(path: string) {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path])

    if (error) throw error
  } catch (error) {
    console.error('Erro ao deletar imagem:', error)
    throw error
  }
}

// Função para listar imagens de um diretório
export async function listImages(prefix?: string) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .list(prefix || '')

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao listar imagens:', error)
    throw error
  }
}

// Função para fazer download de uma imagem
export async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage
      .from('images')
      .download(path)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao fazer download:', error)
    throw error
  }
}

// Função para mover/renomear uma imagem
export async function moveImage(from: string, to: string) {
  try {
    const { error } = await supabase.storage
      .from('images')
      .move(from, to)

    if (error) throw error
  } catch (error) {
    console.error('Erro ao mover imagem:', error)
    throw error
  }
}

// Função para copiar uma imagem
export async function copyImage(from: string, to: string) {
  try {
    const { error } = await supabase.storage
      .from('images')
      .copy(from, to)

    if (error) throw error
  } catch (error) {
    console.error('Erro ao copiar imagem:', error)
    throw error
  }
}

// Função para criar um bucket
export async function createBucket(name: string, isPublic: boolean = true) {
  try {
    const { data: existingBucket } = await supabase.storage.getBucket(name)
    
    if (existingBucket) {
      console.log(`Bucket ${name} já existe`)
      return existingBucket
    }

    const { data, error } = await supabase.storage.createBucket(name, {
      public: isPublic,
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'model/gltf-binary',
        'model/gltf+json'
      ],
      fileSizeLimit: 52428800 // 50MB
    })

    if (error) throw error
    console.log(`Bucket ${name} criado com sucesso`)
    return data
  } catch (error) {
    console.error(`Erro ao criar bucket ${name}:`, error)
    throw error
  }
}

// Função para configurar permissões do bucket
export async function configureBucketPolicy(name: string) {
  try {
    const { error } = await supabase.storage.updateBucket(name, {
      public: true,
      fileSizeLimit: 52428800,
      allowedMimeTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'model/gltf-binary',
        'model/gltf+json'
      ]
    })

    if (error) throw error
    console.log(`Permissões do bucket ${name} configuradas com sucesso`)
  } catch (error) {
    console.error(`Erro ao configurar permissões do bucket ${name}:`, error)
    throw error
  }
}

// Tipos para as tabelas do Supabase
export interface Tables {
  events: {
    Row: {
      id: string
      title: string
      description: string
      date: string
      time: string
      location: {
        address: string
        city: string
        state: string
        coordinates: {
          lat: number
          lng: number
        }
      }
      media: {
        images: Array<{
          url: string
          size: number
          format: string
          name: string
        }>
        videos: Array<{
          url: string
          size: number
          format: string
          name: string
        }>
      }
      capacity: number
      registered_count: number
      price: number | null
      contact: {
        name: string
        email: string
        phone: string
      }
      status: 'draft' | 'pending' | 'published' | 'cancelled'
      approvedBy: string | null
      created_at: string
      updated_at: string
    }
    Insert: Omit<
      Tables['events']['Row'],
      'id' | 'registered_count' | 'created_at' | 'updated_at' | 'approvedBy'
    >
    Update: Partial<Tables['events']['Insert']>
  }
  event_registrations: {
    Row: {
      id: string
      event_id: string
      user_id: string
      status: 'pending' | 'confirmed' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      payment_id: string | null
      created_at: string
    }
    Insert: Omit<Tables['event_registrations']['Row'], 'id' | 'created_at'>
    Update: Partial<Tables['event_registrations']['Insert']>
  }
  users: {
    Row: {
      id: string
      email: string
      name: string
      role: 'user' | 'admin'
      created_at: string
      updated_at: string
    }
  }
}

export type { Database }
export type DatabaseTables = Database['public']['Tables']
export type DatabaseEnums = Database['public']['Enums']

export interface ContactMessage {
  id: number
  created_at: string
  email: string
  name?: string
  message?: string
  status: 'pending' | 'sent' | 'error'
}

export type { User, Session } from '@supabase/supabase-js'
