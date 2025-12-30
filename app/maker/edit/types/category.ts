export interface Categories {
  active: boolean;
  createdAt: string;
  id: number;
  items: Items[];
  menuId: number;
  title: string;
  updatedAt: string;
  position: number;
}

export interface Items {
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