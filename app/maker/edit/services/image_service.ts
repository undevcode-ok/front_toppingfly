"use server";

import { cookies } from "next/headers";
import { ImageItems } from "../types/items";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateImage(
  itemId: number, 
  formData: FormData
): Promise<ImageItems> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("token")?.value;
  const tenant = cookieStore.get("subdomain")?.value;

  if (!authToken || !tenant) {
    throw new Error("No se encontraron credenciales de sesión.");
  }

  try {
    const response = await fetch(`${BASE_URL}/images/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant,
        // El navegador establecerá el Content-Type multipart/form-data automáticamente
      },
      body: formData,
    });

    // Si la respuesta no es JSON o está vacía, esto fallará con un mensaje claro
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("El servidor no devolvió un JSON válido.");
    }

    return await response.json();
  } catch (error: any) {
    console.error("❌ [updateImage Server Error]:", error.message);
    throw new Error(error.message || "Error inesperado al subir la imagen");
  }
}