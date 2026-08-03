"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const navItems = [
    { label: "Collections", href: "#products" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Story", href: "#story" },
];

export function Header() {
    const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
    const toggleCart = useCartStore((state) => state.toggleCart);

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed md:sticky w-full top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl font-semibold text-white shadow-lg shadow-black/20 sm:h-12 sm:w-12 sm:text-2xl">
                        T
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[0.65rem] uppercase tracking-[0.35em] text-slate-500 sm:text-xs">
                            The Tao Label
                        </p>
                        <p className="truncate text-sm font-semibold text-slate-100">Modern luxury fashion</p>
                    </div>
                </div>

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm text-slate-300 transition hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        type="button"
                        onClick={toggleCart}
                        className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/5 px-3 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10 sm:h-11 sm:px-5"
                    >
                        <span className="hidden sm:inline">Cart</span>
                        <span className="sm:hidden">🛍</span>
                        <span className="ml-2 inline-flex h-6 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-2 text-[0.65rem] font-bold uppercase leading-none text-white">
                            {itemCount}
                        </span>
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
