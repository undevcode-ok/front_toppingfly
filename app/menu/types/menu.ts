export interface Menu {
  active: boolean;
  backgroundImage: string;
  categories: Categories[];
  id: number;
  userId: number;
  title: string;
  logo: string;
  color: {
    primary: string;
    secondary: string;
  };
  pos: string;
  createdAt: string;
  updatedAt: string;
}

//trasladarlo cuando los use
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

//trasladarlo cuando los use
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

//trasladarlo cuando los use
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