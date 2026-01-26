"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { handleAuthResponse } from "@/lib/actions/with-auth";

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

  await handleAuthResponse(response);

  revalidatePath("/home");
  return null;
}