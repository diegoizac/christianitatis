CREATE OR REPLACE FUNCTION create_profiles_policies()
RETURNS void AS $$
BEGIN
    CREATE POLICY "Public profiles are viewable by everyone"
        ON public.profiles FOR SELECT
        USING (true);

    CREATE POLICY "Users can insert their own profile"
        ON public.profiles FOR INSERT
        WITH CHECK (auth.uid() = id);

    CREATE POLICY "Users can update their own profile"
        ON public.profiles FOR UPDATE
        USING (auth.uid() = id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 