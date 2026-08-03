"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CartToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

export function CartToast({ message, visible, onClose }: CartToastProps) {
    useEffect(() => {
        if (!visible) return;

        const timer = window.setTimeout(onClose, 2200);
        return () => window.clearTimeout(timer);
    }, [visible, onClose]);

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed right-4 top-4 z-[80] max-w-sm rounded-2xl border border-emerald-400/20 bg-slate-900/95 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur"
                >
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-lg text-emerald-300">
                            ✓
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Added to cart</p>
                            <p className="mt-1 text-sm leading-6 text-slate-300">{message}</p>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
