// ──────────────────────────────────────────────────
// Flora Store — Constants
// Based on real data from https://cyberpath-digital.vercel.app/flora.html
// ──────────────────────────────────────────────────

export const APP_NAME = "Flora Store";
export const APP_NAME_AR = "فلورا ستور";
export const APP_TAGLINE = "YOUR STYLE, YOUR STORY";
export const APP_TAGLINE_AR = "أسلوبك، قصتك";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const APP_DESCRIPTION = "متجر فلورا — إكسسوارات، ورود، هدايا، وعطور فاخرة";

// ── Social & Contact ──────────────────────────────
export const SOCIAL_LINKS = {
  whatsapp:       "https://wa.me/966501234567",
  whatsappGroup:  "https://chat.whatsapp.com/DkS6LUMRu12KywzsZUwZ1r",
  instagram:      "https://www.instagram.com/flor.astore123",
  tiktok:         "https://www.tiktok.com/@florastore04",
  facebook:       "https://www.facebook.com/share/1639sCDaVN/",
} as const;

export const WHATSAPP_NUMBER = "966501234567";

// ── Currency & Locale ─────────────────────────────
export const CURRENCY     = "SAR";
export const CURRENCY_SYMBOL = "ر.س";
export const DEFAULT_LOCALE = "ar-SA";

// ── Categories — Real data from Flora website ─────
export const CATEGORIES = [
  {
    id:          "accessories",
    slug:        "accessories",
    nameAr:      "إكسسوارات",
    nameEn:      "Accessories",
    emoji:       "💍",
    image:       "/images/categories/accessories.webp",
    description: "إكسسوارات أنيقة تناسب كل مناسبة",
    color:       "#fce7f3",
  },
  {
    id:          "watches",
    slug:        "watches",
    nameAr:      "ساعات",
    nameEn:      "Watches",
    emoji:       "⌚",
    image:       "/images/categories/watches.webp",
    description: "ساعات عصرية وكلاسيكية لكل ذوق",
    color:       "#fef3c7",
  },
  {
    id:          "medals",
    slug:        "medals",
    nameAr:      "ميداليات",
    nameEn:      "Medals",
    emoji:       "🏅",
    image:       "/images/categories/medals.webp",
    description: "ميداليات مميزة للهدايا والتكريم",
    color:       "#fffbeb",
  },
  {
    id:          "lubob",
    slug:        "lubob",
    nameAr:      "لبوبو",
    nameEn:      "Lubob",
    emoji:       "🧸",
    image:       "/images/categories/lubob.webp",
    description: "دمى لبوبو اللطيفة والمحبوبة",
    color:       "#fdf2f8",
  },
  {
    id:          "candles",
    slug:        "candles",
    nameAr:      "شمع",
    nameEn:      "Candles",
    emoji:       "🕯️",
    image:       "/images/categories/candles.webp",
    description: "شموع عطرية فاخرة لأجواء رومانسية",
    color:       "#fef9ee",
  },
  {
    id:          "mugs",
    slug:        "mugs",
    nameAr:      "مجات",
    nameEn:      "Mugs",
    emoji:       "☕",
    image:       "/images/categories/mugs.webp",
    description: "مجات بتصاميم حصرية وألوان جميلة",
    color:       "#f0fdf4",
  },
  {
    id:          "mirrors",
    slug:        "mirrors",
    nameAr:      "مرايات",
    nameEn:      "Mirrors",
    emoji:       "🪞",
    image:       "/images/categories/mirrors.webp",
    description: "مرايات أنيقة بإطارات فاخرة",
    color:       "#f0f9ff",
  },
  {
    id:          "gift-boxes",
    slug:        "gift-boxes",
    nameAr:      "بوكسات هدايا",
    nameEn:      "Gift Boxes",
    emoji:       "🎁",
    image:       "/images/categories/gift-boxes.webp",
    description: "بوكسات هدايا متكاملة لكل المناسبات",
    color:       "#fdf2f8",
  },
  {
    id:          "bags",
    slug:        "bags",
    nameAr:      "شنط",
    nameEn:      "Bags",
    emoji:       "👜",
    image:       "/images/categories/bags.webp",
    description: "شنط عصرية وأنيقة بأفضل الخامات",
    color:       "#fce7f3",
  },
  {
    id:          "home-essentials",
    slug:        "home-essentials",
    nameAr:      "أدوات منزلية",
    nameEn:      "Home Essentials",
    emoji:       "🏠",
    image:       "/images/categories/home-essentials.webp",
    description: "أدوات منزلية راقية لبيتك الجميل",
    color:       "#f0fdf4",
  },
] as const;

