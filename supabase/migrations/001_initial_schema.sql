
-- ============================================================
-- Flora Store — Complete Database Schema
-- ============================================================
-- Run this in your Supabase SQL editor or via: supabase db push

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ────────────────────────────────────────────────────────────
-- 1. USERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer','admin','super_admin')),
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 2. CATEGORIES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug           TEXT NOT NULL UNIQUE,
  name_ar        TEXT NOT NULL,
  name_en        TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  image_url      TEXT,
  emoji          TEXT,
  color          TEXT DEFAULT '#fce7f3',
  parent_id      UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 3. PRODUCTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT NOT NULL UNIQUE,
  name_ar             TEXT NOT NULL,
  name_en             TEXT NOT NULL,
  description_ar      TEXT,
  description_en      TEXT,
  price               NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  compare_price       NUMERIC(10,2) CHECK (compare_price >= 0),
  discount_percentage INTEGER CHECK (discount_percentage BETWEEN 0 AND 100),
  sku                 TEXT NOT NULL UNIQUE,
  stock               INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  category_id         UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  brand               TEXT,
  tags                TEXT[] DEFAULT '{}',
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured         BOOLEAN NOT NULL DEFAULT FALSE,
  is_new              BOOLEAN NOT NULL DEFAULT TRUE,
  is_on_sale          BOOLEAN NOT NULL DEFAULT FALSE,
  rating_avg          NUMERIC(3,2) DEFAULT 0 CHECK (rating_avg BETWEEN 0 AND 5),
  rating_count        INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full text search index on products
CREATE INDEX IF NOT EXISTS idx_products_search
  ON public.products USING GIN (
    to_tsvector('arabic', COALESCE(name_ar,'') || ' ' || COALESCE(description_ar,''))
  );
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);

-- ────────────────────────────────────────────────────────────
-- 4. PRODUCT IMAGES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt_ar      TEXT,
  alt_en      TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);

-- ────────────────────────────────────────────────────────────
-- 5. PRODUCT VARIANTS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name_ar     TEXT NOT NULL,
  name_en     TEXT NOT NULL,
  sku         TEXT NOT NULL UNIQUE,
  price       NUMERIC(10,2) NOT NULL,
  compare_price NUMERIC(10,2),
  stock       INTEGER NOT NULL DEFAULT 0,
  options     JSONB NOT NULL DEFAULT '{}'
);

-- ────────────────────────────────────────────────────────────
-- 6. ADDRESSES
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.addresses (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  label        TEXT NOT NULL DEFAULT 'المنزل',
  full_name    TEXT NOT NULL,
  phone        TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT 'SA',
  city         TEXT NOT NULL,
  district     TEXT,
  street       TEXT NOT NULL,
  building     TEXT,
  postal_code  TEXT,
  is_default   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_addresses_user ON public.addresses(user_id);

-- ────────────────────────────────────────────────────────────
-- 7. COUPONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.coupons (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code              TEXT NOT NULL UNIQUE,
  type              TEXT NOT NULL CHECK (type IN ('percentage','fixed','free_shipping')),
  value             NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order_amount  NUMERIC(10,2),
  max_uses          INTEGER,
  used_count        INTEGER NOT NULL DEFAULT 0,
  expires_at        TIMESTAMPTZ,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 8. ORDERS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number      TEXT NOT NULL UNIQUE,
  user_id           UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  payment_status    TEXT NOT NULL DEFAULT 'pending'
                    CHECK (payment_status IN ('pending','paid','failed','refunded')),
  payment_method    TEXT NOT NULL,
  payment_reference TEXT,
  subtotal          NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount          NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_fee      NUMERIC(10,2) NOT NULL DEFAULT 0,
  vat               NUMERIC(10,2) NOT NULL DEFAULT 0,
  total             NUMERIC(10,2) NOT NULL DEFAULT 0,
  coupon_id         UUID REFERENCES public.coupons(id) ON DELETE SET NULL,
  coupon_code       TEXT,
  shipping_info     JSONB NOT NULL DEFAULT '{}',
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);

-- ────────────────────────────────────────────────────────────
-- 9. ORDER ITEMS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  variant_id      UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name_ar TEXT NOT NULL,
  product_name_en TEXT NOT NULL,
  product_image   TEXT,
  sku             TEXT NOT NULL,
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price      NUMERIC(10,2) NOT NULL,
  total_price     NUMERIC(10,2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON public.order_items(product_id);

-- ────────────────────────────────────────────────────────────
-- 10. WISHLIST
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.wishlist (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist(user_id);

-- ────────────────────────────────────────────────────────────
-- 11. REVIEWS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reviews (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id   UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id     UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title        TEXT,
  body         TEXT,
  is_verified  BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);

-- ────────────────────────────────────────────────────────────
-- 12. NOTIFICATIONS
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title_ar  TEXT NOT NULL,
  title_en  TEXT NOT NULL DEFAULT '',
  body_ar   TEXT NOT NULL,
  body_en   TEXT NOT NULL DEFAULT '',
  type      TEXT NOT NULL DEFAULT 'system' CHECK (type IN ('order','promo','system')),
  is_read   BOOLEAN NOT NULL DEFAULT FALSE,
  data      JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 13. TRIGGERS — updated_at auto-update
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ────────────────────────────────────────────────────────────
-- 14. TRIGGER — auto-create user profile on signup
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 15. TRIGGER — auto-update product rating on review change
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_product_id UUID;
BEGIN
  v_product_id := COALESCE(NEW.product_id, OLD.product_id);
  UPDATE public.products
  SET
    rating_avg   = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE product_id = v_product_id AND is_published = TRUE),
    rating_count = (SELECT COUNT(*) FROM public.reviews WHERE product_id = v_product_id AND is_published = TRUE)
  WHERE id = v_product_id;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_review_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_product_rating();

-- ────────────────────────────────────────────────────────────
-- 16. ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications      ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"       ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"     ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all users"        ON public.users FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Categories — public read
CREATE POLICY "Anyone can view active categories" ON public.categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage categories"          ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Products — public read
CREATE POLICY "Anyone can view active products"   ON public.products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage products"            ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Product images — public read
CREATE POLICY "Anyone can view product images"    ON public.product_images FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage product images"      ON public.product_images FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Product variants — public read
CREATE POLICY "Anyone can view variants"          ON public.product_variants FOR SELECT USING (TRUE);
CREATE POLICY "Admins manage variants"            ON public.product_variants FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Addresses
CREATE POLICY "Users manage own addresses"        ON public.addresses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all addresses"         ON public.addresses FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Orders
CREATE POLICY "Users view own orders"             ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create orders"               ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Admins manage all orders"          ON public.orders FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Order Items
CREATE POLICY "Users view own order items"        ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admins view all order items"       ON public.order_items FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Wishlist
CREATE POLICY "Users manage own wishlist"         ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- Reviews
CREATE POLICY "Anyone can view published reviews" ON public.reviews FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Users create own reviews"          ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own reviews"          ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all reviews"         ON public.reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Coupons
CREATE POLICY "Anyone can view active coupons"    ON public.coupons FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admins manage coupons"             ON public.coupons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','super_admin'))
);

-- Notifications
CREATE POLICY "Users view own notifications"      ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications"    ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
