export interface Database {
  public: {
    Tables: {
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
          Database['public']['Tables']['events']['Row'],
          'id' | 'registered_count' | 'created_at' | 'updated_at' | 'approvedBy'
        >
        Update: Partial<Database['public']['Tables']['events']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['event_registrations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['event_registrations']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
    }
    Enums: {
      user_role: 'user' | 'admin'
      event_status: 'draft' | 'pending' | 'published' | 'cancelled'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      registration_status: 'pending' | 'confirmed' | 'cancelled'
    }
  }
} 