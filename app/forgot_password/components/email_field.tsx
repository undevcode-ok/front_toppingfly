// campos del email de recuperacion
"use client";
import { useEffect } from "react";
import { Button } from "@/common/components/atoms/button";
import { emailForm } from "../hooks/email_form";
import Errors from "./errors_msg";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";

interface EmailFieldProps {
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export const EmailField = ({ onSubmittingChange }: EmailFieldProps) => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    emailForm();

  // Notificar al padre cuando cambia isSubmitting
  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              disabled={isSubmitting}
            />
          </Field>
          <Field>
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              Enviar
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};