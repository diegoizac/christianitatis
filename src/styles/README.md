# Estilos do Christianitatis

## 🎨 Configuração do Tailwind

### Base

\`\`\`css
/_ src/styles/base.css _/
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
html {
@apply scroll-smooth;
}

body {
@apply bg-white text-gray-900 font-sans;
}

h1 {
@apply text-4xl font-bold mb-4;
}

h2 {
@apply text-3xl font-semibold mb-3;
}

h3 {
@apply text-2xl font-medium mb-2;
}
}
\`\`\`

## 🔧 Componentes

### Botões

\`\`\`css
@layer components {
.btn {
@apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

.btn-primary {
@apply bg-primary text-white hover:bg-primary/90;
}

.btn-secondary {
@apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}

.btn-outline {
@apply border-2 border-primary text-primary hover:bg-primary hover:text-white;
}
}
\`\`\`

### Cards

\`\`\`css
@layer components {
.card {
@apply bg-white rounded-xl shadow-lg overflow-hidden;
}

.card-header {
@apply p-4 border-b border-gray-200;
}

.card-body {
@apply p-4;
}

.card-footer {
@apply p-4 border-t border-gray-200;
}
}
\`\`\`

### Formulários

\`\`\`css
@layer components {
.form-group {
@apply mb-4;
}

.form-label {
@apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
@apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary;
}

.form-error {
@apply text-red-500 text-sm mt-1;
}
}
\`\`\`

## 🎯 Utilitários

### Containers

\`\`\`css
@layer utilities {
.container-sm {
@apply max-w-4xl mx-auto px-4;
}

.container-md {
@apply max-w-6xl mx-auto px-4;
}

.container-lg {
@apply max-w-7xl mx-auto px-4;
}
}
\`\`\`

### Espaçamento

\`\`\`css
@layer utilities {
.section-spacing {
@apply py-12 md:py-16 lg:py-20;
}

.content-spacing {
@apply space-y-6 md:space-y-8;
}
}
\`\`\`

### Animações

\`\`\`css
@layer utilities {
.fade-in {
@apply opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards];
}

.slide-up {
@apply translate-y-4 opacity-0 animate-[slideUp_0.5s_ease-out_forwards];
}
}

@keyframes fadeIn {
from {
opacity: 0;
}
to {
opacity: 1;
}
}

@keyframes slideUp {
from {
transform: translateY(1rem);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}
\`\`\`

## 🎨 Tema

### Cores

\`\`\`typescript
// tailwind.config.js
module.exports = {
theme: {
extend: {
colors: {
primary: '#3b82f6',
secondary: '#1f2937',
accent: '#ffd700',
success: '#10b981',
error: '#ef4444',
warning: '#f59e0b'
}
}
}
}
\`\`\`

### Tipografia

\`\`\`typescript
// tailwind.config.js
module.exports = {
theme: {
extend: {
fontFamily: {
sans: ['Inter', 'sans-serif'],
serif: ['Merriweather', 'serif']
},
fontSize: {
'xs': ['0.75rem', { lineHeight: '1rem' }],
'sm': ['0.875rem', { lineHeight: '1.25rem' }],
'base': ['1rem', { lineHeight: '1.5rem' }],
'lg': ['1.125rem', { lineHeight: '1.75rem' }],
'xl': ['1.25rem', { lineHeight: '1.75rem' }],
'2xl': ['1.5rem', { lineHeight: '2rem' }],
'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
'4xl': ['2.25rem', { lineHeight: '2.5rem' }]
}
}
}
}
\`\`\`

## 🔧 Boas Práticas

1. **Organização**

   - Use camadas (@layer) para organizar estilos
   - Mantenha componentes reutilizáveis
   - Siga uma nomenclatura consistente

2. **Performance**

   - Evite aninhamento excessivo
   - Use utilitários do Tailwind
   - Minimize CSS personalizado

3. **Responsividade**

   - Design mobile-first
   - Use breakpoints consistentes
   - Teste em múltiplos dispositivos

4. **Manutenção**

   - Documente modificações
   - Mantenha consistência
   - Remova código não utilizado

5. **Acessibilidade**
   - Contraste adequado
   - Estados focáveis
   - Suporte a temas escuros

## 📚 Exemplos

### Card de Evento

\`\`\`jsx

<div className="card hover:shadow-xl transition-shadow duration-300">
  <img 
    src={imageUrl} 
    alt={title}
    className="w-full h-48 object-cover"
  />
  <div className="card-body">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
  <div className="card-footer flex justify-between items-center">
    <span className="text-sm text-gray-500">{date}</span>
    <button className="btn btn-primary">Saiba mais</button>
  </div>
</div>
\`\`\`

### Formulário de Contato

\`\`\`jsx

<form className="space-y-6">
  <div className="form-group">
    <label htmlFor="name" className="form-label">Nome</label>
    <input 
      type="text" 
      id="name"
      className="form-input"
      placeholder="Seu nome"
    />
  </div>
  <div className="form-group">
    <label htmlFor="email" className="form-label">Email</label>
    <input 
      type="email" 
      id="email"
      className="form-input"
      placeholder="seu@email.com"
    />
    {error && <span className="form-error">{error}</span>}
  </div>
  <button type="submit" className="btn btn-primary w-full">
    Enviar
  </button>
</form>
\`\`\`

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**

   ```
   Componente Base -> Estilização -> Responsividade -> Refinamento
   ```

2. **Manutenção**

   ```
   Auditoria -> Otimização -> Testes -> Deploy
   ```

3. **Atualizações**
   ```
   Proposta -> Implementação -> Review -> Merge
   ```
