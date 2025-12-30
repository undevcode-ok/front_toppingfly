import { toast } from "sonner";
import { editCategory } from "../services/edit_category_service";

interface EditCategoryParams {
  categoryId: number;
  title: string;
  onSuccess?: () => void;
}

export const editCategorySubmit = async ({
  categoryId,
  title,
  onSuccess,
}: EditCategoryParams) => {
  try {
    await editCategory({ title }, categoryId);
    toast.success("¡Categoría editada con éxito! Ahora puedes seguir ajustando los detalles.");
    
    // Llamar al callback para refrescar solo el componente
    if (onSuccess) {
      await onSuccess();
    }
    
  } catch (error) {
   
    toast.error("No pudimos editar la categoría en este momento. Intenta nuevamente.");
  }
};