import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const handleMenuClick = (menuId: number, menuTitle: string, router: AppRouterInstance | string[]) => {
    if (router) {
      router.push(
        `/maker/edit?id=${menuId}&title=${encodeURIComponent(menuTitle)}`
      );
    }
  };