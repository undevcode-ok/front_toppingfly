import { toast } from "sonner";
import { deleteItemService } from "../services/delete_item_service";

interface DeleteItemParams {
  itemId: number;
  onSuccess?: () => void;
}

export const deleteItemSubmit = async ({
  itemId,
  onSuccess,
}: DeleteItemParams) => {
  try {
    await deleteItemService(itemId);

    toast.success(
      "El plato fue eliminado correctamente. Puedes continuar gestionando tu menú."
    );

    if (onSuccess) {
      await onSuccess();
    }
  } catch (error) {
    toast.error(
      "Hubo un problema al eliminar el plato. Por favor, intenta de nuevo."
    );
    throw error;
  }
};
