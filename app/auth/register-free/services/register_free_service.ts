// llamado a la api de registro free (no requiere JWT ni subdominio)

import { registerFreeForm, registerFreeResponse, registerFreeValidationError } from "../types/register_free";
import { handleLoginResponse } from "../../services/storage_service";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 🚧 MODO PRUEBA: mientras es true, no se llama al backend real.
// Solo loguea en consola lo que se enviaría y simula una respuesta exitosa.
// Cuando quieran conectar el backend de verdad, cambiar a false (o borrar este bloque).
const MOCK_MODE = true;

const mockRegisterFreeService = async (
  data: registerFreeForm
): Promise<registerFreeResponse> => {
  console.log("🧪 [MOCK] Registro free - datos que se enviarían al backend:", {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    cel: data.cel || undefined,
    password: data.password,
    confirmationPassword: data.confirmationPassword,
  });

  // simula latencia de red
  await new Promise((resolve) => setTimeout(resolve, 600));

  const mockResponse: registerFreeResponse = {
    message: "Cuenta Free creada correctamente (mock)",
    token: "mock-jwt-token",
    user: {
      id: 999,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      cel: data.cel || "",
      roleId: 4,
      active: true,
      subdomain: data.name.toLowerCase().replace(/\s+/g, "-"),
    },
    account: {
      plan: "free",
      limits: {
        menus: 1,
        itemsPerMenu: 10,
        images: false,
      },
    },
  };

  console.log("🧪 [MOCK] Usuario creado:", mockResponse);

  // guardamos igual el token/subdomain/roleId "mock" en cookies
  // para poder probar la redirección a /home sin backend real
  await handleLoginResponse(mockResponse);

  return mockResponse;
};

export const registerFreeService = async (
  data: registerFreeForm
): Promise<registerFreeResponse> => {
  if (MOCK_MODE) {
    return mockRegisterFreeService(data);
  }

  const response = await fetch(`${BASE_URL}/auth/register-free`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      cel: data.cel || undefined,
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

  // Reutilizamos el mismo storage que el login: guarda token, subdomain y roleId en cookies
  await handleLoginResponse(responseData);

  return responseData;
};