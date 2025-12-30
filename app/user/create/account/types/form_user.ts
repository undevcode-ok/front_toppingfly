//tipado de formulario del login

export type formUser = {
  name: string;
  last_name: string;
  email: string;
  cel?: string;
  role_id: number;
};