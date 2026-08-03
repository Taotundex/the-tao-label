"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { reviews } from "@/data/reviews";
import "swiper/css";
import "swiper/css/pagination";

export function ReviewsCarousel() {
    return (
        <section id="reviews" className="pt-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                    <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">What customers say</p>
                    <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                        Trusted by shoppers across style, beauty, tech, and home.
                    </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    4.8/5 average from 1,000+ verified shoppers
                </div>
            </div>

            <div className="mt-8 rounded-[2rem] w-full md:w-[70%] mx-auto border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-black/20">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="pb-10"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-8 shadow-inner shadow-black/20">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-3xl bg-white/5">
                                            <Image src={review.avatar} alt={review.name} width={96} height={96} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-white">{review.name}</p>
                                            <p className="text-sm text-slate-400">{review.title}</p>
                                        </div>
                                    </div>
                                    <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                                        {review.rating} ★ Verified purchase
                                    </div>
                                </div>
                                <p className="mt-6 text-lg leading-8 text-slate-300">“{review.quote}”</p>
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Purchased: {review.product}
                                    </span>
                                    <span className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-xs uppercase tracking-[0.25em] text-rose-100">
                                        Loved by repeat customers
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
