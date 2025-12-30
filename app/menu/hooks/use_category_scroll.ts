import { useRef } from "react";
import { MENU_CONSTANTS } from "../constants/menu_constants";

export function useCategoryScroll() {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToCategory = (
    categoryId: number,
    onScrollStart: () => void,
    onScrollEnd: () => void
  ) => {
    onScrollStart();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(categoryId.toString());
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - MENU_CONSTANTS.NAV_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      scrollTimeoutRef.current = setTimeout(() => {
        onScrollEnd();
      }, MENU_CONSTANTS.SCROLL_TIMEOUT);
    }
  };

  return { scrollToCategory };
}