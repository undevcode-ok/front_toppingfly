// Handler para actualizar información del menú
import { editMenu } from "../types/edit_menu";
import { toast } from "sonner";
import { updateMenuService } from "../services/update_menu_service";

export const handleEditMenuSubmit = async (formData: editMenu, router: any) => {
  try {
    await updateMenuService(formData, formData.id);
    toast.success("Tu menú se actualizó correctamente. ¡Ya puedes continuar con tus cambios!");

    router.push("/home");
  } catch (error) {
    console.error("❌ Error al actualizar menú:", error);
    if (error instanceof Error) {
      toast.error("No pudimos actualizar el menú en este momento. Intenta nuevamente más tarde.");
    }
  }
};
