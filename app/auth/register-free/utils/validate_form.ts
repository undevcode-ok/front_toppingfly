// validaciones del formulario de registro free con zod
// reglas espejo de las que aplica el backend en POST /api/auth/register-free
import * as z from "zod";

export const validations = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es obligatorio")
      .trim()
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    lastName: z
      .string()
      .min(1, "El apellido es obligatorio")
      .trim()
      .max(50, "El apellido no puede tener más de 50 caracteres"),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .trim()
      .email("Escribe una dirección de correo válida (ej: nombre@correo.com)"),
    cel: z
      .string()
      .trim()
      .max(50, "El celular no puede tener más de 50 caracteres")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(16, "La contraseña no puede tener más de 16 caracteres"),
    confirmationPassword: z
      .string()
      .min(1, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmationPassword"],
  });