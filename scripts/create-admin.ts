import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://levhtjaudduxxxgbpzgr.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTgxNDcsImV4cCI6MjA1ODc3NDE0N30.qwuCt4nodQAJmRB50Jq7Yk1YeDnvgbBlKzj-paa4Ohc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminUser() {
  try {
    // Registrar o usuário admin
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@christianitatis.org',
      password: 'Admin@123!',
      options: {
        data: {
          name: 'Administrador',
          role: 'admin',
        },
      },
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error('Usuário não criado')
    }

    // Criar o perfil do admin
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: authData.user.id,
        name: 'Administrador',
        email: 'admin@christianitatis.org',
        role: 'admin',
        diocese: 'São Paulo',
        paroquia: 'Matriz',
        phone: '+55 11 99999-9999',
      },
    ])

    if (profileError) {
      // Se houver erro ao criar o perfil, tenta deletar o usuário criado
      await supabase.auth.admin.deleteUser(authData.user.id)
      throw profileError
    }

    console.log('✅ Usuário admin criado com sucesso!')
    console.log('Email: admin@christianitatis.org')
    console.log('Senha inicial: Admin@123!')
    console.log('⚠️  IMPORTANTE: Altere a senha no primeiro login')
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error)
  }
}

createAdminUser()
