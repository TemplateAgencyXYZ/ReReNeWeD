import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminTabs() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 border-b border-border mb-8 pb-1">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/admin"
            ? router.pathname === "/admin"
            : router.pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}