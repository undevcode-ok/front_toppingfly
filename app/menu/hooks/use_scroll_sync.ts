import { useEffect } from "react";
import { Categories } from "../types/menu";
import { MENU_CONSTANTS } from "../constants/menu_constants";

interface UseScrollSyncProps {
  categories: Categories[];
  isScrolling: boolean;
  onCategoryChange: (categoryId: number) => void;
}

export function useScrollSync({
  categories,
  isScrolling,
  onCategoryChange,
}: UseScrollSyncProps) {
  useEffect(() => {
    if (categories.length === 0) return;

    const handleScroll = () => {
      if (isScrolling) return;

      const categoryIds = categories.map((cat) => cat.id);

      // Detectar si está al final de la página
      const isAtBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (isAtBottom) {
        onCategoryChange(categoryIds[categoryIds.length - 1]);
        return;
      }

      // Encontrar categoría visible
      for (let i = categoryIds.length - 1; i >= 0; i--) {
        const categoryId = categoryIds[i];
        const element = document.getElementById(categoryId.toString());

        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= MENU_CONSTANTS.NAV_HEIGHT + MENU_CONSTANTS.NAV_OFFSET) {
            onCategoryChange(categoryId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, isScrolling, onCategoryChange]);
}