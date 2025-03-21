import { useState, useEffect } from "react";
import { storage } from "../lib/utils/localStorage";

// Hook personalizado para persistir dados no localStorage
// Mantém os dados sincronizados entre o estado do React e o localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key) ?? initialValue;
  });

  useEffect(() => {
    storage.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
