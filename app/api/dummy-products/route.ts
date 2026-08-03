import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types/product";

interface DummyJsonReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface DummyJsonProduct {
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

const DUMMY_BASE = "https://dummyjson.com";
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Maison Label Leather Tee",
    brand: "TAO Studio",
    category: "T-Shirts",
    description: "A premium leather-effect staple with a relaxed cut, polished for everyday luxury.",
    materials: "Premium cotton blend with vegan leather details.",
    features: ["Soft matte finish", "Dropped shoulders", "Sculpted collar", "Light stretch for comfort"],
    price: 95,
    originalPrice: 150,
    discount: 37,
    rating: 4.9,
    reviewCount: 184,
    colors: ["Onyx", "Ivory", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/product-placeholder.svg",
    hoverImage: "/images/product-placeholder.svg",
    badges: ["Best Seller", "Low Stock"],
    available: true,
  },
];

function mapDummyProduct(product: DummyJsonProduct): Product {
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

async function fetchDummyProducts(category?: string, limit = 9, skip = 0): Promise<{ items: Product[]; total: number }> {
  const categoryPath = category && category.toLowerCase() !== "all"
    ? `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

  const url = `${DUMMY_BASE}${categoryPath}`;
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error("DummyJSON fetch failed");
  }

  const payload = await response.json();
  const rawProducts: DummyJsonProduct[] = Array.isArray(payload.products) ? payload.products : payload.products ?? payload;
  const total = typeof payload.total === "number" ? payload.total : rawProducts.length;

  return {
    items: rawProducts.map(mapDummyProduct),
    total,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || "All";
  const limit = Number(searchParams.get("limit") ?? 9);
  const skip = Number(searchParams.get("skip") ?? 0);

  try {
    const { items, total } = await fetchDummyProducts(category, limit, skip);
    return NextResponse.json({ items, total });
  } catch {
    return NextResponse.json({ items: FALLBACK_PRODUCTS, total: FALLBACK_PRODUCTS.length });
  }
}
