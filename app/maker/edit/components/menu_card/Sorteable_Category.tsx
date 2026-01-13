"use client";

import React, { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
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
  const dragStarted = useRef(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: category.id,
  });

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

  const handleDeleteClick = async () => {
    await deleteCategory(category.id);
  };

  // Función para asegurar que esta categoría esté expandida
  const ensureCategoryExpanded = () => {
    setExpandedCategoryId(category.id);
  };

  // Toggle de expandir/colapsar
  const toggleExpanded = () => {
    if (!dragStarted.current) {
      setExpandedCategoryId(expandedCategoryId === category.id ? null : category.id);
    }
    dragStarted.current = false;
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
        <div 
          className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm overflow-hidden w-full"
          style={{ 
            touchAction: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          {...attributes}
          {...listeners}
          onPointerDown={() => {
            dragStarted.current = false;
          }}
          onDragStart={() => {
            dragStarted.current = true;
          }}
          onClick={toggleExpanded}
        >
          {/* Ícono de grip - solo visual */}
          <div className="mr-2 text-slate-400 pointer-events-none">
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Título editable - NO detiene propagación */}
          <div className="flex-1">
            <CategoryTitle
              register={register}
              errors={errors}
              showSaveButton={showSaveButton}
              onSave={handleSubmit(onSubmit)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isSubmitting={isSubmitting}
              isDragging={isDragging}
            />
          </div>

          {/* Botón de acción - SOLO él detiene propagación */}
          <div 
            className="flex space-x-2 items-center min-w-max"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Eliminar */}
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
          </div>
        </div>
      </form>

      {/* Contenido desplegable */}
      {isExpanded && (
        <div className="mt-2">
          <ItemList
            items={category.items || []}
            categoryId={category.id}
            sensors={sensors}
            onItemChange={onCategoryChange}
            ensureCategoryExpanded={ensureCategoryExpanded}
          />
        </div>
      )}
    </div>
  );
};