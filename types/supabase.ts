// Auto-generated Supabase database types
// Run: npm run db:generate to regenerate from your Supabase project

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: "customer" | "admin" | "super_admin";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: "customer" | "admin" | "super_admin";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: "customer" | "admin" | "super_admin";
          is_active?: boolean;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ar: string;
          name_en: string;
          description_ar?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          emoji?: string | null;
          color?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          slug?: string;
          name_ar?: string;
          name_en?: string;
          description_ar?: string | null;
          description_en?: string | null;
          image_url?: string | null;
          emoji?: string | null;
          color?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      products: {
        Row: {
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
          rating_avg: number;
          rating_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ar: string;
          name_en: string;
          description_ar?: string | null;
          description_en?: string | null;
          price: number;
          compare_price?: number | null;
          discount_percentage?: number | null;
          sku: string;
          stock?: number;
          category_id: string;
          brand?: string | null;
          tags?: string[];
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_on_sale?: boolean;
          rating_avg?: number;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          slug?: string;
          name_ar?: string;
          name_en?: string;
          description_ar?: string | null;
          description_en?: string | null;
          price?: number;
          compare_price?: number | null;
          discount_percentage?: number | null;
          sku?: string;
          stock?: number;
          category_id?: string;
          brand?: string | null;
          tags?: string[];
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_on_sale?: boolean;
          rating_avg?: number;
          rating_count?: number;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_ar: string | null;
          alt_en: string | null;
          sort_order: number;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_ar?: string | null;
          alt_en?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
        Update: {
          url?: string;
          alt_ar?: string | null;
          alt_en?: string | null;
          sort_order?: number;
          is_primary?: boolean;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          status: string;
          payment_status: string;
          payment_method: string;
          payment_reference: string | null;
          subtotal: number;
          discount: number;
          shipping_fee: number;
          vat: number;
          total: number;
          coupon_id: string | null;
          coupon_code: string | null;
          shipping_info: Json;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          status?: string;
          payment_status?: string;
          payment_method: string;
          payment_reference?: string | null;
          subtotal: number;
          discount?: number;
          shipping_fee?: number;
          vat?: number;
          total: number;
          coupon_id?: string | null;
          coupon_code?: string | null;
          shipping_info: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          payment_status?: string;
          payment_reference?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
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
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          variant_id?: string | null;
          product_name_ar: string;
          product_name_en: string;
          product_image?: string | null;
          sku: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: {
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
      addresses: {
        Row: {
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
        };
        Insert: {
          id?: string;
          user_id: string;
          label: string;
          full_name: string;
          phone: string;
          country_code: string;
          city: string;
          district?: string | null;
          street: string;
          building?: string | null;
          postal_code?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          label?: string;
          full_name?: string;
          phone?: string;
          country_code?: string;
          city?: string;
          district?: string | null;
          street?: string;
          building?: string | null;
          postal_code?: string | null;
          is_default?: boolean;
        };
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          type: string;
          value: number;
          min_order_amount: number | null;
          max_uses: number | null;
          used_count: number;
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          type: string;
          value: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          code?: string;
          type?: string;
          value?: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          expires_at?: string | null;
          is_active?: boolean;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          order_id: string | null;
          rating: number;
          title: string | null;
          body: string | null;
          is_verified: boolean;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          user_id: string;
          order_id?: string | null;
          rating: number;
          title?: string | null;
          body?: string | null;
          is_verified?: boolean;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          rating?: number;
          title?: string | null;
          body?: string | null;
          is_verified?: boolean;
          is_published?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
