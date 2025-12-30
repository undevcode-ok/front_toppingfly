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
 * Validación para archivos de imagen (opcional)
 * - Tamaño máximo: 4MB
 * - Tipos aceptados: jpg, jpeg, png, webp
 */
export const fileValidation = z
  .any()
  .refine((files) => {
    // Si es undefined, null o string (URL existente), es válido
    if (!files || typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido
    if (files.length === 0) return true;
    
    // Si es FileList con archivo, validar tamaño
    return files[0]?.size <= MAX_FILE_SIZE;
  }, "El archivo que subas no puede ser mayor a 4MB.")
  .refine((files) => {
    // Si es undefined, null o string (URL existente), es válido
    if (!files || typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido
    if (files.length === 0) return true;
    
    // Si es FileList con archivo, validar tipo
    return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
  }, "Solo puedes subir imágenes en formato .jpg, .jpeg, .png o .webp.");

/**
 * Validación para logo en MODO EDICIÓN (requerido)
 * - Siempre tiene un valor previo (string URL)
 * - Puede mantener el actual O subir uno nuevo
 * - Tamaño máximo: 4MB
 * - Tipos aceptados: jpg, jpeg, png, webp
 */
export const logoValidation = z
  .any()
  .refine((files) => {
    // Debe existir (no puede ser null/undefined)
    if (!files) return false;
    
    // Si es string (URL existente), es válido
    if (typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido (mantiene el actual)
    if (files.length === 0) return true;
    
    // Si sube archivo nuevo, validar tamaño
    return files[0]?.size <= MAX_FILE_SIZE;
  }, "El logo es obligatorio y no debe exceder los 4MB.")
  .refine((files) => {
    // Si es string (URL existente), es válido
    if (typeof files === 'string') return true;
    
    // Si es FileList vacío, es válido
    if (files.length === 0) return true;
    
    // Si sube archivo nuevo, validar tipo
    return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
  }, "Solo puedes subir un logo en formato .jpg, .jpeg, .png o .webp.");

/**
 * Validación para colores hexadecimales
 * Formato: hex de 6 dígitos (#RRGGBB)
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
    { message: "Por favor, ingresa un código de color válido en formato hexadecimal (#RRGGBB)." }
  );

/**
 * Schema de validación del formulario de menú (MODO EDICIÓN)
 * - title: REQUERIDO (3-100 caracteres)
 * - pos: OPCIONAL (si tiene contenido, mínimo 3 caracteres)
 * - logo: REQUERIDO (puede ser URL existente o archivo nuevo)
 * - backgroundImage: OPCIONAL
 * - color.primary: OPCIONAL (hex de 6 dígitos)
 * - color.secondary: OPCIONAL (hex de 6 dígitos)
 */
export const validations = z.object({
  // Título: campo requerido
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
  
  // Logo: requerido (siempre tiene valor previo en edición)
  logo: logoValidation,
  
  // Imagen de fondo: opcional
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