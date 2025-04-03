CREATE OR REPLACE FUNCTION create_profiles_triggers()
RETURNS void AS $$
BEGIN
    -- Criar função para atualizar updated_at
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = timezone('utc'::text, now());
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Criar trigger para updated_at
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
    CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON public.profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    -- Criar função para novos usuários
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

    -- Criar trigger para novos usuários
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 