// ImageFields.tsx
"use client";
import { Input } from "@/common/components/atoms/input";
import { Field, FieldLabel } from "@/common/components/molecules/field";
import { UseFormRegister } from "react-hook-form";
import { useImagePreview } from "../../hooks/image_preview_handlers";
import { Label } from "@/common/components/atoms/label";
import { cn } from "@/lib/utils";
import { Upload, UtensilsCrossed } from "lucide-react";
import { useCookie } from "@/lib/hooks/use_cookie";
import { UpgradePlanLink } from "@/common/components/molecules/upgrade_plan_link";

const FREE_ROLE_ID = "4";
const FREE_DEFAULT_BACKGROUND = "/toppingfly.webp";

interface ImageFieldsProps {
  register: UseFormRegister<any>;
  menuData?: {
    logo?: string;
    backgroundImage?: string;
  };
}

export const ImageFields = ({ register, menuData }: ImageFieldsProps) => {
  const { logoPreview, bgPreview, handleLogoChange, handleBgChange } =
    useImagePreview(menuData?.logo, menuData?.backgroundImage);
  const roleId = useCookie("roleId");
  const isFree = roleId === FREE_ROLE_ID;

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
            disabled={isFree}
          />
          <Label
            htmlFor="logo"
            className={cn(
              "w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden transition-all",
              isFree
                ? "cursor-not-allowed opacity-70 border-2 border-dashed border-slate-200"
                : "cursor-pointer hover:bg-slate-200",
              !isFree && (logoPreview
                ? "border-none"
                : "border-2 border-dashed border-slate-300")
            )}
          >
            {isFree ? (
              <UtensilsCrossed className="w-10 h-10 text-slate-400" />
            ) : logoPreview ? (
              <img
                src={logoPreview}
                alt="Preview del logo"
                className={`object-cover ${
                  logoPreview ===
                  "https://undevcode-menus.s3.sa-east-1.amazonaws.com/defaults/menu/default_menu.png"
                    ? "w-20 h-20"
                    : "w-full h-full"
                }`}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Upload size={32} />
                <span className="text-xs font-medium">Subir</span>
              </div>
            )}
          </Label>
          {isFree ? (
            <p className="text-sm text-center text-slate-400">
              Para personalizar el logo necesitás el plan Full.{" "}
              <UpgradePlanLink />
            </p>
          ) : (
            <p className="text-sm text-center text-slate-400">
              PNG, JPG hasta 4MB
            </p>
          )}
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
            disabled={isFree}
          />
          <Label
            htmlFor="backgroundImage"
            className={cn(
              "w-full h-50 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden transition-all",
              isFree
                ? "cursor-not-allowed opacity-70 border-2 border-dashed border-slate-200"
                : "cursor-pointer hover:bg-slate-200",
              !isFree && (bgPreview ? "" : "border-2 border-dashed border-slate-300")
            )}
          >
            {isFree ? (
              <img
                src={FREE_DEFAULT_BACKGROUND}
                alt="Fondo predeterminado del plan Free"
                className="w-full h-full object-cover"
              />
            ) : bgPreview ? (
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
          {isFree ? (
            <p className="text-sm text-center text-slate-400">
              Para personalizar el fondo necesitás el plan Full.{" "}
              <UpgradePlanLink />
            </p>
          ) : (
            <p className="text-sm text-center text-slate-400">
              PNG, JPG hasta 4MB
            </p>
          )}
        </div>
      </Field>
    </>
  );
};