"use server";

import { newMenu } from "../types/new_menu";
import { cookies } from "next/headers";
import { handleAuthResponse } from "@/lib/actions/with-auth";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//llamado a la api de crear cuenta
export const createMenuService = async (data: newMenu) => {
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
  try {
    // Preparar FormData
    const formData = new FormData();
    
    // Campos de texto
    formData.append("title", data.title);
    formData.append("pos", data.pos);
    
    // Colores (enviar como strings separados o como JSON según backend)
    // Opción 1: Strings separados
    formData.append("colorPrimary", data.color.primary);
    formData.append("colorSecondary", data.color.secondary);
    
    // Opción 2: Si el backend espera un objeto JSON de color
    // formData.append("color", JSON.stringify(data.color));
    
    // Archivos (solo si existen)
    if (data.logo) {
      formData.append("logo", data.logo, data.logo.name);
    }
    
    if (data.backgroundImage) {
      formData.append("backgroundImage", data.backgroundImage, data.backgroundImage.name);
    }

    // Realizar la petición
    const response = await fetch(`${BASE_URL}/menus`, {
      method: "POST",
      headers: {  // ⬅️ AQUÍ van los headers
        "Authorization": `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant,
        // NO incluir Content-Type, FormData lo añade automáticamente
      },
      body: formData,
    });

    await handleAuthResponse(response);

    // Retornar el menú creado
    const menu = await response.json();
    return menu;
  } catch (error) {
    console.error("Error en createMenuService:", error);
    throw error;
  }
};