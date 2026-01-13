"use client";

import React from "react";
import { Button } from "@/common/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { ItemImage } from "./Item_Image";
import { Dialog, DialogTrigger } from "@/common/components/organism/dialog";
import { DialogItemDelete } from "./Dialog_Item_Delete";

interface ItemCardProps {
  item: Items;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  const previewUrl = item.images?.[0]?.url || null;

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Contenedor izquierdo: Imagen + Título + Precio */}
      <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
        {/* Imagen */}
        <div className="shrink-0">
          <ItemImage imageUrl={previewUrl} alt={item.title} />
        </div>

        {/* Información del item */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="font-medium text-slate-700 text-sm truncate">
            {item.title || "Nuevo plato"}
          </p>
        </div>

        {/* Precio */}
        {item.price && item.price > 0 && (
          <div className="shrink-0 ml-2">
            <p className="text-slate-600 text-sm font-semibold whitespace-nowrap">
              $
              {Number.isInteger(Number(item.price))
                ? Number(item.price)
                : Number(item.price).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Botones de acción - SOLO ellos detienen propagación */}
      <div 
        className="flex gap-1 shrink-0"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Editar */}
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
          onClick={onEdit}
          type="button"
        >
          <Pencil className="w-4 h-4" />
        </Button>

        {/* Botón Eliminar */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
              disabled={isDeleting}
              type="button"
            >
              {isDeleting ? (
                <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </DialogTrigger>

          <DialogItemDelete
            handleDeleteMenu={onDelete}
            isDeleting={isDeleting}
          />
        </Dialog>
      </div>
    </div>
  );
};