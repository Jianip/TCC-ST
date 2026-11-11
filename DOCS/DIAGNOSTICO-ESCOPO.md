> Registro histórico anterior à remoção autorizada do backend Java.
> O estado atual está em `FRONTEND-INDEPENDENTE.md`: Java removido, Node e SQL originais restaurados.

# Diagnóstico e interrupção da implementação — 28/10/2026

Este documento registra o estado após a mudança de escopo. Não é uma aprovação
para usar o backend gerado nem uma instrução para executar as migrações.
O aluno desenvolverá pessoalmente PostgreSQL e Spring Boot. Nenhuma implementação
adicional de backend foi feita após essa orientação.

## Estado anterior à revisão

- React, TypeScript, Vite e Tailwind, com páginas de início, horários, datas
  comemorativas, clubes, propostas, inscrições, agenda, achados e perdidos e perfil.
- API Node.js/SQLite com cadastro, login, consulta e revogação de sessão,
  hash scrypt, cookies HttpOnly e limitação de tentativas. As telas não a utilizavam.
- Agenda, perfil, propostas, inscrições e objetos usavam localStorage. Isso não
  equivalia a persistência compartilhada ou separação entre contas.
- Clubes e datas estavam em dados estáticos; cartões de clubes duplicavam os dados.
- Horários continham placeholders. A alteração não commitada em
  `src/dados/horarios.ts` já existia antes do trabalho e não foi editada pelo assistente.
- DDL usava AUTO_INCREMENT, vírgulas finais inválidas e não declarava os
  relacionamentos. O DML dependia de IDs fixos e incluía senhas fictícias.
- README vazio; configuração Vercel somente para frontend estático.

## Alterações já realizadas antes da mudança de escopo

### Backend gerado e preservado

Em `backend/src/main/java/br/edu/portal/`:

- `PortalApplication.java`: inicialização Spring Boot.
- `Inputs.java`: DTOs e validações.
- `PortalRepository.java`: acesso JDBC; não foram criadas entidades JPA.
- `AuthService.java`: contas, hashes PBKDF2, sessões e limite de tentativas.
- `AuthController.java`: endpoints de autenticação.
- `PortalController.java`: catálogo, perfil, agenda, propostas, inscrições e objetos.
- `ApiErrors.java`: tratamento de erros.
- `RequestProtection.java`: validação de origem, tipo e tamanho das requisições.
- `FrontendController.java`: encaminhamento de rotas para o frontend compilado.

Outros arquivos criados:

- `backend/pom.xml`: Spring Boot 3.5.7, Java 17, JDBC, PostgreSQL, validação e Flyway.
- `backend/src/main/resources/application.properties`: conexão por ambiente e Flyway.
- `backend/src/main/resources/db/migration/V1__portal.sql`: esquema gerado.
- `backend/src/main/resources/db/migration/V2__catalogo.sql`: dados de referência.
- `backend/src/test/java/br/edu/portal/PortalIntegrationTest.java`.
- `backend/src/test/java/br/edu/portal/AuthServiceTest.java`.
- `.env.example` e `scripts/backend.sh`.

Esses arquivos permanecem disponíveis para inspeção. A presença deles não torna
essa implementação obrigatória para o TCC. Iniciar essa aplicação pode executar
Flyway automaticamente no banco configurado: não usar os scripts de inicialização
para a etapa manual de modelagem no pgAdmin.

### Servidor anterior

`server/auth.mjs` e `server/auth.test.mjs` foram movidos para `server/legacy/`,
antes da mudança de escopo. Comparação SHA-256 confirmou conteúdo idêntico ao Git.
O arquivo SQLite real em `server/data/` não foi migrado, apagado nem alterado.
`server/legacy/README.md` foi acrescentado; sua referência a `DOCS/REVISAO.md`
ainda aponta para um documento que não chegou a ser criado.

