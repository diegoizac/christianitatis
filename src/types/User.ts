export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  phone?: string
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
  role?: 'user' | 'admin'
}
