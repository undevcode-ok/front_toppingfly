// controlador del boton de enviar datos
import { formUser } from "../types/form_user";
import { registerUserAction } from "../services/register_service";
import { toast } from "sonner";

//peticion de crear usuario
export const handleCreateSubmit = async (formData: formUser, router: any) => {
  try {
    await registerUserAction(formData);
    //redirigir a home
    toast.success("Usuario creado con exito");
    router.push("/home");
  } catch (error) {
    console.error("Error en la creación del usuario:", error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Error inesperado");
    }
  }
};
