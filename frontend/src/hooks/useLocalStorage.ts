// ================================================================
// LOCAL STORAGE HOOK - Hook para persistir dados no localStorage
// ================================================================

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Buscar do localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored json ou retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se der erro, retorna initialValue
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para setar o valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função para atualizações baseadas no valor anterior
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Salva no estado
      setStoredValue(valueToStore);
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar no localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
