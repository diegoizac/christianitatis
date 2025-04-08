export type EventStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'cancelled'

export interface EventLocation {
  address: string
  city: string
  state: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface EventMedia {
  url: string
  size: number
  format: string
  name: string
}

export interface EventContact {
  name: string
  email: string
  phone: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  capacity: number
  image?: EventMedia | null
  video?: EventMedia | null
  status: EventStatus
  user_id: string
  created_at: string
  updated_at: string
  approved_by?: string
  approved_at?: string
  rejection_reason?: string
}

export interface CreateEventDTO {
  title: string
  description: string
  date: string
  location: string
  capacity: number
  image?: EventMedia | null
  video?: EventMedia | null
  status?: EventStatus
  user_id?: string
}

export interface UpdateEventDTO extends Partial<CreateEventDTO> {
  status?: EventStatus
}

export interface EventFilters {
  status?: EventStatus
  search?: string
  startDate?: string
  endDate?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  status: 'registered' | 'cancelled'
  created_at: string
}
