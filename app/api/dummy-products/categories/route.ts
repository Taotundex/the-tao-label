import { NextRequest, NextResponse } from "next/server";

const DUMMY_CATEGORIES_URL = "https://dummyjson.com/products/categories";

export async function GET(_: NextRequest) {
  try {
    const res = await fetch(DUMMY_CATEGORIES_URL);
    if (!res.ok) throw new Error("Failed to fetch categories");

    const payload = await res.json();

    // DummyJSON may return an array of strings or objects; normalize to { slug, name, url }
    let categories: { slug: string; name: string; url: string }[] = [];

    if (Array.isArray(payload)) {
      // payload could be array of strings or objects
      if (typeof payload[0] === "string") {
        categories = payload.map((slug: string) => ({
          slug,
          name: slug
            .replace(/[-_]/g, " ")
            .split(" ")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" "),
          url: `https://dummyjson.com/products/category/${encodeURIComponent(slug)}`,
        }));
      } else {
        // assume objects with slug/name/url or similar
        categories = payload.map((c: any) => ({
          slug: c.slug || String(c),
          name: c.name || (String(c.slug || c)).replace(/[-_]/g, " "),
          url: c.url || `https://dummyjson.com/products/category/${encodeURIComponent(c.slug || c)}`,
        }));
      }
    }

    return NextResponse.json({ categories });
  } catch (e) {
    return NextResponse.json({ categories: [] }, { status: 502 });
  }
}
