-- Create a storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Set up public access policy for the bucket
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

CREATE POLICY "Owners can update and delete" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'portfolio' AND auth.uid() = owner);

CREATE POLICY "Owners can delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'portfolio' AND auth.uid() = owner);