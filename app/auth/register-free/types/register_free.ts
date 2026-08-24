// tipado del formulario y de la respuesta de POST /api/auth/register-free

export type registerFreeForm = {
  name: string;
  lastName: string;
  email: string;
  cel?: string;
  password: string;
  confirmationPassword: string;
};

// mismo shape que authResponse (token + user), más el bloque "account"
// que por ahora no persistimos (ver storage_service reutilizado del login)
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
  account: {
    plan: string;
    limits: {
      menus: number | null;
      itemsPerMenu: number | null;
      images: boolean;
    };
  };
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