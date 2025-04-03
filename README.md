# Christianitatis App

## 🚀 Sobre o Projeto

Aplicação web para gestão e divulgação de eventos cristãos, desenvolvida com React, TypeScript e Vite.

## 🛠️ Tecnologias

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS
- Framer Motion
- Vitest para testes
- ESLint + Prettier para qualidade de código

## 📦 Componentes Principais

### EventList
Componente responsável por exibir e filtrar eventos:
- Filtros por status (Todos, Próximos, Em Andamento, Encerrados)
- Animações suaves com Framer Motion
- Layout responsivo com Tailwind CSS
- Feedback visual para estados vazios

### EventCard
Card individual para cada evento com:
- Imagem do evento
- Título e descrição
- Data e localização
- Status visual
- Link opcional para mais detalhes

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Rodar testes
npm run test
```

## 🔧 Configuração

### Variáveis de Ambiente
Copie `.env.example` para `.env.local` e configure:
```env
VITE_API_URL=sua_url_api
VITE_APP_ENV=development
```

### Scripts Disponíveis
- `dev`: Ambiente de desenvolvimento
- `build`: Build de produção
- `preview`: Preview do build
- `test`: Roda testes
- `lint`: Verifica código
- `format`: Formata código

## 📱 Layout Responsivo

- Mobile First
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🎨 Temas e Cores

```javascript
colors: {
  primary: { /* Tons de azul indigo */ },
  secondary: { /* Tons de slate */ },
  accent: { /* Tons de amber */ }
}
```

## 🧪 Testes

- Vitest para testes unitários
- Testing Library para testes de componentes
- Cobertura de testes com relatórios

## 📦 Deploy

### Vercel
1. Configure as variáveis de ambiente na Vercel
2. Deploy automático na branch main
3. Preview deployments em PRs

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções

### Commits
Seguimos o Conventional Commits:
- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

### Código
- ESLint para linting
- Prettier para formatação
- TypeScript strict mode
- Husky para git hooks

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- Diego Lopes - Desenvolvedor Principal

## 📞 Suporte

Para suporte, email diego@example.com ou abra uma issue.
