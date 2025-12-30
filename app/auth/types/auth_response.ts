// tipado de respuesta para el servicio de autenticacion
export interface authResponse {
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
}
