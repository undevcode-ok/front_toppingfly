"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Wrapper que maneja errores de autenticación en Server Actions
 * Detecta 401 del backend y redirige automáticamente
 */
export async function withAuth<T>(
  serverAction: () => Promise<T>
): Promise<T> {
  try {
    return await serverAction();
  } catch (error) {
    // Si es un redirect de Next.js, dejarlo pasar
    if (error && typeof error === 'object' && 'digest' in error) {
      throw error;
    }

    // Detectar errores de autenticación
    const isAuthError = 
      error instanceof Error && 
      (error.message.includes("401") ||
       error.message.includes("Invalid or expired token") ||
       error.message.includes("No autenticado") ||
       error.message.includes("No se encontró el token"));

    if (isAuthError) {
      console.error("🔴 Error de autenticación detectado, limpiando sesión...");
      const cookiesStore = await cookies();
      cookiesStore.delete("token");
      cookiesStore.delete("subdomain");
      cookiesStore.delete("roleId");
      redirect("/auth");
    }

    // Re-lanzar otros errores
    throw error;
  }
}

/**
 * Helper para manejar respuestas de fetch y detectar 401
 */
export async function handleAuthResponse(response: Response) {
  if (response.status === 401) {
    console.error("🔴 401 detectado del backend, limpiando sesión...");
    const cookiesStore = await cookies();
    cookiesStore.delete("token");
    cookiesStore.delete("subdomain");
    cookiesStore.delete("roleId");
    redirect("/auth");
  }

  if (!response.ok) {
    // Intentamos extraer el mensaje real del backend (ej: límites del plan Free)
    // en vez de mostrar siempre un genérico "HTTP 403: Forbidden"
    let message = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const body = await response.clone().json();
      if (body?.message) {
        message = body.message;
      }
    } catch {
      // el body no era JSON o venía vacío: nos quedamos con el mensaje genérico
    }
    throw new Error(message);
  }

  return response;
}