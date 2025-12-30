"use server";

import { editMenu } from "../types/edit_menu"; // ✅ Usa el mismo tipo que el handler
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateMenuService = async (data: editMenu, id: number | string) => {
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
    const formData = new FormData();
    
    // Campos de texto
    formData.append("title", data.title);
    formData.append("pos", data.pos);
    
    // Colores
    formData.append("colorPrimary", data.color.primary);
    formData.append("colorSecondary", data.color.secondary);
    
    // Logo: solo agregar si es un archivo nuevo (File)
    if (data.logo instanceof File) {
      formData.append("logo", data.logo, data.logo.name);
    } else if (typeof data.logo === 'string') {
      // Si es string (URL existente), enviar la URL
      formData.append("logoUrl", data.logo);
    }
    
    // Background: solo agregar si es un archivo nuevo (File)
    if (data.backgroundImage instanceof File) {
      formData.append("backgroundImage", data.backgroundImage, data.backgroundImage.name);
    } else if (typeof data.backgroundImage === 'string') {
      // Si es string (URL existente), enviar la URL
      formData.append("backgroundImageUrl", data.backgroundImage);
    }

    const response = await fetch(`${BASE_URL}/menus/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant,
        // NO incluir Content-Type, FormData lo añade automáticamente
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    const menu = await response.json();
    return menu;
  } catch (error) {
    console.error("❌ Error en updateMenuService:", error);
    throw error;
  }
};