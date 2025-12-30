import { newCategory } from "../types/new_category";
import { toast } from "sonner";
import { createCategory } from "../services/create_category_service";

export const newCategorySubmit = async (
  formData: newCategory,
  menuId: number,
  onSuccess?: () => void
) => {
  try {
    await createCategory(formData, menuId);
    
    toast.success("¡Categoría creada con éxito! Ahora puedes agregar platos o editarla.");
    
    // Cerrar el dialog si la función está disponible
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    toast.error("Hubo un problema al crear la categoría. Por favor, intenta de nuevo.");
  }
};