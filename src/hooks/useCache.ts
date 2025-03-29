import { useState, useEffect } from "react";

interface CacheOptions {
  key: string;
  ttl?: number; // Time to live em segundos
}

export function useCache<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCacheKey = () => `christianitatis_cache_${options.key}`;
  const getTTL = () => options.ttl || 3600; // 1 hora por padrão

  const getCachedData = () => {
    const cached = localStorage.getItem(getCacheKey());
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();
    const ttl = getTTL() * 1000; // Converter para milissegundos

    if (now - timestamp > ttl) {
      localStorage.removeItem(getCacheKey());
      return null;
    }

    return data;
  };

  const setCachedData = (data: T) => {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(getCacheKey(), JSON.stringify(cacheData));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const cachedData = getCachedData();

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      const freshData = await fetcher();
      setCachedData(freshData);
      setData(freshData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    localStorage.removeItem(getCacheKey());
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [options.key]);

  return { data, loading, error, refresh };
}
