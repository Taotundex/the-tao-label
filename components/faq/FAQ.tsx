"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
    {
        question: "Shipping",
        answer:
            "Orders ship within 24 hours via premium couriers. Free shipping is available on qualifying purchases.",
    },
    {
        question: "Returns",
        answer:
            "Returns are accepted within 30 days for eligible items. Our team will guide you through the process.",
    },
    {
        question: "Sizing",
        answer:
            "Each item includes a size guide and fit notes. We recommend selecting your usual size for the most comfortable fit.",
    },
    {
        question: "Materials",
        answer:
            "Our collection uses luxury fabrics with sustainable blends. We prioritize soft hand feel and lasting structure.",
    },
    {
        question: "Payments",
        answer:
            "We accept major credit cards, PayPal, Apple Pay, and Google Pay through a secure checkout flow.",
    },
    {
        question: "Order tracking",
        answer:
            "After shipping, you will receive an email with tracking details and expected delivery information.",
    },
];

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="faq" className="pt-20">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">Frequently asked questions</p>
                        <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                            Clear answers for a confident experience.
                        </h2>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                        Fast support • Honest guidance • Premium service
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70"
                            >
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                                    <span className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-rose-200 transition">
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>
                                {isOpen ? (
                                    <div className="border-t border-white/10 px-6 py-5">
                                        <p className="text-sm leading-7 text-slate-300">{faq.answer}</p>
                                    </div>
                                ) : null}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
