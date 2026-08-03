import { NextRequest, NextResponse } from "next/server";
import type { FreeClothItem, FreeClothOrderRequest } from "@/types/freeCloth";

const freeClothItems: FreeClothItem[] = [
  {
    id: 1,
    title: "Signature Cotton Tee",
    description: "A soft cotton essential with a relaxed luxury fit.",
    materials: "100% premium cotton",
    price: 0,
    image: "/images/product-placeholder.svg",
    colors: ["Onyx", "Ivory", "Sand"],
    sizes: ["S", "M", "L", "XL"],
    available: true,
  },
  {
    id: 2,
    title: "Tailored Resort Shirt",
    description: "Lightweight, breathable shirt designed for effortless style.",
    materials: "Silk blend",
    price: 0,
    image: "/images/product-placeholder.svg",
    colors: ["White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    available: true,
  },
  {
    id: 3,
    title: "Weekend Lounge Pant",
    description: "Comfortable lounge pant with premium finish and modern cut.",
    materials: "Cotton-modal blend",
    price: 0,
    image: "/images/product-placeholder.svg",
    colors: ["Charcoal", "Stone"],
    sizes: ["S", "M", "L", "XL"],
    available: true,
  },
];

export async function GET() {
  return NextResponse.json({ items: freeClothItems });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as FreeClothOrderRequest;

  const product = freeClothItems.find((item) => item.id === body.productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (!product.available) {
    return NextResponse.json({ error: "Product is not available." }, { status: 400 });
  }

  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const quantity = Math.max(1, body.quantity ?? 1);
  const selectedSize = body.size ?? product.sizes[0];
  const selectedColor = body.color ?? product.colors[0];

  return NextResponse.json({
    message: "Free cloth order received.",
    order: {
      productId: product.id,
      title: product.title,
      size: selectedSize,
      color: selectedColor,
      quantity,
      shipping: "Free shipping included",
      contact: {
        name: body.name,
        email: body.email,
      },
    },
  });
}
