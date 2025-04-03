# Supabase: Melhores Práticas

## Recursos Oficiais

1. [Documentação Oficial Supabase](https://supabase.com/docs)
2. [Guia de Autenticação](https://supabase.com/docs/guides/auth)
3. [Guia de Database](https://supabase.com/docs/guides/database)

## Configuração Inicial

### 1. Setup do Cliente

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### 2. Estrutura de Tabelas Recomendada

```sql
-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  website TEXT,

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Realtime subscription
ALTER TABLE profiles REPLICA IDENTITY FULL;

-- Trigger para atualização automática
CREATE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_update
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();
```

## Autenticação e Autorização

### 1. Implementação de Auth

```typescript
// Sign Up
const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro no signup:", error.message);
    throw error;
  }
};

// Sign In
const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro no login:", error.message);
    throw error;
  }
};
```

### 2. Políticas de Segurança (RLS)

```sql
-- Exemplo de política para profiles
CREATE POLICY "Usuários podem ver seus próprios perfis"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Realtime

### 1. Subscriptions

```typescript
// Exemplo de subscription
const subscription = supabase
  .channel("*")
  .on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "profiles",
    },
    (payload) => {
      console.log("Change received!", payload);
    }
  )
  .subscribe();
```

## Storage

### 1. Upload de Arquivos

```typescript
const uploadAvatar = async (filePath: string, file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro no upload:", error.message);
    throw error;
  }
};
```

## Melhores Práticas

1. **Segurança**

   - Sempre use RLS (Row Level Security)
   - Nunca exponha chaves de serviço no cliente
   - Use prepared statements para queries

2. **Performance**

   - Use índices apropriadamente
   - Implemente paginação
   - Otimize queries com EXPLAIN ANALYZE

3. **Organização**
   - Mantenha migrations versionadas
   - Use tipos personalizados
   - Documente suas funções

## Recursos Adicionais

- [Supabase Blog](https://supabase.com/blog)
- [Exemplos Oficiais](https://github.com/supabase/supabase/tree/master/examples)
- [Discord da Comunidade](https://discord.supabase.com)

## Exercícios Práticos

1. Implemente autenticação completa
2. Configure RLS para uma tabela
3. Crie um sistema de upload de arquivos
4. Implemente subscriptions realtime
