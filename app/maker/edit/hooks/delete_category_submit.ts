import { toast } from "sonner";
import { deleteCategoryService } from "../services/delete_category_service";

interface DeleteCategoryParams {
  categoryId: number;
  onSuccess?: () => void;
}

export const deleteCategorySubmit = async ({
  categoryId,
  onSuccess,
}: DeleteCategoryParams) => {
  try {
    await deleteCategoryService(categoryId);
    
    toast.success("Categoría eliminada exitosamente");
    
    // Llamar al callback para refrescar solo el componente
    if (onSuccess) {
      await onSuccess();
    }
    
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    toast.error("No se pudo eliminar la categoría");
  }
};