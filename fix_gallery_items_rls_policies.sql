-- This script fixes RLS policies for the 'gallery_items' table to ensure authenticated users can manage items.

-- Step 1: Drop the existing 'Allow admins to manage gallery items' policy.
-- This ensures we can create more specific policies without conflicts.
DROP POLICY IF EXISTS "Allow admins to manage gallery items" ON public.gallery_items;

-- Step 2: Create a specific RLS policy for INSERT operations.
-- Allows any authenticated user to insert new gallery items.
CREATE POLICY "Allow authenticated users to insert gallery items"
ON public.gallery_items
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Step 3: Create a specific RLS policy for UPDATE operations.
-- Allows any authenticated user to update existing gallery items.
CREATE POLICY "Allow authenticated users to update gallery items"
ON public.gallery_items
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 4: Create a specific RLS policy for DELETE operations.
-- Allows any authenticated user to delete gallery items.
CREATE POLICY "Allow authenticated users to delete gallery items"
ON public.gallery_items
FOR DELETE
TO authenticated
USING (true);

-- Note: The "Allow admins to read gallery items" policy (FOR SELECT) from database-schema.sql
-- or "Allow public read access to gallery items" from enable_public_access.sql
-- will still be active, providing read access.
