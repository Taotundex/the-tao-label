export type FreeClothCategory = "T-Shirts" | "Shirts" | "Pants" | "Hoodies" | "Accessories";

export interface FreeClothItem {
  id: number;
  title: string;
  description: string;
  materials: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  available: boolean;
}

export interface FreeClothOrderRequest {
  productId: number;
  name: string;
  email: string;
  size?: string;
  color?: string;
  quantity?: number;
}
