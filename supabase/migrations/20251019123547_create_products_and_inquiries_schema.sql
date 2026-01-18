/*
  # Pure Angan Organic Database Schema

  ## Overview
  This migration creates the database structure for Pure Angan Organic's B2B ecommerce platform,
  including product catalog, inquiry management, and white label requests.

  ## Tables Created
  
  ### 1. categories
  - `id` (uuid, primary key) - Unique identifier for each category
  - `name` (text) - Category name (e.g., "Organic Food Products", "Farming Products")
  - `slug` (text, unique) - URL-friendly version of category name
  - `description` (text) - Category description
  - `display_order` (integer) - Order for displaying categories
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### 2. products
  - `id` (uuid, primary key) - Unique identifier for each product
  - `category_id` (uuid, foreign key) - Reference to category
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly product name
  - `short_description` (text) - Brief product description
  - `full_description` (text) - Detailed product information
  - `image_url` (text) - Main product image URL
  - `packaging_sizes` (jsonb) - Array of available packaging options
  - `certifications` (jsonb) - Array of certifications
  - `white_label_available` (boolean) - Whether white labeling is available
  - `is_seasonal` (boolean) - Whether product is seasonal
  - `is_featured` (boolean) - Whether to feature on homepage
  - `display_order` (integer) - Order for displaying products
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. inquiries
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `inquiry_type` (text) - Type: 'product', 'white_label', 'export', 'general'
  - `product_id` (uuid, nullable) - Related product if applicable
  - `company_name` (text) - Inquirer's company name
  - `contact_person` (text) - Contact person name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `country` (text) - Country for export inquiries
  - `message` (text) - Inquiry message/details
  - `status` (text) - Status: 'new', 'contacted', 'quoted', 'closed'
  - `created_at` (timestamptz) - Inquiry submission timestamp
  
  ## Security
  - All tables have RLS enabled
  - Public read access for categories and products
  - Authenticated-only write access for inquiries
  - Insert-only access for inquiries (public can submit)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  full_description text,
  image_url text,
  packaging_sizes jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  white_label_available boolean DEFAULT false,
  is_seasonal boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type text NOT NULL CHECK (inquiry_type IN ('product', 'white_label', 'export', 'general')),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text DEFAULT 'India',
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

-- RLS Policies for inquiries (public can insert, no read)
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- Insert initial categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Organic Food Products', 'organic-food', 'Premium organic food products including A2 Ghee, Jaggery, and Makhana', 1),
  ('Farming Products', 'farming-products', 'Organic farming inputs including Vermicompost and Live Earthworms', 2),
  ('Fresh Produce', 'fresh-produce', 'Seasonal organic vegetables and produce', 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial products
INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'A2 Desi Cow Ghee',
  'a2-desi-cow-ghee',
  'Premium lab-tested A2 Desi Cow Ghee, partner-produced with the highest quality standards',
  'Our A2 Desi Cow Ghee is sourced from indigenous Indian cow breeds and undergoes rigorous lab testing. Made using traditional bilona method, it retains all the nutritional benefits. Available in bulk quantities and customizable jar sizes for white labeling. Perfect for B2B buyers looking for authentic, certified organic ghee.',
  '["250g", "500g", "1kg", "5kg", "10kg", "Bulk (CustomizabLe)"]'::jsonb,
  '["FSSAI Certified", "Lab Tested", "100% Pure A2", "Organic Certified"]'::jsonb,
  true,
  true,
  1
FROM categories c WHERE c.slug = 'organic-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'Organic Jaggery',
  'organic-jaggery',
  'Pure organic jaggery produced in-house, available in blocks, powder, and cubes',
  'Our in-house produced organic jaggery is made from certified organic sugarcane without any chemicals or additives. Rich in minerals and a healthier alternative to refined sugar. Available in multiple formats to suit various industrial and retail needs. Ideal for food manufacturers, restaurants, and health food brands.',
  '["Blocks - 500g", "Blocks - 1kg", "Powder - 500g", "Powder - 1kg", "Cubes - 500g", "Bulk Orders"]'::jsonb,
  '["FSSAI Certified", "Organic Certified", "Jaivik Bharat", "Chemical-Free"]'::jsonb,
  true,
  true,
  2
FROM categories c WHERE c.slug = 'organic-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'Organic Makhana (Fox Nuts)',
  'organic-makhana',
  'Premium quality Makhana available in raw, roasted, and flavored varieties',
  'Sourced from the finest organic farms, our Makhana (Fox Nuts) is a nutritious and popular snack. Available in raw form for processing, or ready-to-eat roasted and flavored variants. Perfect for snack manufacturers, health food brands, and export. High in protein and low in calories, making it an ideal superfood.',
  '["Raw - 1kg", "Raw - 5kg", "Roasted Plain - 500g", "Roasted Flavored - 500g", "Bulk Orders"]'::jsonb,
  '["FSSAI Certified", "Organic Certified", "Export Quality", "Lab Tested"]'::jsonb,
  true,
  true,
  3
FROM categories c WHERE c.slug = 'organic-food'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'Vermicompost',
  'vermicompost',
  'Premium quality vermicompost produced in-house at our Bhagalpur and Jaipur facilities',
  'Our vermicompost is produced using scientific methods at our dedicated production units in Bhagalpur (Bihar) and Jaipur (Rajasthan). Rich in nutrients and beneficial microorganisms, it enhances soil fertility and promotes healthy plant growth. Ideal for organic farmers, nurseries, landscaping companies, and agricultural input dealers.',
  '["5kg Bags", "10kg Bags", "25kg Bags", "Bulk Orders (Ton)"]'::jsonb,
  '["Organic Certified", "FCO Certified", "Lab Tested", "Jaivik Bharat"]'::jsonb,
  false,
  true,
  1
FROM categories c WHERE c.slug = 'farming-products'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'Live Earthworms',
  'live-earthworms',
  'High-quality live earthworms for vermicomposting and organic farming',
  'We supply healthy, active earthworms (Eisenia fetida) for vermicomposting units and soil enrichment. Our earthworms are bred in controlled conditions and are perfect for starting or scaling vermicompost production. Essential for organic farmers and composting operations. Includes handling and care instructions.',
  '["1kg (approx 1000 worms)", "5kg (approx 5000 worms)", "Custom Quantities"]'::jsonb,
  '["Disease-Free", "High Reproduction Rate", "Organic Farming Approved"]'::jsonb,
  false,
  false,
  2
FROM categories c WHERE c.slug = 'farming-products'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
  category_id,
  name,
  slug,
  short_description,
  full_description,
  packaging_sizes,
  certifications,
  white_label_available,
  is_seasonal,
  is_featured,
  display_order
)
SELECT 
  c.id,
  'Organic Potatoes',
  'organic-potatoes',
  'Fresh seasonal organic potatoes grown in-house without any chemicals',
  'Our organic potatoes are cultivated using traditional organic farming methods without synthetic pesticides or fertilizers. Grown in our own farms and harvested fresh, they retain natural flavor and nutritional value. Available seasonally for B2B buyers including restaurants, hotels, food processors, and organic retail chains.',
  '["10kg Bags", "25kg Bags", "50kg Bags", "Bulk Orders"]'::jsonb,
  '["Organic Certified", "Pesticide-Free", "Jaivik Bharat"]'::jsonb,
  false,
  true,
  false,
  1
FROM categories c WHERE c.slug = 'fresh-produce'
ON CONFLICT (slug) DO NOTHING;