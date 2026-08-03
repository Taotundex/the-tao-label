"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
    onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const color = product.colors[0] ?? "Onyx";
    const size = product.sizes[0] ?? "M";

    return (
        <motion.article
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group cursor-pointer overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-3 shadow-xl shadow-black/20 sm:p-4"
            onClick={() => onViewDetails?.(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onViewDetails?.(product); }}
        >
            <div className="relative overflow-hidden rounded-[1.2rem] bg-slate-800">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={720}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {product.badges.slice(0, 2).map((badge) => (
                        <span
                            key={badge}
                            className="rounded-full bg-white/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-100"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between gap-2 text-[0.78rem] text-slate-400">
                    <span className="truncate">{product.brand}</span>
                    <span className="truncate">{product.category}</span>
                </div>
                <div className="space-y-1.5">
                    <h3 className="line-clamp-1 text-base font-semibold text-white">{product.title}</h3>
                    <p className="line-clamp-2 text-sm leading-5 text-slate-400">{product.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-sm text-amber-300">
                        <span className="font-semibold">{product.rating.toFixed(1)}</span>
                        <span>★</span>
                        <span className="text-slate-500">({product.reviewCount})</span>
                    </div>
                    <div className="rounded-full bg-white/5 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-slate-300">
                        {product.available ? "In stock" : "Sold out"}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[0.75rem] text-slate-400">Price</p>
                        <p className="text-base font-semibold text-white">
                            ${product.price.toFixed(2)} <span className="text-sm text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        </p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product, color, size); }}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                    >
                        Add
                    </button>
                </div>
            </div>
        </motion.article>
    );
}
