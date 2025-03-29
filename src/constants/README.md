# Constantes do Christianitatis

## 🌐 Configuração da API

### Endpoints

\`\`\`typescript
// src/constants/api.ts
export const API = {
BASE_URL: import.meta.env.VITE_API_URL,
ENDPOINTS: {
EVENTS: '/events',
CONTACT: '/contact',
SUBSCRIBE: '/subscribe',
MEDIA: '/media'
},
METHODS: {
GET: 'GET',
POST: 'POST',
PUT: 'PUT',
DELETE: 'DELETE'
},
HEADERS: {
JSON: {
'Content-Type': 'application/json'
},
MULTIPART: {
'Content-Type': 'multipart/form-data'
}
}
};
\`\`\`

## 🎨 Tema

### Cores

\`\`\`typescript
// src/constants/theme.ts
export const COLORS = {
PRIMARY: '#3b82f6',
SECONDARY: '#1f2937',
ACCENT: '#ffd700',
SUCCESS: '#10b981',
ERROR: '#ef4444',
WARNING: '#f59e0b',
INFO: '#3b82f6',
BACKGROUND: {
LIGHT: '#ffffff',
DARK: '#1a1a1a'
},
TEXT: {
LIGHT: '#1f2937',
DARK: '#f3f4f6'
}
};
\`\`\`

### Tipografia

\`\`\`typescript
// src/constants/theme.ts
export const TYPOGRAPHY = {
FONT_FAMILY: {
SANS: 'Inter, sans-serif',
SERIF: 'Merriweather, serif'
},
FONT_SIZE: {
XS: '0.75rem',
SM: '0.875rem',
BASE: '1rem',
LG: '1.125rem',
XL: '1.25rem',
'2XL': '1.5rem',
'3XL': '1.875rem',
'4XL': '2.25rem'
},
FONT_WEIGHT: {
LIGHT: 300,
NORMAL: 400,
MEDIUM: 500,
SEMIBOLD: 600,
BOLD: 700
}
};
\`\`\`

## 📱 Breakpoints

### Responsividade

\`\`\`typescript
// src/constants/breakpoints.ts
export const BREAKPOINTS = {
MOBILE: '640px',
TABLET: '768px',
LAPTOP: '1024px',
DESKTOP: '1280px',
WIDE: '1536px'
};

export const MEDIA_QUERIES = {
MOBILE: \`(min-width: \${BREAKPOINTS.MOBILE})\`,
TABLET: \`(min-width: \${BREAKPOINTS.TABLET})\`,
LAPTOP: \`(min-width: \${BREAKPOINTS.LAPTOP})\`,
DESKTOP: \`(min-width: \${BREAKPOINTS.DESKTOP})\`,
WIDE: \`(min-width: \${BREAKPOINTS.WIDE})\`
};
\`\`\`

## 🔒 Validação

### Regras

\`\`\`typescript
// src/constants/validation.ts
export const VALIDATION = {
MIN_LENGTH: {
NAME: 2,
PASSWORD: 8,
MESSAGE: 10
},
MAX_LENGTH: {
NAME: 100,
EMAIL: 255,
MESSAGE: 1000
},
PATTERNS: {
EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,
PASSWORD: /^(?=._[A-Za-z])(?=._\d)[A-Za-z\d]{8,}$/
}
};
\`\`\`

## 📝 Mensagens

### Feedback

\`\`\`typescript
// src/constants/messages.ts
export const MESSAGES = {
SUCCESS: {
CONTACT: 'Mensagem enviada com sucesso!',
SUBSCRIBE: 'Inscrição realizada com sucesso!',
UPDATE: 'Atualização realizada com sucesso!'
},
ERROR: {
CONTACT: 'Erro ao enviar mensagem.',
SUBSCRIBE: 'Erro ao realizar inscrição.',
UPDATE: 'Erro ao atualizar informações.',
GENERIC: 'Ocorreu um erro. Tente novamente.'
},
VALIDATION: {
REQUIRED: 'Campo obrigatório',
INVALID_EMAIL: 'Email inválido',
INVALID_PHONE: 'Telefone inválido',
MIN_LENGTH: (field: string, length: number) =>
\`\${field} deve ter no mínimo \${length} caracteres\`,
MAX_LENGTH: (field: string, length: number) =>
\`\${field} deve ter no máximo \${length} caracteres\`
}
};
\`\`\`

## 🎯 Eventos

### Tipos

\`\`\`typescript
// src/constants/events.ts
export const EVENT_TYPES = {
CONCERT: 'concert',
WORKSHOP: 'workshop',
EXHIBITION: 'exhibition',
CONFERENCE: 'conference'
} as const;

export const EVENT_STATUS = {
UPCOMING: 'upcoming',
ONGOING: 'ongoing',
PAST: 'past',
CANCELLED: 'cancelled'
} as const;

export const EVENT_CATEGORIES = {
MUSIC: 'music',
ART: 'art',
EDUCATION: 'education',
RELIGION: 'religion'
} as const;
\`\`\`

## 🔧 Configuração

### App

\`\`\`typescript
// src/constants/config.ts
export const CONFIG = {
APP: {
NAME: 'Christianitatis',
VERSION: '1.0.0',
DESCRIPTION: 'Plataforma de eventos cristãos'
},
STORAGE: {
PREFIX: 'christianitatis\_',
KEYS: {
THEME: 'theme',
LANGUAGE: 'language',
AUTH: 'auth'
}
},
LIMITS: {
MAX_FILE_SIZE: 5 _ 1024 _ 1024, // 5MB
MAX_IMAGES: 5,
MAX_VIDEOS: 1
}
};
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Agrupe constantes relacionadas
   - Use nomes descritivos em maiúsculas
   - Mantenha em módulos separados

2. **Tipagem**

   - Use TypeScript
   - Defina tipos literais
   - Use const assertions

3. **Manutenção**

   - Centralize configurações
   - Documente alterações
   - Mantenha valores atualizados

4. **Segurança**

   - Não exponha dados sensíveis
   - Use variáveis de ambiente
   - Valide valores críticos

5. **Performance**
   - Evite duplicação
   - Use referências constantes
   - Otimize imports

## 📚 Exemplos de Uso

### Configuração de API

\`\`\`typescript
import { API } from '../constants/api';

const fetchEvents = async () => {
const response = await fetch(\`\${API.BASE_URL}\${API.ENDPOINTS.EVENTS}\`, {
method: API.METHODS.GET,
headers: API.HEADERS.JSON
});
return response.json();
};
\`\`\`

### Validação de Formulário

\`\`\`typescript
import { VALIDATION } from '../constants/validation';

const validateEmail = (email: string): boolean => {
return VALIDATION.PATTERNS.EMAIL.test(email);
};

const validatePassword = (password: string): boolean => {
return password.length >= VALIDATION.MIN_LENGTH.PASSWORD &&
VALIDATION.PATTERNS.PASSWORD.test(password);
};
\`\`\`

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**

   ```
   Identificar Constantes -> Agrupar -> Documentar -> Implementar
   ```

2. **Manutenção**

   ```
   Revisar Valores -> Atualizar -> Testar -> Deploy
   ```

3. **Atualizações**
   ```
   Proposta -> Review -> Merge -> Documentar
   ```
