# Guia para entender e apresentar o projeto

Portal do Aluno — Escola Estadual Sanico Teles

Preparado em 22 de outubro de 2026, com base nos arquivos atuais do projeto. Se o código mudar, algumas explicações precisarão ser atualizadas.

## 1. Como estudar este documento

Você não precisa decorar todas as linhas. Precisa conseguir explicar o que cada parte faz, de onde vêm os dados e o que acontece quando alguém clica em um botão.

Leia primeiro as partes 2 a 5. Depois abra uma página no editor e estude a explicação dela. Por último, pratique as perguntas da banca sem olhar as respostas.

As falas sugeridas são exemplos para você adaptar. Use apenas as explicações que entender e conseguir demonstrar.

## 2. O que é o projeto

O projeto é um portal escolar que reúne horários, agenda, informações sobre clubes, datas comemorativas e achados e perdidos. Também possui cadastro, login, configurações de perfil e modo escuro.

Uma forma de apresentar:

> “Meu projeto reúne informações e ferramentas da rotina escolar em um único portal. O aluno pode consultar horários e clubes, organizar compromissos e registrar objetos encontrados.”

Há duas formas de execução:

- **Normal:** o cadastro e o login dependem de um servidor e de um banco SQLite.
- **Demonstração:** o portal abre com um usuário de exemplo. Não cria contas nem verifica senhas.

O projeto mistura funcionalidades com armazenamento local, conteúdo cadastrado no código e autenticação no servidor. Não diga que todas as páginas já estão conectadas a um banco central.

## 3. As tecnologias, em palavras simples

- **HTML e JSX:** descrevem o que aparece na tela: títulos, campos, tabelas, botões e divisões. JSX parece HTML, mas fica dentro do código React.
- **CSS e Tailwind CSS:** cuidam de cores, tamanhos, espaçamentos e adaptação da tela. Tailwind fornece classes como `p-4`, `text-center` e `bg-blue-700`.
- **JavaScript:** executa as ações, como buscar, salvar, comparar valores e responder a cliques.
- **TypeScript:** acrescenta tipos ao JavaScript. Ajuda a encontrar, antes da execução, usos incompatíveis dos dados. Não substitui a validação dos formulários nem dos dados recebidos pelo servidor.
- **React:** organiza a interface em componentes e atualiza a tela quando os estados mudam.
- **React Router:** relaciona os endereços às páginas e permite navegar entre elas.
- **Vite:** executa o ambiente de desenvolvimento e prepara os arquivos para publicação.
- **Node.js:** executa o JavaScript do servidor, fora do navegador.
- **SQLite:** guarda as contas e sessões de login em um arquivo no servidor.

`.ts` normalmente contém dados e lógica. `.tsx` permite escrever também JSX. Os arquivos `.mjs` do servidor usam JavaScript com módulos.

## 4. Onde fica cada parte

- `index.html`: contém a divisão `root`, onde o React coloca a aplicação.
- `src/main.tsx`: inicia o React, carrega o CSS e envolve a aplicação no `BrowserRouter`.
- `src/App.tsx`: verifica a sessão, controla o usuário e o tema e define as rotas.
- `src/componentes/cabecalho.tsx`: cabeçalho compartilhado entre as páginas do portal.
- `src/paginas/`: telas e ações de cada área.
- `src/dados/`: listas, tipos e funções usadas pelas páginas.
- `src/index.css`: importa Tailwind e define os estilos do modo escuro.
- `public/imagens/`: imagens locais usadas pela interface.
- `server/auth.mjs`: servidor de cadastro, login, sessão e saída.
- `server/auth.test.mjs`: teste automatizado da autenticação.
- `server/dev.mjs`: inicia o servidor de autenticação e o Vite durante o desenvolvimento.
- `DOCS/BD/DDL.sql` e `DML.sql`: proposta de estrutura de banco e registros de exemplo. Não são o banco usado automaticamente pela aplicação.
- `package.json`: dependências e comandos do projeto.
- `package-lock.json`: registra as versões resolvidas das dependências.
- `tsconfig.json`: regras de verificação do TypeScript.
- `vite.config.ts`: configura React, Tailwind e o encaminhamento das chamadas da API.
- `vercel.json`: configura a publicação da demonstração.
- `dist/`: arquivos gerados pelo build. As alterações da aplicação devem ser feitas no código-fonte.

