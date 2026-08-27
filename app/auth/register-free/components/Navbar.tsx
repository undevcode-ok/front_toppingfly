// navbar de registro free: igual al de "crear usuario", pero el botón atrás
// lleva a la landing page (/) en vez de a /home, ya que acá no hay sesión iniciada.
import { ChevronLeft, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";

export const Navbar = () => {
  return (
    <Menubar className="w-full justify-between">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/"}>
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};