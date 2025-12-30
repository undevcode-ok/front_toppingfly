//validaciones del formulario con zod
import * as z from "zod";

export const validations = z.object({
  email: z
    .string()
    .min(1, "Por favor, ingresa tu dirección de correo electrónico.")
    .trim() // Elimina espacios accidentales al inicio o final
    .email('Parece que el correo ingresado no es válido. Asegúrate de escribir una dirección como "ejemplo@correo.com".'),
});
