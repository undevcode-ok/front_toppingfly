"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateItemData {
  title?: string;
  description?: string;
  price?: number | null;  // ← AGREGAR | null AQUÍ
  active?: boolean;
  newPosition?: number;
}

export async function editItemService(itemId: number, data: UpdateItemData) {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("token")?.value;
  const tenant = cookiesStore.get("subdomain")?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const endpoint = `${BASE_URL}/items/${itemId}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant || "",
      },
      body: JSON.stringify(data),
    });

    await handleAuthResponse(response);

    // Manejar respuesta vacía o JSON
    const contentType = response.headers.get("content-type");
    let result = null;

    if (response.status !== 204 && contentType?.includes("application/json")) {
      result = await response.json();
    } 
    revalidatePath("/home");
    return result;
  } catch (error) {
    console.error("❌ [editItemService] Error en fetch:");
    console.error("  Error:", error);
    console.error("  Mensaje:", error instanceof Error ? error.message : "Error desconocido");
    throw error;
  }
}