O `StrictMode`, em `main.tsx`, ajuda a detectar problemas durante o desenvolvimento. Ele pode executar verificações extras; não é uma segunda página da aplicação.

## 5. O caminho do sistema ao abrir

```text
index.html
    ↓
main.tsx inicia o React
    ↓
App.tsx verifica a sessão
    ↓
Sem usuário: mostra o login
Com usuário: permite as páginas do portal
```

Na execução normal, `verificarSessao()` chama `autenticar("session")`. O navegador faz uma requisição ao servidor, que confere o cookie e consulta a sessão no banco.

Enquanto espera, a tela informa que está verificando a sessão. Se houver falha de comunicação, aparece uma mensagem com a opção de tentar novamente.

No modo de demonstração, o `App` usa o usuário de exemplo e não faz essa verificação no servidor.

Uma fala possível:

> “O App é o ponto que organiza a navegação. Primeiro ele verifica quem está usando o sistema e depois escolhe quais páginas podem ser exibidas.”

## 6. As pequenas peças da lógica

### Variáveis, tipos e listas

```tsx
const nome = "Aluno";
let horarioSaida = "13h05";
```

`const` impede reatribuir a variável. `let` permite reatribuir. Um objeto ou uma lista declarada com `const` ainda pode ter seu conteúdo alterado; `const` não congela os dados.

`string` é texto, `number` é número e `boolean` é verdadeiro ou falso. `null` indica que não há um valor naquele momento.

Um objeto junta informações do mesmo item. Uma lista reúne vários itens. Em `grades`, cada objeto representa uma turma, e a lista `aulas` organiza as disciplinas.

### Função e return

Uma função reúne instruções para executar uma tarefa. Ela pode receber informações e devolver um resultado.

```tsx
const marco = mostrarDatas("Março");
```

Leia assim: “Peça à função as datas de março e guarde o resultado em `marco`.” O `return` entrega esse resultado e encerra aquela execução da função.

### if, comparação e operadores

```tsx
if (data.mes !== mes) {
  continue;
}
```

Leia assim: “Se o mês dessa data for diferente do mês pedido, pule para a próxima data.”

- `=` atribui um valor.
- `===` compara se os valores são iguais.
- `!==` compara se são diferentes.
- `&&` significa “e”: as condições precisam ser verdadeiras.
- `||` significa “ou”: basta uma das condições ser verdadeira.
- `!` inverte verdadeiro e falso.
- `continue` pula para a próxima repetição do laço; não encerra a função inteira.

### Estado: useState

```tsx
const [busca, setBusca] = useState("");
```

`busca` guarda o texto atual. `setBusca` altera esse texto e pede ao React uma nova renderização. `""` é o valor inicial: texto vazio.

Uma variável comum não substitui o estado quando a mudança precisa aparecer na tela.

### O que acontece ao digitar

```tsx
onChange={(evento) => setBusca(evento.target.value)}
```

Quando o campo muda, `evento.target.value` fornece o texto digitado. `setBusca` guarda o texto. O componente roda novamente e calcula quais resultados devem aparecer.

`onClick` responde ao clique. `onSubmit` responde ao envio do formulário. `preventDefault()` impede o comportamento padrão do envio, que normalmente recarregaria ou navegaria a página.

### Repetição e operações de lista

