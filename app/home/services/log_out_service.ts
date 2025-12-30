"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  const cookiesStore = await cookies();
  // Eliminar todas las cookies
  cookiesStore.delete("token");
  cookiesStore.delete("subdomain");
  cookiesStore.delete("roleId");

  // Redirigir a /auth
  redirect("/auth");
};
