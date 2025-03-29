# Documentação Técnica - Christianitatis

## Arquitetura

### Frontend

O frontend é construído usando uma arquitetura baseada em componentes com React e TypeScript, seguindo os princípios de Clean Architecture.

```
src/
├── components/        # Componentes React reutilizáveis
│   ├── ui/           # Componentes de UI básicos
│   └── features/     # Componentes específicos de features
├── hooks/            # Custom hooks React
├── lib/             # Bibliotecas e utilitários
├── services/        # Serviços e integrações
├── types/           # Definições de tipos TypeScript
└── utils/           # Funções utilitárias
```

### Backend (Supabase)

O backend utiliza Supabase como plataforma principal, com as seguintes tabelas:

```sql
-- Tabela de Mensagens de Contato
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR NOT NULL,
  name VARCHAR,
  message TEXT,
  status VARCHAR DEFAULT 'pending'
);

-- Índices
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
```

## Componentes Principais

### Header

\`\`\`typescript
interface HeaderProps {
isScrolled: boolean;
setActiveModal: (modalId: string | null) => void;
}
\`\`\`

### EventCard

\`\`\`typescript
interface EventCardProps {
imageUrl: string;
title: string;
location: string;
address: string;
time: string;
info: string;
videoUrl?: string;
}
\`\`\`

### ContactForm

\`\`\`typescript
interface ContactFormProps {
onSuccess: () => void;
onError: (error: string) => void;
}
\`\`\`

## Integrações

### Supabase

\`\`\`typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
\`\`\`

## Configurações

### Vite

\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
plugins: [
react(),
viteStaticCopy({
targets: [
{
src: 'src/assets/images/*',
dest: 'assets/images'
},
{
src: 'src/assets/videos/*',
dest: 'assets/videos'
},
{
src: 'src/assets/animations/*',
dest: 'assets/animations'
}
]
})
],
server: {
port: 3000,
host: true,
open: true
},
css: {
postcss: './postcss.config.js'
}
});
\`\`\`

### Tailwind CSS

\`\`\`javascript
module.exports = {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
colors: {
primary: '#3b82f6',
'jeton-bg': '#f3f4f6',
'jeton-text': '#1f2937',
'jeton-hover': '#1e40af',
},
},
},
plugins: [],
}
\`\`\`

## Padrões de Código

### Nomenclatura

- Componentes: PascalCase (ex: EventCard)
- Funções: camelCase (ex: handleSubmit)
- Variáveis: camelCase (ex: isLoading)
- Constantes: SNAKE_CASE (ex: API_URL)
- Tipos/Interfaces: PascalCase com prefixo I para interfaces (ex: IEventCard)

### Estrutura de Componentes

\`\`\`typescript
// imports
import React from 'react';

// types
interface ComponentProps {
// ...
}

// component
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
// hooks
const [state, setState] = useState();

// effects
useEffect(() => {
// ...
}, []);

// handlers
const handleEvent = () => {
// ...
};

// render
return (
// JSX
);
};
\`\`\`

## Testes

### Configuração do Vitest

\`\`\`typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
test: {
globals: true,
environment: 'jsdom',
setupFiles: './src/test/setup.ts',
coverage: {
reporter: ['text', 'json', 'html'],
},
},
});
\`\`\`

### Exemplo de Teste

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { EventCard } from './EventCard';

describe('EventCard', () => {
it('should render event details correctly', () => {
const props = {
imageUrl: 'test.jpg',
title: 'Test Event',
location: 'Test Location',
address: 'Test Address',
time: '19H',
info: 'Test Info',
};

    render(<EventCard {...props} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();

});
});
\`\`\`

## Deploy

### Vercel

O projeto está configurado para deploy automático no Vercel através do arquivo `vercel.json`:

\`\`\`json
{
"version": 2,
"builds": [
{
"src": "package.json",
"use": "@vercel/static-build",
"config": {
"distDir": "dist"
}
}
],
"routes": [
{
"src": "/(.*)",
"dest": "/index.html"
}
]
}
\`\`\`

## Monitoramento e Logs

### Console Logs

- Desenvolvimento: Logs detalhados com níveis de informação
- Produção: Apenas logs de erro e warnings críticos

### Performance

- Lighthouse scores alvo:
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 95
  - SEO: > 95

## Segurança

### Headers

\`\`\`typescript
{
"headers": [
{
"source": "/(.\*)",
"headers": [
{
"key": "X-Content-Type-Options",
"value": "nosniff"
},
{
"key": "X-Frame-Options",
"value": "DENY"
},
{
"key": "X-XSS-Protection",
"value": "1; mode=block"
}
]
}
]
}
\`\`\`

## Manutenção

### Scripts de Manutenção

- Limpeza de logs: Diariamente
- Backup do banco: A cada 6 horas
- Verificação de dependências: Semanalmente

### Atualizações

- Dependências: Mensalmente
- Node.js: A cada LTS
- React: Apenas major versions estáveis
