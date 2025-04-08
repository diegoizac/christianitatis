import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Carrega variáveis de ambiente do .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro: Variáveis de ambiente do Supabase não configuradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createBucket(name: string, isPublic: boolean = true) {
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

async function configureBucketPolicy(name: string) {
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

async function initializeBuckets() {
  try {
    console.log('Inicializando buckets no Supabase Storage...')

    // Criar bucket de imagens
    await createBucket('images')
    await configureBucketPolicy('images')
    console.log('✅ Bucket de imagens configurado')

    // Criar bucket de animações
    await createBucket('animations')
    await configureBucketPolicy('animations')
    console.log('✅ Bucket de animações configurado')

    console.log('\nTodos os buckets foram configurados com sucesso!')
    console.log('\nAgora você pode executar o upload dos assets:')
    console.log('npm run upload-assets')
  } catch (error) {
    console.error('❌ Erro ao inicializar buckets:', error)
    process.exit(1)
  }
}

// Executa a inicialização
initializeBuckets() 