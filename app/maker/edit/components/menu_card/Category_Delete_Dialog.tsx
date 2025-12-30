"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/common/components/organism/dialog";
import { Button } from "@/common/components/atoms/button";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface CategoryDeleteDialogProps {
  onDelete: () => Promise<void>;
  categoryTitle?: string;
}

export const CategoryDeleteDialog: React.FC<CategoryDeleteDialogProps> = ({
  onDelete,
  categoryTitle,
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        console.log("borrando")
      await onDelete();
      setOpen(false); // Cerrar dialog después de eliminar
    } catch (error) {
      console.error("Error al eliminar:", error);
      // El error ya se maneja en deleteCategorySubmit con toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl p-6 shadow-xl">
        <DialogClose className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-5 w-5 text-red-600" />
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Eliminar categoría
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-base text-slate-600 mt-2">
          {categoryTitle ? (
            <>
              ¿Estás seguro de que deseas eliminar la categoría{" "}
              <span className="font-semibold">"{categoryTitle}"</span>?
            </>
          ) : (
            "¿Estás seguro de que deseas eliminar esta categoría?"
          )}
          <br />
          <br />
          Los platos dentro de ella también se eliminarán. Esta acción no se
          puede deshacer.
        </DialogDescription>

        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Eliminando...
              </span>
            ) : (
              "Eliminar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};