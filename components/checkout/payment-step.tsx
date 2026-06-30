"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartStore } from "@/store/cart.store";
import { PAYMENT_METHODS, INSTALLMENT_PROVIDERS } from "@/lib/constants";
import { formatPrice, calculateInstallment } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types";

export function PaymentStep() {
  const { paymentMethod, installmentProvider, setPaymentMethod, setInstallmentProvider, setStep } = useCheckoutStore();
  const total = useCartStore((s) => s.total);
  const [selected, setSelected] = useState<PaymentMethod | null>(paymentMethod);
  const [installment, setInstallment] = useState(installmentProvider);

  const handleNext = () => {
    if (!selected) return;
    setPaymentMethod(selected);
    setInstallmentProvider(installment);
    setStep("review");
  };

  const cardMethods = PAYMENT_METHODS.filter((m) =>
    ["mada", "visa", "mastercard"].includes(m.id)
  );
  const digitalMethods = PAYMENT_METHODS.filter((m) =>
    ["applepay", "googlepay", "stcpay", "paypal"].includes(m.id)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">طريقة الدفع</h2>

      {/* Card payments */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">💳 بطاقات الدفع</p>
        <div className="grid grid-cols-3 gap-3">
          {cardMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => { setSelected(m.id as PaymentMethod); setInstallment(null); }}
              className={cn(
                "p-4 rounded-2xl border-2 text-center transition-all",
                selected === m.id
                  ? "border-pink-400 bg-pink-50"
                  : "border-gray-200 hover:border-pink-200"
              )}
            >
              <p className="font-semibold text-gray-800 text-sm">{m.nameAr}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Digital wallets */}
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-3">📱 المحافظ الرقمية</p>
        <div className="grid grid-cols-2 gap-3">
          {digitalMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => { setSelected(m.id as PaymentMethod); setInstallment(null); }}
              className={cn(
                "p-4 rounded-2xl border-2 text-center transition-all",
                selected === m.id
                  ? "border-pink-400 bg-pink-50"
                  : "border-gray-200 hover:border-pink-200"
              )}
            >
              <p className="font-semibold text-gray-800 text-sm">{m.nameAr}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Installments */}
      {total >= 100 && (
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-3">🏦 التقسيط بدون فوائد</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {INSTALLMENT_PROVIDERS.filter((p) => total >= p.minAmount && total <= p.maxAmount).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelected(p.id as PaymentMethod);
                  setInstallment(p.id as "tabby" | "tamara");
                }}
                className={cn(
                  "p-4 rounded-2xl border-2 text-right transition-all",
                  selected === p.id && installment === p.id
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-200 hover:border-pink-200"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    بدون فوائد
                  </span>
                  <span className="font-bold text-gray-800">{p.nameAr}</span>
                </div>
                <p className="text-pink-600 font-bold text-lg">
                  {formatPrice(calculateInstallment(total, p.months))} / شهر
                </p>
                <p className="text-xs text-gray-400">{p.months} دفعات · الإجمالي {formatPrice(total)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card form placeholder */}
      {selected && ["mada", "visa", "mastercard"].includes(selected) && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-4">بيانات البطاقة</p>
          <div className="space-y-3">
            <input placeholder="اسم حامل البطاقة" className="input-flora" dir="rtl" />
            <input placeholder="1234 5678 9012 3456" className="input-flora" dir="ltr" />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="MM/YY" className="input-flora" dir="ltr" />
              <input placeholder="CVV" className="input-flora" dir="ltr" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
            🔒 بياناتك محمية بتشفير SSL
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep("shipping")}
          className="btn-outline-flora flex-1 py-3.5">
          → السابق
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className="btn-flora flex-1 py-3.5 disabled:opacity-50"
        >
          مراجعة الطلب ←
        </button>
      </div>
    </div>
  );
}
