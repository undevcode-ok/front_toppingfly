//llamado a la api de logeo

import { authResponse } from "../types/auth_response";
import { formState } from "../types/form_state";
import { handleLoginResponse } from "./storage_service";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authService = async (data: formState): Promise<authResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
    });
    if(!response.ok){
      if(response.status === 401){
        throw new Error("Email o contraseña incorrectos");
      }
      else {
        throw new Error("Error al iniciar sesión");
      }  
    }
    const responseData = await response.json();
    await handleLoginResponse(responseData);
    return responseData
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    throw error;
  }
};
