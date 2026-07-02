import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الإرجاع | فلورا ستور" };

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="section-container max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">سياسة الإرجاع والاستبدال 🔄</h1>
        <p className="text-gray-500 mb-10">آخر تحديث: يناير 2025</p>

        <div className="space-y-8 text-gray-700">
          {/* Policy summary cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: "📅", title: "14 يوم",        text: "مدة الإرجاع من تاريخ الاستلام" },
              { emoji: "✅", title: "منتج أصلي",     text: "يجب أن يكون بحالته الأصلية" },
              { emoji: "🆓", title: "مجاني",         text: "إرجاع مجاني في حال وجود عيب" },
            ].map((item) => (
              <div key={item.title} className="text-center bg-pink-50 rounded-2xl p-5">
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs">{item.text}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">حالات قبول الإرجاع</h2>
            <ul className="space-y-2">
              {[
                "المنتج معيب أو تالف عند الاستلام",
                "المنتج لا يطابق الوصف أو الصورة الموجودة في الموقع",
                "تم إرسال منتج خاطئ",
                "المنتج غير مستخدم وفي حالته الأصلية مع التغليف الأصلي",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">حالات عدم قبول الإرجاع</h2>
            <ul className="space-y-2">
              {[
                "المنتجات المستخدمة أو التالفة من قِبل العميل",
                "المنتجات المخصصة أو المُنقشة بالاسم",
                "الطلبات التي مضى عليها أكثر من 14 يوماً",
                "المنتجات التي لا يوجد بها عيب أو خطأ من جانبنا",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">خطوات الإرجاع</h2>
            <ol className="space-y-3">
              {[
                "تواصلي معنا عبر واتساب وأرسلي رقم طلبك وصور المنتج",
                "سيراجع فريقنا طلبك خلال 24 ساعة",
                "إذا تمت الموافقة، ستتلقين تعليمات الإرجاع",
                "بعد استلام المنتج وفحصه، يتم رد المبلغ خلال 3-5 أيام عمل",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-sm flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="bg-pink-50 rounded-2xl p-6 text-center">
            <p className="font-semibold text-gray-800 mb-3">هل تريدين إرجاع منتج؟</p>
            <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer"
              className="btn-flora inline-flex px-6 py-3 text-sm">
              تواصلي معنا عبر واتساب
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
