// ──────────────────────────────────────────────────
// Flora Store — TypeScript Types
// ──────────────────────────────────────────────────

// ── User & Auth ───────────────────────────────────
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "customer" | "admin" | "super_admin";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  country_code: string;
  city: string;
  district: string | null;
  street: string;
  building: string | null;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;
}

// ── Product ───────────────────────────────────────
export interface Category {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  image_url: string | null;
  emoji: string | null;
  color: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  products_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_ar: string | null;
  alt_en: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name_ar: string;
  name_en: string;
  sku: string;
  price: number;
  compare_price: number | null;
  stock: number;
  options: Record<string, string>;
}

export interface Product {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  price: number;
  compare_price: number | null;
  discount_percentage: number | null;
  sku: string;
  stock: number;
  category_id: string;
  brand: string | null;
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_on_sale: boolean;
  images: ProductImage[];
  category?: Category;
  variants?: ProductVariant[];
  reviews?: Review[];
  rating_avg?: number;
  rating_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isOnSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  search?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular" | "rating";
  page?: number;
  limit?: number;
}

// ── Reviews ───────────────────────────────────────
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified: boolean;
  is_published: boolean;
  user?: Pick<User, "full_name" | "avatar_url">;
  created_at: string;
}

// ── Cart ──────────────────────────────────────────
export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  vat: number;
  total: number;
  coupon: Coupon | null;
}

// ── Coupon ────────────────────────────────────────
export type CouponType = "percentage" | "fixed" | "free_shipping";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  min_order_amount: number | null;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

// ── Order ─────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentMethod =
  | "mada"
  | "visa"
  | "mastercard"
  | "apple_pay"
  | "google_pay"
  | "stc_pay"
  | "paypal"
  | "tabby"
  | "tamara"
  | "cod";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name_ar: string;
  product_name_en: string;
  product_image: string | null;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface ShippingInfo {
  full_name: string;
  phone: string;
  country_code: string;
  city: string;
  district: string | null;
  street: string;
  building: string | null;
  postal_code: string | null;
  notes: string | null;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_reference: string | null;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  vat: number;
  total: number;
  coupon_id: string | null;
  coupon_code: string | null;
  shipping_info: ShippingInfo;
  notes: string | null;
  items: OrderItem[];
  user?: Pick<User, "full_name" | "email" | "phone">;
  created_at: string;
  updated_at: string;
}

// ── Checkout ──────────────────────────────────────
export type CheckoutStep =
  | "customer"
  | "shipping"
  | "shipping_method"
  | "payment"
  | "review"
  | "confirmation";

export interface CheckoutData {
  step: CheckoutStep;
  customerInfo: {
    full_name: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingInfo;
  shippingMethod: {
    provider: string;
    fee: number;
    deliveryDays: string;
  } | null;
  paymentMethod: PaymentMethod | null;
  installmentProvider: "tabby" | "tamara" | null;
  notes: string;
}

// ── Wishlist ──────────────────────────────────────
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  created_at: string;
}

// ── Notification ──────────────────────────────────
export interface Notification {
  id: string;
  user_id: string;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  type: "order" | "promo" | "system";
  is_read: boolean;
  data: Record<string, unknown> | null;
  created_at: string;
}

// ── Admin ─────────────────────────────────────────
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  recentOrders: Order[];
  topProducts: (Product & { total_sold: number })[];
  revenueByMonth: { month: string; revenue: number }[];
}

// ── API Responses ─────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// ── Form Types ────────────────────────────────────
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

export interface ContactForm {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ProductForm {
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  compare_price: number | null;
  sku: string;
  stock: number;
  category_id: string;
  brand: string;
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_on_sale: boolean;
}

// ── UI ────────────────────────────────────────────
export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  titleAr: string;
  titleEn?: string;
  descriptionAr?: string;
}

export type SortOption = {
  value: string;
  labelAr: string;
  labelEn: string;
};
