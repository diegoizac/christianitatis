# Regras para codificação de qualidade

## Estrutura e organização do código

- **Mantenha o código DRY (Don't Repeat Yourself - Não Se Repita)**
  - Extraia lógica repetida em funções reutilizáveis
  - Crie funções utilitárias para operações comuns (validação, formatação, etc.)
  - Use componentes compartilhados para padrões de UI que aparecem várias vezes

- **Divida arquivos grandes**
  - Utilize SOLID para escrita de código, especialmente em Single Responsability e Open-Closed Principle
  - Divida arquivos maiores que 300-400 linhas em módulos menores
  - Separe as responsabilidades: busca de dados, lógica de negócios, renderização de UI
  - Crie componentes focados que fazem uma coisa bem

- **Use organização lógica de arquivos**
  - Agrupe arquivos relacionados por recurso ou domínio
  - Crie diretórios separados para componentes, utilitários, serviços, etc.
  - Siga convenções de nomenclatura consistentes em todo o projeto

## Práticas de segurança

- **Validação e sanitização de entrada**
  - Valide todas as entradas do usuário tanto no cliente quanto no servidor
  - Use consultas parametrizadas para operações de banco de dados
  - Sanitize quaisquer dados antes de renderizá-los para evitar ataques XSS

- **Autenticação e autorização**
  - Proteja rotas sensíveis com middleware de autenticação
  - Implemente verificações adequadas de autorização para acesso a dados
  - Use permissões baseadas em funções para diferentes tipos de usuários

- **Segurança de API**
  - Implemente limitação de taxa em endpoints de autenticação
  - Configure cabeçalhos HTTP seguros (CORS, Content-Security-Policy)
  - Pergunte se o cabeçalho CORS terá origem definida ou insegura com *
  - Use HTTPS para todas as conexões

- **Gerenciamento de segredos**
  - Nunca inclua segredos ou credenciais diretamente no código-fonte
  - Armazene valores sensíveis em variáveis de ambiente
  - Use serviços de gerenciamento de segredos para ambientes de produção
  - Crie arquivos .env para dev, homolog e prod com a seguinte nomenclatura: .env-dev, .env-homolog, .env-prod. De acordo com o padrão da linguagem adotada para desenvolvimento
  - Atribua as variáveis de ambiente criadas nestes arquivos 

## Tratamento de erros

- **Implemente tratamento abrangente de erros**
  - Capture e trate diferentes tipos de erros de forma específica
  - Registre erros com contexto suficiente para depuração
  - Apresente mensagens de erro amigáveis na interface do usuário

- **Trate operações assíncronas adequadamente**
  - Use blocos try/catch com async/await
  - Trate falhas de rede com elegância
  - Construa prevenção de timeout e retry para casos de resiliência de dados
  - Implemente estados de carregamento para melhor experiência do usuário

## Otimização de desempenho

- **Minimize operações caras**
  - Armazene em cache resultados de cálculos custosos
  - Use memorização para funções puras
  - Implemente paginação para grandes conjuntos de dados

- **Evite vazamentos de memória**
  - Limpe event listeners e inscrições
  - Cancele requisições pendentes quando componentes são desmontados
  - Limpe intervalos e timeouts quando não forem mais necessários

- **Otimize a renderização**
  - Evite re-renderizações desnecessárias
  - Use virtualização para listas longas
  - Implemente divisão de código e carregamento preguiçoso (lazy loading)

## Melhores práticas de banco de dados

- **Use transações para operações relacionadas**
  - Agrupe operações de banco de dados relacionadas em transações
  - Garanta consistência de dados em múltiplas operações
  - Implemente mecanismos adequados de rollback

- **Otimize consultas**
  - Crie índices para campos frequentemente consultados
  - Selecione apenas os campos necessários
  - Use paginação de consulta ao buscar grandes conjuntos de dados

- **Trate conexões de banco de dados adequadamente**
  - Use pools de conexão
  - Feche conexões quando as operações são concluídas
  - Implemente mecanismos de retry para falhas transitórias

## Design de API

- **Siga princípios RESTful**
  - Use verbos HTTP apropriados (GET, POST, PUT, DELETE)
  - Use verbos HTTP específicos quando forem necessários (PATCH, OPTIONS, HEAD) 
  - Retorne formatos de resposta consistentes
  - Use códigos de status HTTP significativos, especialmente com a seguinte tabela de retorno:
      2XX - SUCCESS (todos as respostas Rest que retornarem corretamente a requisição)
      3XX - REDIRECT (Redirecionamento intencional)
      4XX - CLIENT ERROR (Retorno de erros do browser, como bad request, Unauthorized e demais mensagens retornadas por programação)
      5XX - SERVER ERRORS (Retorno de erros do servidor)
      * Onde XX é o numero retornado do erro específico

- **Projete endpoints claros**
  - Organize endpoints por recurso
  - Versione sua API
  - Documente todos os endpoints com exemplos

- **Implemente respostas de erro adequadas**
  - Retorne objetos de erro estruturados
  - Inclua códigos de erro e mensagens úteis
  - Mantenha logs detalhados de erros da API

## Manutenabilidade

- **Use nomenclatura clara**
  - Escolha nomes descritivos para variáveis, funções e classes
  - Evite abreviações e nomes enigmáticos
  - Use padrões de nomenclatura consistentes em todo o código

- **Adicione documentação**
  - Documente funções complexas com descrições claras
  - Explique o "porquê" e não apenas o "o quê"
  - Mantenha a documentação atualizada quando o código muda

- **Escreva testes**
  - Cubra lógica de negócios crítica com testes unitários
  - Escreva testes de integração para fluxos importantes
  - Implemente testes end-to-end para jornadas críticas do usuário

## Específico para frontend

- **Implemente validação de formulários**
  - Valide entrada à medida que os usuários digitam
  - Forneça mensagens de erro claras
  - Trate erros de envio de formulário com elegância

- **Use gerenciamento de estado adequado**
  - Escolha gerenciamento de estado apropriado para a complexidade do seu aplicativo
  - Evite prop drilling através de muitos níveis de componentes
  - Mantenha o estado o mais próximo possível de onde é necessário

- **Garanta acessibilidade**
  - Use elementos HTML semânticos
  - Adicione atributos ARIA adequados para elementos complexos
  - Garanta navegabilidade por teclado
  - Mantenha contraste de cor suficiente

## Vulnerabilidades de segurança a prevenir

- **Injeção SQL/NoSQL**
  - Nunca concatene diretamente entrada do usuário em consultas
  - Use consultas parametrizadas ou métodos ORM
  - Atribua para as consultas parametrizadas, dependendo da linguagem, a concatenação correta, por exemplo: 
          C#: string strSQL = $"SELECT {1}, {2}, ... FROM {tablename}" para concatenar SQL em modo de interpolação de strings
          JavaScript: const strSQL = 'SELECT ?, ?, ... FROM ?" para concatenar em modo de integração javascript, especialmente NodeJS
          PHP: $strSQL = "SELECT :campo1, :campo2, ... FROM :tablename" para concatenar em modo PDO do PHP

- **Cross-site scripting (XSS)**
  - Sanitize a entrada do usuário antes de exibi-la
  - Use mecanismos de proteção integrados dos frameworks

- **Cross-site request forgery (CSRF)**
  - Implemente tokens anti-CSRF
  - Valide origens de requisição

- **Autenticação quebrada**
  - Implemente gerenciamento adequado de sessão
  - Use hash seguro de senha
  - Imponha políticas de senha forte
