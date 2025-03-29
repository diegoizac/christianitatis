# Utilitários do Christianitatis

## 🛠️ Funções de Validação

### Validação de Email

\`\`\`typescript
// src/utils/validation.ts
export const validateEmail = (email: string): boolean => {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
};

// Exemplo de uso
const isValidEmail = validateEmail('usuario@exemplo.com');
\`\`\`

### Validação de Telefone

\`\`\`typescript
// src/utils/validation.ts
export const validatePhone = (phone: string): boolean => {
const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
return regex.test(phone);
};

// Exemplo de uso
const isValidPhone = validatePhone('(11) 99999-9999');
\`\`\`

## 📅 Formatação de Data

### Formatadores

\`\`\`typescript
// src/utils/date.ts
export const formatDate = (date: Date): string => {
return new Intl.DateTimeFormat('pt-BR', {
day: '2-digit',
month: 'long',
year: 'numeric'
}).format(date);
};

export const formatTime = (date: Date): string => {
return new Intl.DateTimeFormat('pt-BR', {
hour: '2-digit',
minute: '2-digit'
}).format(date);
};

// Exemplo de uso
const date = new Date('2024-03-15T19:00:00');
const formattedDate = formatDate(date); // "15 de março de 2024"
const formattedTime = formatTime(date); // "19:00"
\`\`\`

## 💰 Formatação de Moeda

### Formatadores

\`\`\`typescript
// src/utils/currency.ts
export const formatCurrency = (value: number): string => {
return new Intl.NumberFormat('pt-BR', {
style: 'currency',
currency: 'BRL'
}).format(value);
};

// Exemplo de uso
const price = formatCurrency(29.90); // "R$ 29,90"
\`\`\`

## 🔒 Criptografia

### Funções de Hash

\`\`\`typescript
// src/utils/crypto.ts
import { createHash } from 'crypto';

export const hashString = (str: string): string => {
return createHash('sha256').update(str).digest('hex');
};

// Exemplo de uso
const hashedValue = hashString('senha123');
\`\`\`

## 🎨 Manipulação de Cores

### Funções de Cor

\`\`\`typescript
// src/utils/color.ts
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result
? {
r: parseInt(result[1], 16),
g: parseInt(result[2], 16),
b: parseInt(result[3], 16)
}
: { r: 0, g: 0, b: 0 };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
return '#' + [r, g, b].map(x => {
const hex = x.toString(16);
return hex.length === 1 ? '0' + hex : hex;
}).join('');
};

// Exemplo de uso
const rgb = hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0 }
const hex = rgbToHex(255, 0, 0); // "#ff0000"
\`\`\`

## 📝 Manipulação de Texto

### Funções de Texto

\`\`\`typescript
// src/utils/string.ts
export const capitalize = (str: string): string => {
return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
return str.length > length ? str.slice(0, length) + '...' : str;
};

export const slugify = (str: string): string => {
return str
.toLowerCase()
.trim()
.replace(/[^\w\s-]/g, '')
.replace(/[\s_-]+/g, '-')
.replace(/^-+|-+$/g, '');
};

// Exemplo de uso
const capitalized = capitalize('hello world'); // "Hello world"
const truncated = truncate('Texto muito longo', 10); // "Texto muito..."
const slug = slugify('Título do Evento!'); // "titulo-do-evento"
\`\`\`

## 🌐 Manipulação de URL

### Funções de URL

\`\`\`typescript
// src/utils/url.ts
export const getQueryParams = (url: string): Record<string, string> => {
const params = new URLSearchParams(new URL(url).search);
const result: Record<string, string> = {};

params.forEach((value, key) => {
result[key] = value;
});

return result;
};

export const buildUrl = (base: string, params: Record<string, string>): string => {
const url = new URL(base);
Object.entries(params).forEach(([key, value]) => {
url.searchParams.append(key, value);
});
return url.toString();
};

// Exemplo de uso
const params = getQueryParams('https://exemplo.com?q=busca&page=1');
const url = buildUrl('https://exemplo.com', { q: 'busca', page: '1' });
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Agrupe funções relacionadas
   - Use nomes descritivos
   - Documente parâmetros e retornos

2. **Performance**

   - Otimize operações frequentes
   - Cache resultados quando possível
   - Evite loops desnecessários

3. **Tipagem**

   - Use TypeScript
   - Defina tipos específicos
   - Evite any

4. **Testes**

   - Teste casos de borda
   - Cubra casos de erro
   - Mantenha testes atualizados

5. **Manutenção**
   - Mantenha funções puras
   - Documente alterações
   - Siga padrões estabelecidos

## 📚 Exemplos de Uso

### Validação de Formulário

\`\`\`typescript
const validateForm = (data: FormData) => {
const errors: Record<string, string> = {};

if (!validateEmail(data.email)) {
errors.email = 'Email inválido';
}

if (!validatePhone(data.phone)) {
errors.phone = 'Telefone inválido';
}

return errors;
};
\`\`\`

### Formatação de Evento

\`\`\`typescript
const formatEvent = (event: Event) => {
return {
...event,
title: capitalize(event.title),
slug: slugify(event.title),
date: formatDate(new Date(event.date)),
time: formatTime(new Date(event.date)),
description: truncate(event.description, 150)
};
};
\`\`\`

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**

   ```
   Identificar Necessidade -> Implementar -> Testar -> Documentar
   ```

2. **Manutenção**

   ```
   Revisar Uso -> Otimizar -> Atualizar Docs -> Deploy
   ```

3. **Atualizações**
   ```
   Proposta -> Review -> Testes -> Merge
   ```
