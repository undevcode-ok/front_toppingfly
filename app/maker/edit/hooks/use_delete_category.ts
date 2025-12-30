import { useState } from "react";
import { deleteCategorySubmit } from "./delete_category_submit";

interface UseDeleteCategoryProps {
  onSuccess?: () => void;
}

export const useDeleteCategory = ({
  onSuccess,
}: UseDeleteCategoryProps = {}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const deleteCategory = async (categoryId: number) => {
    setDeletingId(categoryId);

    try {
      await deleteCategorySubmit({
        categoryId,
        onSuccess,
      });
    } catch (error) {
    } finally {
      setDeletingId(null);
    }
  };

  return {
    deleteCategory,
    deletingId,
    isDeleting: deletingId !== null,
  };
};
