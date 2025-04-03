import { useState, useCallback, useEffect } from "react";

/**
 * Hook para gerenciar estado no localStorage
 * @param key Chave para armazenamento
 * @param initialValue Valor inicial
 * @returns [value, setValue] Tupla com valor e função para atualizar
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Função para pegar o valor inicial
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Função para atualizar o valor
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key "${key}" even though environment is not a client`
        );
      }

      try {
        // Permite value ser uma função
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Salva no localStorage
        window.localStorage.setItem(key, JSON.stringify(newValue));

        // Salva no state
        setStoredValue(newValue);

        // Dispara evento para outros tabs/windows
        window.dispatchEvent(new Event("local-storage"));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  // Sincroniza com outros tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue];
}
