// funcion para ir directamente al error
import { useEffect, useRef } from "react";

export const useScrollToError = (hasErrors: boolean) => {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasErrors && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [hasErrors]);

  return errorRef;
};