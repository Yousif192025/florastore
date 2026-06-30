-- ============================================================
-- Flora Store — Seed Data
-- Real categories from https://cyberpath-digital.vercel.app/flora.html
-- ============================================================

-- ── Insert Categories ─────────────────────────────────────────
INSERT INTO public.categories (slug, name_ar, name_en, description_ar, description_en, emoji, color, sort_order, is_active) VALUES
  ('accessories',      'إكسسوارات',     'Accessories',     'إكسسوارات أنيقة تناسب كل مناسبة',           'Elegant accessories for every occasion',   '💍', '#fce7f3', 1,  TRUE),
  ('watches',          'ساعات',          'Watches',         'ساعات عصرية وكلاسيكية لكل ذوق',             'Modern and classic watches for every taste','⌚', '#fef3c7', 2,  TRUE),
  ('medals',           'ميداليات',       'Medals',          'ميداليات مميزة للهدايا والتكريم',           'Special medals for gifts and recognition',  '🏅', '#fffbeb', 3,  TRUE),
  ('lubob',            'لبوبو',          'Lubob',           'دمى لبوبو اللطيفة والمحبوبة',              'Lovely and adorable lubob dolls',           '🧸', '#fdf2f8', 4,  TRUE),
  ('candles',          'شمع',            'Candles',         'شموع عطرية فاخرة لأجواء رومانسية',         'Luxury scented candles for romantic vibes', '🕯️','#fef9ee', 5,  TRUE),
  ('mugs',             'مجات',           'Mugs',            'مجات بتصاميم حصرية وألوان جميلة',          'Mugs with exclusive designs and colors',    '☕', '#f0fdf4', 6,  TRUE),
  ('mirrors',          'مرايات',         'Mirrors',         'مرايات أنيقة بإطارات فاخرة',               'Elegant mirrors with luxury frames',        '🪞', '#f0f9ff', 7,  TRUE),
  ('gift-boxes',       'بوكسات هدايا',   'Gift Boxes',      'بوكسات هدايا متكاملة لكل المناسبات',      'Complete gift boxes for all occasions',     '🎁', '#fdf2f8', 8,  TRUE),
  ('bags',             'شنط',            'Bags',            'شنط عصرية وأنيقة بأفضل الخامات',           'Stylish and elegant bags with best materials','👜','#fce7f3', 9,  TRUE),
  ('home-essentials',  'أدوات منزلية',   'Home Essentials', 'أدوات منزلية راقية لبيتك الجميل',         'Premium home essentials for your beautiful home','🏠','#f0fdf4',10, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- ── Insert Sample Products ────────────────────────────────────
-- (categories must exist first)
DO $$
DECLARE
  cat_accessories  UUID;
  cat_watches      UUID;
  cat_candles      UUID;
  cat_giftboxes    UUID;
  cat_lubob        UUID;
  cat_mugs         UUID;
  cat_medals       UUID;
  cat_mirrors      UUID;
  cat_bags         UUID;
  cat_home         UUID;

  p1 UUID; p2 UUID; p3 UUID; p4 UUID; p5 UUID;
  p6 UUID; p7 UUID; p8 UUID; p9 UUID; p10 UUID;
BEGIN
  SELECT id INTO cat_accessories  FROM public.categories WHERE slug = 'accessories';
  SELECT id INTO cat_watches      FROM public.categories WHERE slug = 'watches';
  SELECT id INTO cat_candles      FROM public.categories WHERE slug = 'candles';
  SELECT id INTO cat_giftboxes    FROM public.categories WHERE slug = 'gift-boxes';
  SELECT id INTO cat_lubob        FROM public.categories WHERE slug = 'lubob';
  SELECT id INTO cat_mugs         FROM public.categories WHERE slug = 'mugs';
  SELECT id INTO cat_medals       FROM public.categories WHERE slug = 'medals';
  SELECT id INTO cat_mirrors      FROM public.categories WHERE slug = 'mirrors';
  SELECT id INTO cat_bags         FROM public.categories WHERE slug = 'bags';
  SELECT id INTO cat_home         FROM public.categories WHERE slug = 'home-essentials';

  -- Product 1: Accessories
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, is_new, tags)
  VALUES ('flower-bracelet-rose-gold', 'إسورة زهرة روز جولد', 'Rose Gold Flower Bracelet',
    'إسورة أنيقة بشكل زهرة مصنوعة من الفضة المطلية بالذهب الوردي، تناسب جميع المناسبات',
    89, 120, 26, 'ACC-001', 50, cat_accessories, TRUE, TRUE, ARRAY['إسورة','روز جولد','هدية'])
  RETURNING id INTO p1;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p1, 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800', 'إسورة زهرة روز جولد', 0, TRUE),
    (p1, 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800', 'إسورة زهرة روز جولد - مقربة', 1, FALSE);

  -- Product 2: Watches
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, is_new, tags)
  VALUES ('classic-rose-watch', 'ساعة كلاسيك رومانسية', 'Classic Romantic Watch',
    'ساعة كلاسيكية أنيقة بقرص ورد وسوار جلدي، مثالية للمناسبات الرومانسية',
    245, 320, 23, 'WTC-001', 30, cat_watches, TRUE, FALSE, ARRAY['ساعة','كلاسيك','رومانسي'])
  RETURNING id INTO p2;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'ساعة كلاسيك رومانسية', 0, TRUE);

  -- Product 3: Candles
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, is_new, is_on_sale, tags)
  VALUES ('luxury-rose-candle', 'شمعة فاخرة برائحة الورد', 'Luxury Rose Scented Candle',
    'شمعة سوى فاخرة برائحة الورد الطبيعية، تدوم أكثر من 40 ساعة، مثالية لخلق أجواء رومانسية',
    65, 85, 24, 'CND-001', 100, cat_candles, TRUE, FALSE, TRUE, ARRAY['شمعة','ورد','رومانسي','عطر'])
  RETURNING id INTO p3;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p3, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', 'شمعة فاخرة برائحة الورد', 0, TRUE),
    (p3, 'https://images.unsplash.com/photo-1636207543865-acf3ad382295?w=800', 'شمعة ورد - من الأعلى', 1, FALSE);

  -- Product 4: Gift Box
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, is_new, tags)
  VALUES ('complete-gift-box-valentines', 'بوكس هدية فالنتاين الكامل', 'Complete Valentine Gift Box',
    'بوكس هدية متكامل يحتوي على دمية لبوبو + شمعة + ورد مجفف + بطاقة شخصية، مثالي لكل المناسبات',
    195, 260, 25, 'GFT-001', 25, cat_giftboxes, TRUE, TRUE, ARRAY['هدية','بوكس','فالنتاين','مناسبة'])
  RETURNING id INTO p4;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p4, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', 'بوكس هدية فالنتاين', 0, TRUE);

  -- Product 5: Lubob
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, sku, stock, category_id, is_featured, is_new, tags)
  VALUES ('lubob-doll-pink', 'دمية لبوبو الوردية', 'Pink Lubob Doll',
    'دمية لبوبو ناعمة ومحببة باللون الوردي الفاتح، مصنوعة من القطيفة الناعمة، هدية مثالية للأطفال والكبار',
    75, NULL, 'LBB-001', 80, cat_lubob, FALSE, TRUE, ARRAY['لبوبو','دمية','وردي','هدية'])
  RETURNING id INTO p5;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p5, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'دمية لبوبو الوردية', 0, TRUE);

  -- Product 6: Mug
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, is_new, is_on_sale, tags)
  VALUES ('flora-custom-mug', 'مج فلورا الحصري', 'Flora Exclusive Mug',
    'مج سيراميك حصري بتصميم فلورا، مناسب للقهوة والشاي، يمكن تخصيصه بأي اسم أو رسالة',
    45, 60, 25, 'MUG-001', 150, cat_mugs, FALSE, FALSE, TRUE, ARRAY['مج','قهوة','تخصيص','هدية'])
  RETURNING id INTO p6;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p6, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800', 'مج فلورا الحصري', 0, TRUE);

  -- Product 7: Medal
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, sku, stock, category_id, is_new, tags)
  VALUES ('custom-medal-gold', 'ميدالية ذهبية مخصصة', 'Custom Gold Medal',
    'ميدالية ذهبية مخصصة يمكن نقش أي اسم أو تاريخ عليها، مثالية للتكريم والمناسبات الخاصة',
    120, NULL, 'MDL-001', 60, cat_medals, TRUE, ARRAY['ميدالية','ذهبية','تكريم','هدية'])
  RETURNING id INTO p7;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p7, 'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=800', 'ميدالية ذهبية مخصصة', 0, TRUE);

  -- Product 8: Mirror
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_featured, tags)
  VALUES ('rose-frame-mirror', 'مرآة بإطار ورد', 'Rose Frame Mirror',
    'مرآة أنيقة بإطار مزخرف بأشكال الورد، متوفرة بأحجام مختلفة، تضيف لمسة فاخرة لأي غرفة',
    175, 220, 20, 'MIR-001', 35, cat_mirrors, TRUE, ARRAY['مرآة','ورد','ديكور','فاخر'])
  RETURNING id INTO p8;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p8, 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800', 'مرآة بإطار ورد', 0, TRUE);

  -- Product 9: Bag
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, discount_percentage, sku, stock, category_id, is_new, tags)
  VALUES ('mini-floral-bag', 'شنطة فلورال الصغيرة', 'Mini Floral Bag',
    'شنطة صغيرة أنيقة بنقشات الزهور، مصنوعة من الجلد الطبيعي، مثالية للاستخدام اليومي',
    285, 380, 25, 'BAG-001', 40, cat_bags, TRUE, ARRAY['شنطة','فلورال','جلد','عصري'])
  RETURNING id INTO p9;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p9, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', 'شنطة فلورال الصغيرة', 0, TRUE);

  -- Product 10: Home Essential
  INSERT INTO public.products (slug, name_ar, name_en, description_ar, price, compare_price, sku, stock, category_id, tags)
  VALUES ('floral-photo-frame', 'إطار صور زهري', 'Floral Photo Frame',
    'إطار صور جميل بنقشات زهرية، مناسب لوضع ذكرياتك الجميلة، يتوفر بمقاسات مختلفة',
    55, NULL, 'HME-001', 90, cat_home, ARRAY['إطار','صور','زهور','ذكريات'])
  RETURNING id INTO p10;

  INSERT INTO public.product_images (product_id, url, alt_ar, sort_order, is_primary) VALUES
    (p10, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'إطار صور زهري', 0, TRUE);

END $$;

-- ── Insert Sample Coupons ─────────────────────────────────────
INSERT INTO public.coupons (code, type, value, min_order_amount, max_uses, is_active) VALUES
  ('FLORA10',    'percentage',   10,  100, 500,  TRUE),
  ('FLORA20',    'percentage',   20,  200, 200,  TRUE),
  ('WELCOME50',  'fixed',        50,  150, 1000, TRUE),
  ('FREESHIP',   'free_shipping', 0,  100, NULL, TRUE)
ON CONFLICT (code) DO NOTHING;
