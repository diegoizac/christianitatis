-- Criar funções de migração
\i ../functions/create_profiles_table.sql
\i ../functions/enable_rls_profiles.sql
\i ../functions/create_profiles_policies.sql
\i ../functions/create_profiles_triggers.sql

-- Executar migração
SELECT create_profiles_table();
SELECT enable_rls_profiles();
SELECT create_profiles_policies();
SELECT create_profiles_triggers(); 