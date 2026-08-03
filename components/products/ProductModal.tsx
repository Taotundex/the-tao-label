"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

function formatDate(d?: string | null) {
    if (!d) return "";
    try {
        return new Date(d).toLocaleDateString();
    } catch {
        return "";
    }
}

type ReviewNormalized = {
    id: number | string;
    name: string;
    rating: number;
    comment: string;
    date?: string | null;
    verified?: boolean;
};

export function ProductModal({ product, onClose }: ProductModalProps) {
    const addToCart = useCartStore((s) => s.addToCart);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Normalize product reviews from the API response only
    const normalizedReviews = useMemo<ReviewNormalized[]>(() => {
        if (!product) return [];
        const prodAny = product as any;

        if (Array.isArray(prodAny.reviews) && prodAny.reviews.length > 0) {
            return prodAny.reviews.map((r: any, i: number) => ({
                id: r.id ?? i + 1,
                name: r.reviewerName || r.name || "Anonymous",
                rating: Number(r.rating ?? r.score ?? 0),
                comment: r.comment || r.quote || r.text || "",
                date: r.date ?? null,
                verified: !!r.reviewerEmail,
            }));
        }

        return [];
    }, [product]);

    const averageRating = useMemo(() => {
        if (!product) return 0;
        if (normalizedReviews.length === 0) return product.rating ?? 0;
        let sum = 0;
        for (const r of normalizedReviews) {
            sum += r.rating || 0;
        }
        return Math.round((sum / normalizedReviews.length) * 10) / 10;
    }, [normalizedReviews, product]);

    const images: string[] = useMemo(() => {
        if (!product) return ["/images/placeholder.png"];
        const p = product as any;
        if (Array.isArray(p.images) && p.images.length > 0) return p.images;
        if (p.image) return [p.image];
        return ["/images/placeholder.png"];
    }, [product]);

    if (!product) return null;

    const reviewCount = normalizedReviews.length;
    const ratingLabel = `${averageRating} · ${reviewCount} review${reviewCount === 1 ? "" : "s"}`;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4 py-6 sm:px-6">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative p-6 lg:p-8 h-[90vh] z-50 mx-auto w-full max-w-6xl overflow-hidden overflow-y-scroll rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl ring-1 ring-white/10"
                role="dialog"
                aria-modal="true"
                aria-label={`${product.title} details`}
            >
                <div className="absolute right-5 top-5 z-10 rounded-full bg-slate-900/80 p-1 shadow-lg shadow-black/20">
                    <button
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-200 transition hover:bg-slate-800 hover:text-white"
                        aria-label="Close details"
                    >
                        ×
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="space-y-6">
                        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)]">
                            <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                                <Image src={images[0]} alt={product.title} height={500} width={500} className="object-cover" />
                            </div>

                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto border-t border-white/10 bg-slate-950/80 p-4">
                                    {images.slice(0, 4).map((src, i) => (
                                        <div key={i} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-200 hover:border-rose-400/40">
                                            <Image src={src} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => addToCart(product as any, (product as any).colors?.[0] ?? "Onyx", (product as any).sizes?.[0] ?? "M")}
                                className="inline-flex w-full h-14 items-center justify-center rounded-full rounded-t-none bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                Add to cart
                            </button>
                        </div>

                    </section>

                    <section className="space-y-6">
                        <div className="grid gap-3 rounded-[1.75rem] border border-white/10 bg-slate-900 p-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-rose-300">{product.category}</span>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.available ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-700 text-slate-300"}`}>
                                    {product.available ? "In stock" : "Sold out"}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-slate-400">Designed by {product.brand}</p>
                                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{product.title}</h1>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                                <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-2 text-amber-300 ring-1 ring-white/10">
                                    <span className="font-semibold">{averageRating}</span>
                                    <span>★</span>
                                </div>
                                <span className="text-slate-400">{ratingLabel}</span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-950/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">${(product as any).price?.toFixed?.(2) ?? "-"}</p>
                                </div>
                                <div className="rounded-2xl bg-slate-950/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Color</p>
                                    <p className="mt-2 text-sm text-slate-200">{(product as any).colors?.join(" / ") ?? "—"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/10">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Product Summary</p>
                                    <p className="mt-3 text-lg font-semibold text-white">A refined everyday essential.</p>
                                </div>
                            </div>

                            <p className="mt-5 text-sm leading-7 text-slate-300">{product.description}</p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-950/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Materials</p>
                                    <p className="mt-2 text-sm text-slate-200">{(product as any).materials ?? "Premium blend"}</p>
                                </div>
                                <div className="rounded-2xl bg-slate-950/80 p-4">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Key features</p>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                        {(product.features ?? []).slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Customer reviews</p>
                            <p className="mt-2 text-lg font-semibold text-white">What buyers are saying</p>
                        </div>
                        <div className="rounded-full bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                            {reviewCount} review{reviewCount === 1 ? "" : "s"}
                        </div>
                    </div>

                    {reviewCount === 0 ? (
                        <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-slate-950/60 p-8 text-center text-slate-400">
                            No reviews available for this product yet.
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {normalizedReviews.slice(0, 3).map((review, index) => (
                                <article key={index} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)]">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-white">{review.name}</p>
                                            <p className="mt-1 text-xs text-slate-500">{review.verified ? "Verified buyer" : formatDate(review.date)}</p>
                                        </div>
                                        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">{review.rating} ★</div>
                                    </div>
                                    <p className="mt-4 text-sm leading-7 text-slate-300">{review.comment}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
