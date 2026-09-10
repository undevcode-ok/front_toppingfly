// tipado de respuesta para el servicio de autenticacion
import { AccountData } from "./account";

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
  account?: AccountData;
}