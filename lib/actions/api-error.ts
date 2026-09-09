// Error enriquecido con el código y los detalles que devuelve el backend
// (ej: FREE_PLAN_IMAGE_UPLOAD_LIMIT con { current, remaining }).
// En un archivo aparte porque "use server" solo puede exportar funciones async,
// no clases.
export class ApiError extends Error {
  code?: string;
  details?: Record<string, unknown>;

  constructor(message: string, code?: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}