"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/common/components/atoms/button";
import { Plus } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { SortableItem } from "./Sorteable_Item";
import { ItemDialog } from "./Item_Dialog";
import { useItemDragDrop } from "../../hooks/use_item_drag_drop";
import { useItemOperations } from "../../hooks/use_item_operations";

interface ItemListProps {
  items: Items[];
  categoryId: number;
  sensors: any;
  onItemChange: () => Promise<void>;
  ensureCategoryExpanded: () => void; // Nueva prop para asegurar que la categoría esté expandida
}

export const ItemList: React.FC<ItemListProps> = ({
  items: initialItems,
  categoryId,
  sensors,
  onItemChange,
  ensureCategoryExpanded,
}) => {
  const [editingItem, setEditingItem] = useState<Items | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { localItems, handleDragEnd } = useItemDragDrop(
    initialItems,
    onItemChange
  );

  const { deleteItem, deletingItemId, createItem, editItem } = useItemOperations({
    onItemChange,
  });

  // Handler para crear item - mantiene la categoría abierta
  const handleCreateItem = async (formData: FormData) => {
    const result = await createItem(formData, categoryId);
    if (result.success) {
      setIsCreating(false);
      // Asegurar que la categoría esté expandida después de crear
      ensureCategoryExpanded();
    }
    return result;
  };

  // Handler para editar item - mantiene la categoría abierta
  const handleEditItem = async (item: Items, formData: FormData) => {
    const result = await editItem(item, formData);
    if (result.success) {
      setEditingItem(null);
      // Asegurar que la categoría esté expandida después de editar
      ensureCategoryExpanded();
    }
    return result;
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Lista de items con drag & drop */}
      {localItems && localItems.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {localItems.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onEdit={() => setEditingItem(item)}
                onDelete={() => deleteItem(item.id)}
                isDeleting={deletingItemId === item.id}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {/* Separador y botón agregar */}
      <div className="pt-4 mt-4 border-t border-slate-300">
        <ItemDialog
          categoryId={categoryId}
          onSubmit={handleCreateItem}
          open={isCreating}
          onOpenChange={setIsCreating}
          trigger={
            <Button
              size="sm"
              variant="outline"
              className="w-full text-base border-dashed border-slate-300 text-slate-500 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50 rounded-xl py-5 transition-all"
              type="button"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-6! h-6! mr-2" /> Agregar plato
            </Button>
          }
        />
      </div>

      {/* Dialog de edición (controlado) */}
      {editingItem && (
        <ItemDialog
          categoryId={categoryId}
          item={editingItem}
          onSubmit={(formData) => handleEditItem(editingItem, formData)}
          trigger={<span />}
          open={!!editingItem}
          onOpenChange={(open) => {
            if (!open) setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};