"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-950/95 pb-20 pt-20 sm:pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.88),_rgba(15,23,42,0.98))]" />
            <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_0.8fr] lg:items-end">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200/80 shadow-lg shadow-black/20">
                            Curated for modern living
                        </p>
                        <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                            Elevated essentials for every part of your day.
                        </h1>
                        <p className="max-w-xl text-lg leading-8 text-slate-300">
                            Explore a refined mix of fashion, beauty, tech, and home pieces chosen for quality, comfort, and effortless style.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href="#products"
                                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-slate-950 shadow-xl shadow-white/10 transition hover:bg-slate-100"
                            >
                                Shop the Edit
                            </a>
                            <a
                                href="#story"
                                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                            >
                                Discover the story
                            </a>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                            {[
                                "Fashion & Accessories",
                                "Beauty & Wellness",
                                "Tech Essentials",
                                "Home & Living",
                            ].map((badge) => (
                                <div key={badge} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 sm:p-8"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,250,251,0.14),_transparent_40%)]" />
                        <div className="relative rounded-[1.75rem] bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_rgba(15,23,42,0.8))] p-6 text-white shadow-2xl shadow-black/30 sm:p-8">
                            <div className="mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
                                <span>Featured collection</span>
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-100">
                                    Premium edit
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div className="relative h-72 overflow-hidden rounded-[1.5rem] shadow-inner shadow-white/5">
                                    <Image src="/images/hero-collection.svg" alt="Editorial collection showcase" fill className="object-cover" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Thoughtfully curated</p>
                                    <h2 className="text-3xl font-semibold text-white">Polished essentials for everyday living.</h2>
                                    <p className="max-w-xl text-sm leading-6 text-slate-300">
                                        A carefully balanced edit of statement and staple pieces that move smoothly from work to weekend.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
