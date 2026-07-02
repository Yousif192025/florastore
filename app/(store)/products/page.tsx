import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductReviews } from "@/components/products/product-reviews";
import type { Metadata } from "next";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*, images:product_images(*), category:categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  return data as unknown as Product | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "المنتج غير موجود" };

  return {
    title: product.name_ar,
    description: product.description_ar ?? undefined,
    openGraph: {
      title: product.name_ar,
      description: product.description_ar ?? undefined,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="section-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-pink-600">الرئيسية</a>
          <span>/</span>
          <a href="/products" className="hover:text-pink-600">المنتجات</a>
          {product.category && (
            <>
              <span>/</span>
              <a href={`/category/${product.category.slug}`} className="hover:text-pink-600">
                {product.category.name_ar}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name_ar}</span>
        </nav>

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <ProductGallery images={product.images ?? []} productName={product.name_ar} />
          <ProductInfo product={product} />
        </div>

        {/* Reviews */}
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
