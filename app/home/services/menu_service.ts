//llamado a la api de crear cuenta
"use server";

import { cookies } from "next/headers";
import { Menu } from "../types/menu";


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
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = "No se pudieron obtener los menús";

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch {
      // Si no es JSON, usar el texto directamente o el mensaje por defecto
    }

    if (response.status === 500) {
      throw new Error("Error del servidor. Intenta nuevamente");
    } else if (response.status === 401) {
      throw new Error("No autorizado");
    } else {
      throw new Error(errorMessage);
    }
  }
  return await response.json();
};
