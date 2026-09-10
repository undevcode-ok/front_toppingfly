// llamado a la api de registro free (no requiere JWT ni subdominio)

import { registerFreeForm, registerFreeResponse, registerFreeValidationError } from "../types/register_free";
import { handleLoginResponse } from "../../services/storage_service";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const registerFreeService = async (
  data: registerFreeForm
): Promise<registerFreeResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register-free`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      cel: data.cel,
      password: data.password,
      confirmationPassword: data.confirmationPassword,
    }),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const errorData: registerFreeValidationError = await response.json();
      const firstFieldError = errorData.errors?.[0]?.message;
      throw new Error(firstFieldError || errorData.message || "Datos inválidos");
    }

    if (response.status === 409) {
      throw new Error("Ese email ya está registrado. Probá iniciar sesión.");
    }

    throw new Error("No pudimos crear tu cuenta. Intentá nuevamente en unos minutos.");
  }

  const responseData: registerFreeResponse = await response.json();

  await handleLoginResponse(responseData);

  return responseData;
};