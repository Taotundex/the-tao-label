import Image from "next/image";

export function Guarantee() {
    const items = [
        {
            title: "Secure checkout",
            description: "Protected payments and a seamless experience from cart to delivery.",
        },
        {
            title: "Flexible returns",
            description: "Easy exchanges and thoughtful support whenever your order needs a second look.",
        },
        {
            title: "Fast fulfillment",
            description: "Most orders dispatched within 24 hours with premium packaging and care.",
        },
    ];

    return (
        <section className="pt-20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-black/20">
                    <Image src="/images/guarantee-illustration.svg" alt="Luxury service guarantee illustration" width={900} height={700} className="h-full w-full rounded-[1.5rem] object-cover" />
                </div>
                <div className="space-y-6">
                    <div className="max-w-3xl">
                        <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">Our promise</p>
                        <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                            Thoughtful service for a premium experience.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-lg leading-8 text-slate-300">
                        Every detail is designed to feel calm, clear, and satisfying—from browsing to delivery and beyond.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => (
                            <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
