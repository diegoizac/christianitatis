/// <reference types="vite/client" />

// Desativar verificação de tipos para todos os módulos
declare module '*';

// Declarar tipos para o ambiente
interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_PWA: string;
  readonly VITE_ENABLE_SENTRY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declarar variáveis globais
declare const __DEV__: boolean;