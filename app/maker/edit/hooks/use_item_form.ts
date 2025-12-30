"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidations, ItemFormData } from "../utils/validate_item_form";
import { useState } from "react";
import { Items } from "@/app/home/types/menu";
import { toast } from "sonner";

interface UseItemFormProps {
  item?: Items;
  categoryId: number;
  onSubmit: (
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: string;
    imageError?: boolean;
    message?: string;
  }>;
  onSuccess?: () => void;
}

export const useItemForm = ({
  item,
  categoryId,
  onSubmit,
  onSuccess,
}: UseItemFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    item?.images?.[0]?.url || null
  );

  const isEditMode = !!item;

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemValidations),
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      price: item?.price ?? 0,
      image: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    setError,
  } = form;

  const imageFile = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("image", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", undefined);
    setImagePreview(null);
  };

  const handleFormSubmit = async (data: ItemFormData) => {
    // ✅ VALIDACIÓN MANUAL DE PRICE (sin Zod)
    let validPrice = data.price;

    // Normalizar valores vacíos o inválidos
    if (data.price === null || data.price === undefined || isNaN(data.price)) {
      validPrice = 0;
    }

    // Validar rango
    if (validPrice < 0) {
      setError("price", {
        type: "manual",
        message: "El precio debe ser un número positivo o igual a 0.",
      });
      
      return; // Detener el submit
    }

    if (validPrice > 99999999) {
    setError("price", {
      type: "manual",
      message: "El precio no puede exceder $99,999,999.",
    });
    
    return; // Detener el submit
  }

    // ✅ Continuar con el FormData usando el precio validado
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.description) {
      formData.append("description", data.description ?? "");
    }

    // Usar el precio validado
    formData.append("price", String(validPrice));

    if (data.image instanceof File) {
      formData.append("image", data.image, data.image.name);
    }

    if (!isEditMode) {
      formData.append("categoryId", String(categoryId));
    }

    try {
      const result = await onSubmit(formData);

      if (result.success) {
        if (result.imageError) {
          toast.warning(result.message || "Plato creado, pero falló la imagen");
        } else {
          toast.success(result.message || "Plato creado exitosamente");
        }

        if (onSuccess) {
          await onSuccess();
        }
      } else {
        toast.error(result.error || "Error al crear el plato");
      }
    } catch (error) {
      console.error("❌ [handleFormSubmit] Error en submit:", error);
      toast.error("Error inesperado al crear el plato");
      throw error;
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    imageFile,
    imagePreview,
    handleImageChange,
    removeImage,
    reset,
  };
};