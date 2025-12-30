import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryValidations, CategoryFormData } from "../utils/validate_category_form";
import { editCategorySubmit } from "../hooks/edit_category_submit";
import { useState } from "react";

interface UseEditCategoryFormProps {
  categoryId: number;
  initialTitle: string;
  onSuccess?: () => void;
}

export const useEditCategoryForm = ({
  categoryId,
  initialTitle,
  onSuccess,
}: UseEditCategoryFormProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    watch,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryValidations),
    mode: "onChange", // ✅ CRÍTICO: Valida en cada cambio
    defaultValues: {
      title: initialTitle,
    },
  });

  const currentTitle = watch("title");

  // ✅ SOLUCIÓN: El botón solo aparece si:
  // 1. Está enfocado
  // 2. El formulario es válido según Zod (isValid)
  // 3. El título ha cambiado (isDirty)
  const showSaveButton = isFocused && isValid && isDirty;

  const onSubmit = async (formData: CategoryFormData) => {
    await editCategorySubmit({
      categoryId,
      title: formData.title,
      onSuccess,
    });
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
    // Si hay cambios sin guardar, revertir al título original
    if (isDirty) {
      reset({ title: initialTitle });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    showSaveButton,
    handleFocus,
    handleBlur,
    currentTitle,
  };
};