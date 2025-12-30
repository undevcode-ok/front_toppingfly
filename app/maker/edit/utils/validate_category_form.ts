import * as z from "zod";


export const categoryValidations = z.object({
  title: z
    .string()
    .min(3, `El título de la categoría debe tener al menos 3 caracteres.`)
    .max(20, `El título de la categoría no puede exceder los 20 caracteres.`)
    .trim(),
});

export type CategoryFormData = z.infer<typeof categoryValidations>;