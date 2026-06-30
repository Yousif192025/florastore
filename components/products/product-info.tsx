"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { formatPrice, calculateInstallment, getWhatsAppUrl } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { INSTALLMENT_PROVIDERS, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Product } from "@/types";

interface Props { product: Product }

export function ProductInfo({ product }: Props) {
  const [qty, setQty] = useState(1);

  const addItem      = useCartStore((s) => s.addItem);
  const toggleItem   = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id));

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const inStock     = product.stock > 0;

  const handleAddToCart = () => {
    addItem(product, null, qty);
    toast.success("تمت الإضافة إلى السلة 🛒", { description: product.name_ar });
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: product.name_ar, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط!");
    }
  };

  const whatsappMessage = `مرحباً، أريد الاستفسار عن: ${product.name_ar}\n${window?.location?.href ?? ""}`;

  return (
    <div className="space-y-6">
      {/* Category & Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.category && (
          <span className="text-xs text-pink-600 bg-pink-50 px-3 py-1 rounded-full font-medium">
            {product.category.name_ar}
          </span>
        )}
        {product.is_new && (
          <span className="flora-badge-new">✨ جديد</span>
        )}
        {product.is_on_sale && (
          <span className="flora-badge-sale">🏷️ تخفيض</span>
        )}
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
        {product.name_ar}
      </h1>

      {/* Rating */}
      {(product.rating_count ?? 0) > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${s <= Math.round(product.rating_avg ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {(product.rating_avg ?? 0).toFixed(1)} ({product.rating_count} تقييم)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-end gap-3">
        <motion.span
          key={product.price}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-pink-600"
        >
          {formatPrice(product.price)}
        </motion.span>
        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through mb-0.5">
              {formatPrice(product.compare_price!)}
            </span>
            <span className="text-sm bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full mb-0.5">
              وفري {product.discount_percentage}%
            </span>
          </>
        )}
      </div>

      {/* Installments */}
      <div className="bg-gradient-to-l from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100">
        <p className="text-sm font-semibold text-gray-700 mb-3">💳 التقسيط بدون فوائد</p>
        <div className="grid grid-cols-2 gap-3">
          {INSTALLMENT_PROVIDERS.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-3 text-center border border-pink-100">
              <p className="text-xs text-gray-500 mb-1">{p.nameAr}</p>
              <p className="font-bold text-pink-600 text-base">
                {formatPrice(calculateInstallment(product.price, p.months))}
              </p>
              <p className="text-xs text-gray-400">× {p.months} دفعات</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div>
        {inStock ? (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {product.stock <= 5
              ? `متبقي ${product.stock} قطع فقط!`
              : "متوفر في المخزون"
            }
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            نفد من المخزون
          </div>
        )}
      </div>

      {/* Quantity + Add to Cart */}
      {inStock && (
        <div className="space-y-3">
          {/* Qty */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">الكمية:</span>
            <div className="flex items-center border border-pink-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-pink-50 transition-colors text-lg font-bold text-gray-600"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-pink-50 transition-colors text-lg font-bold text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-flora py-4 text-base gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              أضف إلى السلة
            </button>
            <button
              onClick={() => { toggleItem(product); toast.success(isWishlisted ? "حذف من المفضلة" : "أضيف للمفضلة"); }}
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                isWishlisted ? "border-pink-400 bg-pink-50" : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-14 h-14 rounded-2xl border-2 border-gray-200 hover:border-pink-300 flex items-center justify-center transition-all"
            >
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* WhatsApp order */}
          <a
            href={getWhatsAppUrl(WHATSAPP_NUMBER, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border-2 border-green-400 text-green-700 font-semibold py-3.5 rounded-2xl hover:bg-green-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            اطلب عبر واتساب
          </a>
        </div>
      )}

      {/* Description */}
      {product.description_ar && (
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">وصف المنتج</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description_ar}</p>
        </div>
      )}

      {/* Guarantees */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
        {[
          { icon: Truck,      text: "شحن سريع" },
          { icon: Shield,     text: "ضمان الجودة" },
          { icon: RotateCcw,  text: "إرجاع 14 يوم" },
        ].map((g) => (
          <div key={g.text} className="flex flex-col items-center gap-1 text-center">
            <g.icon className="w-5 h-5 text-pink-500" />
            <span className="text-xs text-gray-500">{g.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
