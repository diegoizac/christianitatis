# Configuração do Projeto Christianitatis

## Pré-requisitos

- Node.js 18+
- npm 9+
- Git
- Cursor (IDE)

## Diretrizes do Cursor

### Boas Práticas de Edição

- Ao finalizar a edição de um arquivo, sempre:
  1. Salvar as alterações (⌘S / Ctrl+S)
  2. Fechar o arquivo se não for mais necessário (⌘W / Ctrl+W)
  3. Manter abertos apenas os arquivos em uso atual

### Organização do Workspace

- Manter no máximo 3-4 arquivos abertos simultaneamente
- Priorizar a visualização de arquivos relacionados à tarefa atual
- Fechar arquivos de contextos anteriores já resolvidos

### Performance

- O fechamento de arquivos não utilizados ajuda a:
  - Reduzir o consumo de memória
  - Melhorar a performance do Cursor
  - Manter o foco no contexto atual

## Particularidades dos Ambientes

### Ambiente Local (Desenvolvimento)

- **Sistema Operacional**: macOS (Apple Silicon/Intel)
- **Configuração Especial**:

  ```bash
  # Remova qualquer .npmrc existente
  rm -f .npmrc

  # Configure o .npmrc para desenvolvimento local no Mac
  cat << EOF > .npmrc
  platform=linux
  arch=x64
  target_platform=linux
  target_arch=x64
  omit=optional
  node-linker=hoisted
  rollup-native-build=false
  rollup-skip-native=true
  EOF
  ```

### Ambiente de Produção (Vercel)

- **Sistema**: Linux x64
- **Node.js**: 18.x LTS
- **Configurações Críticas**:
  - Não usar pacotes específicos para macOS/darwin
  - Evitar dependências opcionais
  - Usar apenas módulos compatíveis com Linux
  - Rollup configurado para usar versão JavaScript pura
  - Vite configurado para não usar módulos nativos

### Ambiente de CI/CD (GitHub Actions)

- **Sistema**: Ubuntu Latest
- **Node.js**: 18.x
- **Configurações Importantes**:
  - Usar `npm ci` ao invés de `npm install`
  - Sempre incluir o arquivo `.npmrc` no workflow
  - Garantir que o Rollup use a versão JavaScript pura

## Configuração Inicial

1. Clone o repositório:

```bash
git clone https://github.com/diegoizac/christianitatis.git
cd christianitatis
```

2. Configure o `.npmrc`:

```bash
# Crie um arquivo .npmrc na raiz do projeto com o seguinte conteúdo:
platform=linux
arch=x64
target_platform=linux
target_arch=x64
omit=optional
node-linker=hoisted
rollup-native-build=false
rollup-skip-native=true
```

3. Instale as dependências:

```bash
npm install
```

## Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto:

```bash
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
VITE_SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
```

## Deploy na Vercel

### Configuração Inicial do Deploy

1. Instale a CLI da Vercel:

```bash
npm i -g vercel
```

2. Faça login na Vercel:

```bash
vercel login
```

3. Configure o projeto:

```bash
vercel link
```

### Configuração das Variáveis de Ambiente na Vercel

1. Configure as variáveis de ambiente:

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_SUPABASE_SERVICE_ROLE_KEY
```

### Deploy Manual

Para fazer deploy manual:

```bash
vercel deploy --prod
```

### Deploy Automático (CI/CD)

O deploy automático está configurado para acontecer quando:

1. Houver push na branch `main`
2. Uma Pull Request for mesclada na `main`

## Solução de Problemas Comuns

### Erro de Plataforma no Deploy

Se encontrar erros relacionados a pacotes específicos de plataforma (como darwin/macOS), certifique-se de:

1. Ter o arquivo `.npmrc` configurado corretamente
2. Não ter dependências específicas de plataforma no `package.json`
3. Usar a flag `--omit=optional` ao instalar dependências

### Erro de Ambiente no Deploy

Se encontrar erros de ambiente no deploy:

1. Verifique se todas as variáveis de ambiente estão configuradas na Vercel
2. Certifique-se de que o `vercel.json` está configurado corretamente:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "vite",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Problemas Conhecidos e Soluções

#### Erro com Rollup Nativo

Se encontrar erros relacionados ao Rollup nativo:

1. Certifique-se que o `.npmrc` tem as configurações:

```
rollup-native-build=false
rollup-skip-native=true
```

2. Verifique se o `vite.config.ts` tem a configuração:

```typescript
build: {
  rollupOptions: {
    context: 'globalThis',
    experimentalLogSideEffects: true,
  },
},
```

3. Se necessário, limpe o cache e reinstale as dependências:

```bash
rm -rf node_modules package-lock.json
npm install
```
