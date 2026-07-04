import { Suspense } from "react";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsFilter } from "@/components/products/products-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جميع المنتجات",
  description: "تصفحي جميع منتجات فلورا ستور من إكسسوارات وهدايا وعطور فاخرة",
};

interface Props {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    page?: string;
    filter?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            جميع <em>المنتجات</em>
          </h1>
          <p className="text-gray-500">اكتشفي أحدث تشكيلات فلورا ستور</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <aside className="hidden lg:block w-64 shrink-0">
            <ProductsFilter />
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <Suspense fallback={<div>جاري التحميل...</div>}>
              <ProductsGrid searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
