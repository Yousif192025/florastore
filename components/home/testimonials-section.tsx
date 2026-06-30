"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "سارة العمري",
    location: "الرياض",
    rating: 5,
    text: "طلبت بوكس هدية لصديقتي وكان رائعاً جداً! التغليف فاخر والمنتجات أصلية. التوصيل وصل في نفس اليوم داخل الرياض 🌸",
    avatar: "س",
    date: "منذ أسبوع",
  },
  {
    id: 2,
    name: "نورة الشمري",
    location: "جدة",
    rating: 5,
    text: "من أجمل المتاجر اللي تعاملت معها! الإسورة اشتريتها كانت أحلى من الصور. سأرجع للشراء أكيد 💕",
    avatar: "ن",
    date: "منذ 3 أيام",
  },
  {
    id: 3,
    name: "منى الزهراني",
    location: "الدمام",
    rating: 5,
    text: "لبوبو كيوت جداً ووصلت بأمان. خدمة العملاء ممتازة وردوا على واتساب بسرعة. شكراً فلورا! 🧸",
    avatar: "م",
    date: "منذ يومين",
  },
  {
    id: 4,
    name: "هند القحطاني",
    location: "مكة المكرمة",
    rating: 5,
    text: "الشمعة العطرية رائحتها تجنن والتغليف محترم جداً. ممتازة كهدية للعيد والمناسبات 🕯️",
    avatar: "ه",
    date: "منذ 5 أيام",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            آراء <em>عميلاتنا</em>
          </motion.h2>
          <p className="text-gray-500">أكثر من 2000 عميلة سعيدة تثق في فلورا ستور</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-5"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{t.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location} · {t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
