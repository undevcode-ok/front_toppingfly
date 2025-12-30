// campos del login
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
import { loginForm } from "../hooks/login_form";
import { useState, useEffect } from "react";

interface LoginFieldProps {
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export const LoginField = ({ onSubmittingChange }: LoginFieldProps) => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    loginForm();
  const [showPassword, setShowPassword] = useState(false);

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
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <FieldLabel className="bg-transparent text-orange-500 font-semibold p-0">
                <a href="/forgot_password">¿Olvidaste tu contraseña?</a>
              </FieldLabel>
            </div>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
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
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              Iniciar Sesión
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
