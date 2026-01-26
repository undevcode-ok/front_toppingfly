"use server";

import { cookies } from "next/headers";
import { formUser } from "../types/form_user";
import { User } from "../types/user";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerUserAction = async (data: formUser): Promise<User> => {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const authToken = tokenCookie?.value;

  if (!authToken) {
    throw new Error("No se encontró el token de autenticación");
  }

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.last_name,
        email: data.email,
        cel: data.cel,
        roleId: data.role_id,
      }),
    });

    

    await handleAuthResponse(response);

    // Detectar email duplicado
    if (response.status === 409) {
      throw new Error("El email ya está registrado. Por favor usa otro email.");
    }

    if (response.status === 500) {
      const errorText = await response.text();
      const isDuplicateEmail = 
        errorText.toLowerCase().includes("email") ||
        errorText.toLowerCase().includes("duplicate") ||
        errorText.toLowerCase().includes("already exists") ||
        errorText.toLowerCase().includes("ya existe") ||
        errorText.toLowerCase().includes("unique constraint");

      if (isDuplicateEmail) {
        throw new Error("El email ya está registrado. Por favor usa otro email.");
      }
      throw new Error("Error del servidor. Intenta nuevamente más tarde.");
    }

    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Datos inválidos");
    }

    const result = await response.json();
    return result;

  } catch (error) {
    // Log del error completo en el servidor
    console.error("🚨 Error completo:", error);
    throw error;
  }
};