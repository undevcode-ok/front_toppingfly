import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Todos los mensajes de error del backend relacionados a límites del plan Free
// (FREE_PLAN_MENU_LIMIT, FREE_PLAN_ITEM_LIMIT, FREE_PLAN_IMAGES_DISABLED) incluyen
// la frase "plan Free" en su texto. Lo usamos para decidir si mostrar el link
// de "Actualizá tu plan" junto al mensaje de error.
export function isFreePlanLimitMessage(message?: string | null): boolean {
  if (!message) return false;
  return message.toLowerCase().includes("plan free");
}