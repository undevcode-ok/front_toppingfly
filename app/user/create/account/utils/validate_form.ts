//validaciones del formulario con zod
import * as z from "zod";

export const validations = z.object({
  name: z
    .string()
    .min(3, "El nombre es obligatorio")
    .trim() // Elimina espacios accidentales al inicio o final
    .max(50, "El nombre no puede tener más de 50 caracteres"), 
  last_name: z
    .string()
    .min(3, "El apellido es obligatorio")
    .trim() // Elimina espacios accidentales al inicio o final
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .trim() // Elimina espacios accidentales al inicio o final
    .email("Escribe una dirección de correo válida (ej: nombre@correo.com)"),
  cel: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10}$/.test(val),
      "El número de celular debe tener 10 dígitos y solo contener números"
    ), // no es obligatorio pero si se pone debe ser 10 numeros
  role_id: z
    .number()
    .optional() // roleId no es un campo de entrada, pero si se incluyera lo validamos como un número
    .default(2),
});
