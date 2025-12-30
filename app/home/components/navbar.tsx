// navbar de home
"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";
import { UtensilsCrossed, LogOut } from "lucide-react";
import Link from "next/link";
import { handleLogout } from "../services/log_out_service";
import { useCookie } from "../hooks/use_cookies";
import Image from "next/image";

export const Navbar = () => {
  const roleId = useCookie("roleId");

  return (
    <Menubar className="w-full justify-between ps-4">
      <MenubarMenu>
        {roleId === "1" ? (
          <MenubarTrigger>
            <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
          </MenubarTrigger>
        ) : (
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md cursor-default">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
        )}
        {roleId === "1" && (
          <MenubarContent>
            <MenubarItem>
              <Link href={"/user/create/account"}>Crear Usuario</Link>
            </MenubarItem>
            <MenubarItem disabled>Cuentas</MenubarItem>
            <MenubarItem disabled>Otra opcion</MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>

      <MenubarMenu>
        <Image src="/toppingfly.webp" alt="Logo" width={200} height={200} />
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={handleLogout}>
          <LogOut className="w-6 h-6 text-slate-700" />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
