import { editItemService } from "../services/edit_item_service";
import { uploadItemImage, replaceItemImage, patchImageQuotaFromErrorDetails } from "../services/image_service";
import { ApiError } from "@/lib/actions/api-error";
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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    let price: number | null = null;
    if (priceStr) {
      const parsedPrice = parseFloat(priceStr);
      price = parsedPrice > 0 ? parsedPrice : null;
    }

    const updateData: Partial<NewItem> = {
      title,
      description,
      price,
      active: true,
    };
    const result = await editItemService(itemId, updateData);

    const hasValidImage =
      imageFile && imageFile instanceof File && imageFile.size > 0;

    let imageError: string | undefined;

    if (hasValidImage) {
      try {
        // Si ya había una imagen, es un reemplazo (campo "replacement").
        // Si no había ninguna, es una subida nueva (campo "image").
        if (existingImageId) {
          await replaceItemImage(itemId, existingImageId, imageFile);
        } else {
          await uploadItemImage(itemId, imageFile);
        }
      } catch (uploadErr) {
        console.error("⚠️ Error al subir/reemplazar imagen:", uploadErr);

        if (uploadErr instanceof ApiError) {
          if (uploadErr.code === "FREE_PLAN_IMAGE_UPLOAD_LIMIT") {
            await patchImageQuotaFromErrorDetails(uploadErr.details);
          }
          imageError = uploadErr.message;
        } else if (uploadErr instanceof Error) {
          imageError = uploadErr.message;
        } else {
          imageError = "No pudimos actualizar la imagen del plato.";
        }
      }
    }

    if (onSuccess) {
      await onSuccess();
    }

    return { item: result, imageError };
  } catch (error) {
    console.error("❌ [editItemSubmit] Error crítico:", error);
    throw error;
  }
};