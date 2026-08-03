export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950/95 mt-12 text-slate-400">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="space-y-3">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">The Tao Label</p>
                    <p className="max-w-xl text-sm leading-7 text-slate-400">
                        Single-page luxury fashion destination with refined essentials and timeless silhouettes.
                    </p>
                </div>
                <div className="grid gap-4 grid-cols-3">
                    {[
                        { label: "Privacy", href: "/privacy" },
                        { label: "Terms", href: "/terms" },
                        { label: "Instagram", href: "#" },
                    ].map((item) => (
                        <a key={item.label} href={item.href} className="text-sm text-slate-300 hover:text-white">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="mt-10 border-t border-white/10 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} The Tao Label. All rights reserved.
            </div>
        </footer>
    );
}
