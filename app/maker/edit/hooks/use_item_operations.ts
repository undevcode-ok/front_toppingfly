import { useState } from "react";
import { deleteItemSubmit } from "./delete_item_submit";
import { createItemSubmit } from "./create_item_submit";
import { editItemSubmit } from "./edit_item_submit";
import { Items } from "@/app/home/types/menu";

interface UseItemOperationsProps {
  onItemChange: () => Promise<void>;
}

export const useItemOperations = ({ onItemChange }: UseItemOperationsProps) => {
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [creatingItem, setCreatingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // ========== ELIMINAR ITEM ==========
  const deleteItem = async (itemId: number) => {
    setDeletingItemId(itemId);
    try {
      await deleteItemSubmit({
        itemId,
        onSuccess: onItemChange,
      });
    } catch (error) {
      console.error("❌ [useItemOperations] Error al eliminar item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  // ========== CREAR ITEM ==========
  const createItem = async (formData: FormData, categoryId: number) => {
    setCreatingItem(true);
    try {
      await createItemSubmit({
        formData,
        categoryId,
        onSuccess: onItemChange,
      });
      // ✅ Retornamos éxito para el ItemDialog
      return { success: true, message: "¡Todo listo! El plato fue creado exitosamente. Puedes seguir editando tu menú." };
    } catch (error) {
      console.error("❌ [useItemOperations] Error al crear item:", error);
      // ✅ Retornamos el error formateado
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Lo sentimos, no se pudo crear el plato. Intenta de nuevo más tarde." 
      };
    } finally {
      setCreatingItem(false);
    }
  };

  // ========== EDITAR ITEM ==========
  const editItem = async (item: Items, formData: FormData) => {
    const existingImageId = item.images?.[0]?.id;
    setEditingItemId(item.id);

    try {
      await editItemSubmit({
        itemId: item.id,
        formData,
        existingImageId,
        onSuccess: onItemChange,
      });
      // ✅ Retornamos éxito para el ItemDialog
      return { success: true, message: "¡Plato editado exitosamente! Ya puedes continuar ajustando tu menú." };
    } catch (error) {
      console.error("❌ [useItemOperations] Error al editar item:", error);
      // ✅ Retornamos el error formateado
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "No pudimos actualizar el plato en este momento. Por favor, intenta nuevamente." 
      };
    } finally {
      setEditingItemId(null);
    }
  };

  return {
    deleteItem,
    deletingItemId,
    isDeleting: deletingItemId !== null,
    createItem,
    creatingItem,
    editItem,
    editingItemId,
    isEditing: editingItemId !== null,
  };
};