`npm run server` agora aponta para `scripts/backend.sh`, e `server/dev.mjs`
também passou a iniciar Java. Portanto, preservar o código Node não significa
que os comandos originais tenham sido mantidos. Nenhum caminho foi restaurado
nesta etapa de diagnóstico.

### Frontend e configuração

- Criados `src/servicos/api.ts`, `src/servicos/portal.tsx` e `src/paginas/login.tsx`.
- `src/main.tsx` e `src/App.tsx`: contexto, sessão e proteção de rotas.
- `src/componentes/cabecalho.tsx`: perfil da sessão e logout.
- Páginas de agenda, perfil, propostas, inscrições e objetos: chamadas REST.
- Páginas de horários, início, clubes, detalhes e datas: leitura do catálogo da API.
- Cartões de clubes passaram a usar um componente repetido por dados, mantendo
  a estrutura visual; calendário inicial passou a mostrar o mês atual.
- Acrescentados tratamento de erros e validação de fotos no perfil.
- Removido `src/dados/perfil.ts`, que armazenava perfil demonstrativo local.
- Retiradas funções locais e exemplos de `src/dados/achados-perdidos.ts`.
- `vite.config.ts`: proxy /api para a porta 3001.
- `package.json`, lockfile e `.gitignore`: scripts, Playwright e saídas de testes.
- Criado `tests/portal.spec.mjs`.
- Removido `vercel.json`, porque a configuração anterior não servia a API Java.
- `DOCS/BD/DDL.sql` e `DML.sql` foram substituídos por uma proposta PostgreSQL
  correspondente ao backend gerado, não por uma simples correção do modelo antigo.

O frontend atual depende da API inclusive para carregar o catálogo na entrada.
Sem Java, não basta iniciar Vite para utilizar as telas. Isso conflita com o novo
objetivo de manter o frontend utilizável enquanto o aluno constrói o backend.
A próxima correção deve ser pontual e preservar uma cópia das integrações já feitas,
sem resetar o repositório ou sobrescrever o arquivo de horários do aluno.

## Banco: modelo a estudar e definir manualmente

Os SQL atuais são uma proposta interrompida, não o modelo definitivo. Antes de
executar qualquer DDL no pgAdmin, comparar com as tabelas reais de `portal_aluno`.
Não executar novamente CREATE TABLE sobre um esquema existente nem presumir que
CREATE TABLE IF NOT EXISTS atualize suas colunas e restrições.

| Tabela/conceito | Finalidade e relacionamentos |
| --- | --- |
| usuario | Identidade, matrícula, nome, e-mail e hash da senha; base dos dados pessoais. |
| turmas | Turmas e, se necessário, ano letivo e período. Uma turma tem vários alunos e horários. |
| aluno | Opcional: separa dados acadêmicos da conta. Se usada, usuario_id deve ser único e turma_id uma FK. Caso todas as contas sejam de alunos, esses campos podem ficar em usuario. |
| disciplinas | Cadastro único das disciplinas, caso se queira administrá-las e referenciá-las nos horários. Evita nomes divergentes. |
| horarios | Pertencem a uma turma; referenciam disciplina se houver esse cadastro. Definir dia, início/fim ou posição da aula e professor. |
| eventos | Datas e campanhas escolares. Definir data inicial/final, categoria e descrição para representar períodos e campanhas mensais. |
| agenda | Compromissos privados: usuario 1:N agenda. Inclui título, data, descrição e cor utilizada pela tela. |
| clubes | Catálogo: nome, categoria, descrição, atividades, responsável, encontros e local. |
| propostas | usuario 1:N propostas. Guarda a ideia antes de se tornar clube; eventual aprovação precisa de regra definida pelo aluno. |
| inscricoes | Relação N:N entre usuario e clubes. Impedir repetição do par usuario/clube; guardar as respostas do formulário. |
| achados_e_perdidos | usuario 1:N objetos publicados. Inclui categoria, local, data, descrição, retirada, foto e situação. Definir quem pode alterar. |
| sessao | Necessária somente se a autenticação escolhida persistir sessões no banco: usuario 1:N sessões, com expiração e token protegido. |

