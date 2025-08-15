// ================================================================
// CLASS NAMES UTILITY - Utilitário para concatenar classes CSS
// ================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para combinar classes CSS de forma inteligente
 * Usa clsx para concatenar condicionalmente e tailwind-merge para resolver conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
