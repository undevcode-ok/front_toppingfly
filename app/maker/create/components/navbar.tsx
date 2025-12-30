// navbar de crear menu
"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/common/components/organism/menubar";
import Image from "next/image";

export const Navbar = () => {
  return (
    <Menubar className="w-full justify-between ps-4">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/home"}>
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <div className="flex-1 flex justify-center">
        <MenubarMenu>
          <div className="me-12">
            <Image src="/toppingfly.webp" alt="Logo" width={200} height={200} />
          </div>
        </MenubarMenu>
      </div>
    </Menubar>
  );
};
