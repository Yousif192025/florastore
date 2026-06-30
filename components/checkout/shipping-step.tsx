"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkout.store";
import { useCartStore } from "@/store/cart.store";
import { SHIPPING_COUNTRIES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

const schema = z.object({
  country_code: z.string().min(2),
  city:         z.string().min(2, "يرجى اختيار أو كتابة المدينة"),
  district:     z.string().optional(),
  street:       z.string().min(5, "يرجى إدخال العنوان"),
  building:     z.string().optional(),
  notes:        z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ShippingStep() {
  const { shippingAddress, setShippingAddress, setShippingMethod, setStep } = useCheckoutStore();
  const setShippingFee = useCartStore((s) => s.setShippingFee);
  const subtotal       = useCartStore((s) => s.subtotal);

  const [selectedCountry, setSelectedCountry] = useState(
    SHIPPING_COUNTRIES.find((c) => c.code === shippingAddress.country_code) ?? SHIPPING_COUNTRIES[0]
  );

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country_code: shippingAddress.country_code,
      city:         shippingAddress.city,
      district:     shippingAddress.district ?? "",
      street:       shippingAddress.street,
      building:     shippingAddress.building ?? "",
      notes:        shippingAddress.notes ?? "",
    },
  });

  const onSubmit = (data: FormData) => {
    const fee = subtotal >= selectedCountry.freeShippingAt ? 0 : selectedCountry.shippingFee;

    setShippingAddress({
      ...shippingAddress,
      country_code: data.country_code,
      city:         data.city,
      district:     data.district ?? null,
      street:       data.street,
      building:     data.building ?? null,
      notes:        data.notes ?? null,
    });
    setShippingMethod({
      provider:    "standard",
      fee,
      deliveryDays: selectedCountry.deliveryDays,
    });
    setShippingFee(fee);
    setStep("payment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900">عنوان الشحن</h2>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">الدولة *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SHIPPING_COUNTRIES.map((country) => {
            const fee = subtotal >= country.freeShippingAt ? 0 : country.shippingFee;
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCountry(country);
                  setValue("country_code", country.code);
                  setValue("city", "");
                }}
                className={`p-3 rounded-xl border text-sm text-right transition-all ${
                  selectedCountry.code === country.code
                    ? "border-pink-400 bg-pink-50 text-pink-700"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                <span className="block font-semibold">{country.flag} {country.nameAr}</span>
                <span className="text-xs text-gray-400">
                  {fee === 0 ? "شحن مجاني" : formatPrice(fee)}
                </span>
              </button>
            );
          })}
        </div>
        {subtotal >= selectedCountry.freeShippingAt && (
          <p className="text-green-600 text-xs mt-2 font-medium">🎉 تهانينا! تستحقين شحناً مجانياً</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">المدينة *</label>
        <select {...register("city")} className="input-flora">
          <option value="">اختاري المدينة</option>
          {selectedCountry.cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">الحي</label>
          <input {...register("district")} placeholder="اسم الحي" className="input-flora" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم المبنى/الشقة</label>
          <input {...register("building")} placeholder="مثال: B12" className="input-flora" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">الشارع والعنوان التفصيلي *</label>
        <input {...register("street")} placeholder="مثال: شارع الملك فهد، أمام مستشفى..." className="input-flora" />
        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">ملاحظات التوصيل (اختياري)</label>
        <textarea {...register("notes")} rows={3} placeholder="أي تعليمات خاصة للمندوب..." className="input-flora resize-none" />
      </div>

      <div className="bg-pink-50 rounded-xl p-3 text-sm text-pink-700">
        ⏱️ وقت التوصيل المتوقع: {selectedCountry.deliveryDays} أيام عمل
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => setStep("customer")}
          className="btn-outline-flora flex-1 py-3.5">
          → السابق
        </button>
        <button type="submit" className="btn-flora flex-1 py-3.5">
          التالي: الدفع ←
        </button>
      </div>
    </form>
  );
}
