import { createItemService } from "../services/create_item_service";
import { updateImage } from "../services/image_service";
import { NewItem } from "../types/items";
import { toast } from "sonner";

interface CreateItemParams {
  formData: FormData;
  categoryId: number;
  onSuccess?: () => void;
}

/**
 * Crea un item y luego sube su imagen usando la Server Action.
 */
export const createItemSubmit = async ({
  formData,
  categoryId,
  onSuccess,
}: CreateItemParams) => {
  try {
    // 1. Extraer datos básicos del formulario
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priceStr = formData.get("price") as string | null;
    const imageFile = formData.get("image") as File | null;

    
    let price: number | null = null;
    if (priceStr) {
      const parsedPrice = parseFloat(priceStr);
      price = parsedPrice > 0 ? parsedPrice : null; // ✅ Si es 0 → null
    }

    // 2. Crear el objeto para el servicio de creación de texto
    const newItem: NewItem = {
      categoryId,
      title,
      description,
      price,
      active: true,
    };

    
    const createdItem = await createItemService(newItem);

    // 3. Si hay una imagen válida, procedemos a subirla
    const hasValidImage =
      imageFile && imageFile instanceof File && imageFile.size > 0;

    if (hasValidImage) {

      // Creamos un FormData específico para la subida de imagen
      const imageFormData = new FormData();

      // Formato requerido: metadato en 'images' y archivo en el campo definido en 'fileField'
      const metadata = JSON.stringify([{ fileField: "image" }]);
      imageFormData.append("images", metadata);
      imageFormData.append("image", imageFile, imageFile.name);

      try {
        // Llamamos a la Server Action pasándole el FormData con el binario
        const uploadedImage = await updateImage(createdItem.id, imageFormData);

        // Adjuntamos la respuesta de la imagen al objeto final (opcional)
        createdItem.images = [uploadedImage];
      } catch (imageError: any) {
        console.error("⚠️ Error al subir imagen:", imageError);
        
      }
    }

    // 4. Ejecutar callback de éxito
    if (onSuccess) {
      await onSuccess();
    }

    return createdItem;
  } catch (error: any) {
    console.error("❌ Error en la creación del item:", error);
    throw error; // Re-lanzamos para que useItemOperations lo capture
  }
};
