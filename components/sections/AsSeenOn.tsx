import Image from "next/image";

export function AsSeenOn() {
    const logos = ["VOGUE", "GQ", "FORBES", "ELLE", "WIRED"];

    return (
        <section className="pt-20">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 lg:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="space-y-6">
                        <div className="max-w-3xl">
                            <p className="text-sm uppercase tracking-[0.4em] text-rose-200/80">As seen in</p>
                            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                                Recognized by modern lifestyle media and design-forward audiences.
                            </h2>
                        </div>
                        <p className="max-w-2xl text-lg leading-8 text-slate-300">
                            The Tao Label brings together elevated essentials and thoughtful utility across style, home, and everyday life.
                        </p>
                        <div className="grid gap-3 grid-cols-2">
                            {logos.map((logo) => (
                                <div key={logo} className="rounded-[1.35rem] border border-white/10 bg-white/5 p-5 text-center text-sm uppercase tracking-[0.3em] text-slate-200 shadow-lg shadow-black/20">
                                    {logo}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
                        <Image src="/images/hero-collection.svg" alt="Editorial product showcase" width={720} height={720} className="h-full w-full rounded-[1.25rem] object-cover" />
                        <div className="absolute inset-x-6 bottom-6 rounded-[1.25rem] border border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur">
                            <p className="text-sm uppercase tracking-[0.3em] text-rose-200/80">Editor’s note</p>
                            <p className="mt-2 text-base font-medium text-white">
                                “A favorite for polished pieces that feel effortless in everyday life.”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
