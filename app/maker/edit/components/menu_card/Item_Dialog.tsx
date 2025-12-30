"use client";

import React, { useEffect } from "react";
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
import { Input } from "@/common/components/atoms/input";
import { Label } from "@/common/components/atoms/label";
import { Textarea } from "@/common/components/atoms/textarea";
import { Upload, X } from "lucide-react";
import { Items } from "@/app/home/types/menu";
import { useItemForm } from "../../hooks/use_item_form";
import { Errors } from "./errors_msg";

interface ItemDialogProps {
  categoryId: number;
  item?: Items;
  trigger: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<{
    success: boolean;
    error?: string;
    imageError?: boolean;
    message?: string;
  }>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ItemDialog: React.FC<ItemDialogProps> = ({
  categoryId,
  item,
  trigger,
  onSubmit,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  const isEditMode = !!item;

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    imagePreview,
    handleImageChange,
    removeImage,
    reset,
  } = useItemForm({
    item,
    categoryId,
    onSubmit: async (formData) => {
      try {
        const result = await onSubmit(formData);
        if (result.success) {
          setOpen(false);
          reset();
        }
        return result;
      } catch (error) {
        console.error("❌ [ItemDialog] Error en submit:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        };
      }
    },
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handlePriceBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      e.target.value = "0.00";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="relative w-full">
            <DialogTitle className="text-xl font-semibold text-slate-800 text-center w-full">
              {isEditMode ? "Editar Plato" : "Nuevo Plato"}
            </DialogTitle>
            <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/70">
              <X className="h-5 w-5 text-orange-400" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="pt-4">
          <Errors errors={errors} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="item-title" className="py-2">
                Nombre del plato
              </Label>
              <Input
                id="item-title"
                {...register("title")}
                maxLength={60}
                autoFocus
                className="w-full"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="item-description" className="py-2">
                Descripción
              </Label>
              <Textarea
                id="item-description"
                {...register("description")}
                placeholder="Describe tu plato..."
                maxLength={200}
                rows={3}
                className="w-full resize-none wrap-break-word whitespace-pre-wrap overflow-wrap-anywhere overflow-x-hidden"
                style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
              />
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="item-price" className="py-2">
                Precio
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  id="item-price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="0.00"
                  className="w-full pl-7"
                  onBlur={handlePriceBlur}
                />
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-2">
              <Label className="py-2">Imagen</Label>

              {/* Input file oculto pero siempre presente */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {imagePreview ? (
                <div
                  onClick={handleImageClick}
                  className="relative w-full h-90 rounded-lg border-2 border-slate-200 overflow-hidden group cursor-pointer hover:border-orange-400 transition-all"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay con hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-10 h-10 text-white" />
                    <p className="text-white text-sm font-medium ml-2">
                      Cambiar imagen
                    </p>
                  </div>
                  {/* Botón de eliminar */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleImageClick}
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Haz clic para subir una imagen
                    </p>
                  </div>
                </div>
              )}
              <p className="text-xs text-center text-slate-500">
                PNG, JPG o WEBP (MAX. 4MB)
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </span>
              ) : isEditMode ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};