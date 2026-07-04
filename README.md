# 🌸 Renad Flora Store — ريناد فلورا ستور

> متجر إلكتروني احترافي متكامل لبيع الإكسسوارات، الهدايا الفاخرة، والعطور

**YOUR STYLE, YOUR STORY ✦**

---

## 📋 نظرة عامة

فلورا ستور متجر إلكتروني عربي كامل مبني بأحدث تقنيات الويب، يدعم اللغة العربية بشكل كامل مع واجهة RTL أنيقة. مُصمم على غرار متاجر Shopify الاحترافية.

---

## ✨ المميزات

### 🛍️ المتجر
- صفحة رئيسية احترافية مع Hero، تصنيفات، ومنتجات مميزة
- 10 تصنيفات: إكسسوارات، ساعات، ميداليات، لبوبو، شمع، مجات، مرايات، بوكسات هدايا، شنط، أدوات منزلية
- صفحة منتج كاملة مع معرض صور، تقييمات، وتقسيط
- بحث متقدم مع فلاتر (سعر، تصنيف، حالة)
- سلة تسوق مع كود خصم وحساب الشحن
- Checkout متعدد الخطوات (4 خطوات)
- تتبع الطلبات
- قائمة المفضلة

### 💳 الدفع
- مدى، Visa، Mastercard، Apple Pay، Google Pay، STC Pay، PayPal
- تقسيط عبر **Tabby** (4 دفعات) و **Tamara** (3 دفعات) بدون فوائد

### 🚚 الشحن
- المملكة العربية السعودية (شحن مجاني فوق 300 ر.س)
- الكويت، قطر، الإمارات، البحرين، عُمان

### 🔐 المصادقة
- تسجيل دخول وإنشاء حساب عبر Supabase Auth
- صفحة حساب المستخدم مع الطلبات والعناوين

### 👑 لوحة الإدارة
- Dashboard مع إحصائيات وتقارير
- إدارة المنتجات (إضافة، تعديل، حذف، إخفاء)
- إدارة التصنيفات
- إدارة الطلبات مع تغيير الحالة
- إدارة العملاء
- إدارة الكوبونات
- تقارير الإيرادات

---

## 🛠️ التقنيات

| التقنية | الإصدار | الغرض |
|---------|---------|-------|
| Next.js | 15 | Framework |
| React | 19 | UI Library |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 11 | Animations |
| Supabase | 2 | Database + Auth + Storage |
| TanStack Query | 5 | Data Fetching |
| Zustand | 5 | State Management |
| React Hook Form | 7 | Forms |
| Zod | 3 | Validation |
| Recharts | 2 | Admin Charts |
| Sonner | 1 | Toast Notifications |

---

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+
- حساب Supabase (مجاني)

### الخطوات

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/flora-store.git
cd flora-store

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Fill in your Supabase credentials in .env.local

# 5. Run database migrations in Supabase SQL editor:
# Copy content of supabase/migrations/001_initial_schema.sql
# and run it in your Supabase project SQL editor

# 6. Run seed data (optional but recommended):
# Copy content of supabase/seed/001_seed_data.sql
# and run it after the migration

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🌸

---

## 📁 هيكل المشروع

```
flora-store/
├── app/
│   ├── (store)/              # Store pages (with layout)
│   │   ├── page.tsx          # Home
│   │   ├── products/         # All products + [slug]
│   │   ├── category/[slug]/  # Category page
│   │   ├── cart/             # Cart
│   │   ├── checkout/         # Multi-step checkout
│   │   ├── track/            # Order tracking
│   │   ├── wishlist/         # Wishlist
│   │   ├── offers/           # Offers & deals
│   │   ├── search/           # Search results
│   │   ├── about/            # About us
│   │   ├── contact/          # Contact
│   │   ├── faq/              # FAQ
│   │   ├── shipping-policy/  # Shipping policy
│   │   └── return-policy/    # Return policy
│   ├── (auth)/
│   │   ├── login/            # Login
│   │   └── register/         # Register
│   ├── admin/                # Admin panel
│   │   ├── dashboard/        # Stats & charts
│   │   ├── products/         # Products management
│   │   ├── orders/           # Orders management
│   │   ├── customers/        # Customers management
│   │   ├── coupons/          # Coupons management
│   │   └── ...
│   └── api/                  # API routes
│       ├── search/           # Search API
│       └── coupons/validate/ # Coupon validation
│
├── components/
│   ├── layout/               # Header, Footer, Nav, Announcement bar
│   ├── home/                 # Hero, Categories, Featured, etc.
│   ├── products/             # ProductCard, Gallery, Info, Reviews
│   ├── cart/                 # Cart components
│   ├── checkout/             # Multi-step checkout components
│   ├── admin/                # Admin sidebar, header
│   └── shared/               # ThemeProvider, QueryProvider
│
├── store/                    # Zustand stores
│   ├── cart.store.ts
│   ├── wishlist.store.ts
│   └── checkout.store.ts
│
├── lib/
│   ├── constants.ts          # All Flora constants & real data
│   ├── utils.ts              # Helper functions
│   └── supabase/             # Supabase client + server
│
├── types/
│   ├── index.ts              # All TypeScript types
│   └── supabase.ts           # Database types
│
├── styles/
│   └── globals.css           # Global styles + Flora design system
│
└── supabase/
    ├── migrations/           # Database schema
    └── seed/                 # Seed data with real categories
```

