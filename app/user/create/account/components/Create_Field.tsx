// campos del crear usuario
"use client";

import { Button } from "@/common/components/atoms/button";
import { createForm } from "../hooks/create_form";
import Errors from "./Errors_Msg";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";

export const CreateField = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    createForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between">
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          <Field>
            <FieldLabel htmlFor="string">Nombre</FieldLabel>
            <Input
              {...register("name")}
              id="name"
              type="string"
              aria-invalid={!!errors.name}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="string">Apellido</FieldLabel>
            <Input
              {...register("last_name")}
              id="last_name"
              type="string"
              aria-invalid={!!errors.last_name}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              aria-invalid={!!errors.email}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="number">Celular</FieldLabel>
            <Input
              {...register("cel")}
              id="cel"
              type="number"
              aria-invalid={!!errors.cel}
            />
          </Field>
          <Field className="pt-14 sm:pt-0">
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando Usuario..." : "Crear"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