- `for`: percorre os itens e executa as instruções para cada um.
- `push`: coloca um item no final de uma lista.
- `map`: cria uma nova lista a partir da anterior. Na interface, costuma transformar dados em elementos de tela.
- `filter`: cria uma lista apenas com os itens que passam na condição.
- `find`: procura o primeiro item que combina. Se não encontrar, devolve `undefined`.
- `length`: informa a quantidade de itens.
- `includes`: verifica se um texto ou uma lista contém determinado valor.

`key` identifica os elementos de uma lista para o React acompanhar as atualizações. Não é um botão e não é exibido ao usuário.

### Texto, cópia e JSON

`toLowerCase()` coloca o texto em minúsculas para comparar “CORAL” com “coral”. `trim()` remove espaços nas pontas. `split("-")` separa um texto pelas ocorrências do hífen.

`[...compromissos]` cria outra lista com os mesmos elementos. `{ ...item }` cria uma cópia superficial do objeto. Isso permite preparar uma atualização sem alterar diretamente a estrutura anterior do estado.

`JSON.stringify` transforma dados em texto. `JSON.parse` transforma esse texto de volta em dados. Isso é usado porque o `localStorage` guarda texto.

### Outros símbolos que aparecem

- `condicao ? valorA : valorB`: escolhe um valor conforme a condição; é uma forma curta de `if/else`.
- `usuario?.nome`: tenta acessar o nome somente se o usuário existir.
- `valor ?? ""`: usa texto vazio se o valor for `null` ou `undefined`.
- `type`: descreve o formato esperado de um dado.
- `as`: informa ao TypeScript como interpretar um tipo; não verifica sozinho se os dados estão corretos.
- `import` traz algo de outro arquivo; `export` permite que outro arquivo o use.
- `Record<string, string>` descreve um objeto com nomes e valores de texto, usado nos dados do formulário de login.

## 7. Login, cadastro e sessão

Arquivos: `paginas/login.tsx`, `dados/autenticacao.ts`, `App.tsx` e `server/auth.mjs`.

O formulário alterna entre entrar e criar conta. No cadastro, a interface confere se senha e confirmação são iguais. `enviando` evita enviar o mesmo formulário repetidamente enquanto aguarda a resposta.

```text
Aluno preenche o formulário
    ↓
login.tsx lê os campos com FormData
    ↓
autenticar envia os dados com fetch
    ↓
server/auth.mjs valida e consulta o SQLite
    ↓
Servidor devolve o usuário e define um cookie de sessão
    ↓
App atualiza o usuário e abre o início
```

`fetch` é a chamada do navegador ao servidor. API é o conjunto de endereços que recebe essas chamadas. O projeto usa:

- `GET /api/auth/session`: consulta a sessão atual.
- `POST /api/auth/register`: cria a conta.
- `POST /api/auth/login`: verifica matrícula e senha.
- `POST /api/auth/logout`: encerra a sessão.

`async` indica uma função que trabalha com resultado assíncrono. `await` aguarda uma operação, como a resposta da API. `try` tenta executar, `catch` trata uma falha e `finally` executa a finalização, mesmo que tenha ocorrido erro.

No servidor, a matrícula deve ser numérica; a senha deve ter entre 8 e 128 caracteres. O cadastro também verifica nome, e-mail e data de nascimento. A validação no servidor é necessária porque alguém pode chamar a API sem passar pelo formulário.

A senha não é guardada como foi digitada. O servidor usa `scrypt` e um valor aleatório chamado `salt` para gerar um hash. No login, calcula novamente e compara. Hash não é uma senha “escondida” para depois ser descriptografada.

A sessão tem um identificador aleatório. O navegador recebe esse identificador em um cookie; o banco guarda seu hash. A validade configurada é de sete dias. Ao sair, a sessão é removida e o cookie é encerrado.

O cookie tem `HttpOnly`, para não ficar disponível ao JavaScript da página, e `SameSite=Lax`. Em produção, também recebe `Secure`. Há verificações de origem e limite de tentativas. Essas medidas não significam que o projeto inteiro passou por uma auditoria de segurança.

Uma fala possível:

