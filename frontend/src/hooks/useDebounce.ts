// ================================================================
// DEBOUNCE HOOK - Hook para debounce de valores (útil para busca)
// ================================================================

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // Estado para armazenar o valor com debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Atualizar o valor com debounce após o delay especificado
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancelar o timeout se value mudar (cleanup do useEffect)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
