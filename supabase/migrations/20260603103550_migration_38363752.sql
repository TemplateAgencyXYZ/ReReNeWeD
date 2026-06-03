-- 1. Create site_content table for the CMS
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read site content" ON site_content;
CREATE POLICY "Public read site content" ON site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin write site content" ON site_content;
CREATE POLICY "Admin write site content" ON site_content FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

-- Seed basic pages
INSERT INTO site_content (page_key, title, content_data) VALUES 
('faq', 'Frequently Asked Questions', '{"content": "Add your FAQ here"}'),
('contact', 'Contact Us', '{"content": "Add contact info here"}'),
('shipping', 'Shipping Policy', '{"content": "Add shipping info here"}'),
('returns', 'Returns Policy', '{"content": "Add returns info here"}'),
('story', 'Our Story', '{"content": "Add your story here"}'),
('sustainability', 'Sustainability', '{"content": "Add sustainability practices here"}'),
('privacy', 'Privacy Policy', '{"content": "Add privacy policy here"}'),
('terms', 'Terms of Service', '{"content": "Add terms here"}')
ON CONFLICT DO NOTHING;

-- 2. Create Storage Bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Set up Storage Policies for the bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images');