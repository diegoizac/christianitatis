# Deploy e Configuração com Vercel

## Recursos Oficiais

1. [Documentação Oficial Vercel](https://vercel.com/docs)
2. [Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
3. [Variáveis de Ambiente](https://vercel.com/docs/concepts/projects/environment-variables)

## Configuração Inicial

### 1. Setup do Projeto

```json
// vercel.json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "VITE_ASAAS_API_KEY": "@asaas_api_key"
  }
}
```

### 2. Configurações de Build

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["@/utils"],
          components: ["@/components"],
        },
      },
    },
  },
});
```

## Integrações

### 1. Configuração de Domínio Personalizado

```bash
# Configuração de DNS
# Adicione estes registros no seu provedor DNS
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com.
```

### 2. Headers de Segurança

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
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
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
}
```

## Monitoramento e Analytics

### 1. Vercel Analytics

```typescript
// src/app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Monitoramento de Performance

```typescript
// src/utils/monitoring.ts
import { WebVitalsMetric } from "@vercel/analytics";

export function reportWebVitals(metric: WebVitalsMetric) {
  console.log(metric);

  // Enviar para analytics
  if (metric.name === "FCP") {
    // First Contentful Paint
  }
  if (metric.name === "LCP") {
    // Largest Contentful Paint
  }
  if (metric.name === "CLS") {
    // Cumulative Layout Shift
  }
  if (metric.name === "FID") {
    // First Input Delay
  }
  if (metric.name === "TTFB") {
    // Time to First Byte
  }
}
```

## Melhores Práticas

1. **Deploy**

   - Use branches de preview
   - Configure variáveis de ambiente
   - Implemente testes no pipeline

2. **Performance**

   - Habilite Edge Functions
   - Configure caching
   - Use Image Optimization

3. **Segurança**

   - Proteja variáveis de ambiente
   - Configure headers HTTP
   - Use HTTPS sempre

4. **Monitoramento**
   - Configure alertas
   - Monitore logs
   - Acompanhe métricas

## Recursos Adicionais

- [Vercel CLI](https://vercel.com/docs/cli)
- [Edge Functions](https://vercel.com/features/edge-functions)
- [Vercel Analytics](https://vercel.com/analytics)

## Exercícios Práticos

1. Configure deploy automático
2. Implemente preview deployments
3. Configure domínio personalizado
4. Implemente monitoramento
