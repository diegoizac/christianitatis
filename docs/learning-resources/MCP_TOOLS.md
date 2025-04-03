# Ferramentas MCP - GitHub e Browser Tools

## GitHub Tools

### 1. Gerenciamento de Repositório

```typescript
// Criar novo repositório
const createRepo = async () => {
  const result = await mcp_github_create_repository({
    name: "christianitatis",
    description: "Plataforma para eventos cristãos",
    private: false,
    autoInit: true,
  });
  return result;
};

// Criar branch
const createBranch = async () => {
  const result = await mcp_github_create_branch({
    owner: "diegoizac",
    repo: "christianitatis",
    branch: "feature/new-feature",
    from_branch: "main",
  });
  return result;
};
```

### 2. Gerenciamento de Arquivos

```typescript
// Criar/Atualizar arquivo
const updateFile = async () => {
  const result = await mcp_github_create_or_update_file({
    owner: "diegoizac",
    repo: "christianitatis",
    path: "src/components/NewComponent.tsx",
    content: "// Código do componente",
    message: "feat: adiciona novo componente",
    branch: "main",
  });
  return result;
};

// Push múltiplos arquivos
const pushFiles = async () => {
  const result = await mcp_github_push_files({
    owner: "diegoizac",
    repo: "christianitatis",
    branch: "main",
    message: "feat: adiciona novos componentes",
    files: [
      {
        path: "src/components/ComponentA.tsx",
        content: "// Código do ComponentA",
      },
      {
        path: "src/components/ComponentB.tsx",
        content: "// Código do ComponentB",
      },
    ],
  });
  return result;
};
```

### 3. Issues e Pull Requests

```typescript
// Criar issue
const createIssue = async () => {
  const result = await mcp_github_create_issue({
    owner: "diegoizac",
    repo: "christianitatis",
    title: "Bug: problema no formulário de contato",
    body: "Descrição detalhada do problema...",
    labels: ["bug", "high-priority"],
  });
  return result;
};

// Criar pull request
const createPR = async () => {
  const result = await mcp_github_create_pull_request({
    owner: "diegoizac",
    repo: "christianitatis",
    title: "feat: implementa novo sistema de eventos",
    body: "Descrição das mudanças...",
    head: "feature/events",
    base: "main",
  });
  return result;
};
```

## Browser Tools

### 1. Monitoramento e Logs

```typescript
// Verificar logs do console
const checkConsoleLogs = async () => {
  const logs = await mcp_browser_tools_getConsoleLogs({
    random_string: "check-logs",
  });
  console.log("Console Logs:", logs);
};

// Verificar erros de rede
const checkNetworkErrors = async () => {
  const errors = await mcp_browser_tools_getNetworkErrors({
    random_string: "check-network",
  });
  console.log("Network Errors:", errors);
};
```

### 2. Auditoria e Performance

```typescript
// Auditoria de acessibilidade
const runAccessibilityAudit = async () => {
  const audit = await mcp_browser_tools_runAccessibilityAudit({
    random_string: "accessibility-check",
  });
  console.log("Accessibility Audit:", audit);
};

// Auditoria de performance
const runPerformanceAudit = async () => {
  const audit = await mcp_browser_tools_runPerformanceAudit({
    random_string: "performance-check",
  });
  console.log("Performance Audit:", audit);
};

// Auditoria SEO
const runSEOAudit = async () => {
  const audit = await mcp_browser_tools_runSEOAudit({
    random_string: "seo-check",
  });
  console.log("SEO Audit:", audit);
};
```

### 3. Debug e Desenvolvimento

```typescript
// Modo debugger
const runDebugger = async () => {
  await mcp_browser_tools_runDebuggerMode({
    random_string: "debug-mode",
  });
};

// Screenshot
const takeScreenshot = async () => {
  const screenshot = await mcp_browser_tools_takeScreenshot({
    random_string: "take-screenshot",
  });
  console.log("Screenshot taken:", screenshot);
};
```

## Melhores Práticas

1. **GitHub**

   - Use branches para features
   - Mantenha commits organizados
   - Documente PRs adequadamente
   - Use labels e milestones

2. **Browser Tools**

   - Monitore logs regularmente
   - Execute auditorias periodicamente
   - Mantenha screenshots de bugs
   - Use debugger para problemas complexos

3. **Workflow**
   - Integre ferramentas no CI/CD
   - Automatize tarefas repetitivas
   - Mantenha documentação atualizada
   - Siga padrões de código

## Exemplos de Uso

### 1. Fluxo de Desenvolvimento

```typescript
async function developmentFlow() {
  // 1. Criar branch para feature
  await mcp_github_create_branch({
    owner: "diegoizac",
    repo: "christianitatis",
    branch: "feature/new-feature",
  });

  // 2. Desenvolver e commitar mudanças
  await mcp_github_push_files({
    owner: "diegoizac",
    repo: "christianitatis",
    branch: "feature/new-feature",
    message: "feat: implementa nova funcionalidade",
    files: [
      /* arquivos modificados */
    ],
  });

  // 3. Executar auditorias
  await mcp_browser_tools_runAccessibilityAudit({
    random_string: "pre-pr-check",
  });

  await mcp_browser_tools_runPerformanceAudit({
    random_string: "pre-pr-check",
  });

  // 4. Criar PR
  await mcp_github_create_pull_request({
    owner: "diegoizac",
    repo: "christianitatis",
    title: "feat: nova funcionalidade",
    head: "feature/new-feature",
    base: "main",
  });
}
```

### 2. Debug de Problemas

```typescript
async function debugIssue() {
  // 1. Coletar informações
  const consoleLogs = await mcp_browser_tools_getConsoleLogs({
    random_string: "debug",
  });

  const networkErrors = await mcp_browser_tools_getNetworkErrors({
    random_string: "debug",
  });

  // 2. Tirar screenshot
  const screenshot = await mcp_browser_tools_takeScreenshot({
    random_string: "debug",
  });

  // 3. Criar issue com informações
  await mcp_github_create_issue({
    owner: "diegoizac",
    repo: "christianitatis",
    title: "Bug: problema identificado",
    body: `
      ## Logs
      ${JSON.stringify(consoleLogs, null, 2)}

      ## Network Errors
      ${JSON.stringify(networkErrors, null, 2)}

      ## Screenshot
      ${screenshot}
    `,
    labels: ["bug"],
  });
}
```

## Recursos Adicionais

- [GitHub REST API](https://docs.github.com/rest)
- [Browser DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Debugging Best Practices](https://developer.mozilla.org/docs/Web/Debugging)

## Exercícios Práticos

1. Configure fluxo de desenvolvimento completo
2. Implemente sistema de debug automatizado
3. Crie rotina de auditorias
4. Automatize criação de issues e PRs
