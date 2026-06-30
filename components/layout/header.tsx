"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, ShoppingCart, Heart, User, Menu, Sun, Moon, X
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { CATEGORIES } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme }         = useTheme();
  const router                      = useRouter();
  const cartCount                   = useCartStore((s) => s.getItemCount());
  const wishCount                   = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass shadow-lg shadow-pink-100/50"
            : "bg-white/95 backdrop-blur-sm border-b border-pink-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <span className="text-2xl font-bold text-flora-gradient">
                  Flora
                </span>
                <span className="text-xs text-flora-gold-600 font-medium block leading-none -mt-1">
                  ✦ Store ✦
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/"
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">
                الرئيسية
              </Link>
              <Link href="/products"
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">
                جميع المنتجات
              </Link>

              {/* Categories dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-center gap-1">
                  التصنيفات
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-pink-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-3 grid grid-cols-2 gap-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.nameAr}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/offers"
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                العروض 🔥
              </Link>
              <Link href="/about"
                className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">
                من نحن
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist"
                className="relative p-2 rounded-full hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="المفضلة">
                <Heart className="w-5 h-5" />
                {wishCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {wishCount > 9 ? "9+" : wishCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart"
                className="relative p-2 rounded-full hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="السلة">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Account */}
              <Link href="/account"
                className="p-2 rounded-full hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors hidden sm:block"
                aria-label="الحساب">
                <User className="w-5 h-5" />
              </Link>

              {/* Dark Mode */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors hidden sm:block"
                aria-label="تبديل الوضع"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-3 p-4 border-b border-pink-100">
                <Search className="w-5 h-5 text-pink-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج، تصنيف، أو علامة تجارية..."
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              <div className="p-4">
                <p className="text-xs font-medium text-gray-400 mb-3">تصنيفات شائعة</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 text-sm font-medium hover:bg-pink-100 transition-colors"
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.nameAr}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
