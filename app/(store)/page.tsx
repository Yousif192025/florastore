import { Suspense } from "react";
import { ProductsGrid } from "@/components/products/products-grid";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `نتائج البحث عن: ${q}` : "البحث" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {q ? (
              <>نتائج البحث عن: <em>&ldquo;{q}&rdquo;</em></>
            ) : "البحث"}
          </h1>
        </div>

        {q ? (
          <Suspense fallback={<div>جاري البحث...</div>}>
            <ProductsGrid searchParams={{ search: q } as Record<string, string>} />
          </Suspense>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-500">اكتبي ما تبحثين عنه في شريط البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
