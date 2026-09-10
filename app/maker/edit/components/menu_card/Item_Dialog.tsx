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
import { useCookie } from "@/lib/hooks/use_cookie";
import { useAccount, notifyAccountUpdated } from "@/lib/hooks/use_account";
import { UpgradePlanLink } from "@/common/components/molecules/upgrade_plan_link";
import { deleteItemImage } from "../../services/image_service";
import { toast } from "sonner";

const FREE_ROLE_ID = "4";

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
    imageFile,
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
  const roleId = useCookie("roleId");
  const { account } = useAccount();
  const isFree = roleId === FREE_ROLE_ID;

  // El cupo de imágenes de por vida solo aplica al plan Free.
  const imagePolicy = isFree ? account?.imagePolicy : undefined;
  const uploadDisabled = isFree && !!imagePolicy && imagePolicy.uploadsRemaining <= 0;

  const existingImageId = item?.images?.[0]?.id;
  const [isDeletingImage, setIsDeletingImage] = React.useState(false);

  const handleImageClick = () => {
    if (uploadDisabled) return;
    fileInputRef.current?.click();
  };

  // Valida tamaño/formato contra lo que indique el backend (si aplica, ej: Free)
  // antes de aceptar el archivo localmente.
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && imagePolicy) {
      if (file.size > imagePolicy.maxFileSizeBytes) {
        const maxMb = (imagePolicy.maxFileSizeBytes / (1024 * 1024)).toFixed(0);
        toast.error(`La imagen no puede superar ${maxMb}MB.`);
        e.target.value = "";
        return;
      }
      if (!imagePolicy.allowedMimeTypes.includes(file.type)) {
        toast.error("Formato no permitido. Usá JPG, PNG, GIF o WEBP.");
        e.target.value = "";
        return;
      }
    }

    handleImageChange(e);
  };

  // Elimina la imagen. Si es la imagen ya guardada del ítem (no una selección
  // local pendiente de guardar), borra en el backend de verdad.
  const handleRemoveImage = async () => {
    const hasPendingNewFile = !!imageFile;

    if (existingImageId && !hasPendingNewFile) {
      setIsDeletingImage(true);
      try {
        await deleteItemImage(item!.id, existingImageId);
        notifyAccountUpdated();
        removeImage();
        toast.success("Imagen eliminada.");
      } catch (err) {
        console.error("Error al eliminar imagen:", err);
        toast.error(
          err instanceof Error ? err.message : "No pudimos eliminar la imagen."
        );
      } finally {
        setIsDeletingImage(false);
      }
    } else {
      // selección local todavía no guardada: solo la limpiamos, sin tocar el backend
      removeImage();
    }
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
                onChange={handleFileSelected}
                className="hidden"
                disabled={uploadDisabled}
              />

              {imagePreview ? (
                <div
                  onClick={uploadDisabled ? undefined : handleImageClick}
                  className={`relative w-full h-90 rounded-lg border-2 overflow-hidden group transition-all ${
                    uploadDisabled
                      ? "border-slate-200 cursor-default"
                      : "border-slate-200 cursor-pointer hover:border-orange-400"
                  }`}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {!uploadDisabled && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-10 h-10 text-white" />
                      <p className="text-white text-sm font-medium ml-2">
                        Cambiar imagen
                      </p>
                    </div>
                  )}
                  {/* Botón de eliminar: siempre disponible si hay imagen, sin importar el cupo */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    disabled={isDeletingImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100 z-10 disabled:opacity-50"
                  >
                    {isDeletingImage ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ) : (
                <div
                  onClick={uploadDisabled ? undefined : handleImageClick}
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-all ${
                    uploadDisabled
                      ? "border-slate-200 opacity-70 cursor-not-allowed"
                      : "border-slate-300 cursor-pointer hover:border-orange-400 hover:bg-orange-50/50"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Haz clic para subir una imagen
                    </p>
                  </div>
                </div>
              )}

              {uploadDisabled ? (
                <p className="text-xs text-center text-slate-500">
                  Alcanzaste el límite de {imagePolicy?.lifetimeUploadLimit} fotos
                  de tu plan Free (borrar una foto no libera cupo).{" "}
                  <UpgradePlanLink />
                </p>
              ) : isFree && imagePolicy ? (
                <p className="text-xs text-center text-slate-500">
                  PNG, JPG o WEBP (MAX.{" "}
                  {(imagePolicy.maxFileSizeBytes / (1024 * 1024)).toFixed(0)}
                  MB) · Te quedan {imagePolicy.uploadsRemaining} fotos en tu
                  plan Free
                </p>
              ) : (
                <p className="text-xs text-center text-slate-500">
                  PNG, JPG o WEBP (MAX. 4MB)
                </p>
              )}
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