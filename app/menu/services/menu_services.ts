"use server";
import { Menu } from "../types/menu";
import { cookies } from "next/headers";
import { handleAuthResponse } from "@/lib/actions/with-auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//id que le pegue a la url
//

export const getMenu = async (id: string): Promise<Menu> => {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("token");
  const subdomainCookie = cookiesStore.get("subdomain");
  const authToken = tokenCookie?.value;
  const tenant = subdomainCookie?.value;
  try {
    const response = await fetch(`${BASE_URL}/menus/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "x-tenant-subdomain": tenant || "",
      },
    });

    await handleAuthResponse(response);

    return await response.json();
  } catch (error) {
    console.error("Error al cargar menu:", error);
    throw error;
  }
};
