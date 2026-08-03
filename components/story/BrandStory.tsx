import Image from "next/image";

export function BrandStory() {
    return (
        <section id="story" className="pt-20">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)] p-8 shadow-2xl shadow-black/20">
                    <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">Brand story</p>
                    <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                        Crafted for thoughtful living.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        The Tao Label brings a refined point of view to everyday essentials. We blend elevated design with useful detail to create pieces that feel considered, versatile, and timeless.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5">
                            <p className="text-3xl font-semibold text-white">01</p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">Designed with intention and built for long-term wear.</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5">
                            <p className="text-3xl font-semibold text-white">02</p>
                            <p className="mt-3 text-sm leading-7 text-slate-400">A thoughtful mix of utility and softness across categories.</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/20">
                    <Image src="/images/brand-story-illustration.svg" alt="Brand story illustration" width={900} height={700} className="h-[320px] w-full object-cover" />
                    <div className="p-8">
                        <p className="text-sm uppercase tracking-[0.35em] text-rose-200/80">Why we stand out</p>
                        <p className="mt-4 text-lg leading-8 text-slate-300">
                            Our edit balances premium construction with a relaxed confidence so each product feels elevated without being overdone.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
