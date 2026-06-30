"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { createClient } from "@/lib/supabase/client";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import type { Product, ProductFilters } from "@/types";

interface Props {
  searchParams: {
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    page?: string;
    filter?: string;
  };
}

async function getProducts(filters: ProductFilters): Promise<{ products: Product[]; total: number }> {
  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*, images:product_images(*)", { count: "exact" })
    .eq("is_active", true);

  if (filters.category)    query = query.eq("category_id", filters.category);
  if (filters.isOnSale)    query = query.eq("is_on_sale", true);
  if (filters.isFeatured)  query = query.eq("is_featured", true);
  if (filters.isNew)       query = query.eq("is_new", true);
  if (filters.minPrice)    query = query.gte("price", filters.minPrice);
  if (filters.maxPrice)    query = query.lte("price", filters.maxPrice);
  if (filters.search)      query = query.ilike("name_ar", `%${filters.search}%`);

  switch (filters.sortBy) {
    case "price_asc":  query = query.order("price", { ascending: true });  break;
    case "price_desc": query = query.order("price", { ascending: false }); break;
    case "popular":    query = query.order("rating_count", { ascending: false }); break;
    case "rating":     query = query.order("rating_avg", { ascending: false }); break;
    default:           query = query.order("created_at", { ascending: false });
  }

  const page  = filters.page ?? 1;
  const limit = filters.limit ?? PRODUCTS_PER_PAGE;
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  return { products: (data ?? []) as unknown as Product[], total: count ?? 0 };
}

export function ProductsGrid({ searchParams }: Props) {
  const filters: ProductFilters = {
    sortBy:    (searchParams.sort as ProductFilters["sortBy"]) ?? "newest",
    minPrice:  searchParams.min ? Number(searchParams.min) : undefined,
    maxPrice:  searchParams.max ? Number(searchParams.max) : undefined,
    isOnSale:  searchParams.filter === "sale",
    isFeatured: searchParams.filter === "featured",
    isNew:     searchParams.filter === "new",
    page:      Number(searchParams.page ?? 1),
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn:  () => getProducts(filters),
  });

  const sortOptions = [
    { value: "newest",     label: "الأحدث" },
    { value: "price_asc",  label: "السعر: الأقل" },
    { value: "price_desc", label: "السعر: الأعلى" },
    { value: "popular",    label: "الأكثر مبيعاً" },
    { value: "rating",     label: "الأعلى تقييماً" },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <p className="text-sm text-gray-500">
          {isLoading ? "..." : `${data?.total ?? 0} منتج`}
        </p>
        <select
          className="input-flora w-auto text-sm py-2 px-3"
          defaultValue={searchParams.sort ?? "newest"}
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set("sort", e.target.value);
            window.location.href = url.toString();
          }}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : data?.products.length
            ? data.products.map((p) => <ProductCard key={p.id} product={p} />)
            : (
              <div className="col-span-full text-center py-20">
                <span className="text-5xl block mb-4">🔍</span>
                <p className="text-gray-500">لم يتم العثور على منتجات</p>
              </div>
            )
        }
      </div>
    </div>
  );
}
