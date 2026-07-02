"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { useCartStore } from "@/store/cart.store";
import { CheckoutStepIndicator } from "@/components/checkout/checkout-step-indicator";
import { CustomerStep } from "@/components/checkout/customer-step";
import { ShippingStep } from "@/components/checkout/shipping-step";
import { PaymentStep } from "@/components/checkout/payment-step";
import { ReviewStep } from "@/components/checkout/review-step";
import { OrderSummary } from "@/components/checkout/order-summary";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { id: "customer",        label: "معلوماتك"    },
  { id: "shipping",        label: "الشحن"        },
  { id: "payment",         label: "الدفع"        },
  { id: "review",          label: "مراجعة"       },
];

export default function CheckoutPage() {
  const step  = useCheckoutStore((s) => s.step);
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-xl font-bold text-gray-800 mb-3">السلة فارغة</h2>
          <Link href="/products" className="btn-flora inline-flex px-8 py-3">
            تسوقي الآن
          </Link>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case "customer":         return <CustomerStep />;
      case "shipping":         return <ShippingStep />;
      case "shipping_method":  return <ShippingStep />;
      case "payment":          return <PaymentStep />;
      case "review":           return <ReviewStep />;
      default:                 return <CustomerStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        {/* Back */}
        <Link href="/cart"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-pink-600 transition-colors mb-6">
          <ArrowRight className="w-4 h-4" />
          العودة للسلة
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-flora-gradient">Flora</span>
          <span className="text-xs text-pink-400 block">✦ Checkout ✦</span>
        </div>

        {/* Steps */}
        <CheckoutStepIndicator steps={STEPS} currentStep={step} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-pink-100 p-6">
              {renderStep()}
            </div>
          </div>

          {/* Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
