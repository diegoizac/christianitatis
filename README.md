# Christianitatis

Aplicação web para a comunidade Christianitatis, desenvolvida com React, Vite, TypeScript e Supabase.

## 🚀 Início Rápido

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`

## 📚 Documentação

- [Guia de Configuração e Deploy](./SETUP.md) - Instruções detalhadas para configuração do ambiente e deploy
- [Diretrizes de Desenvolvimento](./DEVELOPMENT.md) - Padrões, boas práticas e workflow no Cursor
- [Documentação da API](./docs/API.md) - Documentação das APIs e endpoints
- [Guia de Contribuição](./CONTRIBUTING.md) - Como contribuir com o projeto

## 🛠 Stack Tecnológica

- React 18
- Vite
- TypeScript
- Supabase
- TailwindCSS
- Three.js
- i18next
- Vitest

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build local
- `npm run test` - Executa testes
- `npm run lint` - Verifica código com ESLint
- `npm run lint:fix` - Corrige problemas de linting

## 🌐 Ambientes

- Desenvolvimento: [dev.christianitatis.app](https://dev.christianitatis.app)
- Produção: [christianitatis.app](https://christianitatis.app)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌟 Sobre o Projeto

Christianitatis é uma aplicação web moderna desenvolvida com React, TypeScript e Vite, focada em fornecer uma plataforma para eventos cristãos e interação com a comunidade.

## 🚀 Tecnologias Utilizadas

### Frontend

- React 18.2.0
- TypeScript 5.2.2
- Vite 5.1.4
- Tailwind CSS 3.4.1
- React Toastify 10.0.4

### Backend

- Supabase
- PostgreSQL

### Ferramentas de Desenvolvimento

- ESLint
- PostCSS
- Autoprefixer

## 📦 Pré-requisitos

- Node.js (v18.x ou superior)
- npm (v9.x ou superior)
- Git

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/diegoizac/christianitatis.git
cd christianitatis
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite o arquivo .env.local com suas configurações

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🌐 Estrutura do Projeto

```
christianitatis/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── lib/           # Bibliotecas e utilitários
│   ├── services/      # Serviços e integrações
│   ├── types/         # Definições de tipos TypeScript
│   ├── assets/        # Recursos estáticos
│   └── config/        # Configurações do projeto
├── public/            # Arquivos públicos
└── api/              # Endpoints da API
```

## 🔧 Configuração

### Variáveis de Ambiente

- `VITE_SUPABASE_URL`: URL do projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase
- `VITE_API_URL`: URL base da API

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run preview`: Visualiza a build de produção localmente

## 🌟 Funcionalidades

### Principais

1. Gerenciamento de Eventos

   - Listagem de eventos
   - Detalhes do evento
   - Vídeos e imagens

2. Sistema de Contato

   - Formulário de contato
   - Integração com Supabase
   - Notificações em tempo real

3. Interface Responsiva
   - Design adaptativo
   - Animações suaves
   - Compatibilidade cross-browser

## 🔐 Segurança

- Validação de dados
- Proteção contra XSS
- Rate limiting
- Sanitização de inputs

## 📱 Responsividade

O projeto é totalmente responsivo e testado nos seguintes dispositivos:

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para contato@christianitatis.com
