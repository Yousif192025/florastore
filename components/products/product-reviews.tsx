"use client";

import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";

interface Props { productId: string }

async function getReviews(productId: string): Promise<Review[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*, user:users(full_name, avatar_url)")
    .eq("product_id", productId)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(10);
  return (data ?? []) as unknown as Review[];
}

export function ProductReviews({ productId }: Props) {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn:  () => getReviews(productId),
  });

  if (isLoading) return (
    <div className="py-8 text-center text-gray-400">جاري تحميل التقييمات...</div>
  );

  return (
    <section className="border-t border-gray-100 pt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        تقييمات العملاء ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <Star className="w-10 h-10 mx-auto mb-3 text-gray-200" />
          <p>لا توجد تقييمات بعد</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.user?.full_name?.[0] ?? "م"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {review.user?.full_name ?? "عميل"}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
              </div>
              {review.title && (
                <p className="font-medium text-gray-800 text-sm mb-1">{review.title}</p>
              )}
              {review.body && (
                <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
              )}
              {review.is_verified && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  ✓ شراء موثّق
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
