//llamado a la api de recuperacion de contraseña

import { emailType } from "../types/email";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const userService = async (data: emailType): Promise <{ message: string }> => {
    try {
        const response = await fetch(`${BASE_URL}/users/forgot-password`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
            }),
        });
        if(!response.ok){
          if(response.status === 401){
            throw new Error("Se ha enviando el enlace de recuperacion a su email");
          }
          else {
            throw new Error("Error al iniciar sesión");
          }  
        }
        return await response.json();
      } catch (error) {
        console.error("Error al autenticar usuario:", error);
        throw error;
      }
}