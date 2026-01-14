-- This script fixes two issues:
-- 1. Updates the user creation trigger to assign the 'admin' role to all new users.
-- 2. Adds a Row Level Security (RLS) policy to the 'users' table to fix the "access denied" error.

-- Part 1: Update the trigger function to assign the 'admin' role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert a new row into public.users with the 'admin' role.
  INSERT INTO public.users (id, email, encrypted_password, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    '', -- Provides an empty string for the NOT NULL 'encrypted_password' column.
    NEW.raw_user_meta_data->>'full_name',
    'admin' -- Assigns the 'admin' role to all new users.
  );
  RETURN NEW;
END;
$$;


-- Part 2: Add the missing RLS policy for the 'users' table
-- This policy fixes the "access denied" / "0 rows" error you see on login.
-- It follows the same pattern as your other tables, giving any logged-in
-- (authenticated) user full access to manage the 'users' table.

-- First, drop any previous, more restrictive policy you might have added to prevent conflicts.
DROP POLICY IF EXISTS "Allow individual users to read their own profile" ON public.users;

-- Now, create the policy that matches your project's security design.
CREATE POLICY "Allow authenticated users to manage user profiles"
ON public.users
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
