export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  cel?: string;
  roleId?: number;
  subdomain: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}