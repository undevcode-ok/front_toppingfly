"use server";

import { cookies } from "next/headers";
import { handleAuthResponse } from "@/lib/actions/with-auth";
import { AccountData } from "@/app/auth/types/account";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ImageOperationResponse {
  ok: boolean;
  account?: AccountData;
  images?: unknown[];
}

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("token")?.value;
  const tenant = cookieStore.get("subdomain")?.value;

  if (!authToken || !tenant) {
    throw new Error("No se encontraron credenciales de sesión.");
  }

  return { authToken, tenant };
}

// Guarda en la cookie "account" el plan/límites/cupo de imágenes más reciente
// que devuelva el backend tras cualquier operación de imágenes.
async function persistAccount(account?: AccountData) {
  if (!account) return;
  const cookieStore = await cookies();
  await cookieStore.set(
    "account",
    encodeURIComponent(JSON.stringify(account)),
    { path: "/" }
  );
}

// Cuando el backend rechaza una subida por FREE_PLAN_IMAGE_UPLOAD_LIMIT,
// trae en "details" el uploadsUsed/uploadsRemaining actualizados aunque la
// subida haya fallado. Los aplicamos igual para que el contador no quede
// desincronizado.
export async function patchImageQuotaFromErrorDetails(
  details?: Record<string, unknown>
) {
  if (!details) return;

  const current = typeof details.current === "number" ? details.current : undefined;
  const remaining = typeof details.remaining === "number" ? details.remaining : undefined;
  if (current === undefined && remaining === undefined) return;

  const cookieStore = await cookies();
  const raw = cookieStore.get("account")?.value;
  if (!raw) return;

  try {
    const account: AccountData = JSON.parse(decodeURIComponent(raw));
    if (!account.imagePolicy) return;
    if (current !== undefined) account.imagePolicy.uploadsUsed = current;
    if (remaining !== undefined) account.imagePolicy.uploadsRemaining = remaining;
    await cookieStore.set(
      "account",
      encodeURIComponent(JSON.stringify(account)),
      { path: "/" }
    );
  } catch {
    // cookie corrupta o imposible de parsear: no hacemos nada
  }
}

// Sube una imagen NUEVA para un ítem (no reemplaza ninguna existente).
export async function uploadItemImage(
  itemId: number,
  file: File,
  meta: { alt?: string; sortOrder?: number; active?: boolean } = {}
): Promise<ImageOperationResponse> {
  const { authToken, tenant } = await getAuthHeaders();
  const fileField = "image";

  const formData = new FormData();
  formData.append(
    "payload",
    JSON.stringify({
      images: [
        {
          fileField,
          alt: meta.alt,
          sortOrder: meta.sortOrder ?? 0,
          active: meta.active ?? true,
        },
      ],
    })
  );
  formData.append(fileField, file, file.name);

  const response = await fetch(`${BASE_URL}/images/items/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant,
    },
    body: formData,
  });

  await handleAuthResponse(response);

  const data: ImageOperationResponse = await response.json();
  await persistAccount(data.account);
  return data;
}

// Reemplaza una imagen existente por un archivo nuevo.
// El campo binario debe llamarse "replacement": lo exige el backend.
export async function replaceItemImage(
  itemId: number,
  imageId: number,
  file: File
): Promise<ImageOperationResponse> {
  const { authToken, tenant } = await getAuthHeaders();

  const formData = new FormData();
  formData.append(
    "payload",
    JSON.stringify({
      images: [{ id: imageId, fileField: "replacement" }],
    })
  );
  formData.append("replacement", file, file.name);

  const response = await fetch(`${BASE_URL}/images/items/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant,
    },
    body: formData,
  });

  await handleAuthResponse(response);

  const data: ImageOperationResponse = await response.json();
  await persistAccount(data.account);
  return data;
}

// Borra una imagen existente. No consume ni libera cupo (deletionRestoresQuota: false).
export async function deleteItemImage(
  itemId: number,
  imageId: number
): Promise<ImageOperationResponse> {
  const { authToken, tenant } = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}/images/items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "x-tenant-subdomain": tenant,
    },
    body: JSON.stringify({
      images: [{ id: imageId, _delete: true }],
    }),
  });

  await handleAuthResponse(response);

  const data: ImageOperationResponse = await response.json();
  await persistAccount(data.account);
  return data;
}