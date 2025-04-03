# Diretrizes de Desenvolvimento

## Ambiente de Desenvolvimento

### IDE - Cursor

#### Configuração Recomendada

- Theme: Dark (ou sua preferência)
- Font Size: 14px
- Tab Size: 2 espaços
- Auto Save: Habilitado
- Format on Save: Habilitado

#### Gestão de Arquivos

1. **Ao Editar Arquivos**

   - Salvar imediatamente após cada alteração significativa
   - Usar ⌘S (Mac) ou Ctrl+S (Windows/Linux) frequentemente
   - Verificar formatação e linting antes de salvar

2. **Ao Finalizar Edição**

   - Salvar alterações finais
   - Fechar o arquivo usando ⌘W (Mac) ou Ctrl+W (Windows/Linux)
   - Não manter arquivos abertos desnecessariamente

3. **Organização do Workspace**
   - Manter máximo 3-4 arquivos abertos
   - Agrupar arquivos por contexto
   - Fechar contextos completos de uma vez

#### Atalhos Essenciais

- ⌘S / Ctrl+S: Salvar arquivo
- ⌘W / Ctrl+W: Fechar arquivo
- ⌘P / Ctrl+P: Buscar arquivos
- ⌘F / Ctrl+F: Buscar no arquivo
- ⌘⇧F / Ctrl+Shift+F: Buscar no projeto

## Padrões de Código

### Estilo

- Usar ESLint e Prettier configurados
- Seguir padrões do TypeScript
- Manter arquivos com no máximo 300 linhas

### Componentes React

- Um componente por arquivo
- Usar TypeScript strict mode
- Implementar testes unitários

### CSS/Tailwind

- Seguir metodologia BEM
- Usar variáveis CSS quando possível
- Preferir classes utilitárias do Tailwind

## Commits e Branches

### Padrão de Commits

```
tipo(escopo): descrição curta

Descrição longa se necessário
```

Tipos:

- feat: nova feature
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
- test: testes
- chore: manutenção

### Branches

- main: produção
- dev: desenvolvimento
- feature/\*: novas features
- fix/\*: correções
- release/\*: preparação de release

## Testes

### Unitários

- Usar Vitest
- Manter cobertura > 80%
- Testar casos de erro

### E2E

- Usar Cypress
- Testar fluxos principais
- Manter screenshots atualizados

## Performance

### Otimizações

- Lazy loading de componentes
- Otimização de imagens
- Code splitting

### Monitoramento

- Lighthouse scores > 90
- Web Vitals
- Analytics

## Segurança

### Boas Práticas

- Não expor variáveis de ambiente
- Sanitizar inputs
- Validar dados

### Dependências

- Manter pacotes atualizados
- Verificar vulnerabilidades
- Usar versões fixas
