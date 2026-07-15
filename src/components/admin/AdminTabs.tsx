import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const ADMIN_TABS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminTabs() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-4 mb-8">
      {ADMIN_TABS.map((tab) => {
        const isActive = router.pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}