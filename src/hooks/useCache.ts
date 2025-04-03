import { useState, useEffect, useCallback } from "react";

interface CacheOptions {
  key: string;
  ttl?: number; // Time to live in seconds
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function useCache<T>(fetcher: () => Promise<T>, options: CacheOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedFetcher = useCallback(fetcher, []); // Memorizando a função fetcher

  useEffect(() => {
    let isMounted = true; // Flag para evitar atualizações em componente desmontado

    const fetchData = async () => {
      try {
        // Tenta recuperar do cache
        const cachedData = localStorage.getItem(`cache_${options.key}`);
        if (cachedData) {
          const { data: cached, timestamp }: CacheItem<T> =
            JSON.parse(cachedData);
          const now = Date.now();
          const ttl = options.ttl || 3600; // Default 1 hour

          // Se o cache ainda é válido, use-o
          if (now - timestamp < ttl * 1000) {
            if (isMounted) {
              setData(cached);
              setLoading(false);
            }
            return;
          }
        }

        // Se não há cache ou está expirado, busca novos dados
        const result = await memoizedFetcher();

        if (!isMounted) return;

        // Salva no cache
        const cacheItem: CacheItem<T> = {
          data: result,
          timestamp: Date.now(),
        };
        localStorage.setItem(`cache_${options.key}`, JSON.stringify(cacheItem));

        setData(result);
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [options.key, options.ttl, memoizedFetcher]); // Usando a função memorizada

  const invalidateCache = useCallback(() => {
    localStorage.removeItem(`cache_${options.key}`);
    setLoading(true);
  }, [options.key]);

  return { data, loading, error, invalidateCache };
}
