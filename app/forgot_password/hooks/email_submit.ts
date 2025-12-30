// controladores del envio de email
import { emailType } from "../types/email";
import { toast } from "sonner";
import { userService } from "../services/user_service";




//peticion de recuperar contraseña
export const handleEmailSubmit = async (
  formData: emailType,
  router: any
) => {
  try {
    await userService(formData);
    // sucess: info
    toast.success("Te hemos enviado un enlace para recuperar tu contraseña. Revisa tu correo.")
    //redirigir a login
    router.push("/auth");
  } catch (error) {
    console.error("Error en la autenticación:", error);
    if (error instanceof Error) {
      //objetivo mas seguridad
      //error: info
      toast.success("Te hemos enviado un enlace para recuperar tu contraseña. Revisa tu correo.");
      //redirigir a login
      router.push("/auth");
    } 
  }
};