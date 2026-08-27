import Image from "next/image";
import { Card } from "@/common/components/organism/card";
import { Menu } from "../types/menu";
import { getTextColor } from "../utils/color_utils";
import { UtensilsCrossed } from "lucide-react";

interface MenuHeaderProps {
  menu: Menu;
  isPreview: boolean;
}

export function MenuHeader({ menu, isPreview }: MenuHeaderProps) {
  const textColorClass = menu.backgroundImage
    ? "text-white"
    : getTextColor(menu.color?.primary || "#fff");

  const descriptionColorClass = menu.backgroundImage
    ? "text-white/90"
    : textColorClass === "text-white"
    ? "text-white/90"
    : "text-black/90";

  return (
    <header className={`relative h-64 sm:h-80 md:h-96 w-full sm:w-full ${isPreview ? 'mt-14' : 'mt-0'}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={
          menu.backgroundImage
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.68)), url(${menu.backgroundImage})`,
                backgroundSize: "cover", // Mantiene la proporción de la imagen
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat", // Evita que la imagen se repita
              }
            : { backgroundColor: menu.color?.primary }
        }
      />

      <div className="relative flex flex-col items-center justify-center text-center h-full px-4 w-full">
        <Card className="p-2 w-28 h-28 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden bg-white/90 border-0 mb-3">
          {menu.logo ? (
            <Image
              src={menu.logo}
              alt="Logo"
              width={112}
              height={112}
              className="object-contain w-full h-full"
            />
          ) : (
            <UtensilsCrossed className="w-12 h-12 text-slate-400" />
          )}
        </Card>

        <h1
          className={`text-3xl sm:text-4xl font-semibold drop-shadow-lg ${textColorClass}`}
        >
          {menu.title}
        </h1>

        <p className={`text-md sm:text-lg mt-1 ${descriptionColorClass}`}>
          {menu.pos}
        </p>
      </div>
    </header>
  );
}