'use server';

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function deleteCategoryService(id: string | number) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al borrar menu: ${response.status}`);
  }

  // Manejar respuestas vacías (204 No Content o body vacío)
  const contentType = response.headers.get("content-type");
  
  if (response.status !== 204 && contentType?.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  return null;
}