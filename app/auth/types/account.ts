// tipado del objeto "account" que devuelven register-free, login, /auth/me
// y las operaciones de imágenes (con el account actualizado tras cada una)

export interface AccountLimits {
  menus: number | null;
  categoriesPerMenu: number | null;
  itemsPerMenu: number | null;
  images: boolean;
}

export interface ImagePolicy {
  lifetimeUploadLimit: number;
  uploadsUsed: number;
  uploadsRemaining: number;
  maxFileSizeBytes: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
  scope: string;
  acceptsExternalUrls: boolean;
  deletionRestoresQuota: boolean;
}

export interface AccountData {
  plan: string;
  limits: AccountLimits;
  imagePolicy?: ImagePolicy;
}