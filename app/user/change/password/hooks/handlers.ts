// controladores del envio de contraseñas
import { passwordType } from "../types/password";
import { toast } from "sonner";
import { userChangePasswordService } from "../services/change_service";


// visualizacion de la contraseña (ojo)
export const handleTogglePassword = (
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowPassword((eye) => !eye); // Alterna el valor de showPassword
};

//peticion de recuperar contraseña
export const handlePasswordSubmit = async (
  formData: passwordType,
  router: any,
  token: string,
) => {
  try {
    console.log(token)
    await userChangePasswordService(formData, token);

    // sucess: info
    toast.success("¡Listo! Tu contraseña se actualizó correctamente.")
    //redirigir a login
    router.push("/auth");
  } catch (error) {
    console.error("Error en la autenticación:", error);
    if (error instanceof Error) {
      //objetivo mas seguridad
      //error: info
      toast.error("Hubo un problema al actualizar tu contraseña. Intenta nuevamente.");
      //redirigir a login
      //router.push("/auth");
    } 
  }
};