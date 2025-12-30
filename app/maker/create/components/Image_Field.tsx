// ImageFields.tsx
"use client";
import { Input } from "@/common/components/atoms/input";
import { Field, FieldLabel } from "@/common/components/molecules/field";
import { UseFormRegister } from "react-hook-form";
import { useImagePreview } from "../hooks/image_preview_handlers";
import { Label } from "@/common/components/atoms/label";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
interface ImageFieldsProps {
  register: UseFormRegister<any>;
}

export const ImageFields = ({ register }: ImageFieldsProps) => {
  const { logoPreview, bgPreview, handleLogoChange, handleBgChange } =
    useImagePreview();

  return (
    <>
      <Field>
        <FieldLabel htmlFor="logo">Logo</FieldLabel>
        <div className="flex flex-col items-center gap-2">
          <Input
            {...register("logo", {
              onChange: handleLogoChange,
            })}
            id="logo"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Label
            htmlFor="logo"
            className={cn(
              "w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden cursor-pointer transition-all hover:bg-slate-200",
              logoPreview
                ? "border-none"
                : "border-2 border-dashed border-slate-300"
            )}
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Preview del logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Upload size={32} />
                <span className="text-xs font-medium">Subir</span>
              </div>
            )}
          </Label>
          <p className="text-sm text-center text-slate-400">
            PNG, JPG hasta 4MB
          </p>
        </div>
      </Field>
      <Field>
        <FieldLabel htmlFor="backgroundImage">Imagen de Fondo</FieldLabel>
        <div className="flex flex-col gap-2">
          <Input
            {...register("backgroundImage", {
              onChange: handleBgChange,
            })}
            id="backgroundImage"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Label
            htmlFor="backgroundImage"
            className={cn(
              "w-full h-50 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer transition-all hover:bg-slate-200",
              bgPreview ? "" : "border-2 border-dashed border-slate-300"
            )}
          >
            {bgPreview ? (
              <img
                src={bgPreview}
                alt="Preview del fondo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Upload size={32} />
                <span className="text-xs font-medium">Subir imagen</span>
              </div>
            )}
          </Label>
          <p className="text-sm text-center text-slate-400">
            PNG, JPG hasta 4MB
          </p>
        </div>
      </Field>
    </>
  );
};
