/*
  # Add Prices and Customer Reviews

  ## Overview
  This migration adds pricing information to products and creates a customer reviews system
  to build trust and engagement.

  ## Changes Made
  
  ### 1. Products Table Updates
  - Add `price_from` (numeric) - Starting price for the product
  - Add `price_unit` (text) - Unit for pricing (e.g., "per kg", "per pack")
  - Add `is_flagship` (boolean) - Mark flagship products (Vermicompost, Earthworms)
  
  ### 2. New Reviews Table
  - `id` (uuid, primary key) - Unique identifier
  - `product_id` (uuid, foreign key) - Reference to product
  - `customer_name` (text) - Reviewer name
  - `customer_business` (text) - Reviewer's business/company
  - `rating` (integer) - Rating out of 5
  - `review_text` (text) - Review content
  - `review_date` (date) - Date of review
  - `is_featured` (boolean) - Whether to feature this review
  - `created_at` (timestamptz) - Record creation timestamp
  
  ## Security
  - Enable RLS on reviews table
  - Public read access for reviews
  - Reviews are display-only (insert via admin)
*/

-- Add price fields to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'price_from'
  ) THEN
    ALTER TABLE products ADD COLUMN price_from numeric(10, 2);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'price_unit'
  ) THEN
    ALTER TABLE products ADD COLUMN price_unit text DEFAULT 'per kg';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_flagship'
  ) THEN
    ALTER TABLE products ADD COLUMN is_flagship boolean DEFAULT false;
  END IF;
END $$;

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_business text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  review_date date DEFAULT CURRENT_DATE,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policy for reviews (public read)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured) WHERE is_featured = true;

-- Update existing products with prices and flagship status
UPDATE products SET 
  price_from = 850,
  price_unit = 'per kg',
  is_flagship = false
WHERE slug = 'a2-desi-cow-ghee';

UPDATE products SET 
  price_from = 120,
  price_unit = 'per kg',
  is_flagship = false
WHERE slug = 'organic-jaggery';

UPDATE products SET 
  price_from = 450,
  price_unit = 'per kg',
  is_flagship = false
WHERE slug = 'organic-makhana';

UPDATE products SET 
  price_from = 15,
  price_unit = 'per kg',
  is_flagship = true,
  packaging_sizes = '["1kg", "2kg", "5kg", "10kg", "50kg"]'::jsonb
WHERE slug = 'vermicompost';

UPDATE products SET 
  price_from = 400,
  price_unit = 'per kg',
  is_flagship = true
WHERE slug = 'live-earthworms';

UPDATE products SET 
  price_from = 35,
  price_unit = 'per kg',
  is_flagship = false
WHERE slug = 'organic-potatoes';

-- Insert sample reviews
INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Rajesh Sharma', 'Green Valley Organic Farms', 5, 
'Excellent quality vermicompost! We have been using it for our 50-acre organic farm for the past 6 months. The results are outstanding - healthier plants, better yield, and improved soil quality. Pure Angan delivers on time and their support team is very responsive.', 
'2025-08-15', true
FROM products WHERE slug = 'vermicompost'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Priya Mehta', 'Urban Gardens Delhi', 4, 
'We use Pure Angan vermicompost for our rooftop gardening projects across Delhi. Quality is consistent and the packaging is convenient. The 5kg bags are perfect for our customers. Highly recommended for urban gardening!', 
'2025-09-02', true
FROM products WHERE slug = 'vermicompost'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Amit Patel', 'Sunrise Nursery', 5, 
'The earthworms are healthy and active. Started our own vermicompost unit with their worms and guidance. Reproduction rate is excellent. Pure Angan is the most reliable supplier we have found in India.', 
'2025-09-10', true
FROM products WHERE slug = 'live-earthworms'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Kavita Singh', 'Wellness Foods Private Limited', 5, 
'We have been purchasing A2 Desi Cow Ghee from Pure Angan for our retail brand. The quality is exceptional and lab reports give us confidence. Our customers love it and repeat orders keep coming. Great partner for white labeling!', 
'2025-08-28', true
FROM products WHERE slug = 'a2-desi-cow-ghee'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Mohammad Ali', 'Al Noor Trading LLC, Dubai', 5, 
'Importing organic products from Pure Angan to UAE for the past year. Documentation is always perfect, quality is consistent, and pricing is competitive. Their organic jaggery is very popular in our market.', 
'2025-09-18', true
FROM products WHERE slug = 'organic-jaggery'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Sneha Reddy', 'Healthy Snacks Co.', 4, 
'We use Pure Angan organic makhana for our snack manufacturing. Quality is good and they can handle large volumes. The raw makhana is clean and well-processed. Good for bulk B2B buyers.', 
'2025-09-05', true
FROM products WHERE slug = 'organic-makhana'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Vikram Choudhary', 'Organic Retail Chain', 5, 
'Pure Angan has been our trusted supplier for over a year. From vermicompost to food products, everything is certified and genuine. The team is professional and delivery is always on schedule. Best organic supplier in North India!', 
'2025-09-22', true
FROM products WHERE slug = 'vermicompost'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (product_id, customer_name, customer_business, rating, review_text, review_date, is_featured)
SELECT id, 'Sarah Johnson', 'Green Earth Exports, USA', 5, 
'Excellent export partner! Pure Angan handles all documentation professionally and products arrive in perfect condition. Their organic certifications meet US standards. Very satisfied with their A2 ghee quality.', 
'2025-09-12', true
FROM products WHERE slug = 'a2-desi-cow-ghee'
ON CONFLICT DO NOTHING;