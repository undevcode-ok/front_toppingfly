// al entrar a /home, refresca la cookie "account" con datos frescos del backend
// (plan, límites, cupo de imágenes) por si la sesión es vieja o cambió algo.
"use client";

import { useEffect } from "react";
import { syncCurrentSession } from "@/app/auth/services/me_service";

export const AccountSyncGuard = () => {
  useEffect(() => {
    syncCurrentSession();
  }, []);

  return null;
};