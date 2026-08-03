"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const WHATSAPP_NUMBER = "09134157417";

export function CartDrawer() {
    const { items, cartOpen, toggleCart, updateQuantity, removeFromCart } = useCartStore();
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const isCartEmpty = items.length === 0;

    const handleCheckout = () => {
        if (isCartEmpty) return;

        const itemLines = items.map((item) => {
            const lineTotal = item.product.price * item.quantity;
            return `• ${item.product.title} (${item.color} / ${item.size}) x${item.quantity} — $${lineTotal.toFixed(2)}`;
        });

        const message = [
            "Hello! I’d like to place an order from The Tao Label.",
            "",
            "Order summary:",
            ...itemLines,
            "",
            `Subtotal: $${subtotal.toFixed(2)}`,
            "",
            "Please confirm availability and delivery options.",
        ].join("\n");

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        toggleCart();
    };

    return (
        <AnimatePresence>
            {cartOpen ? (
                <motion.aside
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-slate-950/95 shadow-2xl shadow-black/30"
                >
                    <div className="flex h-full flex-col p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-rose-200/80">Shopping Cart</p>
                                <h2 className="text-2xl font-semibold text-white">Your order summary</h2>
                            </div>
                            <button
                                type="button"
                                onClick={toggleCart}
                                className="text-xl text-slate-400 transition hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                            {isCartEmpty ? (
                                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 text-center text-slate-400">
                                    Your cart is empty. Add a piece to start styling.
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.product.id}-${item.color}-${item.size}`} className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-4">
                                        <div className="flex gap-4">
                                            <div className="relative h-24 w-24 overflow-hidden rounded-3xl bg-white/5">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-white">{item.product.title}</p>
                                                <p className="mt-2 text-sm text-slate-400">{item.color} • {item.size}</p>
                                                <p className="mt-2 text-sm text-slate-300">${item.product.price.toFixed(2)}</p>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-8 text-center text-sm text-white">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="mt-4 text-sm text-rose-300 transition hover:text-rose-100"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-900/85 p-6">
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                disabled={isCartEmpty}
                                className="mt-6 w-full rounded-full bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
                            >
                                {isCartEmpty ? "Add items to checkout" : "Checkout on WhatsApp"}
                            </button>
                            <button
                                type="button"
                                onClick={toggleCart}
                                className="mt-3 w-full rounded-full border border-white/10 bg-slate-950 px-5 py-4 text-sm text-slate-200 transition hover:border-white/20 hover:bg-slate-900"
                            >
                                Continue shopping
                            </button>
                        </div>
                    </div>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
}
