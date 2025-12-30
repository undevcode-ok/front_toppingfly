//validaciones del formulario con zod
import * as z from "zod";

export const validations = z.object({
  email: z
    .string()
    .min(1, "Por favor, ingresa tu dirección de correo electrónico.")
    .trim() // Elimina espacios accidentales al inicio o final
    .email('Parece que el correo ingresado no es válido. Asegúrate de escribir una dirección como "ejemplo@correo.com".'),

  password: z
    .string()
    .min(1, "Por favor, ingresa una contraseña.")
    .min(8, "La contraseña es demasiado corta. Debe tener mínimo 8 caracteres.")
    .max(16, "La contraseña es demasiado larga. Debe tener un máximo de 16 caracteres."),
});