> “O login é verificado no servidor. Ele não compara a senha com uma lista no navegador. O banco guarda um hash da senha, e a sessão permite reconhecer o usuário nas próximas requisições.”

## 8. Navegação e cabeçalho

Arquivos: `App.tsx` e `componentes/cabecalho.tsx`.

`Routes` reúne as rotas. Cada `Route` relaciona um endereço a uma página. `Link` permite navegar e `NavLink` também identifica o link ativo, que fica sublinhado.

`useNavigate` permite mudar de página depois de uma ação, como concluir o login. `Navigate` faz um redirecionamento na renderização. O endereço antigo `/eventos` redireciona para `/datas-comemorativas`.

`/clubes/:clube` é uma rota com uma parte variável. Em `/clubes/robotica`, o valor dessa parte é `robotica`.

O cabeçalho é reutilizado por meio de `<Cabecalho />`. Uma alteração nele atende às páginas que o utilizam, sem copiar o menu em cada arquivo.

## 9. Página inicial e horários

Arquivos: `paginas/inicio.tsx`, `paginas/horarios.tsx` e `dados/horarios.ts`.

A turma escolhida fica no estado e no `localStorage`, com a chave `turma-horarios`. Ao abrir a página, `carregarTurma()` tenta recuperar essa escolha. Se ela não corresponder a uma turma existente, usa a primeira grade.

Um `for` procura a grade cujo nome é igual ao da turma escolhida.

```tsx
grade.aulas[numero][coluna].disciplina
```

A primeira posição escolhe o horário da aula. A segunda escolhe o dia da semana. Os índices começam em zero: a primeira linha é `0` e segunda-feira é a coluna `0`.

Em Horários, `mostrarAulas(numero)` transforma as cinco disciplinas daquele horário em células da tabela. Turmas cujo nome contém “Técnico” recebem as linhas extras da tarde e o intervalo de almoço.

Na página inicial, o sistema mostra as três primeiras aulas do dia. No sábado e no domingo, usa a coluna de segunda-feira.

Limitações para explicar: a grade é demonstrativa. O pequeno calendário da página inicial é fixo em julho de 2026; ele não lê os compromissos da Agenda. O título “Disciplina e professor” não significa que já exista cadastro de professores nessa grade: os dados atuais contêm a disciplina.

## 10. Agenda escolar

Arquivo: `paginas/agenda.tsx`.

Cada compromisso possui ID, título, data, descrição e cor. `idEditando` decide se o formulário vai criar um compromisso ou alterar um existente.

Ao salvar:

1. Impede o envio padrão do formulário.
2. Copia a lista de compromissos.
3. Se `idEditando` é `null`, cria um item com ID baseado em `Date.now()`.
4. Caso contrário, procura o ID e substitui os dados daquele item.
5. Atualiza o estado e salva a lista em `localStorage`.
6. Vai ao mês da data escolhida, limpa campos e fecha o formulário.

Ao excluir, `filter` mantém todos os itens cujo ID é diferente do escolhido. Ao editar, os dados do compromisso são colocados nos campos do formulário.

`Date.now()` usa o instante atual em milissegundos. É uma solução simples de identificação neste protótipo, não uma garantia absoluta contra colisões.

Para montar o calendário, o código calcula o dia da semana em que o mês começa e a quantidade de dias. `getMonth()` começa em zero, por isso várias operações somam ou subtraem 1.

`itensDoDia()` seleciona os compromissos daquela data. `mostrarLembretes()` cria os textos coloridos. `corDoTexto()` estima o brilho da cor de fundo e escolhe texto claro ou escuro.

A chave `agenda-escolar` é compartilhada no mesmo navegador e origem; não inclui a matrícula. A agenda ainda não é sincronizada com o servidor nem isolada por conta nesse armazenamento.

## 11. Datas comemorativas

Arquivos: `paginas/datas-comemorativas.tsx` e `dados/datas-comemorativas.ts`.

