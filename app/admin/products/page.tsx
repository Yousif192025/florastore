"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { Product } from "@/types";

async function getAdminProducts(search: string): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*, images:product_images(*), category:categories(name_ar)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (search) query = query.ilike("name_ar", `%${search}%`);

  const { data } = await query;
  return (data ?? []) as unknown as Product[];
}

export default function AdminProductsPage() {
  const [search, setSearch]   = useState("");
  const queryClient           = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products", search],
    queryFn:  () => getAdminProducts(search),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const supabase = createClient();
      await supabase.from("products").update({ is_active }).eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("تم تحديث حالة المنتج");
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      await supabase.from("products").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("تم حذف المنتج");
    },
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h1>
          <p className="text-sm text-gray-500 mt-0.5">{products.length} منتج</p>
        </div>
        <Link href="/admin/products/new" className="btn-flora px-5 py-2.5 text-sm gap-2 inline-flex">
          <Plus className="w-4 h-4" />
          منتج جديد
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs border-b border-gray-100">
              <th className="text-right py-3.5 px-5 font-medium">المنتج</th>
              <th className="text-right py-3.5 px-5 font-medium">التصنيف</th>
              <th className="text-right py-3.5 px-5 font-medium">السعر</th>
              <th className="text-right py-3.5 px-5 font-medium">المخزون</th>
              <th className="text-right py-3.5 px-5 font-medium">التقييم</th>
              <th className="text-right py-3.5 px-5 font-medium">الحالة</th>
              <th className="text-right py-3.5 px-5 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="py-3.5 px-5">
                        <div className="skeleton h-4 rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : products.map((product) => {
                  const img = product.images?.find((i) => i.is_primary) ?? product.images?.[0];
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      {/* Product */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                            <Image
                              src={getImageUrl(img?.url)}
                              alt={product.name_ar}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 line-clamp-1">{product.name_ar}</p>
                            <p className="text-xs text-gray-400 font-mono" dir="ltr">{product.sku}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-5 text-gray-600">
                        {(product as Product & { category?: { name_ar: string } }).category?.name_ar ?? "—"}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-5">
                        <div>
                          <p className="font-semibold text-pink-600">{formatPrice(product.price)}</p>
                          {product.compare_price && (
                            <p className="text-xs text-gray-400 line-through">{formatPrice(product.compare_price)}</p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-5">
                        <span className={`font-medium ${
                          product.stock === 0 ? "text-red-500" :
                          product.stock <= 5  ? "text-orange-500" :
                          "text-green-600"
                        }`}>
                          {product.stock}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-600">{(product.rating_avg ?? 0).toFixed(1)}</span>
                          <span className="text-gray-400 text-xs">({product.rating_count ?? 0})</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5">
                        <div className="flex flex-wrap gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            product.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}>
                            {product.is_active ? "نشط" : "مخفي"}
                          </span>
                          {product.is_featured && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              مميز
                            </span>
                          )}
                          {product.is_on_sale && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">
                              تخفيض
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleActive.mutate({ id: product.id, is_active: !product.is_active })}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                            title={product.is_active ? "إخفاء" : "إظهار"}
                          >
                            {product.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
                                deleteProduct.mutate(product.id);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>

        {!isLoading && products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>لا توجد منتجات</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Package({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
