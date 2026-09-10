// lee y parsea la cookie "account" (plan, límites, cupo de imágenes)
"use client";

import { useCallback, useEffect, useState } from "react";
import { AccountData } from "@/app/auth/types/account";

const ACCOUNT_UPDATED_EVENT = "account:updated";

function readAccountCookie(): AccountData | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/(?:^|; )account=([^;]*)/);
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

// Llamar después de cualquier operación que cambie el "account" guardado
// (login, /auth/me, subir/reemplazar/borrar imagen) para que TODOS los
// componentes que usan useAccount() se actualicen solos, sin recargar la página.
export function notifyAccountUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ACCOUNT_UPDATED_EVENT));
  }
}

export function useAccount() {
  const [account, setAccount] = useState<AccountData | null>(null);

  const refresh = useCallback(() => {
    setAccount(readAccountCookie());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(ACCOUNT_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(ACCOUNT_UPDATED_EVENT, refresh);
  }, [refresh]);

  return { account, refresh };
}