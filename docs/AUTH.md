# Documentação de Autenticação - Christianitatis

## 🔒 Visão Geral

O sistema de autenticação do Christianitatis utiliza o Supabase Auth combinado com um contexto React personalizado para gerenciar o estado de autenticação e fornecer uma experiência de usuário fluida.

## 📦 Componentes Principais

### AuthContext

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: UserData
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}
```

### AuthProvider

```typescript
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Lógica de gerenciamento de estado
  // Métodos de autenticação
  // Listeners de mudança de estado

  return (
    <AuthContext.Provider value={...}>
      {children}
    </AuthContext.Provider>
  );
};
```

### AuthModal

```typescript
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register" | "reset";
}
```

## 🔄 Fluxos de Autenticação

### 1. Login

1. Usuário abre modal de login
2. Preenche email/senha
3. Sistema valida credenciais
4. Em caso de sucesso:
   - Atualiza estado do usuário
   - Redireciona para dashboard
   - Carrega perfil do usuário
5. Em caso de erro:
   - Exibe mensagem apropriada
   - Mantém dados do formulário

### 2. Registro

1. Usuário seleciona "Criar conta"
2. Preenche formulário com:
   - Email
   - Senha
   - Nome completo
   - Username (opcional)
3. Sistema:
   - Valida dados
   - Cria conta no Supabase
   - Cria perfil associado
   - Envia email de confirmação
4. Redireciona para verificação

### 3. Recuperação de Senha

1. Usuário seleciona "Esqueci senha"
2. Informa email
3. Sistema envia link de reset
4. Usuário acessa link
5. Define nova senha
6. Sistema atualiza credenciais

## 🛡️ Proteção de Rotas

### PrivateRoute

```typescript
export const PrivateRoute: React.FC = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
```

### Uso

```typescript
<Routes>
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
</Routes>
```

## 📝 Validação de Formulários

### Login Schema

```typescript
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha muito curta"),
});
```

### Registro Schema

```typescript
const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Precisa ter maiúscula")
      .regex(/[0-9]/, "Precisa ter número"),
    confirmPassword: z.string(),
    fullName: z.string().min(3, "Nome muito curto"),
    username: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });
```

## 🎨 Componentes UI

### Toast Notifications

```typescript
// Sucesso
toast.success("Login realizado com sucesso!");

// Erro
toast.error("Email ou senha inválidos");

// Info
toast.info("Email de confirmação enviado");
```

### Loading States

```typescript
// Botão de submit
<Button type="submit" isLoading={isSubmitting} loadingText="Entrando...">
  Entrar
</Button>
```

## 🔐 Segurança

### Headers

```typescript
// CSP
{
  'Content-Security-Policy': `
    default-src 'self';
    connect-src 'self' https://levhtjaudduxxx.supabase.co;
    img-src 'self' data: https://levhtjaudduxxx.supabase.co;
  `
}
```

### Session Storage

- Tokens JWT armazenados em localStorage
- Refresh tokens em cookies httpOnly
- Sessão expira em 1 hora
- Refresh automático até 12 horas

## 📊 Monitoramento

### Eventos Rastreados

- Tentativas de login
- Registros
- Resets de senha
- Atualizações de perfil
- Erros de autenticação

### Métricas

- Taxa de conversão registro
- Taxa de confirmação email
- Tempo médio de sessão
- Falhas de autenticação

## 🚨 Tratamento de Erros

### Tipos Comuns

```typescript
enum AuthError {
  INVALID_CREDENTIALS = "auth/invalid-credentials",
  EMAIL_IN_USE = "auth/email-already-in-use",
  WEAK_PASSWORD = "auth/weak-password",
  NETWORK_ERROR = "auth/network-error",
}
```

### Handlers

```typescript
const handleAuthError = (error: AuthError) => {
  switch (error.code) {
    case "auth/invalid-credentials":
      return "Email ou senha inválidos";
    case "auth/email-already-in-use":
      return "Email já cadastrado";
    default:
      return "Erro inesperado. Tente novamente.";
  }
};
```

## 🔜 Próximos Passos

1. **Autenticação Social**

   - Implementar Google
   - Implementar Facebook
   - Unificar perfis

2. **Segurança**

   - 2FA
   - Captcha
   - Rate limiting

3. **UX**

   - Melhorar feedback
   - Animações suaves
   - Persistência de form

4. **Testes**
   - Unit tests
   - E2E tests
   - Performance tests

## 📝 Notas Importantes

1. **Segurança**

   - Sempre usar HTTPS
   - Sanitizar inputs
   - Validar server-side
   - Limitar tentativas

2. **Performance**

   - Lazy loading
   - Caching
   - Debounce requests

3. **Manutenção**
   - Logs detalhados
   - Monitoramento
   - Backups regulares
