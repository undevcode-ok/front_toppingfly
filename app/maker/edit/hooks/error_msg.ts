import { FieldErrors } from "react-hook-form";

export const getErrorMessages = (errors: FieldErrors<any>): string[] => {
  const messages: string[] = [];

  const extractErrors = (obj: any): void => {
    if (!obj) return;

    // Si tiene un mensaje de error, lo agregamos
    if (obj.message && typeof obj.message === "string") {
      messages.push(obj.message);
      return;
    }

    // Si es un objeto, recorremos sus propiedades recursivamente
    if (typeof obj === "object") {
      Object.values(obj).forEach((value) => {
        extractErrors(value);
      });
    }
  };

  extractErrors(errors);
  return messages;
};