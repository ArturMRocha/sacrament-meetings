"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/current", label: "Current" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="flex flex-wrap gap-2 text-sm font-medium">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : item.href === "/meetings"
              ? pathname === "/meetings" || pathname.startsWith("/meetings/")
              : pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "rounded-full border px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2",
              isActive
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
