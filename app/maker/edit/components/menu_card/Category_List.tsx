"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Categories } from "@/app/home/types/menu";
import { useDragAndDrop } from "../../hooks/use_drag_and_drop";
import { useCategoryDragDrop } from "../../hooks/use_category_drag_drop";
import { SortableCategory } from "./Sorteable_Category";

interface CategoryListProps {
  categories: Categories[];
  onMenuUpdate: () => Promise<void>;
}

const CategoryList = ({ categories: initialCategories, onMenuUpdate }: CategoryListProps) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Categories[]>([]);

  // Sensores para drag & drop
  const sensors = useDragAndDrop();

  // Hooks personalizados
  const { handleDragEnd } = useCategoryDragDrop(
    categories,
    setCategories,
    onMenuUpdate
  );

  // Sincronizar categorías con las props
  useEffect(() => {
    if (initialCategories) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  if (!categories || categories.length === 0) {
    return (
      <p className="text-sm text-slate-400 italic mt-6 text-center">
        No tienes categorías por el momento. ¡Crea una categoría para empezar a organizar tu menú!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((cat) => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((category) => (
            <SortableCategory
              key={category.id}
              category={category}
              expandedCategoryId={expandedCategoryId}
              setExpandedCategoryId={setExpandedCategoryId}
              onCategoryChange={onMenuUpdate}
              sensors={sensors}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CategoryList;