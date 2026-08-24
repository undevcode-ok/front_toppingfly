// si un usuario Free ya tiene un menú y entra directo a /maker/create por URL,
// lo mandamos de vuelta a /home. Es una red de respaldo: el botón de "Crear
// nuevo menú" en /home ya se oculta en ese caso, pero esto cubre el acceso directo.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookie } from "@/lib/hooks/use_cookie";
import { getAllMenus } from "@/app/home/services/menu_service";

const FREE_ROLE_ID = "4";
const FREE_MENU_LIMIT = 1;

export const FreePlanCreateGuard = () => {
  const router = useRouter();
  const roleId = useCookie("roleId");

  useEffect(() => {
    if (roleId !== FREE_ROLE_ID) return;

    const checkMenuLimit = async () => {
      try {
        const menus = await getAllMenus();
        if (menus.length >= FREE_MENU_LIMIT) {
          toast.error("Tu plan Free permite un solo menú activo.");
          router.replace("/home");
        }
      } catch (error) {
        console.error("Error al validar el límite de menús del plan Free:", error);
      }
    };

    checkMenuLimit();
  }, [roleId, router]);

  return null;
};