---

## 🗄️ قاعدة البيانات

### الجداول الرئيسية
- `users` — المستخدمون مع دور (customer / admin)
- `categories` — التصنيفات العشرة
- `products` — المنتجات مع SKU، المخزون، التقييم
- `product_images` — صور المنتجات المتعددة
- `product_variants` — المتغيرات (اللون، الحجم)
- `orders` — الطلبات مع معلومات الشحن
- `order_items` — عناصر كل طلب
- `addresses` — عناوين المستخدمين
- `wishlist` — المفضلة
- `reviews` — التقييمات
- `coupons` — كوبونات الخصم
- `notifications` — الإشعارات

### الأمان
- Row Level Security (RLS) على جميع الجداول
- Policies منفصلة للمستخدمين والمدراء
- Triggers تلقائية لتحديث `updated_at` و `rating_avg`

---

## 🌐 النشر على Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "🌸 Initial commit — Flora Store"
git remote add origin https://github.com/yourusername/flora-store.git
git push -u origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Import your GitHub repo
# - Add environment variables from .env.example
# - Deploy!
```

### متغيرات البيئة المطلوبة في Vercel
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

---

## 🎨 نظام التصميم

### الألوان الرئيسية
| اللون | Hex | الاستخدام |
|-------|-----|----------|
| Rose Pink | `#ec4899` | Primary / CTA buttons |
| Deep Rose | `#db2777` | Hover states |
| Gold | `#f59e0b` | Accents / Badges |
| Beige | `#fdf2f8` | Backgrounds |
| Green | `#22c55e` | Success / Stock |

### الخطوط
- **Cairo** — النص العربي الأساسي
- **Playfair Display** — العناوين الإنجليزية

---

## 📱 الصفحات

| الصفحة | المسار |
|--------|--------|
| الرئيسية | `/` |
| جميع المنتجات | `/products` |
| تصنيف | `/category/[slug]` |
| منتج | `/products/[slug]` |
| البحث | `/search?q=...` |
| السلة | `/cart` |
| الدفع | `/checkout` |
| تتبع الطلب | `/track` |
| المفضلة | `/wishlist` |
| العروض | `/offers` |
| من نحن | `/about` |
| اتصل بنا | `/contact` |
| الأسئلة الشائعة | `/faq` |
| سياسة الشحن | `/shipping-policy` |
| سياسة الإرجاع | `/return-policy` |
| تسجيل الدخول | `/login` |
| إنشاء حساب | `/register` |
| لوحة الإدارة | `/admin/dashboard` |

---

## 📞 التواصل والدعم

- **واتساب:** [+966501234567](https://wa.me/966501234567)
- **إنستجرام:** [@flor.astore123](https://www.instagram.com/flor.astore123)
- **تيك توك:** [@florastore04](https://www.tiktok.com/@florastore04)
- **فيسبوك:** [Flora Store](https://www.facebook.com/share/1639sCDaVN/)

---

## 📄 الترخيص

MIT License — مرخص للاستخدام الشخصي والتجاري

---

<div align="center">
  Made with 🌸 by Flora Store Team
  <br>
  <strong>YOUR STYLE, YOUR STORY ✦</strong>
</div>
