import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Categories } from "@/app/home/types/menu";
import { calculateNewPosition } from "../utils/positioning";
import { toast } from "sonner";
import { editCategory } from "../services/edit_category_service";

export const useCategoryDragDrop = (
  categories: Categories[],
  setCategories: (categories: Categories[]) => void,
  onCategoryChange: () => Promise<void>
) => {
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      // Actualización optimista de UI
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      const movedCategory = categories[oldIndex];
      const newPosition = calculateNewPosition(categories, oldIndex, newIndex);

      try {
        await editCategory({ newPosition }, movedCategory.id);
        await onCategoryChange();
        toast.success("El orden de la categoría seleccionada se actualizó correctamente. ¡Todo listo!");
      } catch (error) {
        console.error("Error al actualizar el orden de categoría", error);
        setCategories(categories); // Revertir
        toast.error("Hubo un problema al actualizar el orden. Por favor, intenta nuevamente.");
      }
    }
  };

  return { handleDragEnd };
};