# 📘 Documentação Técnica – Website Christianitatis

## 🚀 Stack Principal

### Core

- **React.js 18** – Framework base para construção da interface
- **Vite 5** – Build system otimizado com HMR ultra-rápido
- **TypeScript 5** – Tipagem estática para segurança e escalabilidade
- **Tailwind CSS 3** – Estilização com utilitários + customizações visuais

### 3D e Animações

- **Three.js ^0.161.0** – Renderização 3D no navegador
- **React Three Fiber ^8.15.16** – Abstração do Three.js para React
- **React Three Drei ^9.99.5** – Helpers úteis como orbit controls, environment, etc
- **GSAP + ScrollTrigger** – Animações avançadas com base em scroll e timeline
- **Leva** – GUI leve e prática para controle de variáveis em tempo real

### Backend e Infraestrutura

- **Supabase ^2.39.7** – Backend as a Service para autenticação e banco de dados
- **Vercel Analytics ^1.5.0** – Monitoramento de performance e uso
- **i18next ^24.2.2** – Internacionalização completa do sistema

## 📦 Dependências e Versões

\`\`\`json
{
"dependencies": {
"@fortawesome/fontawesome-free": "^6.7.2",
"@fortawesome/fontawesome-svg-core": "^6.7.2",
"@fortawesome/react-fontawesome": "^0.2.2",
"@react-three/drei": "^9.99.5",
"@react-three/fiber": "^8.15.16",
"@supabase/supabase-js": "^2.39.7",
"@vercel/analytics": "^1.5.0",
"axios": "^1.6.7",
"dompurify": "^3.0.11",
"i18next": "^24.2.2",
"react-i18next": "^15.4.1",
"three": "^0.161.0"
}
}
\`\`\`

## 🧩 Features e Implementações

### 1. Hero Section com Árvore 3D

\`\`\`typescript
// src/components/Hero/Scene.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

export function Scene() {
const { scene } = useGLTF('/models/tree.glb')

useEffect(() => {
// Cleanup
return () => {
scene.traverse((obj) => {
if (obj.isMesh) {
obj.geometry.dispose()
obj.material.dispose()
}
})
}
}, [scene])

return (
<Canvas
camera={{ position: [0, 2, 5], fov: 45 }}
dpr={[1, 2]}
performance={{ min: 0.5 }} >
<Suspense fallback={null}>
<primitive object={scene} />
<Environment preset="sunset" />
<OrbitControls
enableZoom={false}
maxPolarAngle={Math.PI / 2}
/>
</Suspense>
</Canvas>
)
}
\`\`\`

### 2. Otimizações de Performance

\`\`\`typescript
// src/hooks/usePerformance.ts
import { useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'

export function usePerformance() {
const { gl, scene, camera } = useThree()

const optimizeScene = useCallback(() => {
// Reduz qualidade em mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if (isMobile) {
gl.setPixelRatio(Math.min(1.5, window.devicePixelRatio))
gl.setSize(window.innerWidth, window.innerHeight)
}

    // Otimiza materiais
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.frustumCulled = true
        obj.material.precision = isMobile ? 'lowp' : 'highp'
      }
    })

}, [gl, scene])

useEffect(() => {
optimizeScene()
}, [optimizeScene])
}
\`\`\`

## 🧪 Testes e Monitoramento

### Ferramentas Integradas:

- **Vitest** – Framework de testes unitários e de integração
- **Testing Library** – Testes de componentes React
- **Vercel Analytics** – Monitoramento de performance
- **ESLint + TypeScript** – Análise estática de código

### Exemplo de Teste:

\`\`\`typescript
// src/components/Hero/**tests**/Scene.test.tsx
import { render, screen } from '@testing-library/react'
import { Scene } from '../Scene'

describe('Scene Component', () => {
it('should render without crashing', () => {
render(<Scene />)
expect(screen.getByTestId('scene-canvas')).toBeInTheDocument()
})

it('should handle WebGL not supported', () => {
// Mock WebGL not supported
const mockGL = jest.spyOn(document, 'createElement')
mockGL.mockImplementation(() => ({
getContext: () => null
}))

    render(<Scene />)
    expect(screen.getByText(/WebGL não suportado/i)).toBeInTheDocument()

})
})
\`\`\`

## 🔧 Otimizações Implementadas

### Performance

- ✅ Compressão Brotli e Gzip
- ✅ Otimização de imagens com vite-plugin-imagemin
- ✅ Code splitting automático
- ✅ Minificação avançada com Terser
- ✅ Tree shaking agressivo
- ✅ Preload de recursos críticos

### SEO

- ✅ Meta tags dinâmicas
- ✅ Schema.org para eventos
- ✅ Open Graph otimizado
- ✅ Sitemap.xml automático

### Acessibilidade

- ✅ ARIA labels
- ✅ Navegação por teclado
- ✅ Modo reduzido de movimento
- ✅ Alto contraste

## 📋 Checklist de Deploy

### Pre-deploy

- [ ] Rodar \`npm run typecheck\`
- [ ] Executar \`npm run test\`
- [ ] Verificar \`npm audit\`
- [ ] Testar build local

### Deploy

- [ ] Confirmar variáveis de ambiente
- [ ] Verificar DNS e domínios
- [ ] Testar SSL/HTTPS
- [ ] Monitorar logs iniciais

### Post-deploy

- [ ] Verificar Core Web Vitals
- [ ] Testar formulários e integrações
- [ ] Validar SEO e meta tags
- [ ] Confirmar Analytics

## 🌐 Compatibilidade

### Navegadores Suportados

\`\`\`

# Navegadores Modernos

last 2 versions

> 0.5%
> not dead

# Mobile

iOS >= 12
Android >= 5

# Desktop

Firefox ESR
not IE 11

# Performance

not op_mini all
\`\`\`

## 📝 Observações Finais

### Manutenção

- Atualizar dependências mensalmente
- Monitorar Sentry/Analytics semanalmente
- Backup do banco Supabase diário
- Review de performance quinzenal

### Próximos Passos

1. Implementar PWA completo
2. Otimizar cache de assets 3D
3. Adicionar testes E2E com Cypress
4. Expandir cobertura de testes (meta: 80%)

### Links Úteis

- [Dashboard Vercel](https://vercel.com/dashboard)
- [Console Supabase](https://app.supabase.io)
- [Analytics](https://vercel.com/analytics)
- [Documentação API](./API_DOCS.md)

## 🔧 Ferramentas de Desenvolvimento

### Browser Tools

O projeto inclui uma configuração personalizada de ferramentas do navegador para auxiliar no desenvolvimento:

\`\`\`typescript
// src/config/browser-tools.config.ts
export const browserToolsConfig: BrowserToolsConfig = {
enableConsoleLogging: true,
enableNetworkLogging: true,
enablePerformanceAudit: true,
enableAccessibilityAudit: true,
enableSEOAudit: true,
enableBestPracticesAudit: true,
enableNextJSAudit: false, // Desabilitado pois usamos Vite
debuggerMode: true,
}
\`\`\`

Estas configurações permitem:

- Logging avançado no console
- Monitoramento de requisições de rede
- Auditorias automáticas de performance
- Verificações de acessibilidade
- Análise de SEO
- Validação de boas práticas

### Componentes Principais

#### Section Component

Componente base para seções da página com suporte a:

- Títulos e subtítulos
- Variantes de estilo (default/alternate)
- Classes CSS customizáveis
- Integração com sistema de navegação

\`\`\`typescript
interface SectionProps extends HTMLAttributes<HTMLElement> {
title?: string
subtitle?: string
children: React.ReactNode
className?: string
id?: string
variant?: 'default' | 'alternate'
}
\`\`\`
