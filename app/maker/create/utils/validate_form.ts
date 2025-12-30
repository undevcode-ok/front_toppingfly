// create/utils/validations.ts
import * as z from "zod";

// Configuración de validación de archivos
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * Validación para archivos de imagen
 * - Tamaño máximo: 4MB
 * - Tipos aceptados: jpg, jpeg, png, webp
 */
export const fileValidation = z
  .any()
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0]?.size <= MAX_FILE_SIZE;
  }, "El archivo es demasiado grande. Debe ser menor a 4MB")
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
  }, "Solo puedes subir imágenes en formatos .jpg, .jpeg, .png o .webp.");

/**
 * Validación para colores hexadecimales
 * Formato: hex
 * Permite vacío, pero si tiene valor DEBE ser hex válido
 */
const hexColorValidation = z
  .string()
  .refine(
    (val) => {
      // Permitir vacío
      if (!val || val === "") return true;
      
      // Permitir solo "#" (se normalizará después)
      if (val === "#") return true;
      
      // Validar formato hexadecimal: SOLO 6 caracteres después del #
      return /^#[A-Fa-f0-9]{6}$/.test(val);
    },
    { message: "Por favor, ingresa un código de color hexadecimal válido (ejemplo: #FF5733)." }
  );

/**
 * Schema de validación del formulario de menú
 * - title: REQUERIDO (3-100 caracteres)
 * - pos: OPCIONAL (si tiene contenido, mínimo 3 caracteres)
 * - logo: OPCIONAL
 * - backgroundImage: OPCIONAL
 * - color.primary: OPCIONAL
 * - color.secondary: OPCIONAL
 */
export const validations = z.object({
  // Título: único campo requerido
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(15, "El título no puede tener más de 15 caracteres."),
  
  // Ubicación: opcional, pero si tiene contenido debe tener mínimo 3 caracteres
  pos: z
    .string()
    .refine((val) => val === "" || (val.length >= 3 && val.length <= 40), {
    message: "Si decides agregar una ubicación, debe tener entre 3 y 40 caracteres.",
  })
    .optional(),
  
  // Archivos: opcionales
  logo: fileValidation.optional(),
  backgroundImage: fileValidation.optional(),
  
  // Colores: opcionales
  color: z
    .object({
      primary: hexColorValidation.optional(),
      secondary: hexColorValidation.optional(),
    })
    .optional(),
});

export type NewMenuFormData = z.infer<typeof validations>;