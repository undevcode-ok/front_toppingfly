// campos de cambio de contraseña
"use client";

import { Button } from "@/common/components/atoms/button";
import Errors from "./errors_msg";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { handleTogglePassword } from "../hooks/handlers";
import { Input } from "@/common/components/atoms/input";
import { passwordForm } from "../hooks/password_form";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PasswordFieldProps {
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export const PasswordField = ({ onSubmittingChange }: PasswordFieldProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    passwordForm(token);
  const [showPassword, setShowPassword] = useState(false);
  const [showControlPassword, setControlShowPassword] = useState(false);

   // Notificar al padre cuando cambia isSubmitting
    useEffect(() => {
      onSubmittingChange?.(isSubmitting);
    }, [isSubmitting, onSubmittingChange]);
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <div className="pt-4">
             <Errors errors={errors} />
          </div>
          <Field>
            <FieldLabel htmlFor="email">Contraseña</FieldLabel>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                aria-invalid={!!errors.password}
              />
              <Button
                onClick={() => handleTogglePassword(setShowPassword)}
                type="button"
                className="absolute bg-transparent hover:bg-transparent right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <Eye className="w-12 h-12" />
                ) : (
                  <EyeOff className="w-12 h-12" />
                )}
              </Button>
            </div>
          </Field>
          <Field>
            <Field>
              <FieldLabel htmlFor="email">Repetir Contraseña</FieldLabel>
              <div className="relative">
                <Input
                  {...register("control_password")}
                  id="control_password"
                  type={showControlPassword ? "text" : "password"}
                  onPaste={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  aria-invalid={!!errors.password}
                />
                <Button
                  onClick={() => handleTogglePassword(setControlShowPassword)}
                  type="button"
                  className="absolute bg-transparent hover:bg-transparent right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showControlPassword ? (
                    <Eye className="w-12 h-12" />
                  ) : (
                    <EyeOff className="w-12 h-12" />
                  )}
                </Button>
              </div>
            </Field>
            <div className="pt-4">
              <Button
                className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
                type="submit"
                disabled={isSubmitting}
              >
                Enviar
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
