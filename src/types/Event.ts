/**
 * Tipos e interfaces para o módulo de eventos do Christianitatis.org
 * Baseado na documentação técnica e funcional
 */

/**
 * Status possíveis para um evento
 */
export type EventStatus = 'pendente' | 'aprovado' | 'reprovado'

/**
 * Coordenadas geográficas para localização do evento
 */
export interface EventCoordinates {
  lat: number
  lng: number
}

/**
 * Informações de mídia para um evento
 */
export interface EventMedia {
  url: string
  size: number
  format: string
  name: string
}

/**
 * Estrutura principal de um evento
 * Alinhada com a tabela 'events' no Supabase
 */
export interface Event {
  id: string                   // UUID (PK)
  title: string                // Título do evento
  description: string          // Descrição completa
  date: string                 // Data do evento
  location: string             // Local (cidade, estado, endereço, etc.)
  lat?: number                 // Latitude para filtro por proximidade
  lng?: number                 // Longitude para filtro por proximidade
  media_urls: string[]         // Lista de URLs (imagem/vídeo do Storage)
  user_id: string              // ID do usuário que cadastrou
  status: EventStatus          // 'pendente' | 'aprovado' | 'reprovado'
  justificativa?: string       // Motivo da reprovação (se houver)
  created_at: string           // Data de envio
  updated_at?: string          // Data da última atualização
  approved_by?: string         // ID do usuário que aprovou
  approved_at?: string         // Data de aprovação
  capacity?: number            // Capacidade máxima de participantes
}

/**
 * DTO para criação de um novo evento
 */
export interface CreateEventDTO {
  title: string
  description: string
  date: string
  location: string
  lat?: number
  lng?: number
  media_urls: string[]
  capacity?: number           // Capacidade máxima de participantes
  user_id?: string            // Opcional pois pode ser obtido do contexto de autenticação
  status?: EventStatus        // Opcional pois normalmente será 'pendente' por padrão
}

/**
 * DTO para atualização de um evento existente
 */
export interface UpdateEventDTO extends Partial<CreateEventDTO> {
  status?: EventStatus
  justificativa?: string
}

/**
 * Filtros para listagem de eventos
 */
export interface EventFilters {
  status?: EventStatus
  search?: string
  startDate?: string
  endDate?: string
  proximity?: {
    lat: number
    lng: number
    radius: number  // em km
  }
}

/**
 * Parâmetros para paginação
 */
export interface PaginationParams {
  page: number
  limit: number
}

/**
 * Estrutura para mapeamento entre tipos do Supabase e da aplicação
 */
export interface SupabaseEventMapping {
  // Campos que têm nomes diferentes entre Supabase e aplicação
  rejection_reason: 'justificativa'
  // Adicionar outros mapeamentos conforme necessário
}

/**
 * Funções auxiliares para conversão entre formatos
 */

/**
 * Converte um evento do formato Supabase para o formato da aplicação
 */
export interface SupabaseEvent {
  id?: string
  title: string
  description: string
  date: string
  location: string
  lat?: number
  lng?: number
  media_urls?: string[] | string
  user_id?: string
  status?: EventStatus
  rejection_reason?: string
  created_at?: string
  updated_at?: string
  approved_by?: string
  approved_at?: string
  [key: string]: unknown
}

export function fromSupabaseEvent(supabaseEvent: SupabaseEvent): Event {
  return {
    ...supabaseEvent as Omit<Event, 'media_urls' | 'justificativa'>,
    // Converter campos específicos se necessário
    media_urls: Array.isArray(supabaseEvent.media_urls)
      ? supabaseEvent.media_urls
      : supabaseEvent.media_urls ? [supabaseEvent.media_urls] : [],
    justificativa: supabaseEvent.rejection_reason,
  };
}

/**
 * Converte um evento do formato da aplicação para o formato Supabase
 */
export function toSupabaseEvent(event: Event | CreateEventDTO | UpdateEventDTO): SupabaseEvent {
  // Criar uma cópia do objeto para não modificar o original
  const result: Partial<SupabaseEvent> = { ...event };
  
  // Garantir que campos obrigatórios estejam presentes
  if (!result.title || !result.description || !result.date || !result.location) {
    throw new Error('Campos obrigatórios ausentes');
  }
  
  // Converter campos específicos se necessário
  if ('justificativa' in result && result.justificativa !== undefined) {
    result.rejection_reason = result.justificativa as string;
    delete result.justificativa;
  }
  
  // Forçar o tipo para SupabaseEvent, garantindo que campos obrigatórios estão presentes
  return {
    title: result.title,
    description: result.description,
    date: result.date,
    location: result.location,
    ...result
  } as SupabaseEvent;
}
