-- Add createdAt and updatedAt columns to User table
ALTER TABLE "User"
  ADD COLUMN "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ADD COLUMN "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Optionally, create trigger to auto-update updatedAt on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
