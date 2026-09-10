"use server";

import { cookies } from "next/headers";
import { AccountData } from "../types/account";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface MeResponse {
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

// Vuelve a pedir el estado actual de la cuenta (usado al restaurar sesión,
// ej: al entrar a /home) y refresca la cookie "account" con datos frescos.
// No rompe la sesión si falla: simplemente no actualiza nada.
export async function syncCurrentSession(): Promise<MeResponse | null> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const data: MeResponse = await response.json();

    if (data.account) {
      await cookiesStore.set("account", JSON.stringify(data.account), {
        path: "/",
     });
    }

    return data;
  } catch (error) {
    console.error("Error al sincronizar la sesión:", error);
    return null;
  }
}