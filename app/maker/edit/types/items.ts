export interface Item {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  images: ImageItems[];
  active: boolean;
  price: number;
  title: string;
  updatedAt: string;
  position: number;
}

export interface ImageItems {
  active: boolean;
  alt: string;
  createdAt: string;
  id: number;
  itemId: number;
  sortOrder: number;
  updatedAt: string;
  url: string;
}

export interface NewItem {
  title: string;
  description?: string;
  price?: number | null;
  images?: ImageItems[];
  categoryId: number;
  active: boolean;
}

export interface UpdateItemPosition {
  newPosition: number;
}


