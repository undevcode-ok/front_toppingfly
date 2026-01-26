"use server";

import { cookies } from "next/headers";
import { NewItem } from "../types/items";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createItemService(data: NewItem) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: JSON.stringify({
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
      active: data.active,
    }),
  });

  await handleAuthResponse(response);

  // Manejar respuestas vacías (204 No Content o body vacío)
  const contentType = response.headers.get("content-type");

  if (response.status !== 204 && contentType?.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  return null;
}
