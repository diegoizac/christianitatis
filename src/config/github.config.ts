export const githubConfig = {
  owner: "diegoizac",
  repo: "christianitatis-app",
  defaultBranch: "main",
  issueLabels: {
    bug: "bug",
    feature: "enhancement",
    documentation: "documentation",
    security: "security",
  },
  prTemplate: `
## Descrição
[Descreva as alterações feitas neste PR]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Build passa localmente
- [ ] Lint passa sem erros
  `,
};