### Pontos do SQL gerado que ainda precisam de decisão

- `turmas` atualmente tem apenas o nome, sem ano/período do modelo original.
- `horarios` usa posição da aula e dia numérico; não guarda professor ou horas.
- `eventos` guarda ano, mês e texto; não representa datas de início/fim tipadas.
- `usuario` reúne matrícula e conta; não há tabela `aluno` nem vínculo da conta à turma.
- `disciplinas` não foi mantida como tabela independente.
- `clubes` inclui classes de cor e ícones do frontend: avaliar se isso pertence ao banco.
- Fotos estão propostas como texto/base64; armazenamento definitivo ainda deve ser escolhido.
- Propostas e inscrições não têm um fluxo de aprovação modelado.
- DML atual contém clubes, turmas e campanhas copiados das telas. Não cria contas,
  não importa SQLite e não preenche horários oficiais.

Para a construção manual, estudar PKs, FKs, NOT NULL, UNIQUE, CHECK e índices nas
FKs/filtros. Preferir IDs gerados pelo PostgreSQL e inserir referências por chaves
conhecidas, evitando presumir que um aluno ou uma turma terá um ID fixo.
Senhas nunca devem ser inseridas em texto puro nem como '********'.

## O que o aluno desenvolverá no backend

1. Configuração Java/Spring Boot e conexão ao PostgreSQL por variáveis de ambiente.
2. Mapeamento do modelo aprovado, escolhendo JDBC ou JPA conscientemente.
3. Repositórios e serviços para uma funcionalidade por vez.
4. DTOs, validação, tratamento de erros e contratos REST.
5. Cadastro/login, hashes de senha, sessão, logout e proteção de requisições.
6. Autorização: dados pessoais somente do titular; regras para objetos e clubes.
7. Integração gradual com React e testes de persistência/isolamento entre contas.
8. Somente depois, planejamento da transição do Node/SQLite e dos dados locais.

Ainda precisam de definição: comprovação da matrícula, recuperação de senha,
perfis administrativos, aprovação de propostas/inscrições e publicação.
Nada disso deve ser considerado implementado por existir uma tela.

## Verificações já realizadas antes da pausa

- Build React/TypeScript: passou antes e depois das principais alterações.
- Teste original Node/SQLite: passou, usando banco temporário.
- Seis testes Java de integração: passaram em PostgreSQL temporário, incluindo
  autenticação, CRUD da agenda, perfil, inscrições/propostas e autorização de objetos.
- Script temporário Chromium: passou em cadastro, agenda após recarga, perfil,
  inscrição, proposta, objeto/situação, catálogos, logout e proteção de rotas.
- O arquivo de teste Playwright salvo no repositório é uma adaptação desse script
  e ainda não foi executado como suíte.
- `AuthServiceTest.java` e `FrontendController.java` foram acrescentados depois
  da rodada de testes Java; não houve validação final desses acréscimos.
- npm audit informou duas dependências com vulnerabilidades altas: Vite e
  source-map-js. Correções ainda não aplicadas; não houve npm audit fix.
- Não houve commit, push ou publicação.

O PostgreSQL utilizado nos testes foi criado em `/tmp/portal-pg-review`, porta
55439, banco `postgres`. Houve execução de SQL e criação de registros fictícios
nesse ambiente antes da mudança de escopo. O banco `portal_aluno` do aluno não foi
acessado. Não houve transferência de contas SQLite ou dados de localStorage.

## Próximo passo compatível com o novo escopo

Apresentar este diagnóstico antes de novas alterações. Depois, ajustar de forma
seletiva os scripts e a dependência do frontend, preservando os arquivos gerados;
revisar o modelo relacional com o aluno e preparar SQL explicável para execução
manual no pgAdmin. Não continuar a implementação Java automaticamente.
