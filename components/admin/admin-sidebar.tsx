"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Tags, Users, ShoppingBag,
  CreditCard, Truck, Ticket, FileText, UserCog, BarChart3,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard",  icon: LayoutDashboard, label: "لوحة التحكم" },
  { href: "/admin/products",   icon: Package,         label: "المنتجات"    },
  { href: "/admin/categories", icon: Tags,            label: "التصنيفات"   },
  { href: "/admin/orders",     icon: ShoppingBag,     label: "الطلبات"     },
  { href: "/admin/customers",  icon: Users,           label: "العملاء"     },
  { href: "/admin/payments",   icon: CreditCard,      label: "المدفوعات"   },
  { href: "/admin/shipping",   icon: Truck,           label: "الشحن"       },
  { href: "/admin/coupons",    icon: Ticket,          label: "الكوبونات"   },
  { href: "/admin/content",    icon: FileText,        label: "المحتوى"     },
  { href: "/admin/users",      icon: UserCog,         label: "المستخدمون"  },
  { href: "/admin/reports",    icon: BarChart3,       label: "التقارير"    },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Link href="/admin/dashboard">
          <span className="text-xl font-bold text-flora-gradient">Flora</span>
          <span className="text-xs text-pink-400 block mt-0.5">✦ Admin Panel ✦</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-pink-600/20 text-pink-400 border-r-2 border-pink-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-pink-400")} />
              <span>{item.label}</span>
              {isActive && <ChevronLeft className="w-4 h-4 mr-auto text-pink-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800">
        <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← العودة للمتجر
        </Link>
      </div>
    </aside>
  );
}
