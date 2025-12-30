import { motion } from "framer-motion";
import { getTextColor } from "../utils/color_utils";

interface CategoryButtonProps {
  categoryId: number;
  title: string;
  isActive: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  onClick: (categoryId: number) => void;
}

export function CategoryButton({
  categoryId,
  title,
  isActive,
  primaryColor = "#fff",
  secondaryColor = "#000",
  onClick,
}: CategoryButtonProps) {
  const activeTextColor = getTextColor(secondaryColor);
  const inactiveTextColor = getTextColor(primaryColor);

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => onClick(categoryId)}
      className={` text-base
        px-5 py-2 rounded-full font-medium transition-all  whitespace-nowrap
        backdrop-blur-lg
        ${isActive ? activeTextColor : `${inactiveTextColor} text-opacity-80 hover:text-opacity-100`}
      `}
      style={{
        backgroundColor: isActive ? secondaryColor : "rgba(255,255,255,0.25)",
        border: isActive
          ? "1px solid rgba(255,255,255,0.35)"
          : "1px solid rgba(255,255,255,0.15)",
        boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      }}
    >
      {title}
    </motion.button>
  );
}