"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ZoomIn } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed]       = useState(false);

  const sortedImages = [...images].sort((a, b) => {
    if (a.is_primary) return -1;
    if (b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });

  const current = sortedImages[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + sortedImages.length) % sortedImages.length);
  const next = () => setActiveIdx((i) => (i + 1) % sortedImages.length);

  if (!current) return (
    <div className="aspect-square rounded-2xl bg-pink-50 flex items-center justify-center">
      <span className="text-6xl">🌸</span>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={getImageUrl(current.url)}
              alt={current.alt_ar ?? productName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom button */}
        <button
          onClick={() => setZoomed(true)}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
        >
          <ZoomIn className="w-4 h-4 text-gray-600" />
        </button>

        {/* Navigation arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={next}
              className="absolute left-12 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Dots */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {sortedImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  i === activeIdx ? "bg-pink-500 w-4" : "bg-white/70"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {sortedImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                i === activeIdx ? "border-pink-500" : "border-transparent hover:border-pink-200"
              )}
            >
              <Image
                src={getImageUrl(img.url)}
                alt={img.alt_ar ?? productName}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative w-full max-w-2xl aspect-square">
            <Image
              src={getImageUrl(current.url)}
              alt={current.alt_ar ?? productName}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
            onClick={() => setZoomed(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
