"use client";

import { useState } from "react";
import { X, Truck, Tag, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const announcements = [
  { icon: Truck,  text: "🚚 شحن مجاني للطلبات فوق 300 ر.س داخل المملكة" },
  { icon: Tag,    text: "🏷️ استخدم كود FLORA10 للحصول على خصم 10%" },
  { icon: Gift,   text: "🎁 تغليف هدايا مجاني مع كل طلب" },
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-l from-pink-600 to-rose-500 text-white text-sm py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 font-medium">
          <span className="animate-pulse">✦</span>
          <span>{announcements[idx].text}</span>
          <span className="animate-pulse">✦</span>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-1 ms-4">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-200",
                i === idx ? "bg-white w-3" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
