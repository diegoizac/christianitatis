CREATE OR REPLACE FUNCTION create_profile_triggers()
RETURNS void AS $$
BEGIN
    -- Drop existing triggers and functions
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
    DROP FUNCTION IF EXISTS update_updated_at_column();
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    DROP FUNCTION IF EXISTS public.handle_new_user();

    -- Create updated_at trigger
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = timezone('utc'::text, now());
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON public.profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    -- Create handle_new_user trigger
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
        INSERT INTO public.profiles (id, full_name, avatar_url)
        VALUES (
            new.id,
            new.raw_user_meta_data->>'full_name',
            new.raw_user_meta_data->>'avatar_url'
        );
        RETURN new;
    END;
    $$ language plpgsql security definer;

    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 