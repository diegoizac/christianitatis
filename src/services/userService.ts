import { supabase } from '@/lib/supabase'
import { User, CreateUserDTO, UpdateUserDTO } from '@/types/User'

export const userService = {
  async getUserById(id: string): Promise<User> {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

    if (error) throw error
    return data
  },

  async createUser(userData: CreateUserDTO): Promise<User> {
    const { data, error } = await supabase.from('users').insert([userData]).select().single()

    if (error) throw error
    return data
  },

  async updateUser(id: string, userData: UpdateUserDTO): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async listUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },
}
