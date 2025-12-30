import { useEffect, useState } from "react";

export function useCookie(cookieName: string): string | null {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    };

    const value = getCookie(cookieName);
    setCookieValue(value);
  }, [cookieName]);

  return cookieValue;
}