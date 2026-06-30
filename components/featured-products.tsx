"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardSkeleton } from "@/components/products/product-card-skeleton";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(*)
    `)
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
  });

  return (
    <section className="py-16 bg-flora-beige-50"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900"
            >
              منتجات <em>مختارة</em>
            </motion.h2>
            <p className="text-gray-500 mt-1">أبرز ما يميز فلورا ستور</p>
          </div>
          <Link href="/products?filter=featured"
            className="hidden sm:flex items-center gap-2 text-pink-600 font-medium hover:text-pink-700 transition-colors text-sm border border-pink-200 rounded-full px-4 py-2 hover:bg-pink-50">
            عرض الكل ←
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products && products.length > 0
              ? products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              : (
                <div className="col-span-full text-center py-20 text-gray-400">
                  <span className="text-5xl block mb-4">🌸</span>
                  <p>لا توجد منتجات مميزة حالياً</p>
                </div>
              )
          }
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden text-center mt-8">
          <Link href="/products"
            className="btn-outline-flora text-sm px-6 py-3 inline-flex">
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
}
