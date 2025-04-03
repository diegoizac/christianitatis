CREATE OR REPLACE FUNCTION create_profiles_table()
RETURNS void AS $$
BEGIN
    CREATE TABLE IF NOT EXISTS public.profiles (
        id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
        username text UNIQUE,
        full_name text,
        avatar_url text,
        role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 