import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Carrega variáveis de ambiente do .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: Variáveis de ambiente do Supabase não configuradas')
  process.exit(1)
}

// Criar cliente Supabase com a service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Função para criar um bucket
async function createBucket(name: string) {
  try {
    const { data: existingBucket } = await supabase.storage.getBucket(name)
    
    if (existingBucket) {
      console.log(`Bucket ${name} já existe`)
      return existingBucket
    }

    const { data, error } = await supabase.storage.createBucket(name, {
      public: true,
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

// Função para obter o tipo MIME
function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json'
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

// Função para fazer upload de um arquivo
async function uploadFile(file: Buffer, fileName: string, bucketName: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: getMimeType(fileName)
      })

    if (error) throw error

    const { data: publicUrl } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    throw error
  }
}

// Função para fazer upload em lote
async function uploadBatch(files: { file: Buffer; fileName: string; bucketName: string }[]) {
  const results = await Promise.allSettled(
    files.map(({ file, fileName, bucketName }) => uploadFile(file, fileName, bucketName))
  )

  const successful = results
    .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
    .map(result => result.value)

  const failed = results
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map(result => result.reason)

  return {
    successful,
    failed,
    total: results.length,
    successCount: successful.length,
    failureCount: failed.length
  }
}

// Função para obter todos os arquivos recursivamente
async function getAllFiles(dir: string): Promise<string[]> {
  const files = await fs.promises.readdir(dir)
  const allFiles = await Promise.all(
    files.map(async file => {
      const filePath = path.join(dir, file)
      const stats = await fs.promises.stat(filePath)
      if (stats.isDirectory()) {
        return getAllFiles(filePath)
      } else {
        return filePath
      }
    })
  )
  return allFiles.flat()
}

// Função principal
async function uploadAllAssets() {
  try {
    // Criar buckets
    console.log('Criando buckets...')
    await createBucket('images')
    await createBucket('animations')
    console.log('Buckets criados com sucesso!\n')

    // Encontrar todos os arquivos
    const allFiles = await getAllFiles(path.join(process.cwd(), 'src/assets'))

    // Filtrar por tipo de arquivo
    const mediaFiles = allFiles.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.glb', '.gltf'].includes(ext)
    })

    // Preparar arquivos para upload
    const uploads = await Promise.all(
      mediaFiles.map(async filePath => {
        const file = await fs.promises.readFile(filePath)
        const ext = path.extname(filePath).toLowerCase()
        const bucketName = ['.glb', '.gltf'].includes(ext) ? 'animations' : 'images'
        const fileName = path.basename(filePath)

        return {
          file,
          fileName,
          bucketName
        }
      })
    )

    // Fazer upload em lote
    console.log(`Iniciando upload de ${uploads.length} arquivos...`)
    const result = await uploadBatch(uploads)

    // Exibir resultados
    console.log('\nResultado do upload:')
    console.log(`Total de arquivos: ${result.total}`)
    console.log(`Uploads bem sucedidos: ${result.successCount}`)
    console.log(`Falhas: ${result.failureCount}`)

    if (result.failed.length > 0) {
      console.log('\nFalhas:')
      result.failed.forEach((error, index) => {
        console.log(`${index + 1}. ${error.message}`)
      })
    }

    // Gerar mapeamento
    const mapping = uploads.reduce((acc, { fileName, bucketName }) => {
      const originalPath = mediaFiles.find(f => path.basename(f) === fileName)!
      acc[originalPath] = `${bucketName}/${fileName}`
      return acc
    }, {} as Record<string, string>)

    // Salvar mapeamento
    await fs.promises.mkdir(path.join(process.cwd(), 'src/data'), { recursive: true })
    await fs.promises.writeFile(
      path.join(process.cwd(), 'src/data/assetMapping.json'),
      JSON.stringify(mapping, null, 2)
    )

    console.log('\nMapeamento de arquivos salvo em src/data/assetMapping.json')
  } catch (error) {
    console.error('Erro ao fazer upload dos arquivos:', error)
    process.exit(1)
  }
}

// Executar script
uploadAllAssets() 