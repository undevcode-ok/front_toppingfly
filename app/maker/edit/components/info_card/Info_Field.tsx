// InfoField.tsx
"use client";
import { Button } from "@/common/components/atoms/button";
import { Errors } from "./errors_msg"
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { editMenuForm } from "../../hooks/edit_menu_form";
import { ImageFields } from "./Image_Field";
import { ColorPickerFields } from "./Color_Picker_fields";
import { Menu } from "@/app/home/types/menu";

interface InfoFieldProps {
  menuData: Menu | null; // Usa el mismo tipo que en InfoDialogProps
}

export const InfoField = ({ menuData }: InfoFieldProps) => {
  const { register, handleSubmit, control, errors, onSubmit, isSubmitting } =
    editMenuForm(menuData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          <Field>
            <FieldLabel htmlFor="title">Nombre del Menu</FieldLabel>
            <Input
              {...register("title")}
              id="title"
              type="text"
              aria-invalid={!!errors.title}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="pos">Ubicacion/Puntos de venta</FieldLabel>
            <Input
              {...register("pos")}
              id="pos"
              type="text"
              aria-invalid={!!errors.pos}
            />
          </Field>
          <ImageFields menuData={menuData ? { logo: menuData.logo, backgroundImage: menuData.backgroundImage } : undefined}  register={register}  />
          {/* separar color picker */}
          <ColorPickerFields control={control}  />
          {/*hasta aqui */}
          <Field>
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Actualizando Menu..." : "Actualizar Menu"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
