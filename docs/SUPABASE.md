# Documentação Supabase - Christianitatis

## 🔐 Credenciais

```env
VITE_SUPABASE_URL=https://levhtjaudduxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0amF1ZGR1eHh4Z2JwemdyIiwicm9zZSI6InNlcnZpY2Vfcm9zZSIsImlhdCI6MTc0MzE5ODE0NywiZXhwIjoyMDU4Nzc0MTQ3fQ.AfrBLay5j0K4GSftWqHf9MbHbH1OyitdGlRp8vsQXu4
```

## 📊 Banco de Dados

### Tabelas

#### 1. profiles

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Políticas RLS

#### profiles

```sql
-- Leitura pública
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

-- Inserção própria
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Atualização própria
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);
```

### Triggers

```sql
-- Atualização de timestamp
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Criação de perfil automática
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 🔄 Funções

### handle_new_user()

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### update_updated_at_column()

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## 🔒 Autenticação

### Configurações

- **Site URL**: `http://localhost:3000`
- **Redirect URLs**:
  - `http://localhost:3000/**`
  - `https://christianitatis.vercel.app/**`
- **JWT Expiry**: 3600 (1 hora)
- **Refresh Token**: 43200 (12 horas)

### Provedores Habilitados

- [x] Email/Password
- [ ] Google (planejado)
- [ ] Facebook (planejado)
- [ ] Apple (planejado)

### Templates de Email

#### Confirmação de Email

```html
<h2>Confirme seu email</h2>
<p>Clique no link abaixo para confirmar seu email:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
```

#### Reset de Senha

```html
<h2>Redefinir senha</h2>
<p>Clique no link abaixo para redefinir sua senha:</p>
<p><a href="{{ .ConfirmationURL }}">Redefinir Senha</a></p>
```

## 📡 API

### Endpoints Principais

```typescript
// Auth
supabase.auth.signUp();
supabase.auth.signIn();
supabase.auth.signOut();
supabase.auth.resetPasswordForEmail();

// Profiles
supabase.from("profiles").select();
supabase.from("profiles").update();
supabase.from("profiles").insert();
```

### Exemplos de Uso

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "123456",
});

// Atualizar Perfil
const { data, error } = await supabase
  .from("profiles")
  .update({ full_name: "Novo Nome" })
  .eq("id", user.id);
```

## 🔧 Manutenção

### Backups

- Frequência: Diária
- Retenção: 7 dias
- Horário: 03:00 UTC

### Monitoramento

- Métricas de uso
- Logs de erro
- Performance de queries

### Limites

- Storage: 1GB
- Database: 500MB
- Auth: 50k users/mês
- Edge Functions: 100k invocações/mês

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de RLS**

   ```sql
   -- Verificar políticas
   SELECT * FROM pg_policies WHERE tablename = 'profiles';
   ```

2. **Trigger não dispara**

   ```sql
   -- Verificar triggers
   SELECT * FROM pg_trigger WHERE tgrelid = 'profiles'::regclass;
   ```

3. **Erro de autenticação**
   - Verificar URLs de redirecionamento
   - Confirmar chaves de API
   - Validar configurações de CORS

## 📝 Notas Importantes

1. **Segurança**

   - Nunca expor `service_role` key
   - Sempre usar RLS
   - Validar inputs server-side

2. **Performance**

   - Usar índices apropriados
   - Limitar resultados de queries
   - Implementar paginação

3. **Manutenção**
   - Backup regular de dados
   - Monitorar uso de recursos
   - Atualizar políticas RLS

## 🔜 Próximos Passos

1. Implementar autenticação social
2. Adicionar mais índices para performance
3. Criar funções de edge computing
4. Melhorar templates de email
5. Implementar auditoria de ações
