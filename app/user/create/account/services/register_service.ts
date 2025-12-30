"use server";

import { cookies } from "next/headers";
import { formUser } from "../types/form_user";
import { User } from "../types/user";

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

    // Log en el servidor (aparecerá en tu terminal)
    console.log("📡 Response Status:", response.status);
    console.log("📡 Response OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      
      // Estos logs aparecen en la TERMINAL del servidor
      console.log("❌ Error Status:", response.status);
      console.log("❌ Error Text:", errorText);

      let errorMessage = "No se pudo registrar el usuario";
      let errorData = null;

      try {
        errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
        console.log("❌ Error Data:", errorData);
      } catch (parseError) {
        console.log("⚠️ No se pudo parsear JSON:", parseError);
        errorMessage = errorText || errorMessage;
      }

      // Detectar email duplicado
      const isDuplicateEmail = 
        response.status === 409 ||
        (response.status === 500 && (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("duplicate") ||
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("ya existe") ||
          errorMessage.toLowerCase().includes("unique constraint")
        ));

      if (isDuplicateEmail) {
        console.log("🔴 Email duplicado detectado");
        throw new Error("El email ya está registrado. Por favor usa otro email.");
      }

      if (response.status === 401) {
        throw new Error("No autorizado. Por favor inicia sesión nuevamente.");
      }

      if (response.status === 500) {
        throw new Error("Error del servidor. Intenta nuevamente más tarde.");
      }

      if (response.status === 400) {
        throw new Error(errorMessage || "Datos inválidos");
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("✅ Usuario creado exitosamente");
    return result;

  } catch (error) {
    // Log del error completo en el servidor
    console.error("🚨 Error completo:", error);
    throw error;
  }
};