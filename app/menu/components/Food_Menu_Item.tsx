import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Items } from "../types/menu";
import { Inter } from "next/font/google";
import { isDarkColor } from "../utils/color_utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface FoodMenuItemProps extends Items {
  primaryColor?: string;
}

export function FoodMenuItem({
  title,
  description,
  price,
  images,
  primaryColor,
  active,
}: FoodMenuItemProps) {
  const firstImage = images?.[0];
  const imageSrc = firstImage?.url;
  const imageAlt = firstImage?.alt || title;
  const isAvailable = active !== false;
  const priceNumber = typeof price === "string" ? parseFloat(price) : price;

  const isDark = useMemo(
    () => isDarkColor(primaryColor),
    [primaryColor]
  );

  const ringClass = isDark
    ? "ring-1 ring-white/10 shadow-lg"
    : "ring-1 ring-black/10 shadow-sm";
  const textColorClass = isDark ? "text-white/90" : "text-black/80";
  const titleColorClass = isDark ? "text-white" : "text-black";
  const priceColorClass = isDark ? "text-white" : "text-black";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-4 ${inter.className}`}
    >
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-2xl leading-tight tracking-tight wrap-break-word ${titleColorClass} pb-2`}>
          {title}
        </h3>

        {description && (
          <p className={`text-base line-clamp-3 mt-1 wrap-break-word ${textColorClass} pt-2 pb-2`}>
            {description}
          </p>
        )}

        {isAvailable ? (
          priceNumber !== null && priceNumber > 0 && (
            <p className={`text-xl font-bold mt-2 tracking-tight ${priceColorClass} pt-4`}>
              ${priceNumber.toFixed(2)}
            </p>
          )
        ) : (
          <div className="mt-3">
            <span
              className={`text-base px-2 py-1 rounded-md font-medium ${
                isDark
                  ? "bg-red-400/20 text-red-200 border border-red-400/30"
                  : "bg-red-500/10 text-red-700 border border-red-500/20"
              }`}
            >
              No disponible
            </span>
          </div>
        )}
      </div>

      {imageSrc && (
        <div className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center bg-transparent ring-1 ${ringClass}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={96}
            height={96}
            className="object-contain w-full h-full"
          />
        </div>
      )}
    </motion.div>
  );
}