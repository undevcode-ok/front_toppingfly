// src/features/menu/components/MenuNavbar/MenuNavbar.tsx

import { motion } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { addOpacity, isDarkColor } from "../utils/color_utils";

interface MenuNavbarProps {
  primaryColor?: string;
  menuId: string | null;
}

export function MenuNavbar({
  primaryColor = "#ffffff",
  menuId,
}: MenuNavbarProps) {
  const router = useRouter();
  const isNavbarDark = isDarkColor(primaryColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: addOpacity(primaryColor, 70),
      }}
    >
      <div className="max-w-xl mx-auto px-4 py-2 flex items-center justify-start">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-xl transition-colors ${
            isNavbarDark
              ? "hover:bg-white/10 text-white"
              : "hover:bg-black/10 text-black"
          }`}
          onClick={() => router.push(`/menuEditor?id=${menuId}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}