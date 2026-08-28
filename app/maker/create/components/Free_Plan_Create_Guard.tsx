// si un usuario Free o Full ya alcanzó su límite de menús y entra directo a
// /maker/create por URL, lo mandamos de vuelta a /home. Es una red de respaldo:
// el botón de "Crear nuevo menú" en /home ya debería ocultarse en ese caso,
// pero esto cubre el acceso directo.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookie } from "@/lib/hooks/use_cookie";
import { getAllMenus } from "@/app/home/services/menu_service";
import { UpgradePlanLink } from "@/common/components/molecules/upgrade_plan_link";

const FREE_ROLE_ID = "4";
const FREE_MENU_LIMIT = 1;

const FULL_ROLE_ID = "2";
const FULL_MENU_LIMIT = 3;

export const FreePlanCreateGuard = () => {
  const router = useRouter();
  const roleId = useCookie("roleId");

  useEffect(() => {
    const menuLimit =
      roleId === FREE_ROLE_ID
        ? FREE_MENU_LIMIT
        : roleId === FULL_ROLE_ID
        ? FULL_MENU_LIMIT
        : null;

    if (menuLimit === null) return;

    const checkMenuLimit = async () => {
      try {
        const menus = await getAllMenus();
        if (menus.length >= menuLimit) {
          if (roleId === FREE_ROLE_ID) {
            toast.error(
              <span>
                Tu plan Free permite un solo menú activo.{" "}
                <UpgradePlanLink className="underline font-bold text-white hover:text-orange-100" />
              </span>
            );
          } else {
            toast.error("Tu plan Full permite hasta 3 menús activos.");
          }
          router.replace("/home");
        }
      } catch (error) {
        console.error("Error al validar el límite de menús del plan:", error);
      }
    };

    checkMenuLimit();
  }, [roleId, router]);

  return null;
};