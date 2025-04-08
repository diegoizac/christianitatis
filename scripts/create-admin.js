import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://levhtjaudduxxxgbpzgr.supabase.co'
const supabaseServiceKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE5ODE0NywiZXhwIjoyMDU4Nzc0MTQ3fQ.AfrBLay5j0K4GSftWqHf9MbHbH1OyitdGlRp8vsQXu4'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Função para esperar um tempo
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

async function setupAdminProfile() {
  try {
    // Buscar usuário existente
    const {
      data: { users },
      error: getUserError,
    } = await supabase.auth.admin.listUsers()

    if (getUserError) throw getUserError

    const existingUser = users.find(u => u.email === 'contato@2dlcompany.com.br')

    if (!existingUser) {
      throw new Error('Usuário não encontrado')
    }

    // Atualizar metadados do usuário
    const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
      user_metadata: {
        name: 'Administrador 2DL',
        role: 'admin',
      },
    })

    if (updateError) throw updateError

    // Esperar um pouco para o cache ser atualizado
    console.log('Aguardando atualização do cache...')
    await wait(5000)

    // Atualizar perfil
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: existingUser.id,
        name: 'Administrador 2DL',
        role: 'admin',
      })
      .select()

    if (profileError) throw profileError

    console.log('✅ Perfil do admin configurado com sucesso!')
    console.log('Email:', existingUser.email)
    console.log('ID:', existingUser.id)
    console.log('Role: admin')
  } catch (error) {
    console.error('❌ Erro ao configurar perfil do admin:', error)
  }
}

setupAdminProfile()
