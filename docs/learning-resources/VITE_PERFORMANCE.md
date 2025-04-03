# Performance com Vite

## Recursos Oficiais

1. [Documentação Oficial Vite](https://vitejs.dev/guide/features.html)
2. [Guia de Otimização](https://vitejs.dev/guide/features.html#build-optimizations)
3. [Configuração de Produção](https://vitejs.dev/guide/build.html)

## Otimizações Principais

### 1. Configuração do Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression(), // Compressão Gzip/Brotli
  ],
  build: {
    target: "esnext",
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@mui/material", "@emotion/react"],
        },
      },
    },
  },
  server: {
    hmr: true,
  },
});
```

### 2. Code Splitting

```typescript
// Lazy loading de componentes
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Otimização de Imagens

### 1. Plugin de Imagens

```typescript
// vite.config.ts
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
        ],
      },
    }),
  ],
});
```

### 2. Componente de Imagem Otimizado

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = "lazy",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
};
```

## Cache e Pré-carregamento

### 1. Service Worker

```typescript
// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
      },
    }),
  ],
});
```

### 2. Preload de Recursos Críticos

```html
<!-- index.html -->
<head>
  <link
    rel="preload"
    href="/fonts/main.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  <link rel="preload" href="/critical.css" as="style" />
  <link rel="prefetch" href="/non-critical.js" />
</head>
```

## Monitoramento de Performance

### 1. Métricas Web Vitals

```typescript
import { getCLS, getFID, getLCP } from "web-vitals";

function sendToAnalytics({ name, delta, id }) {
  // Envie para sua ferramenta de analytics
  console.log(`Metric: ${name} | Value: ${delta} | ID: ${id}`);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

## Melhores Práticas

1. **Build**

   - Use chunking apropriado
   - Minimize dependências
   - Otimize assets estáticos

2. **Runtime**

   - Implemente code splitting
   - Use lazy loading
   - Otimize renderização

3. **Cache**
   - Configure service workers
   - Use estratégias de cache
   - Implemente preload

## Recursos Adicionais

- [Vite Plugin Collection](https://github.com/vitejs/awesome-vite)
- [Performance Guide](https://vitejs.dev/guide/performance.html)
- [Build Optimizations](https://vitejs.dev/guide/build.html)

## Exercícios Práticos

1. Configure build otimizado
2. Implemente lazy loading
3. Adicione service worker
4. Otimize carregamento de imagens
