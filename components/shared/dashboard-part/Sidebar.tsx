"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ── Icons (inline SVG, no icon library required) ──────────────────────────
const icons = {
    dashboard: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3.75 12l8.25-8.25L20.25 12M4.5 9.75V19.5a.75.75 0 00.75.75h4.5v-6h4.5v6h4.5a.75.75 0 00.75-.75V9.75"
        />
    ),
    orders: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9 3.75h6a1.5 1.5 0 011.5 1.5v15l-4.5-2.25L7.5 20.25v-15A1.5 1.5 0 019 3.75z"
        />
    ),
    customers: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M15 19.5a3 3 0 00-3-3H6a3 3 0 00-3 3M12.75 8.25a3 3 0 11-6 0 3 3 0 016 0zM21 19.5a3 3 0 00-2.5-2.955M17.25 8.34a3 3 0 010 5.82"
        />
    ),
    products: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M20.25 7.5l-8.25-4.5L3.75 7.5m16.5 0l-8.25 4.5m8.25-4.5v9l-8.25 4.5m0-9L3.75 7.5m8.25 4.5v9M3.75 7.5v9l8.25 4.5"
        />
    ),
    analytics: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M3 3v16.5A1.5 1.5 0 004.5 21H21M7.5 15.75V12M12 15.75V8.25M16.5 15.75V5.25"
        />
    ),
    settings: (
        <>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.166.397.506.71.93.78l.894.15c.542.09.94.56.94 1.109v1.094c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.108-.397.166-.71.506-.781.93l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.449-.12l-.773-.773a1.125 1.125 0 01-.12-1.45l.527-.738c.25-.35.273-.806.108-1.203-.165-.397-.505-.71-.93-.781l-.894-.149c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.425-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.108.397-.166.71-.506.78-.93l.15-.894z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
    ),
};

type IconKey = keyof typeof icons;

function Icon({ name, className = "h-5 w-5" }: { name: IconKey; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
            {icons[name]}
        </svg>
    );
}

// ── Nav data ────────────────────────────────────────────────────────────
const navItems: { label: string; href: string; icon: IconKey }[] = [
    { label: "Dashboard", href: "/", icon: "dashboard" },
    { label: "Orders", href: "/orders", icon: "orders" },
    { label: "Customers", href: "/customers", icon: "customers" },
    { label: "Products", href: "/products", icon: "products" },
    { label: "Analytics", href: "/analytics", icon: "analytics" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`relative flex h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-200 ${collapsed ? "w-19" : "w-64"
                }`}
        >
            {/* Brand */}
            <div className="flex h-16 items-center gap-2.5 border-b border-slate-800 px-4 lg:h-24">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold text-slate-950">
                    S
                </div>
                {!collapsed && (
                    <span className="truncate text-[15px] font-semibold tracking-tight text-white">
                        Shabbir Inc.
                    </span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
                                ? "bg-slate-900 text-white"
                                : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
                                }`}
                        >
                            {active && (
                                <span className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-r bg-emerald-500" />
                            )}
                            <Icon name={item.icon} className="h-5 w-5 shrink-0" />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Settings + collapse */}
            <div className="border-t border-slate-800 px-3 py-4 space-y-1">
                <Link
                    href="/settings"
                    title={collapsed ? "Settings" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === "/settings"
                        ? "bg-slate-900 text-white"
                        : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-100"
                        }`}
                >
                    <Icon name="settings" className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </Link>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 border-t border-slate-800 px-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
                    SH
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">Shabbir</p>
                        <p className="truncate text-xs text-slate-500">Full Stack Dev</p>
                    </div>
                )}
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed((c) => !c)}
                className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`h-3.5 w-3.5 transition-transform ${collapsed ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </aside>
    );
}