Cada registro contém mês, texto e categoria. Os dados estão escritos no arquivo; não vêm de uma API.

A função `mostrarDatas(mes)` funciona assim:

1. Cria uma lista vazia para o resultado.
2. Percorre as datas com `for`.
3. Se o mês for diferente, usa `continue` para pular a data.
4. Se há uma categoria selecionada e ela não combina, pula a data.
5. Monta um texto com o mês e a descrição e procura o que foi digitado.
6. Se a busca não combinar, pula a data.
7. Adiciona um parágrafo à lista usando `push`.
8. Devolve a lista com `return`.

```tsx
const marco = mostrarDatas("Março");
```

A página coloca esse resultado dentro do cartão de março. `marco.length > 0` decide se há algo para mostrar. Junho e julho dividem um cartão.

A busca aceita maiúsculas e minúsculas porque usa `toLowerCase`. Continua distinguindo acentos. Ela procura um trecho do texto: não verifica se o usuário escreveu uma palavra inteira nem corrige erros de digitação.

Uma fala possível:

> “A função percorre as datas cadastradas e descarta as que não correspondem ao mês, à categoria ou à pesquisa. As que passam nessas verificações aparecem no cartão.”

## 12. Clubes e detalhes

Arquivos: `paginas/clubes.tsx`, `paginas/detalhes-clube.tsx` e `dados/clubes.ts`.

Os cards da página Clubes estão escritos diretamente em JSX. Cada clube possui seu bloco de imagem, título, informações e links. A função `mostrarClube` verifica a busca e a categoria e devolve verdadeiro ou falso para decidir se o bloco aparece.

```tsx
const encontrouTexto = texto.toLowerCase().includes(busca.toLowerCase());
```

Essa linha compara o texto do clube com a pesquisa sem diferenciar letras maiúsculas e minúsculas. Ela ainda diferencia acentos.

A página de detalhes usa outra abordagem: `useParams()` lê o identificador no endereço, e `buscarClube()` procura o primeiro registro com aquele ID na lista de dados. Se não existir, mostra “Clube não encontrado”.

`clube ?? ""` fornece texto vazio caso o parâmetro não exista.

Há conteúdo repetido entre os cards e `dados/clubes.ts`. Por isso, mudar um texto no card não atualiza automaticamente os detalhes. Essa é uma limitação de manutenção da estrutura atual.

O link “Como participar” leva às orientações. Não existe, neste código, um cadastro de inscrição em clubes. As imagens são ilustrativas e externas; os cards têm um ícone como alternativa se a foto falhar.

## 13. Achados e perdidos

Arquivos: `paginas/achados-perdidos.tsx` e `dados/achados-perdidos.ts`.

Cada objeto tem ID, nome, categoria, local, data, descrição, informação de retirada, foto e indicador `devolvido`.

`carregarObjetos()` lê os dados do navegador. Se ainda não existe uma lista salva, usa três exemplos. Se existe uma lista vazia válida, mantém a lista vazia. Se os dados salvos estão inválidos, informa o erro, em vez de sobrescrever tudo silenciosamente.

`filtrarObjetos()` filtra por texto, categoria, local, data e situação. Depois ordena os objetos da data mais recente para a mais antiga.

Aqui, a busca também remove acentos usando `normalize` e `replace`. Isso é diferente da busca atual de Clubes e Datas Comemorativas. A expressão com barras é uma expressão regular: um padrão para reconhecer caracteres, não um comentário.

Ao excluir um objeto, o código monta uma nova lista sem o ID escolhido e salva. Se o local selecionado deixou de existir na lista, limpa esse filtro.

Ao alterar a situação, copia o objeto e inverte `devolvido`: falso vira verdadeiro e verdadeiro vira falso. Salva a lista e mostra uma mensagem.

`useLocation()` permite ler a informação de que o formulário acabou de cadastrar um objeto, para exibir a mensagem de sucesso.

