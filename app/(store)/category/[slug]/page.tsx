import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductsGrid } from "@/components/products/products-grid";
import { CATEGORIES } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return { title: cat ? `${cat.nameAr} | فلورا ستور` : "التصنيف" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Hero */}
      <div
        className="py-14 text-center"
        style={{ background: `linear-gradient(135deg, ${cat.color}80, ${cat.color}40)` }}
      >
        <div className="text-6xl mb-3">{cat.emoji}</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{cat.nameAr}</h1>
        <p className="text-gray-600">{cat.description}</p>
      </div>

      <div className="section-container py-10">
        <Suspense fallback={<div>جاري التحميل...</div>}>
          <ProductsGrid searchParams={{ category: category.id }} />
        </Suspense>
      </div>
    </div>
  );
}
