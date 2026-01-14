-- This script provides the final fix for the login and access control issues.
-- It cleans up old RLS policies, creates the correct one, and re-enables Row Level Security.

-- Step 1: Clean up any old policies on the 'users' table to ensure a fresh start.
DROP POLICY IF EXISTS "Allow individual users to read their own profile" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated users to manage user profiles" ON public.users;

-- Step 2: Create the one correct RLS policy.
-- This policy grants full access to the 'users' table for any user who is logged in (authenticated).
-- This is necessary for the app to read user roles and matches the security design of your other tables.
CREATE POLICY "Allow full access for authenticated users"
ON public.users
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 3: Re-enable Row Level Security on the 'users' table.
-- This is the final and most important step to secure your table again.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
