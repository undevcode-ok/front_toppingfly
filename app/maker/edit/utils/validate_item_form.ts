import * as z from "zod";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const fileValidation = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "El archivo debe ser de 4MB o menos. Intenta con otro archivo si es más grande."
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Por favor, sube una imagen en formato .jpg, .jpeg, .png o .webp."
  )
  .optional();

// ✅ Schema personalizado para price que garantiza el tipo correcto

export const itemValidations = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(20, "El título no puede tener más de 20 caracteres.")
    .trim(),

  description: z
    .string()
    .refine((val) => val === "" || (val.length >= 3 && val.length <= 200), {
      message:
        "Si decides agregar una descripción, debe tener entre 3 y 200 caracteres.",
    })
    .optional(),

  price: z
  .number().or(z.nan()).transform((val) => (isNaN(val) ? 0 : val)),  // Asegura que sea un número
  

  image: fileValidation,
});

export type ItemFormData = z.infer<typeof itemValidations>;
