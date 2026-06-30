"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCheckoutStore } from "@/store/checkout.store";

const schema = z.object({
  full_name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email:     z.string().email("البريد الإلكتروني غير صحيح"),
  phone:     z.string().min(10, "رقم الهاتف غير صحيح"),
});

type FormData = z.infer<typeof schema>;

export function CustomerStep() {
  const { customerInfo, setCustomerInfo, setStep, shippingAddress, setShippingAddress } = useCheckoutStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: customerInfo,
  });

  const onSubmit = (data: FormData) => {
    setCustomerInfo(data);
    setShippingAddress({ ...shippingAddress, full_name: data.full_name, phone: data.phone });
    setStep("shipping");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900">معلوماتك الشخصية</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم الكامل *</label>
        <input {...register("full_name")} placeholder="مثال: نورة العمري" className="input-flora" />
        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني *</label>
        <input {...register("email")} type="email" placeholder="example@email.com" className="input-flora" dir="ltr" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الهاتف *</label>
        <input {...register("phone")} placeholder="05xxxxxxxx" className="input-flora" dir="ltr" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <button type="submit" className="btn-flora w-full py-4 text-base mt-2">
        التالي: عنوان الشحن ←
      </button>
    </form>
  );
}
