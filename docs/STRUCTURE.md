# Estrutura do Projeto - Christianitatis

## 📁 Visão Geral

```
christianitatis/
├── app/                    # Código fonte principal
│   ├── components/         # Componentes React reutilizáveis
│   ├── contexts/          # Contextos React (Auth, Theme, etc)
│   ├── hooks/             # Hooks personalizados
│   ├── lib/               # Bibliotecas e configurações
│   ├── pages/             # Páginas da aplicação
│   ├── styles/            # Estilos globais e temas
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Funções utilitárias
├── docs/                   # Documentação
├── public/                 # Arquivos estáticos
└── tests/                  # Testes automatizados
```

## 🧩 Componentes

### Estrutura de Componentes

```
components/
├── auth/                  # Componentes de autenticação
│   ├── AuthModal.tsx
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── common/               # Componentes comuns
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── layout/              # Componentes de layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
└── ui/                 # Componentes de UI
    ├── Card.tsx
    ├── Icons.tsx
    └── Loading.tsx
```

### Padrões de Componentes

```typescript
// Componente Funcional
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{/* JSX */}</div>;
};

// Com Forwarded Ref
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return <div>{/* JSX */}</div>;
  }
);
```

## 🎨 Estilos

### Estrutura de Estilos

```
styles/
├── globals.css          # Estilos globais
├── themes/             # Temas
│   ├── dark.ts
│   └── light.ts
└── components/         # Estilos de componentes
    ├── auth.css
    └── layout.css
```

### Padrões CSS

```css
/* Variáveis CSS */
:root {
  --primary: #4a90e2;
  --secondary: #50e3c2;
  --text: #333333;
  --background: #ffffff;
}

/* Mobile First */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
```

## 📄 Páginas

### Estrutura de Páginas

```
pages/
├── index.tsx            # Página inicial
├── auth/               # Páginas de autenticação
│   ├── login.tsx
│   └── register.tsx
├── dashboard/         # Páginas do dashboard
│   ├── index.tsx
│   └── profile.tsx
└── events/           # Páginas de eventos
    ├── index.tsx
    └── [id].tsx
```

### Padrões de Páginas

```typescript
// Página com SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      // dados
    },
  };
};

// Página com ISR
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      // dados
    },
    revalidate: 60,
  };
};
```

## 🎣 Hooks

### Estrutura de Hooks

```
hooks/
├── auth/              # Hooks de autenticação
│   ├── useAuth.ts
│   └── useProfile.ts
├── data/             # Hooks de dados
│   ├── useEvents.ts
│   └── useUsers.ts
└── ui/              # Hooks de UI
    ├── useModal.ts
    └── useTheme.ts
```

### Padrões de Hooks

```typescript
// Hook personalizado
const useCustomHook = (param: Type): ReturnType => {
  const [state, setState] = useState<StateType>(initial);

  useEffect(() => {
    // efeito
  }, [param]);

  return {
    // valores
  };
};
```

## 🔧 Utilitários

### Estrutura de Utilitários

```
utils/
├── api/              # Funções de API
│   ├── client.ts
│   └── endpoints.ts
├── auth/            # Funções de autenticação
│   ├── tokens.ts
│   └── validation.ts
└── helpers/        # Funções auxiliares
    ├── date.ts
    └── string.ts
```

### Padrões de Utilitários

```typescript
// Função utilitária
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR");
};

// Classe utilitária
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
```

## 📝 Tipos

### Estrutura de Tipos

```
types/
├── api.ts           # Tipos de API
├── auth.ts         # Tipos de autenticação
├── components.ts   # Tipos de componentes
└── utils.ts       # Tipos utilitários
```

### Padrões de Tipos

```typescript
// Interface
interface User {
  id: string;
  name: string;
  email: string;
}

// Type
type AuthState = {
  user: User | null;
  loading: boolean;
  error?: string;
};

// Enum
enum Role {
  USER = "user",
  ADMIN = "admin",
}
```

## 🧪 Testes

### Estrutura de Testes

```
tests/
├── components/      # Testes de componentes
│   ├── auth.test.tsx
│   └── ui.test.tsx
├── hooks/          # Testes de hooks
│   └── auth.test.ts
└── utils/         # Testes de utilitários
    └── helpers.test.ts
```

### Padrões de Testes

```typescript
// Teste de componente
describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });
});

// Teste de hook
describe("useHook", () => {
  it("should return correct value", () => {
    const { result } = renderHook(() => useHook());
    expect(result.current).toBe(expected);
  });
});
```

## 📚 Bibliotecas

### Principais Dependências

```json
{
  "dependencies": {
    "next": "13.x",
    "react": "18.x",
    "typescript": "5.x",
    "@supabase/supabase-js": "2.x",
    "tailwindcss": "3.x",
    "three": "0.161.0"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "@types/react": "18.x",
    "@types/node": "18.x",
    "jest": "29.x",
    "@testing-library/react": "13.x",
    "eslint": "8.x",
    "prettier": "2.x"
  }
}
```

## 🔒 Configurações

### Estrutura de Configurações

```
config/
├── jest.config.js    # Configuração do Jest
├── next.config.js    # Configuração do Next.js
├── tailwind.config.js # Configuração do Tailwind
└── tsconfig.json    # Configuração do TypeScript
```

### Padrões de Configuração

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["levhtjaudduxxx.supabase.co"],
  },
};

// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
      },
    },
  },
};
```

## 📝 Notas Importantes

1. **Organização**

   - Manter arquivos relacionados juntos
   - Usar nomes descritivos
   - Seguir convenções estabelecidas

2. **Performance**

   - Lazy loading de componentes
   - Code splitting automático
   - Otimização de imagens

3. **Manutenção**
   - Documentar decisões importantes
   - Manter dependências atualizadas
   - Remover código não utilizado
