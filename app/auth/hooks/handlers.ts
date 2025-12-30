// controladores del login

import { authService } from "../services/auth_service";
import { formState } from "../types/form_state";
import { toast } from "sonner";

// visualizacion de la contraseña (ojo)
export const handleTogglePassword = (
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowPassword((eye) => !eye); // Alterna el valor de showPassword
};

//peticion de logeo
export const handleLoginSubmit = async (
  formData: formState,
  router: any
) => {
  try {
    await authService(formData);
    //console.log ("login exitoso")
    router.push("/home");
    //redirigir a otra pagina
  } catch (error) {
    console.error("Error en la autenticación:", error);
    
    if (error instanceof Error) {
      toast.error("Parece que el email o la contraseña no coinciden. Si olvidaste tu contraseña, puedes restablecerla.");
    } 
    
  }
};