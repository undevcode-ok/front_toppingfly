"use client";

import React from "react";
import { UtensilsCrossed } from "lucide-react";
import { Spinner } from "@/common/components/atoms/spinner";
import { useItemImage } from "../../hooks/use_item_image";

interface ItemImageProps {
  imageUrl: string | null;
  alt?: string;
}

export const ItemImage: React.FC<ItemImageProps> = ({ 
  imageUrl, 
  alt = "Item" 
}) => {
  const { loadingImage } = useItemImage(imageUrl);

  if (!imageUrl) {
    return (
      <div className="w-12 h-12 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
        <UtensilsCrossed className="w-6 h-6 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 shrink-0 rounded-lg border border-slate-200 relative overflow-hidden">
      {loadingImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg z-10">
          <Spinner className="w-6 h-6 text-orange-500" />
        </div>
      )}
      <div
        className="w-full h-full bg-center bg-cover rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
};