// ── Shipping Countries & Fees ─────────────────────
export const SHIPPING_COUNTRIES = [
  {
    code:     "SA",
    nameAr:   "المملكة العربية السعودية",
    nameEn:   "Saudi Arabia",
    flag:     "🇸🇦",
    currency: "SAR",
    cities: [
      "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة",
      "الدمام", "الخبر", "الظهران", "الطائف", "تبوك",
      "القصيم", "حائل", "أبها", "نجران", "جازان", "الجوف",
    ],
    shippingFee:     25,
    freeShippingAt:  300,
    deliveryDays:    "2-4",
  },
  {
    code:     "KW",
    nameAr:   "الكويت",
    nameEn:   "Kuwait",
    flag:     "🇰🇼",
    currency: "KWD",
    cities:   ["الكويت", "الفروانية", "حولي", "الجهراء", "مبارك الكبير"],
    shippingFee:     35,
    freeShippingAt:  400,
    deliveryDays:    "3-6",
  },
  {
    code:     "QA",
    nameAr:   "قطر",
    nameEn:   "Qatar",
    flag:     "🇶🇦",
    currency: "QAR",
    cities:   ["الدوحة", "الوكرة", "الريان", "الخور"],
    shippingFee:     35,
    freeShippingAt:  400,
    deliveryDays:    "3-6",
  },
  {
    code:     "OM",
    nameAr:   "سلطنة عُمان",
    nameEn:   "Oman",
    flag:     "🇴🇲",
    currency: "OMR",
    cities:   ["مسقط", "صلالة", "نزوى", "صحار", "السيب"],
    shippingFee:     40,
    freeShippingAt:  450,
    deliveryDays:    "4-7",
  },
  {
    code:     "BH",
    nameAr:   "البحرين",
    nameEn:   "Bahrain",
    flag:     "🇧🇭",
    currency: "BHD",
    cities:   ["المنامة", "المحرق", "الرفاع", "مدينة عيسى"],
    shippingFee:     35,
    freeShippingAt:  400,
    deliveryDays:    "3-5",
  },
  {
    code:     "AE",
    nameAr:   "الإمارات العربية المتحدة",
    nameEn:   "United Arab Emirates",
    flag:     "🇦🇪",
    currency: "AED",
    cities:   ["دبي", "أبوظبي", "الشارقة", "عجمان", "رأس الخيمة", "الفجيرة"],
    shippingFee:     35,
    freeShippingAt:  400,
    deliveryDays:    "3-5",
  },
] as const;

// ── Payment Methods ───────────────────────────────
export const PAYMENT_METHODS = [
  { id: "mada",       nameAr: "مدى",        nameEn: "Mada",        icon: "/icons/mada.svg",       available: true  },
  { id: "visa",       nameAr: "فيزا",       nameEn: "Visa",        icon: "/icons/visa.svg",       available: true  },
  { id: "mastercard", nameAr: "ماستركارد",  nameEn: "Mastercard",  icon: "/icons/mastercard.svg", available: true  },
  { id: "applepay",   nameAr: "Apple Pay",  nameEn: "Apple Pay",   icon: "/icons/apple-pay.svg",  available: true  },
  { id: "googlepay",  nameAr: "Google Pay", nameEn: "Google Pay",  icon: "/icons/google-pay.svg", available: true  },
  { id: "stcpay",     nameAr: "STC Pay",    nameEn: "STC Pay",     icon: "/icons/stc-pay.svg",    available: true  },
  { id: "paypal",     nameAr: "PayPal",     nameEn: "PayPal",      icon: "/icons/paypal.svg",     available: true  },
] as const;

// ── Installment Providers ─────────────────────────
export const INSTALLMENT_PROVIDERS = [
  {
    id:          "tabby",
    nameAr:      "تابي",
    nameEn:      "Tabby",
    icon:        "/icons/tabby.svg",
    months:      4,
    interestFree: true,
    minAmount:   200,
    maxAmount:   5000,
    description: "قسّم على 4 دفعات بدون فوائد",
  },
  {
    id:          "tamara",
    nameAr:      "تمارا",
    nameEn:      "Tamara",
    icon:        "/icons/tamara.svg",
    months:      3,
    interestFree: true,
    minAmount:   100,
    maxAmount:   3000,
    description: "ادفع على 3 أشهر بدون فوائد",
  },
] as const;

// ── Order Statuses ────────────────────────────────
export const ORDER_STATUSES = {
  pending:    { labelAr: "قيد الانتظار",   labelEn: "Pending",    color: "yellow" },
  confirmed:  { labelAr: "مؤكد",           labelEn: "Confirmed",  color: "blue"   },
  processing: { labelAr: "جاري التجهيز",  labelEn: "Processing", color: "purple" },
  shipped:    { labelAr: "تم الشحن",       labelEn: "Shipped",    color: "indigo" },
  delivered:  { labelAr: "تم التوصيل",     labelEn: "Delivered",  color: "green"  },
  cancelled:  { labelAr: "ملغي",           labelEn: "Cancelled",  color: "red"    },
  refunded:   { labelAr: "مسترد",          labelEn: "Refunded",   color: "gray"   },
} as const;

// ── Pagination ────────────────────────────────────
export const PRODUCTS_PER_PAGE  = 12;
export const REVIEWS_PER_PAGE   = 10;
export const ORDERS_PER_PAGE    = 20;

// ── Image Sizes ───────────────────────────────────
export const IMAGE_SIZES = {
  thumbnail: { width: 200,  height: 200  },
  card:      { width: 400,  height: 400  },
  product:   { width: 800,  height: 800  },
  banner:    { width: 1920, height: 600  },
  category:  { width: 600,  height: 400  },
} as const;

// ── VAT ───────────────────────────────────────────
export const VAT_RATE = 0.15; // 15% VAT in Saudi Arabia

// ── Min order for free shipping ───────────────────
export const FREE_SHIPPING_THRESHOLD = 300; // SAR
