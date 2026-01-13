"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { ItemCard } from "./Item_Card";

interface SortableItemProps {
  item: Items;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div 
        className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-3 hover:shadow-sm transition-shadow"
        style={{ 
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        {...attributes}
        {...listeners}
      >
        {/* Drag Handle - solo visual */}
        <div className="text-slate-400 shrink-0 pointer-events-none">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Item Card - los botones internos manejan su propia propagación */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <ItemCard
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};