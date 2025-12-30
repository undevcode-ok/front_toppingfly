import { Menu } from "../types/menu";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//id que le pegue a la url
//


export const getPublicMenu = async (id: string): Promise<Menu> => {
  try {
      const response = await fetch(`${BASE_URL}/public/menus/${id}`, {
          method: "GET",
          headers: {
              "Content-type": "application/json",
          },
      });

      if(!response.ok){
        if(response.status === 401){
          throw new Error("menu incorrecto");
        }
        else {
          throw new Error("Error al cargar el menu");
        }  
      }
      return await response.json();
    } catch (error) {
      console.error("Error al cargar menu:", error);
      throw error;
    }
};

