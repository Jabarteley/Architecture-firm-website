-- Creates a trigger that automatically inserts a new row into public.users
-- when a new user signs up via Supabase Auth.

-- 1. Create a function that inserts a new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to run with the permissions of the user that created it (the database owner)
AS $$
BEGIN
  -- Insert a new row into public.users
  -- The 'id' is taken from the newly created auth.users record (NEW.id)
  -- The 'email' is taken from the newly created auth.users record (NEW.email)
  -- The 'full_name' is extracted from the user's metadata, if available.
  -- The 'role' is set to a default value, e.g., 'user'. Admins can change this later.
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'user' -- Or 'member', or another default role you prefer.
  );
  RETURN NEW;
END;
$$;

-- 2. Create a trigger that calls the function after a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Optional: Clean up old trigger if it exists to avoid conflicts
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Note: After running this, every new user who signs up will have a corresponding
-- entry in your 'public.users' table, preventing the "Error checking user role" issue.
-- For existing users, you must still add their profile to 'public.users' manually.
