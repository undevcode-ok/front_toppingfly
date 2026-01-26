//llamado a la api de crear cuenta
"use server";

import { cookies } from "next/headers";
import { Menu } from "../types/menu";
import { handleAuthResponse } from "@/lib/actions/with-auth";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllMenus = async (): Promise<Menu[]> => {
    
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;

  if (!authToken) {
    throw new Error("No se encontró el token de autenticación");
  }
  if (!tenant) {
    throw new Error("No se encontró el tenant");
  }

  const response = await fetch(`${BASE_URL}/menus`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant,
    },
  });
  
  await handleAuthResponse(response);

  return await response.json();
};
