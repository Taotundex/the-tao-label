import type { Product } from "@/types/product";

export interface DummyJsonReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: DummyJsonReview[];
}

export const DUMMY_BASE = "https://dummyjson.com";

export function mapDummyProduct(product: DummyJsonProduct): Product {
  const price = Number(product.price) || 0;
  const originalPrice = Math.max(price + 35, Math.round(price * 1.2));
  const discount = price > 0 ? Math.round(100 - (price / originalPrice) * 100) : 0;
  const badges: Product["badges"] = [];

  if (product.rating >= 4.5) badges.push("Best Seller");
  if (price < 100) badges.push("Sale");
  if (product.stock < 20) badges.push("Low Stock");

  return {
    id: product.id,
    title: product.title,
    brand: product.brand || "TAO Label",
    category: product.category || "All",
    description: product.description || "Premium collection item.",
    materials: "Premium materials handcrafted for quality.",
    features: ["Refined finish", "Premium touch", "Effortless wear"],
    price,
    originalPrice,
    discount,
    rating: Number(product.rating) || 4.0,
    reviewCount: product.reviews?.length ?? product.stock ?? 0,
    reviews: Array.isArray(product.reviews)
      ? product.reviews.map((review, index) => ({
          id: review.reviewerEmail ? review.reviewerEmail : `${product.id}-${index}`,
          name: review.reviewerName || "Anonymous",
          rating: Number(review.rating ?? 0),
          comment: review.comment || "",
          date: review.date ?? null,
          reviewerEmail: review.reviewerEmail,
          verified: Boolean(review.reviewerEmail),
        }))
      : undefined,
    colors: ["Onyx", "Ivory", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    image: product.thumbnail || "/images/product-placeholder.svg",
    hoverImage: product.images?.[0] || product.thumbnail || "/images/product-placeholder.svg",
    badges: badges.length > 0 ? badges : ["Best Seller"],
    available: (product.stock ?? 0) > 0,
  };
}
