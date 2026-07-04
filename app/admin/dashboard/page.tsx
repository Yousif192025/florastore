"use client";

import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp, ShoppingBag, Users, Package,
  ArrowUpRight, ArrowDownRight, Eye,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatDate } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

async function getDashboardStats() {
  const supabase = createClient();

  const [ordersRes, productsRes, usersRes] = await Promise.all([
    supabase.from("orders").select("total, status, created_at, order_number, shipping_info").order("created_at", { ascending: false }).limit(50),
    supabase.from("products").select("id", { count: "exact" }).eq("is_active", true),
    supabase.from("users").select("id", { count: "exact" }).eq("role", "customer"),
  ]);

  const orders    = ordersRes.data ?? [];
  const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0);

  // Revenue by month (last 6 months)
  const now = new Date();
  const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = d.toLocaleString("ar-SA", { month: "short" });
    const revenue = orders
      .filter((o) => {
        const od = new Date(o.created_at);
        return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
      })
      .reduce((s, o) => s + (o.total ?? 0), 0);
    return { month: label, revenue };
  });

  return {
    totalRevenue,
    totalOrders:    orders.length,
    totalProducts:  productsRes.count ?? 0,
    totalCustomers: usersRes.count ?? 0,
    recentOrders:   orders.slice(0, 10),
    revenueByMonth,
  };
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn:  getDashboardStats,
  });

  const statCards = [
    {
      label:   "إجمالي الإيرادات",
      value:   stats ? formatPrice(stats.totalRevenue) : "---",
      icon:    TrendingUp,
      color:   "from-pink-500 to-rose-500",
      growth:  "+12%",
      up:      true,
    },
    {
      label:   "إجمالي الطلبات",
      value:   stats?.totalOrders ?? "---",
      icon:    ShoppingBag,
      color:   "from-violet-500 to-purple-500",
      growth:  "+8%",
      up:      true,
    },
    {
      label:   "العملاء",
      value:   stats?.totalCustomers ?? "---",
      icon:    Users,
      color:   "from-blue-500 to-cyan-500",
      growth:  "+23%",
      up:      true,
    },
    {
      label:   "المنتجات النشطة",
      value:   stats?.totalProducts ?? "---",
      icon:    Package,
      color:   "from-amber-500 to-orange-500",
      growth:  "-2%",
      up:      false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1">مرحباً بك في لوحة إدارة فلورا ستور</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${card.up ? "text-green-600" : "text-red-500"}`}>
                {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {card.growth}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">
              {isLoading ? <span className="skeleton h-7 w-20 rounded block" /> : card.value}
            </p>
            <p className="text-xs text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-5">الإيرادات - آخر 6 أشهر</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={stats?.revenueByMonth ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [formatPrice(v), "الإيرادات"]} />
              <Line
                type="monotone" dataKey="revenue"
                stroke="#ec4899" strokeWidth={2.5}
                dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Status */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-5">الطلبات حسب الحالة</h3>
          {stats ? (
            <div className="space-y-3">
              {Object.entries(ORDER_STATUSES).map(([key, val]) => {
                const count = stats.recentOrders.filter((o) => o.status === key).length;
                const pct   = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{val.labelAr}</span>
                      <span className="font-medium text-gray-800">{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-pink-500 to-rose-400 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-8 rounded-xl" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">أحدث الطلبات</h3>
          <a href="/admin/orders" className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1">
            <Eye className="w-4 h-4" />
            عرض الكل
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs">
                <th className="text-right py-3 px-5 font-medium">رقم الطلب</th>
                <th className="text-right py-3 px-5 font-medium">العميل</th>
                <th className="text-right py-3 px-5 font-medium">المدينة</th>
                <th className="text-right py-3 px-5 font-medium">الإجمالي</th>
                <th className="text-right py-3 px-5 font-medium">الحالة</th>
                <th className="text-right py-3 px-5 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="py-3 px-5">
                          <div className="skeleton h-4 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : stats?.recentOrders.map((order) => {
                    const status = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                    const info   = order.shipping_info as Record<string, string> | null;
                    return (
                      <tr key={order.order_number} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-5 font-mono text-xs text-gray-600" dir="ltr">
                          {order.order_number}
                        </td>
                        <td className="py-3 px-5 text-gray-700">{info?.full_name ?? "—"}</td>
                        <td className="py-3 px-5 text-gray-500">{info?.city ?? "—"}</td>
                        <td className="py-3 px-5 font-semibold text-pink-600">{formatPrice(order.total)}</td>
                        <td className="py-3 px-5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            status?.color === "green"  ? "bg-green-100 text-green-700" :
                            status?.color === "yellow" ? "bg-yellow-100 text-yellow-700" :
                            status?.color === "blue"   ? "bg-blue-100 text-blue-700" :
                            status?.color === "red"    ? "bg-red-100 text-red-700" :
                            "bg-pink-100 text-pink-700"
                          }`}>
                            {status?.labelAr ?? order.status}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-gray-400 text-xs">{formatDate(order.created_at)}</td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
