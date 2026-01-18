import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  image_url: string | null;
  packaging_sizes: string[];
  certifications: string[];
  white_label_available: boolean;
  is_seasonal: boolean;
  is_featured: boolean;
  is_flagship: boolean;
  price_from: number | null;
  price_unit: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string | null;
  customer_name: string;
  customer_business: string | null;
  rating: number;
  review_text: string;
  review_date: string;
  is_featured: boolean;
  created_at: string;
}

export interface Inquiry {
  inquiry_type: 'product' | 'white_label' | 'export' | 'general';
  product_id?: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country?: string;
  message: string;
}
