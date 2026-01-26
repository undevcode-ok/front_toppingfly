"use server";

import { cookies } from "next/headers";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getMenuQr(menuId: number): Promise<Blob> {
  const cookiesStore = await cookies();
  //const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  //const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  const response = await fetch(`${BASE_URL}/menus/${menuId}/qr`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant || '',
    },
  });

  await handleAuthResponse(response);

  return await response.blob();
}