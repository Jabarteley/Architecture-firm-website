-- [Fix] Updates the function that handles new user creation.
-- This version provides an empty string for the 'encrypted_password' column
-- to satisfy the NOT NULL constraint in the 'public.users' table.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert a new row into public.users, providing a value for every NOT NULL column.
  INSERT INTO public.users (id, email, encrypted_password, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    '', -- Provide an empty string to satisfy the NOT NULL constraint. This field is not used by Supabase Auth.
    NEW.raw_user_meta_data->>'full_name',
    'user' -- Overrides the table's default role ('admin') for new sign-ups. Change to 'admin' if you want all new users to be admins.
  );
  RETURN NEW;
END;
$$;

-- The trigger itself does not need to be changed, only the function it calls.
-- After running this script, try creating a user in the Supabase UI again.
