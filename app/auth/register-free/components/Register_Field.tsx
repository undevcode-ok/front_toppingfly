// campos del registro free
"use client";

import { Button } from "@/common/components/atoms/button";
import { useRegisterForm } from "../hooks/use_register_form";
import { handleTogglePassword } from "../hooks/handlers";
import Errors from "./Error_Msg";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldSet,
  FieldGroup,
  FieldLabel,
} from "@/common/components/molecules/field";
import { Input } from "@/common/components/atoms/input";
import { useState } from "react";

export const RegisterField = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Errors errors={errors} />

          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input
              {...register("name")}
              id="name"
              type="text"
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
            <Input
              {...register("lastName")}
              id="lastName"
              type="text"
              aria-invalid={!!errors.lastName}
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
            <FieldLabel htmlFor="cel">Celular (opcional)</FieldLabel>
            <Input
              {...register("cel")}
              id="cel"
              type="text"
              aria-invalid={!!errors.cel}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
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
            <FieldLabel htmlFor="confirmationPassword">
              Confirmar contraseña
            </FieldLabel>
            <div className="relative">
              <Input
                {...register("confirmationPassword")}
                id="confirmationPassword"
                type={showConfirmPassword ? "text" : "password"}
                aria-invalid={!!errors.confirmationPassword}
              />
              <Button
                onClick={() => handleTogglePassword(setShowConfirmPassword)}
                type="button"
                className="absolute bg-transparent hover:bg-transparent right-1 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showConfirmPassword ? (
                  <Eye className="w-12 h-12" />
                ) : (
                  <EyeOff className="w-12 h-12" />
                )}
              </Button>
            </div>
          </Field>

          <Field className="pt-4">
            <Button
              className="w-full py-4 rounded-lg text-base bg-linear-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta gratis"}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};