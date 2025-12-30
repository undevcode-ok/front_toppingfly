"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { Categories } from "@/app/home/types/menu";
import { CategoryTitle } from "./Category_Title";
import { Button } from "@/common/components/atoms/button";
import { useEditCategoryForm } from "../../hooks/use_edit_category_form";
import { useDeleteCategory } from "../../hooks/use_delete_category";
import { ItemList } from "./Item_List";
import { DialogCategoryDelete } from "./Dialog_Category_Delete";
import { Dialog, DialogTrigger } from "@/common/components/organism/dialog";

interface SortableCategoryProps {
  category: Categories;
  expandedCategoryId: number | null;
  setExpandedCategoryId: (id: number | null) => void;
  onCategoryChange: () => Promise<void>;
  sensors: any;
}

export const SortableCategory: React.FC<SortableCategoryProps> = ({
  category,
  expandedCategoryId,
  setExpandedCategoryId,
  onCategoryChange,
  sensors,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  // Hook de edición
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    showSaveButton,
    handleFocus,
    handleBlur,
  } = useEditCategoryForm({
    categoryId: category.id,
    initialTitle: category.title,
    onSuccess: onCategoryChange,
  });

  // Hook de eliminación
  const { deleteCategory, deletingId } = useDeleteCategory({
    onSuccess: onCategoryChange,
  });

  // ========== FUNCIÓN DE ELIMINACIÓN ==========
  const handleDeleteClick = async () => {
    // Ejecutar eliminación
    await deleteCategory(category.id);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isExpanded = expandedCategoryId === category.id;
  const isDeleting = deletingId === category.id;

  return (
    <div ref={setNodeRef} style={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm overflow-hidden w-full">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing touch-none mr-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Título editable */}
          <CategoryTitle
            register={register}
            errors={errors}
            showSaveButton={showSaveButton}
            onSave={handleSubmit(onSubmit)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isSubmitting={isSubmitting}
          />

          {/* Botones de acción */}
          <div className="flex space-x-2 items-center min-w-max">
            {/* ========== BOTÓN ELIMINAR CON DIALOG ========== */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </DialogTrigger>

              <DialogCategoryDelete
                handleDeleteMenu={handleDeleteClick}
                isDeleting={isDeleting}
              />
            </Dialog>

            {/* Botón expandir/colapsar */}
            <button
              type="button"
              onClick={() =>
                setExpandedCategoryId(isExpanded ? null : category.id)
              }
              className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 flex items-center justify-center ${
                isExpanded
                  ? "bg-orange-50 text-orange-500 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Contenido desplegable - Renderizado condicional simple */}
      {isExpanded && (
        <div className="mt-2">
          <ItemList
            items={category.items || []}
            categoryId={category.id}
            sensors={sensors}
            onItemChange={onCategoryChange}
          />
        </div>
      )}
    </div>
  );
};