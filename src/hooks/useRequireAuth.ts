import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useRequireAuth(onUnauthenticated?: () => void) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      onUnauthenticated?.();
    }
  }, [user, loading, onUnauthenticated]);

  return { user, loading };
}
