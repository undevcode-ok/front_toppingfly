// carga el menu al componente.
import { useState, useEffect } from "react";
import { getMenuId } from "../services/menu";
import { Menu } from "@/app/home/types/menu";


export function useFetchMenu(menuId: string | null) {
  const [menuData, setMenuData] = useState<Menu | null>(null);
  //const [error, setError] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!menuId) {
      //setError("No se encontró el ID del menú");
      return;
    }

    const fetchMenuData = async () => {
      //setLoading(true);
      try {
        const menu = await getMenuId(Number(menuId)); // Llamamos a la capa de aplicación
        if (menu) {
          setMenuData(menu);
        } else {
          //setError("Error al obtener el menú");
        }
      } catch (err) {
        //setError("Error al obtener el menú");
      } finally {
        //setLoading(false);
      }
    };

    fetchMenuData();
  }, [menuId]);

  return { menuData };
}