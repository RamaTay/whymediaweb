-- Create Services table
CREATE TABLE IF NOT EXISTS "Services" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technical_skills_tools TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create ServiceDetails table
CREATE TABLE IF NOT EXISTS "ServiceDetails" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES "Services"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  long_description TEXT,
  graphic_design_portfolio TEXT[] DEFAULT '{}',
  process JSONB[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  cta JSONB DEFAULT '{"title": "", "description": ""}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS "FAQs" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  service_id UUID REFERENCES "Services"(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Enable realtime for all tables
alter publication supabase_realtime add table "Services";
alter publication supabase_realtime add table "ServiceDetails";
alter publication supabase_realtime add table "FAQs";
