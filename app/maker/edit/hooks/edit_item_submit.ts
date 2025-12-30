import { toast } from "sonner";
import { editItemService } from "../services/edit_item_service";
import { updateImage } from "../services/image_service";
import { NewItem } from "../types/items";

interface EditItemParams {
  itemId: number;
  formData: FormData;
  existingImageId?: number;
  onSuccess?: () => void;
}

export const editItemSubmit = async ({
  itemId,
  formData,
  existingImageId,
  onSuccess,
}: EditItemParams) => {
  try {
    // 1. Extraer datos del FormData original
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    // ✅ Convertir precio: si es 0 o vacío → null, sino → número
    let price: number | null = null;
    if (priceStr) {
      const parsedPrice = parseFloat(priceStr);
      price = parsedPrice > 0 ? parsedPrice : null; // ✅ Si es 0 → null
    }

    // 2. Actualizar datos básicos del item
    const updateData: Partial<NewItem> = {
      title,
      description,
      price,
      active: true,
    };
    const result = await editItemService(itemId, updateData);

    // 3. Manejar actualización de imagen si existe un archivo nuevo
    const hasValidImage =
      imageFile && imageFile instanceof File && imageFile.size > 0;

    if (hasValidImage) {
      // Creamos el FormData específico para el servicio de imágenes
      const imageFormData = new FormData();

      /** * Formato requerido por el backend:
       * - 'images': Un string JSON con el mapeo del campo.
       * - [fileField]: El archivo real.
       */
      const metadata = JSON.stringify([
        { id: existingImageId, fileField: "image" },
      ]);
      imageFormData.append("images", metadata);
      imageFormData.append("image", imageFile, imageFile.name);

      try {
        // Corregido: Usamos itemId que viene por parámetros
        await updateImage(itemId, imageFormData);
      } catch (imageError: any) {
        // No lanzamos error aquí para permitir que el flujo continúe si el texto sí se guardó
      }
    }

    if (onSuccess) {
      await onSuccess();
    }

    return result;
  } catch (error: any) {
    console.error("❌ [editItemSubmit] Error crítico:", error);

    throw error;
  }
};
