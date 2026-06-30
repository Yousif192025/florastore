"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getImageUrl } from "@/lib/utils";

export function OrderSummary() {
  const { items, subtotal, discount, shipping, vat, total } = useCartStore();

  return (
    <div className="bg-white rounded-2xl border border-pink-100 p-5 h-fit sticky top-24">
      <h3 className="font-bold text-gray-900 mb-4">ملخص الطلب</h3>

      {/* Items */}
      <div className="space-y-3 mb-5 max-h-60 overflow-y-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-pink-50 shrink-0">
              <Image
                src={getImageUrl(item.product.images?.[0]?.url)}
                alt={item.product.name_ar}
                fill
                className="object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 line-clamp-2">{item.product.name_ar}</p>
            </div>
            <p className="text-sm font-bold text-gray-800 shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>المجموع الفرعي</span><span>{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>الخصم</span><span>- {formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>الشحن</span>
          <span>{shipping === 0 ? "مجاني 🎉" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>ضريبة 15%</span><span>{formatPrice(vat)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-base pt-2.5 border-t border-gray-100">
          <span>الإجمالي</span>
          <span className="text-pink-600 text-lg">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Secure badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl py-2.5">
        🔒 دفع آمن ومشفر بـ SSL
      </div>
    </div>
  );
}
