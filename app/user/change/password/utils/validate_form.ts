//validaciones del formulario con zod
import * as z from "zod";

export const validations = z
  .object({
    password: z
      .string()
      .min(1, "Por favor, ingresa una contraseña.")
      .min(8, "La contraseña es demasiado corta. Debe tener mínimo 8 caracteres.")
      .max(16, "La contraseña es demasiado larga. Debe tener un máximo de 16 caracteres."),
    control_password: z
      .string()
      .min(1, "Debes ingresar la contraseña nuevamente para confirmarla.")
  })
  .refine((data) => data.password === data.control_password, {
    message: "Parece que las contraseñas no coinciden. Por favor, verifica ambas.",
    path: ["control_password"], // 👈 Agrega esta línea
  });