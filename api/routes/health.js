import express from 'express'
import { loggers } from '../../scripts/logger.js'

const router = express.Router()

router.get('/health', (req, res) => {
  const healthData = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }

  try {
    res.send(healthData)
    loggers.backend.info('Health check realizado com sucesso')
  } catch (error) {
    healthData.message = error.message
    res.status(503).send(healthData)
    loggers.backend.error(`Health check falhou: ${error.message}`)
  }
})

export default router
