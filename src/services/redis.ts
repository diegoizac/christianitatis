import Redis from 'ioredis'
import { User, Session } from '../types/auth'

// Configuração do Redis
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: times => {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
})

// Prefixos para as chaves
const PREFIXES = {
  SESSION: 'session:',
  USER: 'user:',
  EVENT: 'event:',
  CACHE: 'cache:',
}

// Tempo de expiração (em segundos)
const TTL = {
  SESSION: 24 * 60 * 60, // 24 horas
  CACHE: 60 * 60, // 1 hora
}

export const redisService = {
  // Gerenciamento de Sessão
  async setSession(sessionId: string, session: Session): Promise<void> {
    const key = PREFIXES.SESSION + sessionId
    await redis.setex(key, TTL.SESSION, JSON.stringify(session))
  },

  async getSession(sessionId: string): Promise<Session | null> {
    const key = PREFIXES.SESSION + sessionId
    const session = await redis.get(key)
    return session ? JSON.parse(session) : null
  },

  async removeSession(sessionId: string): Promise<void> {
    const key = PREFIXES.SESSION + sessionId
    await redis.del(key)
  },

  // Cache de Usuário
  async setUserCache(userId: string, user: User): Promise<void> {
    const key = PREFIXES.USER + userId
    await redis.setex(key, TTL.CACHE, JSON.stringify(user))
  },

  async getUserCache(userId: string): Promise<User | null> {
    const key = PREFIXES.USER + userId
    const user = await redis.get(key)
    return user ? JSON.parse(user) : null
  },

  // Cache de Eventos
  async setEventCache(eventId: string, event: any): Promise<void> {
    const key = PREFIXES.EVENT + eventId
    await redis.setex(key, TTL.CACHE, JSON.stringify(event))
  },

  async getEventCache(eventId: string): Promise<any> {
    const key = PREFIXES.EVENT + eventId
    const event = await redis.get(key)
    return event ? JSON.parse(event) : null
  },

  // Cache Genérico
  async setCache(key: string, data: any, ttl = TTL.CACHE): Promise<void> {
    const cacheKey = PREFIXES.CACHE + key
    await redis.setex(cacheKey, ttl, JSON.stringify(data))
  },

  async getCache(key: string): Promise<any> {
    const cacheKey = PREFIXES.CACHE + key
    const data = await redis.get(cacheKey)
    return data ? JSON.parse(data) : null
  },

  async removeCache(key: string): Promise<void> {
    const cacheKey = PREFIXES.CACHE + key
    await redis.del(cacheKey)
  },

  // Utilitários
  async clearAllCache(): Promise<void> {
    const keys = await redis.keys('cache:*')
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  },

  async ping(): Promise<boolean> {
    try {
      const result = await redis.ping()
      return result === 'PONG'
    } catch (error) {
      console.error('Erro ao conectar com Redis:', error)
      return false
    }
  },
}
