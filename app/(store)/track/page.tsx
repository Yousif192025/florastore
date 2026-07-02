"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate, formatPrice } from "@/lib/utils";
import { ORDER_STATUSES } from "@/lib/constants";
import type { Order } from "@/types";

function TrackForm() {
  const searchParams = useSearchParams();
  const [orderNum, setOrderNum] = useState(searchParams.get("order") ?? "");
  const [order, setOrder]       = useState<Order | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNum.trim()) return;
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("orders")
        .select("*, items:order_items(*)")
        .eq("order_number", orderNum.trim().toUpperCase())
        .single();

      if (!data) {
        setError("لم يتم العثور على طلب بهذا الرقم");
        setOrder(null);
      } else {
        setOrder(data as unknown as Order);
      }
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = order ? ORDER_STATUSES[order.status] : null;

  const steps = [
    { key: "pending",    label: "الطلب مستلم",   icon: Package },
    { key: "confirmed",  label: "تم التأكيد",    icon: CheckCircle },
    { key: "processing", label: "جاري التجهيز",  icon: Clock },
    { key: "shipped",    label: "في الطريق",     icon: Truck },
    { key: "delivered",  label: "تم التوصيل",    icon: CheckCircle },
  ];

  const currentStepIdx = order
    ? steps.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تتبع طلبك 📦</h1>
          <p className="text-gray-500">أدخلي رقم الطلب لمعرفة حالته</p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 border border-pink-100 mb-6">
          <div className="flex gap-3">
            <input
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value.toUpperCase())}
              placeholder="FL-XXXXXX-XXXX"
              className="input-flora flex-1"
              dir="ltr"
            />
            <button type="submit" disabled={loading} className="btn-flora px-6 py-3 gap-2">
              <Search className="w-4 h-4" />
              {loading ? "..." : "بحث"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>

        {/* Order Details */}
        {order && (
          <div className="space-y-5">
            {/* Status card */}
            <div className="bg-white rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400">رقم الطلب</p>
                  <p className="font-bold text-gray-900 text-lg" dir="ltr">{order.order_number}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  statusConfig?.color === "green" ? "bg-green-100 text-green-700" :
                  statusConfig?.color === "blue"  ? "bg-blue-100 text-blue-700" :
                  statusConfig?.color === "yellow"? "bg-yellow-100 text-yellow-700" :
                  "bg-pink-100 text-pink-700"
                }`}>
                  {statusConfig?.labelAr}
                </span>
              </div>

              {/* Progress bar */}
              {order.status !== "cancelled" && order.status !== "refunded" && (
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 right-0 left-0 h-0.5 bg-gray-200">
                    <div
                      className="h-full bg-pink-400 transition-all duration-700"
                      style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                    />
                  </div>
                  {steps.map((step, idx) => {
                    const isDone   = idx <= currentStepIdx;
                    const isCurr   = idx === currentStepIdx;
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isDone ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-400"
                        } ${isCurr ? "ring-4 ring-pink-100" : ""}`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-medium ${isDone ? "text-pink-600" : "text-gray-400"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Order info */}
            <div className="bg-white rounded-2xl p-5 border border-pink-100">
              <h3 className="font-semibold text-gray-800 mb-4">تفاصيل الطلب</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">تاريخ الطلب</p>
                  <p className="font-medium">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">إجمالي الطلب</p>
                  <p className="font-medium text-pink-600">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">حالة الدفع</p>
                  <p className="font-medium">
                    {order.payment_status === "paid" ? "✓ مدفوع" : "⏳ معلق"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">عدد المنتجات</p>
                  <p className="font-medium">{order.items?.length ?? 0} منتج</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auto-search if URL has order param */}
        {searchParams.get("order") && !order && !loading && !error && (
          <button onClick={() => handleSearch(new Event("submit") as unknown as React.FormEvent)}
            className="hidden" />
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <TrackForm />
    </Suspense>
  );
}
