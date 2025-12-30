//almacenamiento de cookies token,subdomain y roleid

"use server";
import { authResponse } from "../types/auth_response";
import { cookies } from "next/headers";

export const handleLoginResponse = async (response: authResponse) => {
  const cookiesStore = await cookies();
  await cookiesStore.set("token", response.token, {
    path: "/",
    httpOnly: true,
  });
  await cookiesStore.set("subdomain", response.user.subdomain, { path: "/" });
  await cookiesStore.set("roleId", response.user.roleId.toString(), {
    path: "/",
  });
};
