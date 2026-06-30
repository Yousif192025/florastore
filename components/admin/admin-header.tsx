"use client";

import { Bell, Search, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 w-72">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          placeholder="بحث في اللوحة..."
          className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">المدير</span>
        </div>
      </div>
    </header>
  );
}
