CREATE OR REPLACE FUNCTION create_policy_for_profiles(
    policy_name text,
    operation text,
    expression text
)
RETURNS void AS $$
BEGIN
    EXECUTE format('
        DROP POLICY IF EXISTS %I ON public.profiles;
        CREATE POLICY %I ON public.profiles
        FOR %s
        USING (%s);
    ', policy_name, policy_name, operation, expression);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 