-- Add Arabic fields to ServiceDetails table
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "name_ar" TEXT;
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "description_ar" TEXT;
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "details_ar" TEXT;
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "long_description_ar" TEXT;
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "process_ar" JSONB;
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "benefits_ar" TEXT[];
ALTER TABLE "ServiceDetails" ADD COLUMN IF NOT EXISTS "cta_ar" JSONB;

-- Add Arabic fields to FAQs table
ALTER TABLE "FAQs" ADD COLUMN IF NOT EXISTS "question_ar" TEXT;
ALTER TABLE "FAQs" ADD COLUMN IF NOT EXISTS "answer_ar" TEXT;
