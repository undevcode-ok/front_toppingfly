//llamado a la api de crear de contraseña

import { passwordType } from "../types/password";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userCreatePasswordService = async (
  data: passwordType,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/users/restore-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
        password: data.password,
        confirmationPassword: data.password,
       
      }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Error 401");
      } else {
        throw new Error("Error al iniciar sesión");
      }
    }
    return await response.json();
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    throw error;
  }
};
