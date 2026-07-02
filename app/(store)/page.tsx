"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Coupon } from "@/types";

export default function CartPage() {
  const { items, subtotal, discount, shipping, vat, total, coupon, removeItem, updateQuantity, applyCoupon, removeCoupon } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const handleCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode.trim().toUpperCase())
        .eq("is_active", true)
        .single();

      if (!data) {
        toast.error("كود الخصم غير صحيح أو منتهي الصلاحية");
        return;
      }
      const c = data as unknown as Coupon;
      if (c.expires_at && new Date(c.expires_at) < new Date()) {
        toast.error("انتهت صلاحية كود الخصم");
        return;
      }
      if (c.max_uses && c.used_count >= c.max_uses) {
        toast.error("تم استخدام الكود الحد الأقصى من المرات");
        return;
      }
      applyCoupon(c);
      toast.success(`تم تطبيق الكود! وفرت ${c.type === "percentage" ? `${c.value}%` : formatPrice(c.value)}`);
      setCouponCode("");
    } finally {
      setCouponLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-20 h-20 mx-auto text-pink-200 mb-5" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">السلة فارغة</h2>
          <p className="text-gray-500 mb-6">لم تضيفي أي منتجات بعد</p>
          <Link href="/products" className="btn-flora px-8 py-3 inline-flex">
            ابدأي التسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          سلة التسوق ({items.length} منتج)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white rounded-2xl p-4 flex gap-4 border border-pink-100"
                >
                  {/* Image */}
                  <Link href={`/products/${item.product.slug}`} className="shrink-0">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-pink-50">
                      <Image
                        src={getImageUrl(item.product.images?.[0]?.url)}
                        alt={item.product.name_ar}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-pink-600 transition-colors text-sm">
                        {item.product.name_ar}
                      </h3>
                    </Link>
                    {item.variant && (
                      <p className="text-xs text-gray-500 mt-0.5">{item.variant.name_ar}</p>
                    )}
                    <p className="text-pink-600 font-bold mt-1">{formatPrice(item.price)}</p>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-pink-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-pink-50 text-gray-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-pink-50 text-gray-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => { removeItem(item.id); toast.success("تم الحذف"); }}
                          className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-2xl p-4 border border-pink-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-pink-500" />
                كود الخصم
              </h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
                  <div>
                    <p className="font-semibold text-green-700 text-sm">{coupon.code}</p>
                    <p className="text-xs text-green-600">
                      {coupon.type === "percentage" ? `خصم ${coupon.value}%` : `خصم ${formatPrice(coupon.value)}`}
                    </p>
                  </div>
                  <button onClick={() => { removeCoupon(); toast.success("تم إزالة الكود"); }}
                    className="text-red-400 hover:text-red-600 text-xs">
                    إزالة
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="FLORA10"
                    className="input-flora flex-1 text-sm py-2.5"
                    onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                  />
                  <button
                    onClick={handleCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="btn-flora px-4 py-2.5 text-sm disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "تطبيق"}
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="bg-white rounded-2xl p-5 border border-pink-100">
              <h3 className="font-bold text-gray-900 mb-4">ملخص الطلب</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? "يُحسب عند الدفع" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ضريبة القيمة المضافة (15%)</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100">
                  <span>الإجمالي</span>
                  <span className="text-pink-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-flora w-full mt-5 py-4 text-base justify-center">
                متابعة الدفع ←
              </Link>
              <Link href="/products"
                className="flex items-center justify-center gap-1 mt-3 text-sm text-gray-500 hover:text-pink-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
