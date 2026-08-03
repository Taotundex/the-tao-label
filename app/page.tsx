"use client";

import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { ProductsSection } from "@/components/products/ProductsSection";
import { AsSeenOn } from "@/components/sections/AsSeenOn";
import { Guarantee } from "@/components/guarantee/Guarantee";
import { BrandStory } from "@/components/story/BrandStory";
import { ReviewsCarousel } from "@/components/reviews/ReviewsCarousel";
import { FAQ } from "@/components/faq/FAQ";
import { Footer } from "@/components/footer/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const { visible, message, hideToast } = useCartStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="relative overflow-hidden">
        <Hero />
        <section className="mx-auto max-w-7xl px-6 pb-0 pt-16 lg:px-8">
          <ProductsSection />
          <AsSeenOn />
          <Guarantee />
          <BrandStory />
          <ReviewsCarousel />
          <FAQ />
          <Footer />
        </section>
        <CartDrawer />
        <CartToast message={message} visible={visible} onClose={hideToast} />
      </main>
    </div>
  );
}
