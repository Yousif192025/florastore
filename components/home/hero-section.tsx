"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center"
      style={{ background: "var(--gradient-hero)" }}>

      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-right order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 border border-pink-200 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-700">الوصول للذوق الرفيع</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            <span className="block">أناقتك</span>
            <span className="block text-flora-gradient">قصتك</span>
            <span className="block text-3xl sm:text-4xl font-light text-gray-500 mt-2">
              YOUR STYLE, YOUR STORY
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
            اكتشفي أجمل الإكسسوارات، الهدايا الفاخرة، ودمى لبوبو المحبوبة في متجر فلورا.
            شحن سريع لجميع مدن المملكة والخليج.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/products" className="btn-flora text-base px-8 py-4 gap-2">
              <span>تسوقي الآن</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-outline-flora text-base px-8 py-4">
              تواصلي معنا
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 justify-center lg:justify-start mt-10 pt-8 border-t border-pink-100">
            {[
              { value: "+500",  label: "منتج متاح"      },
              { value: "+2K",   label: "عميلة سعيدة"    },
              { value: "6",     label: "دول خليجية"     },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-flora-gradient">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual / Image area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <div className="relative">
            {/* Main card */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-float">🌸</div>
                  <p className="text-pink-600 font-bold text-xl">Flora Store</p>
                  <p className="text-pink-400 text-sm">✦ YOUR STYLE ✦</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <span className="text-2xl">💍</span>
              <div>
                <p className="text-xs font-semibold text-gray-800">إكسسوارات</p>
                <p className="text-xs text-pink-500">+100 منتج</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-xs font-semibold text-gray-800">هدايا فاخرة</p>
                <p className="text-xs text-pink-500">تغليف مجاني</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 -left-16 bg-white rounded-2xl shadow-xl p-3"
            >
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
              </div>
              <p className="text-xs text-gray-600 font-medium">+2000 تقييم</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400">اسحب للأسفل</span>
        <div className="w-5 h-8 border-2 border-pink-300 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-pink-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
