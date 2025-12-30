"use client";
import { Card } from "@/common/components/organism/card";
import Image from "next/image";
import { UtensilsCrossed, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleMenuClick } from "../hooks/menu_handler";
import { useMenus } from "../hooks/use_menu";
import { motion } from "framer-motion";
import { Manrope } from "next/font/google";
import { Loader } from "./Loader";
import { StartMenuList } from "./Start_Menu_List";
const manrope = Manrope({ subsets: ["latin"] });

export const MenuList = () => {
  const { menus, isLoading } = useMenus();
  const router = useRouter();


  /*carga de menus */
  if (isLoading) {
    return (
      <Loader />
    );
  }

  /* no hay menus */
  if (menus.length === 0) {
    return (
      <StartMenuList />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {menus.map((menu) => (
        <motion.div
          key={menu.id}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 110,
              damping: 18,
              duration: 0.45,
            },
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer overflow-hidden rounded-3xl bg-transparent"
        >
          <Card
  onClick={() => handleMenuClick(menu.id, menu.title, router)}
  className="p-0 border-0 cursor-pointer group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
>
  <div
    className="relative h-40 lg:h-56 p-6 flex flex-col items-center justify-between"
    style={{
      backgroundImage: `linear-gradient(135deg, ${menu.color?.primary}, ${menu.color?.secondary})`,
    }}
  >
    <div className="flex-1 flex items-center justify-center">
      <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
        <Image
          src={menu.logo}
          alt={menu.title}
          width={menu.logo.includes("default_menu") ? 50 : 100}
          height={menu.logo.includes("default_menu") ? 50 : 100}
          className="object-contain"
          priority
        />
      </div>
    </div>

    <h3 className="text-white font-bold text-base lg:text-lg text-center overflow-hidden text-ellipsis whitespace-nowrap w-full max-w-50">
      {menu.title}
    </h3>
  </div>
</Card>
        </motion.div>
      ))}
    </div>
  );
};
