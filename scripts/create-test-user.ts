import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Carrega as variáveis de ambiente do arquivo .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createTestUser() {
  try {
    // Registra o usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'teste@teste.com',
      password: 'teste',
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error('Usuário não criado')
    }

    // Cria o perfil do usuário
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: authData.user.id,
        nome: 'Usuário Teste',
        tipo_membro: 'participante',
        newsletter: true,
      },
    ])

    if (profileError) {
      // Se houver erro ao criar o perfil, tenta deletar o usuário criado
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    console.log('Usuário de teste criado com sucesso!')
    console.log('Email: teste@teste.com')
    console.log('Senha: teste')
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error)
  }
}

createTestUser()
