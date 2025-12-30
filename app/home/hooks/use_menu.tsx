import { useState, useEffect } from "react";
import { Menu } from "../types/menu";
import { getAllMenus } from "../services/menu_service";

export const useMenus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setIsLoading(true);
        // llamar al API para obtener menús
        const data = await getAllMenus();
        setMenus(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return { menus, isLoading };
};