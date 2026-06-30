"use client";

import { motion } from "framer-motion";
import { INSTALLMENT_PROVIDERS } from "@/lib/constants";
import { calculateInstallment, formatPrice } from "@/lib/utils";

export function InstallmentBanner() {
  const examplePrice = 300;

  return (
    <section className="py-14 bg-white">
      <div className="section-container">
        <div className="bg-gradient-to-l from-pink-600 to-rose-500 rounded-3xl overflow-hidden">
          <div className="px-8 py-12 text-white text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold mb-2"
            >
              اشتري الآن، ادفعي لاحقاً 💳
            </motion.h2>
            <p className="text-pink-100 mb-8">قسّطي مشترياتك بدون فوائد مع تابي وتمارا</p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {INSTALLMENT_PROVIDERS.map((provider) => (
                <div key={provider.id}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-right">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-white/20 rounded-full px-3 py-1">
                      {provider.interestFree ? "بدون فوائد ✓" : ""}
                    </span>
                    <span className="font-bold text-lg">{provider.nameAr}</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {formatPrice(calculateInstallment(examplePrice, provider.months))}
                  </div>
                  <p className="text-pink-100 text-sm">
                    × {provider.months} دفعات لطلب بقيمة {formatPrice(examplePrice)}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-pink-200 text-xs mt-6">
              * التقسيط متاح للطلبات من {formatPrice(100)} حتى {formatPrice(5000)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
