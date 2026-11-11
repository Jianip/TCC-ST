# Frontend independente — escopo definitivo

O desenvolvimento ativo é somente React, TypeScript, Vite e Tailwind. O backend Java gerado foi removido por solicitação do aluno.
Node/SQLite e SQL originais foram restaurados e preservados.
Este documento atualiza o estado descrito em `DIAGNOSTICO-ESCOPO.md`.

## Executar

Com Node.js 22.13 ou superior e npm, na pasta do projeto:

```bash
npm ci
npm run dev
```

Abrir http://localhost:5173. Não é necessário Java, Maven, PostgreSQL ou credenciais.
O modo demonstrativo é o padrão quando `VITE_MODO_API` está ausente. Se houver um
`.env.local` de integração, usar `VITE_MODO_API=mock npm run dev` para forçar os mocks.

`npm run server` inicia a autenticação Node original; não é necessário para o
frontend demonstrativo. `npm run dev:all` e `npm run test:backend` foram removidos.
Não há mais projeto Java, configuração de conexão PostgreSQL ou Flyway no repositório.

## Mocks e dados pessoais

- A entrada inicial abre um perfil fictício. Sair mostra os formulários de login
  e cadastro; também existe um botão para entrar sem credenciais.
- Login/cadastro são simulações de navegação: não autenticam, não verificam senha,
  não criam contas reais e não armazenam senha, matrícula digitada ou nascimento.
- Perfil, agenda, propostas, inscrições e objetos são exemplos editáveis locais.
- Clubes e campanhas usam os arquivos de referência já existentes em `src/dados`.
- Horários usam a grade existente; `????` é apresentado como `A confirmar` sem
  modificar o arquivo de dados do aluno. As datas de referência continuam em 2026.
- Dados demonstrativos usam somente a chave `portal-aluno:demo:v1` no localStorage.
  Chaves antigas não são lidas, migradas ou apagadas. O navegador precisa permitir
  armazenamento local; falhas são exibidas, sem confirmar gravações que falharam.
- A demonstração tem um único perfil local, não isolamento entre contas. Nada é
  enviado à escola, compartilhado entre dispositivos ou aprovado pela coordenação.

## Organização e futura API

`src/servicos/api.ts` mantém a função utilizada pelas telas. No modo padrão ela
carrega `src/servicos/mock.ts`, um adaptador local para a interface. Não há servidor
mock, conexão ao PostgreSQL, hashes de senha ou regras de autorização.

`src/servicos/portal.tsx` carrega perfil/catálogo e mostra o aviso de demonstração.
As páginas mantêm suas chamadas e componentes, sem duplicar telas por modo.

Quando sua própria API estiver pronta, criar `.env.local` (ignorado pelo Git):

```dotenv
VITE_MODO_API=real
```

Reiniciar Vite. As chamadas relativas `/api` serão encaminhadas pelo proxy já
existente em `vite.config.ts` para http://127.0.0.1:3001. Ajustar esse destino se sua
API usar outra porta. Esse proxy vale para desenvolvimento; em produção, configurar
o servidor de hospedagem para encaminhar `/api` e servir as rotas React.
Nunca colocar senhas de banco ou segredos em variáveis `VITE_*`, pois são públicas.
O modo real não volta silenciosamente para mocks quando a API falha.

Os caminhos abaixo são contratos provisórios herdados da integração anterior,
não uma exigência para sua implementação. Você pode alterar o cliente quando
projetar sua própria API:

| Telas/arquivos dependentes | Operações previstas |
| --- | --- |
| `portal.tsx`, `login.tsx`, `cabecalho.tsx` | sessão, login, cadastro, logout em `/auth/*` |
| início, horários, clubes, detalhes, inscrições e datas | leitura de `/catalogo` via contexto |
| `agenda.tsx` | listar/criar em `/agenda`; editar/excluir em `/agenda/:id` |
| `configuracoes.tsx` | atualizar `/perfil` |
| `propor-clube.tsx` | enviar `/propostas` |
| `inscricao-clube.tsx` | enviar `/inscricoes` |
| `achados-perdidos.tsx`, `informar-objeto.tsx` | listar/criar `/objetos`; situação/exclusão em `/objetos/:id` |

As respostas de lista são arrays JSON; sessão retorna `{ usuario }`; catálogo
retorna `{ clubes, grades, datas }`. Erros no cliente real usam `{ mensagem }`.
Os formatos consumidos podem ser estudados nas páginas e no adaptador demonstrativo.

## Testes exclusivamente de frontend

```bash
npx playwright install chromium
npm test
npm run build
```

`npm test` executa TypeScript e Playwright. Playwright inicia apenas Vite na porta
5178, força mocks, usa perfis descartáveis de navegador e bloqueia `/api/**`.
Nenhum teste de Java, SQLite ou PostgreSQL é chamado por esse comando.

## Remoção do backend gerado e preservação

Por solicitação explícita do aluno, foram removidos:

- `backend/`: nove classes Java, dois testes, `pom.xml`, `application.properties`,
  duas migrações Flyway e os artefatos de compilação em `target/`.
- `scripts/backend.sh` e `.env.example`, criados exclusivamente para Java/PostgreSQL.
- `server/legacy/README.md`, relativo à transição cancelada.
- Scripts npm `test:backend` e `dev:all`, além da regra `backend/target/` do gitignore.

Restaurados e comparados com os originais do Git:

- `server/auth.mjs` e `server/auth.test.mjs`: movidos de volta de `server/legacy/`,
  sem alterar o conteúdo original.
- `server/dev.mjs`: inicialização original de Node e Vite.
- Comandos npm `server` e `test:auth`: novamente apontam para os arquivos originais.
- `DOCS/BD/DDL.sql` e `DOCS/BD/DML.sql`: conteúdo original anterior à revisão.

Nenhum SQL foi executado nesta etapa. O banco `portal_aluno`, os arquivos SQLite
em `server/data/` e os dados do navegador não foram modificados. Nenhuma dependência
npm foi removida. Páginas, componentes, estilos, rotas, mocks, testes de frontend e
a edição do aluno em `src/dados/horarios.ts` foram preservados.

## Desenvolvimento pessoal do aluno

O aluno criará seu próprio projeto Java/Spring Boot, usando JDK e Maven ou Gradle,
e construirá o banco PostgreSQL manualmente pelo pgAdmin 4. Nenhum backend substituto
foi gerado. O adaptador HTTP em `src/servicos/api.ts` continua disponível para conectar
os contratos que o aluno decidir implementar.

Os SQL restaurados são material original de estudo, não scripts PostgreSQL prontos:
contêm `AUTO_INCREMENT`, vírgulas finais inválidas, referências sem FKs e inserts
com IDs fixos e senhas fictícias. Precisam de revisão conjunta antes de qualquer
execução manual. A proposta de relacionamentos permanece no diagnóstico histórico;
aquele documento descreve também código que já foi removido, não o estado atual.

O relatório npm audit da etapa anterior apontou Vite e source-map-js com
vulnerabilidades; a atualização dessas dependências permanece pendente. Não houve
novo audit ou atualização de versões nesta remoção.
