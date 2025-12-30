// controladores del envio de email
import { newMenu } from "../types/new_menu";
import { toast } from "sonner";
import { createMenuService } from "../services/new_menu_service";




//peticion de recuperar contraseña
export const handleNewMenuSubmit = async (
  formData: newMenu,
  router: any
) => {
  try {
    await createMenuService(formData);
    // sucess
    toast.success("¡Menú creado con éxito! Ahora puedes comenzar a agregar más detalles.")
    //redirigir a home
    router.push("/home");
  } catch (error) {
    console.error("Error al crear Menu:", error);
    if (error instanceof Error) {
      //error: info
      toast.error("Lo sentimos, hubo un error al crear el menú. Por favor, intenta de nuevo.");
    } 
  }
};