## 14. Formulário para informar um objeto

Arquivo: `paginas/informar-objeto.tsx`.

`FormData` lê os campos do formulário. A função `lerCampo` transforma cada valor em texto e remove espaços nas pontas.

Antes de salvar, o código verifica campos obrigatórios, categoria permitida e data válida que não esteja no futuro. `dataValida()` verifica o formato e também se a data existe de verdade.

A foto é opcional. Quando escolhida, deve ser JPG, PNG ou WebP de até 2 MB. `FileReader` lê o arquivo e produz uma representação de texto da imagem, usada na prévia e no armazenamento local. Isso não é um envio da foto a um servidor.

O cadastro espera a leitura da foto terminar. Depois cria um ID com `crypto.randomUUID()`, coloca o objeto no início da lista e salva. Se funcionar, navega para Achados e Perdidos. Se o armazenamento falhar, exibe uma mensagem.

A representação da imagem pode ocupar mais espaço do que o arquivo original. O navegador tem limite de armazenamento, por isso salvar uma foto pode falhar mesmo com validação de tamanho.

## 15. Perfil, configurações e modo escuro

Arquivos: `dados/perfil.ts`, `paginas/configuracoes.tsx`, `App.tsx` e `index.css`.

`definirUsuarioPerfil()` guarda em memória qual usuário está ativo. `pegarPerfil()` combina os dados padrão com uma personalização salva no navegador.

A chave do perfil inclui a matrícula: `perfil-escolar:matricula`. Assim, as personalizações podem ser separadas por conta no mesmo navegador. Isso não transforma o armazenamento local em um banco seguro ou sincronizado.

Salvar nome, e-mail e foto nas configurações altera o perfil local. Não atualiza o cadastro de autenticação no SQLite. A foto do perfil também usa `FileReader`; o formulário atual não possui as mesmas verificações explícitas de tamanho e formato de Informar Objeto.

`modoEscuro` fica no `App`. A tela de configurações recebe esse valor e as funções `mudarTema` e `sair` por propriedades, chamadas de props.

Ao mudar o tema, o `App` altera o estado e salva a preferência na chave `tema`. A classe `modo-escuro` ativa as regras do CSS para fundos, textos, campos e outras partes da interface.

## 16. Onde os dados ficam guardados

- **Contas e sessões:** SQLite no servidor, normalmente em `server/data/portal.sqlite`.
- **Agenda:** `localStorage`, chave `agenda-escolar`.
- **Achados e perdidos:** `localStorage`, chave `achados-perdidos-escolar-v1`.
- **Perfil personalizado:** `localStorage`, com matrícula na chave.
- **Tema:** `localStorage`, chave `tema`.
- **Turma selecionada:** `localStorage`, chave `turma-horarios`.
- **Horários, datas comemorativas e dados dos clubes:** arquivos do projeto; alguns textos de clubes também estão diretamente nos cards.

O `localStorage` pertence ao navegador e à origem do site. Um endereço, protocolo ou porta diferente pode ter outro armazenamento. Limpar os dados do navegador pode apagar essas informações. Elas não aparecem automaticamente em outro computador.

Agenda, achados e perdidos, tema e turma não usam uma chave por matrícula. Trocar de conta no mesmo navegador não garante separar essas informações.

Uma fala possível:

> “Implementei a persistência de contas no servidor e a persistência local de algumas funcionalidades. A centralização da agenda e dos objetos em um banco compartilhado é uma próxima etapa.”

## 17. Banco documentado e banco realmente utilizado

`DOCS/BD/DDL.sql` descreve tabelas escolares. DDL trata da estrutura, como `CREATE TABLE`. `DML.sql` contém inserções de exemplo, com `INSERT INTO`.

Esses scripts não são executados pelo fluxo atual do servidor. O servidor cria suas próprias tabelas `users` e `sessions` usando SQLite.

