# Configurações do Christianitatis

## 🔧 Configurações Principais

### Supabase

Configuração do cliente Supabase.

\`\`\`typescript
// src/config/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
\`\`\`

### Vite

Configuração do Vite.

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vite/plugin-react';
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
host: true
},
build: {
outDir: 'dist',
sourcemap: true
}
});
\`\`\`

### Tailwind

Configuração do Tailwind CSS.

\`\`\`typescript
// tailwind.config.js
module.exports = {
content: [
'./src/**/*.{js,jsx,ts,tsx}',
'./index.html'
],
theme: {
extend: {
colors: {
primary: '#1a1a1a',
secondary: '#333333',
accent: '#ffd700'
},
fontFamily: {
sans: ['Inter', 'sans-serif'],
serif: ['Merriweather', 'serif']
}
}
},
plugins: []
};
\`\`\`

### PostCSS

Configuração do PostCSS.

\`\`\`javascript
// postcss.config.js
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {}
}
};
\`\`\`

### ESLint

Configuração do ESLint.

\`\`\`javascript
// .eslintrc.js
module.exports = {
extends: [
'eslint:recommended',
'plugin:@typescript-eslint/recommended',
'plugin:react/recommended',
'plugin:react-hooks/recommended'
],
parser: '@typescript-eslint/parser',
plugins: ['@typescript-eslint', 'react'],
rules: {
'react/react-in-jsx-scope': 'off',
'@typescript-eslint/explicit-module-boundary-types': 'off'
}
};
\`\`\`

## 🌐 Variáveis de Ambiente

### Desenvolvimento

\`\`\`env

# .env.development

NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
NEXT_PUBLIC_API_URL=http://localhost:3000
NOTIFICATION_EMAIL=seu_email@exemplo.com
\`\`\`

### Produção

\`\`\`env

# .env.production

NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
NEXT_PUBLIC_API_URL=https://seu-dominio.com
NOTIFICATION_EMAIL=seu_email@exemplo.com
\`\`\`

## 📦 Dependências

### Package.json

\`\`\`json
{
"name": "christianitatis",
"version": "1.0.0",
"dependencies": {
"@supabase/supabase-js": "^2.0.0",
"react": "^18.0.0",
"react-dom": "^18.0.0",
"tailwindcss": "^3.0.0",
"vite": "^4.0.0"
},
"devDependencies": {
"@types/react": "^18.0.0",
"@typescript-eslint/eslint-plugin": "^5.0.0",
"eslint": "^8.0.0",
"typescript": "^4.0.0"
},
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
}
}
\`\`\`

## 🔒 Segurança

### Headers

Configuração de headers de segurança.

\`\`\`typescript
// next.config.js
module.exports = {
async headers() {
return [
{
source: '/:path\*',
headers: [
{
key: 'X-Frame-Options',
value: 'DENY'
},
{
key: 'X-Content-Type-Options',
value: 'nosniff'
},
{
key: 'X-XSS-Protection',
value: '1; mode=block'
}
]
}
];
}
};
\`\`\`

## 🚀 Deploy

### Vercel

Configuração do Vercel.

\`\`\`json
// vercel.json
{
"version": 2,
"builds": [
{
"src": "package.json",
"use": "@vercel/static-build",
"config": { "distDir": "dist" }
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

## 🔧 Boas Práticas

1. **Variáveis de Ambiente**

   - Nunca comite valores sensíveis
   - Use .env.example para documentar
   - Valide variáveis na inicialização

2. **Segurança**

   - Mantenha dependências atualizadas
   - Configure CSP headers
   - Use HTTPS em produção

3. **Performance**

   - Otimize builds
   - Configure caching
   - Use code splitting

4. **Manutenção**

   - Documente alterações
   - Mantenha versionamento
   - Faça backup de configurações

5. **Deploy**
   - Use CI/CD
   - Teste em staging
   - Monitore logs

## 📚 Exemplos

### Validação de Variáveis de Ambiente

\`\`\`typescript
// src/config/env.ts
const requiredEnvVars = [
'NEXT_PUBLIC_SUPABASE_URL',
'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

requiredEnvVars.forEach(varName => {
if (!process.env[varName]) {
throw new Error(\`Missing required environment variable: \${varName}\`);
}
});
\`\`\`

### Configuração de Cache

\`\`\`typescript
// src/config/cache.ts
export const cacheConfig = {
staticMaxAge: 86400, // 1 dia
dynamicMaxAge: 300, // 5 minutos
staleWhileRevalidate: 60 // 1 minuto
};
\`\`\`

### Configuração de Logs

\`\`\`typescript
// src/config/logger.ts
import pino from 'pino';

export const logger = pino({
level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
transport: {
target: 'pino-pretty'
}
});
\`\`\`

## 🔄 Fluxo de Configuração

1. **Desenvolvimento Local**

   ```
   Clone -> Instalar Deps -> Configurar Env -> Iniciar Dev
   ```

2. **Deploy Produção**

   ```
   Build -> Validar Env -> Deploy -> Monitorar
   ```

3. **Atualização de Deps**
   ```
   Audit -> Update -> Test -> Deploy
   ```
