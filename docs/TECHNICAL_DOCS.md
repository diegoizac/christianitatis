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

## 🧩 Componentes e Features

### 1. Sistema de Formulários

O sistema de formulários foi implementado com suporte a validação, estados de erro e integração com TypeScript:

\`\`\`typescript
// Exemplo de uso do Form com validação
<Form<ContactFormData>
config={{
    name: {
      initialValue: '',
      validate: [
        {
          validate: (value) => value.length > 0,
          message: 'Nome é obrigatório'
        }
      ]
    },
    email: {
      initialValue: '',
      validate: [
        {
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          message: 'Email inválido'
        }
      ]
    }
  }}
onSubmit={handleSubmit}

> {({ values, errors, handleChange }) => (

    <>
      <TextInput
        name="name"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />
      <TextInput
        name="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />
    </>

)}

</Form>
\`\`\`

### 2. Sistema de Componentes

#### Button

- Suporte a variantes (primary, secondary, accent)
- Estados de loading e disabled
- Animações e feedback visual
- Totalmente tipado e testado

\`\`\`typescript
<Button
variant="primary"
size="md"
isLoading={loading}
onClick={handleClick}

> Enviar
> </Button>
> \`\`\`

#### Input

- Múltiplas variantes (outline, filled)
- Suporte a ícones (left e right)
- Estados de erro e disabled
- Mensagens de ajuda e validação

\`\`\`typescript
<TextInput
label="Email"
name="email"
type="email"
leftIcon={<EmailIcon />}
error={errors.email}
helpText="Digite seu melhor email"
/>
\`\`\`

#### Card

- Efeitos de hover com spotlight
- Suporte a imagens e tags
- Animações suaves
- Variantes de tamanho

\`\`\`typescript
<Card
title="Título"
subtitle="Subtítulo"
image="/path/to/image.jpg"
tags={['tag1', 'tag2']}
size="md"

> Conteúdo do card
> </Card>
> \`\`\`

### 3. Ferramentas de Desenvolvimento

#### Browser Tools

Conjunto de ferramentas para debug e desenvolvimento:

\`\`\`typescript
// src/config/browser-tools.config.ts
export const browserTools = {
// Console e Network
getConsoleLogs: () => { /_ ... _/ },
getNetworkErrors: () => { /_ ... _/ },

// Auditorias
runAccessibilityAudit: () => { /_ ... _/ },
runPerformanceAudit: () => { /_ ... _/ },
runSEOAudit: () => { /_ ... _/ },

// Debug
runDebuggerMode: () => { /_ ... _/ }
}
\`\`\`

## 🧪 Testes

### Estrutura de Testes

- **Testes Unitários**: Componentes individuais
- **Testes de Integração**: Fluxos completos
- **Testes de Snapshot**: UI consistente
- **Testes de Acessibilidade**: ARIA e keyboard

### Exemplo de Teste de Componente:

\`\`\`typescript
describe('Form Component', () => {
it('deve renderizar children corretamente', () => {
render(
<Form config={formConfig} onSubmit={() => {}}>
<Input name="email" placeholder="Email" />
</Form>
)

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()

})

it('deve validar campos obrigatórios', async () => {
render(
<Form config={formConfig} onSubmit={() => {}}>
<Input name="email" required />
</Form>
)

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument()
    })

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
- ✅ Lazy loading de componentes pesados
- ✅ Otimização de re-renders com memo

### SEO

- ✅ Meta tags dinâmicas
- ✅ Schema.org para eventos
- ✅ Open Graph otimizado
- ✅ Sitemap.xml automático
- ✅ Semantic HTML
- ✅ Breadcrumbs estruturados

### Acessibilidade

- ✅ ARIA labels
- ✅ Navegação por teclado
- ✅ Modo reduzido de movimento
- ✅ Alto contraste
- ✅ Mensagens de erro claras
- ✅ Focus management
- ✅ Skip links

## 📋 Checklist de Deploy

### Pre-deploy

- [ ] Rodar \`npm run typecheck\`
- [ ] Executar \`npm run test\`
- [ ] Verificar \`npm audit\`
- [ ] Testar build local
- [ ] Validar acessibilidade
- [ ] Checar performance com Lighthouse

### Deploy

- [ ] Confirmar variáveis de ambiente
- [ ] Verificar DNS e domínios
- [ ] Testar SSL/HTTPS
- [ ] Monitorar logs iniciais
- [ ] Verificar integrações
- [ ] Testar formulários

### Post-deploy

- [ ] Verificar Core Web Vitals
- [ ] Testar formulários e integrações
- [ ] Validar SEO e meta tags
- [ ] Confirmar Analytics
- [ ] Monitorar erros no Sentry
- [ ] Validar cache e CDN

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
- Testes de regressão após updates
- Monitoramento de acessibilidade

### Próximos Passos

1. Implementar PWA completo
2. Otimizar cache de assets 3D
3. Adicionar testes E2E com Cypress
4. Expandir cobertura de testes (meta: 80%)
5. Implementar CI/CD completo
6. Melhorar documentação de componentes
7. Adicionar storybook para componentes
8. Implementar testes de performance automatizados

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
