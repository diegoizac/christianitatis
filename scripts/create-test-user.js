import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Carrega as variáveis de ambiente do arquivo .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createTestUser() {
  try {
    // Tenta fazer login primeiro para ver se o usuário já existe
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'teste@teste.com',
      password: 'teste123',
    })

    if (!loginError) {
      console.log('Usuário já existe e pode ser usado:')
      console.log('Email: teste@teste.com')
      console.log('Senha: teste123')
      return
    }

    // Se não conseguiu fazer login, tenta criar o usuário
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'teste@teste.com',
      password: 'teste123',
      options: {
        data: {
          name: 'Usuário Teste',
        },
      },
    })

    if (authError) {
      throw authError
    }

    console.log('Usuário de teste criado com sucesso!')
    console.log('Email: teste@teste.com')
    console.log('Senha: teste123')
    console.log('Por favor, verifique o email para confirmar a conta')
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error)
  }
}

createTestUser()
