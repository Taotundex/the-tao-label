export type ProductCategory = string;

export type ProductBadge = "Best Seller" | "Low Stock" | "Sale";

export interface ProductReview {
  id: number | string;
  name: string;
  rating: number;
  comment: string;
  date?: string | null;
  reviewerEmail?: string;
  verified?: boolean;
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: ProductCategory;
  description: string;
  materials: string;
  features: string[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  colors: string[];
  sizes: string[];
  image: string;
  hoverImage: string;
  badges: ProductBadge[];
  available: boolean;
}
