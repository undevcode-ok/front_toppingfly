import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryValidations,
  CategoryFormData,
} from "../utils/validate_category_form";
import { newCategorySubmit } from "./new_category_submit";
import { newCategory } from "../types/new_category";

interface UseNewCategoryFormProps {
  menuId: number;
  onSuccess?: () => void;
}

export const newCategoryForm = ({ menuId, onSuccess }: UseNewCategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryValidations),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (formData: CategoryFormData) => {
    const dataToSubmit: newCategory = {
      title: formData.title,
    };
    await newCategorySubmit(dataToSubmit, menuId, onSuccess);
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};