O DDL documentado usa `AUTO_INCREMENT`, uma sintaxe típica de MySQL, e contém vírgulas finais em algumas tabelas. Também não declara as relações por meio de `FOREIGN KEY`. Portanto, não o apresente como um script SQLite pronto e validado.

Um ID identifica um registro. Uma chave primária garante a identificação dentro da tabela. Uma chave estrangeira pode estabelecer e validar a relação entre tabelas; ter uma coluna chamada `usuario_id` não cria essa regra sozinho.

O servidor utiliza consultas preparadas com `?`, passando valores separadamente para as operações com dados do usuário. Isso evita montar essas consultas concatenando o conteúdo digitado.

Não alterei os scripts do banco para preparar este documento. Esta seção descreve a situação encontrada.

## 18. Aparência, celular e acessibilidade

`className` aplica classes de estilo no JSX. `grid` organiza em grade, `flex` organiza elementos flexíveis, `gap` separa elementos e `p` aplica espaço interno.

Classes como `sm:grid-cols-2` aplicam uma regra a partir de determinada largura. Assim os cards podem ficar em uma coluna no celular e em duas em telas maiores.

O projeto usa recursos como `label`, texto alternativo de imagem, `aria-label`, `aria-pressed` e `role="status"`. Eles ajudam a identificar campos, botões e mensagens, inclusive para tecnologias assistivas. A presença desses recursos não comprova acessibilidade completa de todas as páginas.

## 19. Executar, publicar e verificar

Os comandos ficam em `package.json`:

```sh
npm install
npm run dev
```

O primeiro instala as dependências. O segundo inicia Vite e API local. A API usa a porta 3001 por padrão; abra o endereço do frontend informado pelo Vite no terminal.

```sh
npm run typecheck
npm run build
npm run test:auth
```

- `typecheck` verifica os tipos.
- `build` verifica os tipos e gera os arquivos para publicação.
- `test:auth` executa o teste automatizado do servidor.

O teste de autenticação cobre cadastro, entradas inválidas, conta repetida, credenciais incorretas, sessão após reiniciar o servidor, saída e limite de tentativas, entre outros casos. Ele usa um banco temporário. Não equivale a testar todas as páginas do portal.

Este guia foi feito por leitura do código. A existência de um teste ou comando não significa que ele tenha sido executado durante a preparação do guia.

`vite.config.ts` encaminha as chamadas de `/api` ao servidor local. O frontend e o servidor são processos diferentes, mesmo sendo iniciados por um único comando de desenvolvimento.

A configuração atual da Vercel executa `npm run build:demo`. Ela publica a demonstração, não o servidor Node com SQLite. As regras de reescrita permitem abrir diretamente endereços como `/clubes` e deixar o React Router escolher a tela.

O projeto exige Node a partir da versão indicada em `package.json`, `22.13.0`, e depende do suporte ao módulo `node:sqlite`.

## 20. Perguntas que a banca pode fazer

**Por que usar React?**

“Para dividir a interface em componentes e atualizar a tela conforme o usuário interage. O cabeçalho é um exemplo de componente compartilhado.”

**O que é estado?**

“É uma informação da interface que pode mudar. Quando altero a busca com `setBusca`, o React calcula novamente o que deve aparecer.”

**Qual a diferença entre frontend e backend?**

“O frontend é a parte executada no navegador. O backend recebe as requisições de autenticação, valida os dados e acessa o SQLite.”

**Tudo está no banco?**

“Não. Contas e sessões estão no SQLite. Agenda e objetos ficam no navegador. Horários e datas estão nos arquivos do projeto.”

**Os objetos cadastrados aparecem para todos os alunos?**

“Não nesta versão. Eles ficam no armazenamento do navegador utilizado. Para compartilhar entre alunos, preciso criar uma API e persistência central para essa área.”

**Como funciona a busca?**

“Ela compara o texto cadastrado com o que foi digitado e mostra os itens correspondentes. As verificações de categoria e mês restringem ainda mais os resultados.”

