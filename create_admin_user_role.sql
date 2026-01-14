-- SQL script to create an admin user role entry in the public.users table.
--
-- IMPORTANT: This script alone DOES NOT create a loginable user in Supabase.
-- You MUST first create the user using Supabase's authentication methods (e.g.,
-- Supabase UI, supabase.auth.signUp(), or supabase.auth.admin.createUser()).
-- After creating the user in Supabase Auth, retrieve their 'id' (UUID) and
-- use it to replace 'YOUR_SUPABASE_AUTH_USER_ID_HERE' below.
--
-- The 'encrypted_password' field in the public.users table is NOT used by
-- Supabase for authentication. Supabase handles password hashing in its
-- internal auth.users table.

INSERT INTO public.users (id, email, encrypted_password, full_name, role, active)
VALUES (
    'deebe6b7-f899-4bf5-a560-f39dbf5dc6cb', -- Replace with the actual UUID from Supabase Auth (e.g., from auth.users table)
    'zagajbar1@gmail.com.com',               -- Replace with the desired admin email
    '',                                -- This field is NOT used for Supabase Auth login. Leave empty or set to NULL.
    'Admin User',                      -- Replace with the admin's full name
    'admin',
    TRUE
)
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    active = EXCLUDED.active,
    updated_at = NOW();

-- Optional: If you want to handle potential conflicts on the email unique constraint
-- and ensure the role is updated for an existing user with the same email
-- (but only if the ID also matches, which is implied by ON CONFLICT (id)).
-- If you need to update a user's role based on email alone, you would need a
-- different approach or remove the unique constraint on email if that's intended.
-- However, generally, the 'id' is the primary key and the link to auth.users.
