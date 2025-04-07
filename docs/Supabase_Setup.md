# Configuração do Supabase

## Credenciais

### Produção

```env
# Frontend (.env.local)
VITE_SUPABASE_URL=https://levhtjaudduxxxgbpzgr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTgxNDcsImV4cCI6MjA1ODc3NDE0N30.qwuCt4nodQAJmRB50Jq7Yk1YeDnvgbBlKzj-paa4Ohc

# Conexão Direta com o Banco
DATABASE_URL=postgresql://postgres:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzE5ODE0NywiZXhwIjoyMDU4Nzc0MTQ3fQ.AfrBLay5j0K4GSftWqHf9MbHbH1OyitdGlRp8vsQXu4@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

### Desenvolvimento

Para desenvolvimento local, você pode usar as mesmas credenciais de produção ou configurar um projeto Supabase local.

## Estrutura do Banco de Dados

### Tabela: profiles

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username text UNIQUE,
    full_name text,
    avatar_url text,
    role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Políticas de Segurança (RLS)

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);
```

### Triggers e Funções

```sql
-- Atualização automática do updated_at
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

-- Criação automática de perfil para novos usuários
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
```

## Configuração do Cliente

### Instalação

```bash
npm install @supabase/supabase-js
```

### Inicialização

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Autenticação

### Contexto de Autenticação

O arquivo `src/contexts/AuthContext.tsx` fornece:

- Gerenciamento de estado do usuário
- Funções de login/registro/logout
- Gerenciamento de perfil do usuário

### Proteção de Rotas

O componente `PrivateRoute` em `App.tsx` protege rotas que requerem autenticação.

## Componentes

### Profile

O componente `src/components/Profile.tsx` permite:

- Visualização dos dados do usuário
- Edição de informações do perfil
- Upload de avatar

## Tipos TypeScript

```typescript
export type UserRole = "user" | "admin" | "moderator";

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
```

## Próximos Passos

1. Configuração de Email

   - [ ] Configurar templates de email
   - [ ] Testar fluxo de confirmação
   - [ ] Testar recuperação de senha

2. Storage

   - [ ] Configurar bucket para avatares
   - [ ] Implementar upload de imagens
   - [ ] Definir políticas de acesso

3. Funções Edge
   - [ ] Avaliar necessidade de funções serverless
   - [ ] Implementar funções necessárias
   - [ ] Configurar deploy automático

## Troubleshooting

### Problemas Comuns

1. Erro de CORS

   - Verificar configurações de domínios permitidos no Supabase
   - Confirmar URLs corretas no .env

2. Erro de Autenticação

   - Verificar se as chaves estão corretas
   - Confirmar se o usuário está confirmado
   - Verificar políticas RLS

3. Erro de Perfil
   - Verificar se o trigger está funcionando
   - Confirmar políticas da tabela profiles
   - Verificar logs de erro no dashboard

### Logs e Monitoramento

- Dashboard: https://levhtjaudduxxxgbpzgr.supabase.co
- Logs de Autenticação: Authentication > Logs
- Logs de Banco: Database > Logs
- Logs de Edge Functions: Edge Functions > Logs

## Conexão com o Banco

### Métodos de Conexão

1. **Cliente Supabase (Frontend)**

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

2. **Conexão Direta (Backend/CLI)**

```bash
# Usando psql
psql "postgresql://postgres:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

# Usando Node.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

3. **Dashboard**

- URL: https://levhtjaudduxxxgbpzgr.supabase.co
- Acesso via: Database > SQL Editor

### Níveis de Acesso

1. **Anon Key (público)**

- Usado no frontend
- Acesso limitado por RLS
- Não pode criar/modificar tabelas

2. **Service Role Key (admin)**

- Usado para tarefas administrativas
- Bypass RLS
- Pode criar/modificar tabelas
- **Nunca expor no frontend**

3. **JWT Secret**

- Usado para verificar tokens
- Nunca expor publicamente
