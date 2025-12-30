"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateItemData {
  title?: string;
  description?: string;
  price?: number | null;  // ← AGREGAR | null AQUÍ
  active?: boolean;
  newPosition?: number;
}

export async function editItemService(itemId: number, data: UpdateItemData) {
  console.log("🌐 [editItemService] Iniciando...");
  console.log("  BASE_URL:", BASE_URL);
  console.log("  itemId:", itemId);
  console.log("  data:", data);

  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("token")?.value;
  const tenant = cookiesStore.get("subdomain")?.value;

  if (!authToken) {
    console.error("❌ [editItemService] No hay token de autenticación");
    throw new Error("No autenticado");
  }

  const endpoint = `${BASE_URL}/items/${itemId}`;
  console.log("🎯 [editItemService] Endpoint:", endpoint);

  try {
    console.log("🚀 [editItemService] Enviando petición PUT...");
    console.log("📦 [editItemService] Body:", JSON.stringify(data));

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant || "",
      },
      body: JSON.stringify(data),
    });

    console.log("📥 [editItemService] Respuesta recibida:");
    console.log("  Status:", response.status);
    console.log("  StatusText:", response.statusText);
    console.log("  OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ [editItemService] Error del servidor:");
      console.error("  Status:", response.status);
      console.error("  Respuesta:", errorText);
      throw new Error(`Error al editar item: ${response.status} - ${errorText}`);
    }

    // Manejar respuesta vacía o JSON
    const contentType = response.headers.get("content-type");
    let result = null;

    if (response.status !== 204 && contentType?.includes("application/json")) {
      result = await response.json();
      console.log("✅ [editItemService] Item editado exitosamente:");
      console.log("  Resultado:", result);
    } else {
      console.log("✅ [editItemService] Item editado exitosamente (sin respuesta)");
    }

    console.log("🔄 [editItemService] Revalidando ruta /home");
    revalidatePath("/home");

    console.log("✅ [editItemService] Proceso completado");
    return result;
  } catch (error) {
    console.error("❌ [editItemService] Error en fetch:");
    console.error("  Error:", error);
    console.error("  Mensaje:", error instanceof Error ? error.message : "Error desconocido");
    throw error;
  }
}