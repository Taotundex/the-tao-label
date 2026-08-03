import { products } from "@/data/products";
import type { Product } from "@/types/product";

const FALLBACK_PRODUCTS: Product[] = products;

export async function fetchProductCatalog(
  category?: string,
  limit = 9,
  skip = 0
): Promise<{ items: Product[]; total: number }> {
  try {
    const categoryParam = category ? `&category=${encodeURIComponent(category)}` : "";
    const response = await fetch(`/api/dummy-products?limit=${limit}&skip=${skip}${categoryParam}`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load product catalog");
    }

    const payload = await response.json();
    if (!payload?.items || !Array.isArray(payload.items)) {
      throw new Error("Invalid product catalog response");
    }

    return {
      items: payload.items as Product[],
      total: typeof payload.total === "number" ? payload.total : payload.items.length,
    };
  } catch {
    return { items: FALLBACK_PRODUCTS, total: FALLBACK_PRODUCTS.length };
  }
}

export async function fetchCategories(): Promise<{ slug: string; name: string; url: string }[]> {
  try {
    const res = await fetch(`/api/dummy-products/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load categories");

    const payload = await res.json();
    if (!payload?.categories || !Array.isArray(payload.categories)) return [];

    return payload.categories as { slug: string; name: string; url: string }[];
  } catch {
    return [];
  }
}
