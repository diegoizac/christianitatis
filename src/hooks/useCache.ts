import { useState, useEffect } from 'react';

interface CacheOptions {
  key: string;
  ttl?: number; // Time to live in seconds
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function useCache<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tenta recuperar do cache
        const cachedData = localStorage.getItem(`cache_${options.key}`);
        if (cachedData) {
          const { data: cached, timestamp }: CacheItem<T> = JSON.parse(cachedData);
          const now = Date.now();
          const ttl = options.ttl || 3600; // Default 1 hour

          // Se o cache ainda é válido, use-o
          if (now - timestamp < ttl * 1000) {
            setData(cached);
            setLoading(false);
            return;
          }
        }

        // Se não há cache ou está expirado, busca novos dados
        const result = await fetcher();
        
        // Salva no cache
        const cacheItem: CacheItem<T> = {
          data: result,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          `cache_${options.key}`,
          JSON.stringify(cacheItem)
        );

        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options.key, options.ttl, fetcher]);

  const invalidateCache = () => {
    localStorage.removeItem(`cache_${options.key}`);
    setLoading(true);
  };

  return { data, loading, error, invalidateCache };
}