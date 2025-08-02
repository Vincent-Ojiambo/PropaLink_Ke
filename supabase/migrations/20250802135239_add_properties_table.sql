-- Create property_types enum
CREATE TYPE property_type AS ENUM (
  'apartment',
  'house',
  'villa',
  'office',
  'land',
  'commercial',
  'other'
);

-- Create property_status enum
CREATE TYPE property_status AS ENUM (
  'for_sale',
  'for_rent',
  'sold',
  'rented'
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(15, 2) NOT NULL,
  property_type PROPERTY_TYPE NOT NULL,
  status PROPERTY_STATUS NOT NULL DEFAULT 'for_sale',
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10, 2) NOT NULL,
  area_unit TEXT DEFAULT 'sqm',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Kenya',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies for properties
CREATE POLICY "Enable read access for all users" 
ON public.properties 
FOR SELECT 
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for property owners"
ON public.properties
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for property owners"
ON public.properties
FOR DELETE
USING (auth.uid() = user_id);

-- Create property_images table
CREATE TABLE public.property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for property_images
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- Create policies for property_images
CREATE POLICY "Enable read access for all users" 
ON public.property_images 
FOR SELECT 
USING (true);

CREATE POLICY "Enable insert for property owners"
ON public.property_images
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.properties p 
    WHERE p.id = property_id 
    AND p.user_id = auth.uid()
  )
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Enable RLS for favorites
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for favorites
CREATE POLICY "Users can view their own favorites" 
ON public.favorites 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites"
ON public.favorites
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on properties
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Create index for better performance
CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_property_type ON public.properties(property_type);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_property_id ON public.favorites(property_id);
