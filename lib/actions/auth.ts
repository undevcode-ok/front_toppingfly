"use server";
import { cookies } from "next/headers";

export const getAuthToken = async (): Promise<string | undefined> => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  return token?.value;
};