import { createItemService } from "../services/create_item_service";
import { uploadItemImage, patchImageQuotaFromErrorDetails } from "../services/image_service";
import { ApiError } from "@/lib/actions/api-error";
import { NewItem } from "../types/items";

interface CreateItemParams {
  formData: FormData;
  categoryId: number;
  onSuccess?: () => void;
}

/**
 * Crea un item y, si hay imagen, la sube después.
 */
export const createItemSubmit = async ({
  formData,
  categoryId,
  onSuccess,
}: CreateItemParams) => {
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

    const newItem: NewItem = {
      categoryId,
      title,
      description,
      price,
      active: true,
    };

    const createdItem = await createItemService(newItem);

    const hasValidImage =
      imageFile && imageFile instanceof File && imageFile.size > 0;

    let imageError: string | undefined;

    if (hasValidImage) {
      try {
        const uploadResult = await uploadItemImage(createdItem.id, imageFile);
        if (Array.isArray(uploadResult.images)) {
          createdItem.images = uploadResult.images;
        }
      } catch (uploadErr) {
        console.error("⚠️ Error al subir imagen:", uploadErr);

        if (uploadErr instanceof ApiError) {
          if (uploadErr.code === "FREE_PLAN_IMAGE_UPLOAD_LIMIT") {
            await patchImageQuotaFromErrorDetails(uploadErr.details);
          }
          imageError = uploadErr.message;
        } else if (uploadErr instanceof Error) {
          imageError = uploadErr.message;
        } else {
          imageError = "No pudimos subir la imagen del plato.";
        }
      }
    }

    if (onSuccess) {
      await onSuccess();
    }

    return { item: createdItem, imageError };
  } catch (error) {
    console.error("❌ Error en la creación del item:", error);
    throw error;
  }
};