import { Suspense } from "react";
import { ProductsGrid } from "@/components/products/products-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "العروض والتخفيضات 🔥",
  description: "أفضل العروض والتخفيضات في فلورا ستور",
};

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-l from-red-500 to-pink-600 text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-2">🔥 العروض والتخفيضات</h1>
        <p className="text-pink-100 text-lg">وفري أكثر مع أحدث عروض فلورا ستور</p>
      </div>

      <div className="section-container py-10">
        <Suspense fallback={<div>جاري تحميل العروض...</div>}>
          <ProductsGrid searchParams={{ filter: "sale" }} />
        </Suspense>
      </div>
    </div>
  );
}
