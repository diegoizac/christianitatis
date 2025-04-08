import fs from 'fs'
import path from 'path'
import { createLogger, format, transports } from 'winston'

const config = JSON.parse(fs.readFileSync(path.resolve('./config/development.json'), 'utf-8'))

// Cria o diretório de logs se não existir
if (!fs.existsSync(config.logs.directory)) {
  fs.mkdirSync(config.logs.directory, { recursive: true })
}

function createServiceLogger(serviceName) {
  return createLogger({
    level: config.logs.level,
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${serviceName} ${level}: ${message}`
          })
        ),
      }),
      new transports.File({
        filename: path.join(config.logs.directory, `${serviceName}.log`),
        format: format.combine(
          format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`
          })
        ),
      }),
    ],
  })
}

export const loggers = {
  app: createServiceLogger('app'),
  storybook: createServiceLogger('storybook'),
  backend: createServiceLogger('backend'),
  mcp: createServiceLogger('mcp'),
}

export function logServiceStart(serviceName, port) {
  loggers[serviceName].info(`Serviço iniciado na porta ${port}`)
}

export function logServiceError(serviceName, error) {
  loggers[serviceName].error(`Erro no serviço: ${error.message}`)
}

export default loggers
