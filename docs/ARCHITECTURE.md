# 🏗️ Arquitetura e Padrões – Christianitatis

## 📁 Estrutura de Diretórios

\`\`\`
src/
├── assets/ # Recursos estáticos (imagens, fontes, etc)
├── components/ # Componentes React reutilizáveis
├── config/ # Configurações da aplicação
├── constants/ # Constantes e enums
├── hooks/ # Custom hooks React
├── i18n/ # Traduções e configuração i18n
├── lib/ # Bibliotecas e wrappers
├── services/ # Serviços e integrações
├── styles/ # Estilos globais e temas
├── tests/ # Configuração e helpers de teste
├── types/ # Tipos TypeScript e interfaces
└── utils/ # Funções utilitárias
\`\`\`

## 🎨 Padrões de Estilo

### CSS e Estilização

1. **Tailwind CSS**

   - Utilizar classes utilitárias para estilos básicos
   - Evitar CSS customizado quando possível
   - Seguir o padrão mobile-first

2. **CSS Modules**

   - Usar para componentes com estilos complexos
   - Nomenclatura: `[ComponentName].module.css`
   - Evitar !important e seletores profundos

3. **Temas e Variáveis**
   ```css
   :root {
     --primary: #4338ca;
     --secondary: #1e293b;
     --accent: #f59e0b;
     --text: #0f172a;
     --background: #ffffff;
   }
   ```

## 🧱 Padrões de Componentes

### Estrutura de Componentes

1. **Componentes Funcionais**

```typescript
// ✅ Padrão recomendado
import { FC } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ variant = "primary", children }) => {
  return (
    <button className={clsx(styles.button, styles[variant])}>{children}</button>
  );
};
```

2. **Organização de Pastas**

```
components/
├── Button/
│   ├── index.tsx
│   ├── Button.module.css
│   ├── Button.test.tsx
│   └── Button.stories.tsx
└── [ComponentName]/
    └── ...
```

## 🎣 Custom Hooks

### Padrões de Hooks

1. **Nomenclatura**

   - Prefixo `use` obrigatório
   - Nome descritivo da funcionalidade
   - Exemplo: `useAuth`, `useTheme`

2. **Estrutura**

```typescript
// ✅ Padrão recomendado
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // ... resto da implementação
}
```

## 📦 Gerenciamento de Estado

### Padrões de Estado

1. **Local vs Global**

   - Estado local: `useState` para componentes isolados
   - Estado global: Context API para temas, i18n, etc
   - Evitar prop drilling além de 2 níveis

2. **Context API**

```typescript
// ✅ Padrão recomendado
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## 🌐 Internacionalização

### Padrões i18n

1. **Estrutura de Traduções**

```
i18n/
├── locales/
│   ├── pt/
│   │   └── common.json
│   └── en/
│       └── common.json
└── config.ts
```

2. **Uso**

```typescript
// ✅ Padrão recomendado
import { useTranslation } from "react-i18next";

export function Welcome() {
  const { t } = useTranslation();
  return <h1>{t("welcome.title")}</h1>;
}
```

## 🧪 Testes

### Padrões de Teste

1. **Nomenclatura**

   - Arquivos: `[Component].test.tsx`
   - Descrições: Descrever comportamento esperado
   - Casos: Começar com "should"

2. **Estrutura**

```typescript
// ✅ Padrão recomendado
describe("Button", () => {
  it("should render with primary variant by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("primary");
  });

  it("should handle click events", () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
```

## 📱 Responsividade

### Breakpoints Padrão

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: "640px", // Mobile landscape
      md: "768px", // Tablets
      lg: "1024px", // Desktop
      xl: "1280px", // Large desktop
      "2xl": "1536px", // Extra large
    },
  },
};
```

## 🔒 Segurança

### Práticas de Segurança

1. **Sanitização de Dados**

```typescript
// ✅ Padrão recomendado
import DOMPurify from "dompurify";

export function SafeHTML({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  );
}
```

2. **Variáveis de Ambiente**
   - Usar `.env` para secrets
   - Prefixo `VITE_` para variáveis públicas
   - Nunca commitar `.env` (apenas `.env.example`)

## 🚀 Performance

### Práticas de Otimização

1. **Code Splitting**

```typescript
// ✅ Padrão recomendado
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

2. **Memoização**

```typescript
// ✅ Padrão recomendado
const MemoizedComponent = memo(({ data }) => {
  return <div>{data.map(renderItem)}</div>;
}, isEqual);
```

## 📝 Convenções de Código

### Nomenclatura

1. **Componentes**

   - PascalCase para componentes
   - camelCase para hooks e funções
   - kebab-case para arquivos CSS

2. **Interfaces e Types**

```typescript
// ✅ Padrão recomendado
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
}

type Theme = "light" | "dark";
```

### Imports

1. **Ordem de Imports**

```typescript
// ✅ Padrão recomendado
// 1. React e bibliotecas externas
import { useState } from "react";
import clsx from "clsx";

// 2. Componentes internos
import { Button } from "@/components";

// 3. Hooks, utils e types
import { useTheme } from "@/hooks";
import { formatDate } from "@/utils";
import type { Theme } from "@/types";

// 4. Estilos e assets
import styles from "./Component.module.css";
import logo from "@/assets/logo.svg";
```

## 🔄 Ciclo de Desenvolvimento

### Git Flow

1. **Branches**

   - `main` - Produção
   - `develop` - Desenvolvimento
   - `feature/*` - Novas features
   - `hotfix/*` - Correções urgentes

2. **Commits**

```bash
# ✅ Padrão recomendado
feat: adiciona componente de botão
fix: corrige estilo do header
docs: atualiza README
refactor: melhora performance do carrossel
```

## 📚 Documentação

### Padrões de Documentação

1. **README.md**

   - Descrição do projeto
   - Setup e instalação
   - Scripts disponíveis
   - Links úteis

2. **Componentes**

```typescript
// ✅ Padrão recomendado
/**
 * Botão primário com variantes de estilo
 * @param {ButtonProps} props - Propriedades do botão
 * @returns {JSX.Element} Componente Button
 * @example
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```
