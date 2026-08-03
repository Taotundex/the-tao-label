"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductModal } from "@/components/products/ProductModal";
import { motion } from "framer-motion";
import { fetchProductCatalog, fetchCategories } from "@/services/products";
import type { Product } from "@/types/product";

type CategoryOption = { slug: string; name: string };

const FALLBACK_CATEGORIES: CategoryOption[] = [
    { slug: "All", name: "All" },
    { slug: "mens-shirts", name: "Mens Shirts" },
    { slug: "womens-dresses", name: "Womens Dresses" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "beauty", name: "Beauty" },
    { slug: "smartphones", name: "Smartphones" },
    { slug: "laptops", name: "Laptops" },
    { slug: "home-decoration", name: "Home Decoration" },
];

const skeletonCount = 6;
const pageSize = 9;

export function ProductsSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(FALLBACK_CATEGORIES);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        setSkip(0);

        // load products for the selected category
        fetchProductCatalog(selectedCategory, pageSize, 0)
            .then(({ items, total }) => {
                if (!isMounted) return;
                setProducts(items);
                setTotal(total);
            })
            .catch(() => {
                if (!isMounted) return;
                setError("Unable to load products at this time.");
            })
            .finally(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [selectedCategory]);

    // fetch categories once on mount
    useEffect(() => {
        let mounted = true;
        fetchCategories()
            .then((cats) => {
                if (!mounted) return;
                if (!cats || cats.length === 0) return;

                const normalized: CategoryOption[] = [
                    { slug: "All", name: "All" },
                    ...cats.map((c: any) => ({ slug: c.slug, name: c.name })),
                ];

                setCategoryOptions(normalized);
            })
            .catch(() => {
                /* keep fallback categories */
            });

        return () => {
            mounted = false;
        };
    }, []);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const nextSkip = skip + pageSize;

        try {
            const { items } = await fetchProductCatalog(selectedCategory, pageSize, nextSkip);
            setProducts((current) => [...current, ...items]);
            setSkip(nextSkip);
        } catch {
            setError("Unable to load more products.");
        } finally {
            setLoadingMore(false);
        }
    };

    const isLoadMoreVisible = !loading && products.length < total && !error;

    const content = loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-[1.75rem] border border-white/10 bg-slate-900/50 p-4">
                    <div className="h-56 rounded-[1.25rem] bg-slate-800" />
                    <div className="mt-4 space-y-3">
                        <div className="h-3 w-1/3 rounded-full bg-slate-700" />
                        <div className="h-4 w-3/4 rounded-full bg-slate-700" />
                        <div className="h-3 w-full rounded-full bg-slate-700" />
                        <div className="h-9 rounded-[0.9rem] bg-slate-800" />
                    </div>
                </div>
            ))}
        </div>
    ) : error ? (
        <div className="rounded-[2rem] border border-rose-400/20 bg-rose-500/10 p-8 text-center text-rose-100">
            {error}
        </div>
    ) : (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid gap-4 grid-cols-2 xl:grid-cols-4"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onViewDetails={() => setSelectedProduct(product)} />
                ))}
            </motion.div>
            {isLoadMoreVisible ? (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-9 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingMore ? "Loading more..." : "Load more"}
                    </button>
                </div>
            ) : null}
        </>
    );

    return (
        <section id="products" className="space-y-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">Fresh arrivals</p>
                    <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">A refined mix of essentials across style, tech, and home.</h2>
                </div>
                <div className="relative">
                    <label htmlFor="category-select" className="sr-only">Category</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 pr-10 text-sm text-slate-200 focus:outline-none focus:ring focus:ring-rose-300"
                    >
                        {categoryOptions.map((category) => (
                            <option key={category.slug} value={category.slug} className="bg-slate-900 text-white">
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {content}
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </section>
    );
}
