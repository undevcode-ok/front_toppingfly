// navbar de crear menu
"use client";
import { ChevronLeft, Eye } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";
import { Menu } from "@/app/home/types/menu";
import { Button } from "@/common/components/atoms/button";
import Image from "next/image";

interface MenuCardProps {
  menuData: Menu | null;
}

export const Navbar = ({ menuData }: MenuCardProps) => {
  // Verifica si menuData es null antes de intentar acceder a menuId
  if (!menuData) {
    return null; // O cualquier renderizado alternativo si no hay menuData
  }

  const menuId = menuData.id;

  return (
    <Menubar className="w-full justify-between ps-4 pe-6">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/home"}>
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <div className="ms-0">
          <Image src="/toppingfly.webp" alt="Logo" width={200} height={200} />
        </div>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className=" flex items-center bg-orange-500 text-white rounded-lg h-10 w-10 shadow-md hover:bg-orange-600 transition-colors">
          
            <Link href={`/menu?id=${menuId}&preview=true`}>
              <Eye className=" w-6! h-6! text-white" />
            </Link>
          
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
