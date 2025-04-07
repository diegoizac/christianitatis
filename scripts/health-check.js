import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/development.json'), 'utf-8')
)

const services = [
  {
    name: 'Frontend (Vite)',
    url: `http://localhost:${config.ports.app}`,
    emoji: '📱',
  },
  {
    name: 'Storybook',
    url: `http://localhost:${config.ports.storybook}`,
    emoji: '📚',
  },
  {
    name: 'Backend',
    url: `http://localhost:${config.ports.backend}/health`,
    emoji: '🔌',
  },
  {
    name: 'MCP Browser',
    url: `http://localhost:${config.ports.mcp}`,
    emoji: '🔮',
  },
]

async function checkHealth() {
  console.log('\n🔍 Verificando saúde dos serviços...\n')

  for (const service of services) {
    try {
      const start = Date.now()
      await axios.get(service.url, { timeout: config.healthCheck.timeout })
      const duration = Date.now() - start

      console.log(`${service.emoji} ${service.name}: ✅ OK (${duration}ms)`)
    } catch (error) {
      console.log(`${service.emoji} ${service.name}: ❌ ERRO - ${error.message}`)
    }
  }
}

// Executa a verificação no intervalo configurado
setInterval(checkHealth, config.healthCheck.interval)
checkHealth() // Executa imediatamente na primeira vez
