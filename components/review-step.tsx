"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, getImageUrl, generateOrderNumber } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { PAYMENT_METHODS } from "@/lib/constants";

export function ReviewStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { customerInfo, shippingAddress, paymentMethod, setStep, reset: resetCheckout } = useCheckoutStore();
  const { items, total, subtotal, discount, shipping, vat, coupon, clearCart } = useCartStore();

  const paymentLabel = PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.nameAr ?? paymentMethod;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const orderNumber = generateOrderNumber();

      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          order_number:   orderNumber,
          status:         "pending",
          payment_status: "pending",
          payment_method: paymentMethod ?? "mada",
          subtotal,
          discount,
          shipping_fee: shipping,
          vat,
          total,
          coupon_code:  coupon?.code ?? null,
          shipping_info: {
            full_name:    shippingAddress.full_name,
            phone:        shippingAddress.phone,
            country_code: shippingAddress.country_code,
            city:         shippingAddress.city,
            district:     shippingAddress.district,
            street:       shippingAddress.street,
            building:     shippingAddress.building,
            notes:        shippingAddress.notes,
          },
        })
        .select()
        .single();

      if (error) throw error;

      // Insert order items
      await supabase.from("order_items").insert(
        items.map((item) => ({
          order_id:        order.id,
          product_id:      item.product.id,
          variant_id:      item.variant?.id ?? null,
          product_name_ar: item.product.name_ar,
          product_name_en: item.product.name_en,
          product_image:   item.product.images?.[0]?.url ?? null,
          sku:             item.variant?.sku ?? item.product.sku,
          quantity:        item.quantity,
          unit_price:      item.price,
          total_price:     item.price * item.quantity,
        }))
      );

      clearCart();
      resetCheckout();
      router.push(`/track?order=${order.order_number}`);
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مجدداً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">مراجعة الطلب</h2>

      {/* Customer */}
      <div className="bg-pink-50 rounded-2xl p-4">
        <p className="font-semibold text-gray-800 mb-2">معلومات العميل</p>
        <p className="text-sm text-gray-600">{customerInfo.full_name}</p>
        <p className="text-sm text-gray-600">{customerInfo.email}</p>
        <p className="text-sm text-gray-600">{customerInfo.phone}</p>
      </div>

      {/* Shipping */}
      <div className="bg-pink-50 rounded-2xl p-4">
        <p className="font-semibold text-gray-800 mb-2">عنوان الشحن</p>
        <p className="text-sm text-gray-600">
          {shippingAddress.city}، {shippingAddress.street}
          {shippingAddress.district && `، ${shippingAddress.district}`}
        </p>
      </div>

      {/* Payment */}
      <div className="bg-pink-50 rounded-2xl p-4">
        <p className="font-semibold text-gray-800 mb-1">طريقة الدفع</p>
        <p className="text-sm text-gray-600">{paymentLabel}</p>
      </div>

      {/* Items */}
      <div className="space-y-3">
        <p className="font-semibold text-gray-800">المنتجات ({items.length})</p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-pink-50 shrink-0">
              <Image src={getImageUrl(item.product.images?.[0]?.url)} alt={item.product.name_ar} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.product.name_ar}</p>
              <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
            </div>
            <p className="font-bold text-pink-600 text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-gradient-to-l from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100">
        <div className="space-y-2 text-sm">
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>الخصم</span><span>- {formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>الشحن</span><span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>ضريبة 15%</span><span>{formatPrice(vat)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-pink-200">
            <span>إجمالي الطلب</span>
            <span className="text-pink-600 text-lg">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep("payment")}
          className="btn-outline-flora flex-1 py-3.5">
          → السابق
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading}
          className="btn-flora flex-1 py-4 text-base disabled:opacity-70"
        >
          {loading ? "جاري تقديم الطلب..." : "تأكيد الطلب ✓"}
        </button>
      </div>
    </div>
  );
}
