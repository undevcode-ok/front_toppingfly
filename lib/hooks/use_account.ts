// lee y parsea la cookie "account" (plan, límites, cupo de imágenes)
"use client";

import { useCallback, useEffect, useState } from "react";
import { AccountData } from "@/app/auth/types/account";

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

export function useAccount() {
  const [account, setAccount] = useState<AccountData | null>(null);

  const refresh = useCallback(() => {
    setAccount(readAccountCookie());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { account, refresh };
}