import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/common/components/organism/dialog";
import Image from "next/image";
import { Items } from "../types/menu";
import { Inter } from "next/font/google";
import { useMemo } from "react";
import { isDarkColor } from "../utils/color_utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ItemDetailDialogProps {
  item: Items | null;
  primaryColor?: string;
  onClose: () => void;
}

export function ItemDetailDialog({
  item,
  primaryColor,
  onClose,
}: ItemDetailDialogProps) {
  const isDark = useMemo(() => isDarkColor(primaryColor), [primaryColor]);

  if (!item) return null;

  const firstImage = item.images?.[0];
  const imageSrc = firstImage?.url;
  const imageAlt = firstImage?.alt;
  const isAvailable = item.active !== false;

  const dialogBg = isDark
    ? "bg-neutral-900 border-neutral-700"
    : "bg-white border-neutral-200";
  const titleColor = isDark ? "text-white" : "text-black";
  const textColor = isDark ? "text-white/80" : "text-black/70";
  const priceColor = isDark ? "text-white" : "text-black";

  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent
        className={`w-[95vw] pt-4 max-w-lg sm:max-w-xl p-0 overflow-hidden rounded-3xl border shadow-2xl ${dialogBg} [&>button]:hidden`}
      >
        {firstImage && (
          <div className="relative w-full h-72 sm:h-80 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt || item.title}
              fill
              className="object-cover"
            />

            <DialogClose
              className={`absolute top-4 right-4 flex items-center justify-center ${
                isDark ? "text-white" : "text-black"
              } text-3xl z-10`}
            >
              &times;
            </DialogClose>
          </div>
        )}

        <div className={`flex flex-col gap-4 p-6 sm:p-8 overflow-hidden ${inter.className}`}>
          <DialogTitle
            className={`text-2xl sm:text-3xl font-semibold tracking-tight wrap-break-word ${titleColor}`}
          >
            {item.title}
          </DialogTitle>

          {item.description && (
            <DialogDescription
              className={`text-base sm:text-lg leading-relaxed wrap-break-word overflow-wrap-anywhere ${textColor} py-4`}
            >
              {item.description}
            </DialogDescription>
          )}

          {isAvailable ? (
            <p className={`text-2xl font-semibold tracking-tight ${priceColor}`}>
              ${item.price}
            </p>
          ) : (
            <span
              className={`inline-block text-sm px-3 py-1 rounded-md font-medium ${
                isDark
                  ? "bg-red-400/20 text-red-200 border border-red-400/30"
                  : "bg-red-500/10 text-red-700 border border-red-500/20"
              }`}
            >
              No disponible
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}