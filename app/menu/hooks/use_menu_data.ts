// src/features/menu/hooks/useMenuData.ts

import { useState, useEffect } from "react";
import { Menu, Categories } from "../types/menu";
import { getPublicMenu } from "../services/public_menu_services";
import { getMenu } from "../services/menu_services"; // 👈 NUEVO: Importamos el servicio privado

export function useMenuData(menuId: string | null, isPreview: boolean = false) { // 👈 MODIFICADO: Agregamos isPreview
  const [menu, setMenu] = useState<Menu>({} as Menu);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!menuId) {
      setIsLoading(false);
      return;
    }

    const loadMenu = async () => {
        console.log(menuId)
      try {
        setIsLoading(true);
        setError(null);
        
        // 👇 LÓGICA CLAVE: Decidimos qué servicio usar según isPreview
        const menuData = isPreview 
          ? await getMenu(menuId)           // Preview desde editor (con auth)
          : await getPublicMenu(menuId);    // Menú público (sin auth)
        
        console.log("Menú cargado:", menuData);
        
        setMenu(menuData);

        const sortedCategories = [...menuData.categories].sort(
          (a, b) => a.position - b.position
        );
        setCategories(sortedCategories);
      } catch (error) {
        console.error("❌ Error al cargar el menú:", error);
        setError(error instanceof Error ? error.message : "Error al cargar el menú");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, [menuId, isPreview]); // 👈 MODIFICADO: Agregamos isPreview a las dependencias

  return { menu, categories, isLoading, error };
}