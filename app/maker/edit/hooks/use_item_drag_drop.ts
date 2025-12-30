import { useState, useEffect } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Item } from "../types/items";
import { calculateNewPosition } from "../utils/positioning";
import { editItemService } from "../services/edit_item_service";
import { toast } from "sonner";

export const useItemDragDrop = (
  initialItems: Item[],
  onItemChange: () => Promise<void>
) => {
  const [localItems, setLocalItems] = useState<Item[]>(initialItems);

  useEffect(() => {
    setLocalItems(initialItems);
  }, [initialItems]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localItems.findIndex((item) => item.id === active.id);
      const newIndex = localItems.findIndex((item) => item.id === over.id);

      // Actualización optimista
      const newItems = arrayMove(localItems, oldIndex, newIndex);
      setLocalItems(newItems);

      const movedItem = localItems[oldIndex];
      const newPosition = calculateNewPosition(localItems, oldIndex, newIndex);

      try {
        await editItemService(movedItem.id, { newPosition });
        await onItemChange();
        toast.success("El orden del item seleccionada se actualizó correctamente. ¡Todo listo!");
      } catch (error) {
        console.error("Error al actualizar posición del item:", error);
        toast.error("Hubo un problema al actualizar el orden. Por favor, intenta nuevamente.");
        setLocalItems(localItems); // Revertir
      }
    }
  };

  return { localItems, handleDragEnd };
};