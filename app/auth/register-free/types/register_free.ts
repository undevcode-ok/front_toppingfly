// tipado del formulario y de la respuesta de POST /api/auth/register-free
import { AccountData } from "@/app/auth/types/account";

export type registerFreeForm = {
  name: string;
  lastName: string;
  email: string;
  cel: string;
  password: string;
  confirmationPassword: string;
};

// mismo shape que authResponse (token + user) + account
export interface registerFreeResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    cel: string;
    roleId: number;
    active: boolean;
    subdomain: string;
  };
  account: AccountData;
}

// forma del error 400 del backend (errores de validación por campo)
export interface registerFreeValidationError {
  message: string;
  errors?: Array<{
    path: string;
    code: string;
    message: string;
  }>;
}