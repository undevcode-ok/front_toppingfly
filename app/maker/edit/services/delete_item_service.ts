"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function deleteItemService(itemId: number) {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("token")?.value;
  const tenant = cookiesStore.get("subdomain")?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar item: ${response.status}`);
  }

  revalidatePath("/home");
  return null;
}