**O que acontece se eu atualizar a página?**

“Os estados são criados novamente. Algumas informações são recuperadas do localStorage. Na execução normal, o sistema também consulta a sessão no servidor.”

**Por que há validação no servidor e no formulário?**

“O formulário orienta o usuário, mas pode ser contornado. O servidor precisa conferir os dados antes de aceitá-los.”

**Como encontra o clube certo?**

“A página lê o identificador do endereço e procura um clube com o mesmo ID.”

**Existe inscrição online nos clubes?**

“Ainda não. A página mostra informações e orientações para participar.”

**O que você melhoraria?**

“Centralizaria os dados hoje locais, separaria permissões, integraria dados oficiais e reduziria a duplicação entre os cards e os detalhes dos clubes.”

**Você utilizou ferramentas de auxílio?**

Responda de acordo com o que realmente fez. Se houve ajuda de IA, você pode dizer: “Usei apoio para construir e revisar partes do projeto e estou estudando as decisões e o funcionamento do código.” Não atribua a si uma autoria sem auxílio se isso não corresponde ao processo. Siga as regras da sua instituição sobre declaração desse uso.

## 21. Roteiro de demonstração para treinar

Ajuste o tempo às orientações da banca. Esta é uma sugestão de sequência, não um tempo obrigatório.

1. Apresente o problema e o objetivo do portal.
2. Diga se está usando a execução normal ou a demonstração.
3. Mostre o cabeçalho e explique as rotas.
4. Troque a turma em Horários e explique estado, lista de grades e armazenamento da escolha.
5. Pesquise uma data comemorativa e explique as verificações da função.
6. Abra um clube e mostre como o ID aparece no endereço dos detalhes.
7. Crie, edite e exclua um compromisso de teste na Agenda.
8. Cadastre um objeto fictício, filtre a lista e altere sua situação.
9. Mostre o tema e a personalização do perfil.
10. Termine explicando onde os dados ficam e quais integrações ainda faltam.

Use dados fictícios na apresentação. Antes, ensaie no mesmo modo e navegador que pretende usar. Fotos externas dependem de conexão. Prepare um exemplo de busca que corresponda exatamente aos acentos dos dados cadastrados.

## 22. Plano de estudo até novembro de 2026

Como o dia da apresentação não foi informado, distribua estas etapas pelos dias disponíveis.

**Primeira etapa: entender a base.** Estude `main`, `App`, rotas, estado e eventos. Explique em voz alta o que acontece entre abrir o site e ver a página inicial.

**Segunda etapa: explicar as telas.** Faça uma página por vez. Para cada uma, responda: qual é o objetivo, quais dados usa, o que o clique modifica e onde salva?

**Terceira etapa: entender armazenamento e login.** Diferencie estado, localStorage, cookie e SQLite. Treine a explicação do caminho do formulário até o servidor.

**Última etapa: simular a banca.** Apresente sem ler o guia. Peça para alguém interromper com perguntas. Anote as dúvidas e volte ao arquivo correspondente.

Você estará mais preparado quando conseguir explicar um exemplo concreto, como “digitei Coral e estes cards desapareceram”, mostrando qual campo, estado e função participam dessa ação.

## 23. Revisão rápida antes de apresentar

- Sei explicar a finalidade do portal.
- Sei localizar a rota de cada página no App.
- Sei dizer o que `useState`, `if`, `for`, `continue` e `return` fazem.
- Sei explicar a diferença entre `map`, `filter` e `find` nos lugares em que aparecem.
- Sei acompanhar uma ação da tela até o armazenamento.
- Sei diferenciar dados fixos, dados locais e dados do servidor.
- Sei explicar a autenticação sem dizer que a senha está salva em texto puro.
- Sei apontar as partes demonstrativas e as limitações atuais.
- Sei explicar o que implementei com auxílio e o que compreendo de cada parte.
- Consigo demonstrar as funções principais e responder sem precisar decorar cada linha.
