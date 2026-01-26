'use server';

import { cookies } from "next/headers";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface EditCategoryData {
  title?: string;
  newPosition?: number;
}

export async function editCategory(data: EditCategoryData, id: string | number) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No autenticado");
  }

  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || "",
    },
    body: JSON.stringify(data),
  });

  await handleAuthResponse(response);

  const contentType = response.headers.get("content-type");
  
  if (response.status !== 204 && contentType?.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  return null;
}